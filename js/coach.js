// KI-Coach: Claude (mit eigenem API-Schlüssel) oder eingebauter Offline-Coach
(() => {
  const S = window.Store;
  const C = window.Content;
  const T = window.Trainers;
  let sdkPromise;
  const loadSdk = () => (sdkPromise ||= import('./vendor/anthropic-sdk.mjs').then((m) => m.default));

  // Kurzer Lernstand für den Coach
  const SKILL_TRAINER = { kopf: 'kopf', englisch: 'englisch', raum: 'wuerfel', technik: 'technik', konz: 'vergleich', merken: 'merken', stress: 'instrumente' };
  const SKILL_NAME = { kopf: 'Kopfrechnen', englisch: 'Englisch', raum: 'Räumliches Vorstellen', technik: 'Physik & Technik', konz: 'Konzentration', merken: 'Merkfähigkeit', stress: 'Ruhe unter Stress' };

  // Antworten aus dem Fragebogen als kurzer Steckbrief
  function profileSummary() {
    const p = S.data.profile;
    if (!p || !p.done) return 'Profil: Fragebogen noch nicht ausgefüllt.';
    const skills = Object.keys(SKILL_NAME).filter((k) => p[`s_${k}`]).map((k) => `${SKILL_NAME[k]} ${p[`s_${k}`]}/5`).join(', ');
    return [
      `Name: ${p.name || '–'}, Alter: ${p.age || '–'}, Schule: ${p.schule || '–'}`,
      `Ziel: ${p.goal || '–'}${p.why ? ` – Motivation: «${p.why}»` : ''}`,
      `SPHAIR-Stand: ${p.sphair || '–'}${p.screeningDate ? `, Screening am ${p.screeningDate}` : ''}`,
      `Flugerfahrung: ${(p.flying || []).join(', ') || '–'}; Englisch: ${p.englishLevel || '–'}; Brille: ${p.glasses || '–'}`,
      `Selbsteinschätzung (1–5): ${skills || '–'}`,
      `Lernzeit pro Tag: ${p.minutes || '–'}, lernt am liebsten: ${p.when || '–'}`,
      `Wünscht Erklärungen: ${p.style || '–'}; Ton: ${p.tone || '–'}`,
      p.hard ? `Was schwerfällt / Sorgen: «${p.hard}»` : '',
    ].filter(Boolean).join('\n');
  }

  function progressSummary() {
    const d = S.data;
    const topics = C.TOPICS.map((t) => `${t.name}: ${S.mastery(t.id)} %`).join(', ');
    const trainers = T.TRAINERS.map((t) => { const a = S.trainerAvg(t.id); return a == null ? null : `${t.name}: Ø ${a} %`; }).filter(Boolean).join(', ') || 'noch keine';
    const days = S.settings.screeningDate ? Math.ceil((new Date(S.settings.screeningDate) - new Date()) / 864e5) : null;
    return [
      profileSummary(),
      `Streak: ${S.streakNow()} Tage (Rekord ${d.streak.best}), XP: ${d.xp}`,
      `Theorie-Fortschritt: ${topics}`,
      `Screening-Trainer: ${trainers}`,
      days != null ? `Tage bis zum Screening: ${days}` : 'Screening-Datum: noch nicht festgelegt',
    ].join('\n');
  }

  function weakest() {
    const t = [...C.TOPICS].sort((a, b) => S.mastery(a.id) - S.mastery(b.id))[0];
    const list = T.TRAINERS.filter((x) => !x.custom).map((x) => ({ x, a: S.trainerAvg(x.id) ?? -1 }));
    let tr = list.sort((a, b) => a.a - b.a)[0];
    // Noch keine Trainingsdaten? Dann die eigene Einschätzung aus dem Fragebogen nehmen
    const p = S.data.profile;
    if (p?.done && list.every((x) => x.a < 0)) {
      const weakSkill = Object.keys(SKILL_TRAINER).filter((k) => p[`s_${k}`]).sort((a, b) => p[`s_${a}`] - p[`s_${b}`])[0];
      const x = weakSkill && T.get(SKILL_TRAINER[weakSkill]);
      if (x) tr = { x, a: -1, skill: SKILL_NAME[weakSkill] };
    }
    return { topic: t, trainer: tr.x, trainerAvg: tr.a, skill: tr.skill };
  }

  const SYSTEM = `Du bist der persönliche SPHAIR-Coach in einer Lern-App. Du sprichst mit einer jugendlichen Person (ca. 15, Gymnasium in der Schweiz), die Airline-Pilot/-in werden will und sich auf SPHAIR vorbereitet (Screening am Fliegerärztlichen Institut Dübendorf und danach den zweiwöchigen Flugkurs).

Fakten (Quelle sphair.ch und Partner; bei Unsicherheit auf sphair.ch verweisen):
- SPHAIR: Eignungsabklärung von Luftwaffe und Aero-Club der Schweiz. Phasen: 1) Registrierung MySPHAIR, biografischer Fragebogen, Übungstests zu Hause (danach 18 Monate Zeit fürs Screening). 2) Screening, 1 Tag am FAI Dübendorf. 3) Flugkurs, 2 Wochen, ca. 10 Flugstunden / 11 Flüge, Theorie, max. 6 Teilnehmende.
- Voraussetzungen: Schweizer Pass, 17–23 Jahre beim Screening (Offiziere bis 24), gute Gesundheit (Brille ca. bis ±6 dpt, Entscheid Fliegerarzt), guter Leumund.
- Screening-Blöcke: 1) Englisch, Kopfrechnen, räumliches Vorstellungsvermögen. 2) Merkfähigkeit, Konzentration, technisches Verständnis. 3) Wahrnehmung, Rechenaufgaben. 4) Psychomotorik, Mehrfachanforderungen.
- Screening-Tag: 09:00 Check-in, Block 1–4 wie oben, 15:00 Block 5 Persönlichkeits- und Refraktometertest.
- Flugkurs: 11 Flüge à 40–50 min, Eintrittstest am 1. Tag über das «Need to know» aus «Grundlagen und Verfahren» (GuV); wichtigste Prio: Checkliste und Procedures der eigenen Flugschule (gehen dem GuV vor). Beurteilt: Persönlichkeit, fliegerische Begabung, Lernfähigkeit, Motivation. Regeln: mind. 7 h Schlaf, 0 Promille, mind. 1.5 l trinken.
- GuV-Verfahren (exakt): MOVE (Taxi Area CLEAR, Taxi Light ON, Power SET, Parking Brake RELEASED), BRAKE CHECK, STOP (Parking Brake SET, Power SET, Taxi Light OFF); Steigflug PAT; Level off aus Steigflug APT; Sinkflug APT; Level off aus Sinkflug PAT («First Push»); Steuerübergabe «YOU HAVE CONTROLS» / «I HAVE CONTROLS»; Notfall F-N-C-E-E-D (Fly, Navigate, Communicate, Evaluate, Execute, Decision making).
- Airline: Zertifikat mit Empfehlung Berufspilotenlaufbahn → bei SWISS/Edelweiss entfällt seit Juni 2024 der DLR-Test; Zertifikat max. 5 Jahre alt bei Assessment Step 2; danach Ausbildung an der European Flight Academy (ca. 2 Jahre). Medical Klasse 1.

So coachst du:
- Richte dich nach dem Profil aus dem Fragebogen unten (Alter, Ziel, Stand, Stärken/Schwächen, gewünschter Erklärstil und Ton). Sprich die Person mit Namen an, ohne es zu übertreiben.
- Ton standardmässig wie ein guter Freund: locker, ermutigend, ehrlich. Duzen. Schweizer Rechtschreibung (ss statt ß).
- Antworten KURZ: meist 2–5 Sätze oder eine kurze Liste. Nur **fett** und Aufzählungen, keine Tabellen oder Überschriften.
- Erkläre Theorie (Aerodynamik, Meteo, Navigation, Luftrecht, Funk, Human Factors, Technik) einfach und korrekt, gern mit Beispiel. Stelle bei Bedarf eine kurze Übungsfrage zurück.
- Gib konkrete Lerntipps passend zum Lernstand unten und verweise auf die Bereiche der App (Heute, Lernen, Training, Screening-Simulation).
- Erfinde keine offiziellen Regeln, Termine oder Kosten. Wenn du etwas nicht sicher weisst, sag es und verweise auf sphair.ch.
- Bei Themen rund um Gesundheit/Medical: allgemeine Infos ja, für Entscheide auf Fliegerarzt/Augenarzt verweisen.`;

  const systemText = () => `${SYSTEM}\n\nProfil und Lernstand:\n${progressSummary()}\nHeute: ${new Date().toLocaleDateString('de-CH')}`;

  // Im Claude-Link: Claude direkt über die «sample»-Fähigkeit fragen (ohne API-Schlüssel)
  let sampleFn = null;
  const sampleReady = (window.claude?.use ? window.claude.use('sample') : Promise.resolve(null))
    .then((f) => { sampleFn = f; return f; }).catch(() => null);

  const AI = {
    messages: [],
    reset() { this.messages = []; },
    ready: sampleReady,
    get viaKey() { return S.settings.aiEnabled && !!S.settings.apiKey; },
    get enabled() { return this.viaKey || (S.settings.aiEnabled && !!sampleFn); },

    async ask(text, onText) {
      if (!this.viaKey && sampleFn) return this.askSample(text, onText);
      return this.askKey(text, onText);
    },

    async askSample(text, onText) {
      if (this.messages.length > 30) this.messages = this.messages.slice(-20);
      while (this.messages.length && this.messages[0].role !== 'user') this.messages.shift();
      this.messages.push({ role: 'user', content: text });
      const rules = `${systemText()}\n\nAntworte jetzt als Coach auf die letzte Nachricht im Gespräch.`;
      try {
        const res = await sampleFn([{ role: 'user', content: rules }, ...this.messages], {
          cache: false, modelTier: 'default', onText: ({ text: t }) => onText(t),
        });
        const out = (res.text || '').trim();
        this.messages.push({ role: 'assistant', content: out || '…' });
        return out;
      } catch (err) {
        this.messages.pop();
        throw err;
      }
    },

    async askKey(text, onText) {
      const Anthropic = await loadSdk();
      const st = S.settings;
      const client = new Anthropic({ apiKey: st.apiKey, dangerouslyAllowBrowser: true });
      if (this.messages.length > 30) this.messages = this.messages.slice(-20);
      // Erste Nachricht muss vom Benutzer sein
      while (this.messages.length && this.messages[0].role !== 'user') this.messages.shift();
      this.messages.push({ role: 'user', content: text });

      const params = {
        model: st.model,
        max_tokens: 4096,
        system: systemText(),
        messages: this.messages,
        output_config: { effort: 'low' },
      };
      const useFallbacks = /^claude-(opus|sonnet|fable)/.test(st.model);
      let full = '';
      try {
        const stream = useFallbacks
          ? client.beta.messages.stream({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' })
          : client.messages.stream(params);
        stream.on('text', (delta) => { full += delta; onText(full); });
        const msg = await stream.finalMessage();
        if (msg.stop_reason === 'refusal') {
          this.messages = [];
          return 'Dabei kann ich leider nicht helfen. Frag mich gern etwas zu SPHAIR oder zur Fliegerei! ✈️';
        }
        const out = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
        this.messages.push({ role: 'assistant', content: out || '…' });
        return out;
      } catch (err) {
        this.messages.pop();
        throw err;
      }
    },

    async describeError(err) {
      if (err && typeof err.code === 'string' && !('status' in err)) {
        const m = { not_granted: 'Du hast dem Coach nicht erlaubt, Claude zu fragen. Öffne die App neu, wenn du es doch erlauben willst.', rate_limited: 'Gerade zu viele Fragen auf einmal – warte kurz und frag nochmal.', cancelled: 'Abgebrochen.' };
        return m[err.code] || 'Die KI ist gerade nicht erreichbar.';
      }
      const Anthropic = await loadSdk().catch(() => null);
      if (Anthropic) {
        if (err instanceof Anthropic.AuthenticationError) return 'Der API-Schlüssel ist ungültig. Prüfe ihn im Profil.';
        if (err instanceof Anthropic.PermissionDeniedError) return 'Dieser API-Schlüssel hat keinen Zugriff auf das gewählte Modell.';
        if (err instanceof Anthropic.NotFoundError) return 'Das gewählte Modell wurde nicht gefunden.';
        if (err instanceof Anthropic.RateLimitError) return 'Zu viele Anfragen oder kein Guthaben mehr. Versuch es später nochmal.';
        if (err instanceof Anthropic.APIConnectionError) return 'Keine Verbindung zur KI. Bist du online?';
        if (err instanceof Anthropic.APIError) return `KI-Fehler (${err.status || '?'}): ${err.message}`;
      }
      return 'Die KI ist gerade nicht erreichbar.';
    },
  };

  // ---------- Offline-Coach ----------
  const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function searchLessons(text) {
    const words = norm(text).split(/[^a-z0-9]+/).filter((w) => w.length > 3);
    if (!words.length) return null;
    let best = null;
    for (const t of C.TOPICS) {
      t.lessons.forEach((l, i) => {
        const hay = norm(`${l.t} ${strip(l.b)}`);
        const score = words.reduce((s, w) => s + (hay.includes(w) ? (norm(l.t).includes(w) ? 3 : 1) : 0), 0);
        if (score > (best?.score || 0)) best = { score, t, l, i };
      });
    }
    return best && best.score >= 2 ? best : null;
  }

  function offline(text) {
    const q = norm(text);
    const w = weakest();
    if (/heute|plan|was soll|wie lerne|lernplan/.test(q)) {
      return `Mein Vorschlag für heute:\n- Erledige deine **Tagesaufgaben** auf «Heute» (Streak!)\n- Extra: **${w.topic.name}** ist dein schwächstes Thema (${S.mastery(w.topic.id)} %) – lies eine Lektion\n- Training: **${w.trainer.name}**${w.trainerAvg >= 0 ? ` (Ø ${w.trainerAvg} %)` : ' hast du noch nie gemacht'}\nKurz und regelmässig schlägt lang und selten! 💪`;
    }
    if (/schwach|schwaech|verbessern|wo stehe|fortschritt|stand/.test(q)) {
      const list = C.TOPICS.map((t) => `- ${t.name}: **${S.mastery(t.id)} %**`).join('\n');
      return `Dein Stand in der Theorie:\n${list}\n\nAm meisten bringt dir jetzt: **${w.topic.name}** und der Trainer **${w.trainer.name}**.`;
    }
    if (/motiv|keine lust|muede|mude|schaff/.test(q)) {
      return pick([
        `Du hast eine Streak von **${S.streakNow()} Tagen** – lass sie nicht reissen! Nur 10 Minuten heute reichen. 🔥`,
        'Jeder Airline-Captain hat mal genau da angefangen, wo du jetzt bist. Eine kleine Aufgabe – los geht\'s! ✈️',
        'Du bist 15 und bereitest dich schon vor – damit bist du vielen weit voraus. Mach heute eine Runde Kopfrechnen! 🚀',
      ]);
    }
    if (/screening|ablauf|test|bloc|block/.test(q)) {
      return 'Das Screening ist **ein Tag am FAI in Dübendorf** mit 4 Blöcken:\n- **1:** Englisch, Kopfrechnen, räumliches Vorstellen\n- **2:** Merkfähigkeit, Konzentration, Technik\n- **3:** Wahrnehmung, Rechenaufgaben\n- **4:** Psychomotorik, Multitasking\nProbier die **Screening-Simulation** unter «Training»!';
    }
    if (/airline|swiss|edelweiss|dlr|efa|academy/.test(q)) {
      return 'Mit SPHAIR-Zertifikat (Empfehlung Berufspilot) kannst du bei **SWISS/Edelweiss** den **DLR-Test auslassen**. Das Zertifikat darf beim Assessment max. **5 Jahre** alt sein. Danach: European Flight Academy (ca. 2 Jahre). Details: Lektion «Der Airline-Weg».';
    }
    const hit = searchLessons(text);
    if (hit) {
      const body = strip(hit.l.b);
      return `Aus der Lektion **${hit.l.t}** (${hit.t.name}):\n${body.length > 420 ? `${body.slice(0, 420)}…` : body}`;
    }
    return `Gute Frage! Ohne KI-Schlüssel kann ich nur einfache Sachen beantworten. Probier z.B. «Was soll ich heute lernen?», «Wo bin ich schwach?» oder ein Stichwort wie «Föhn» oder «Transponder».\n\nFür echte Gespräche: Öffne die App über den Claude-Link und erlaube dem Coach, Claude zu fragen – oder trag im **Profil** einen API-Schlüssel ein.`;
  }
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  window.Coach = { AI, offline, weakest, progressSummary, profileSummary };
})();
