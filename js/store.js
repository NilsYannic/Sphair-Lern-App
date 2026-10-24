// Speicher: Fortschritt, Streak, Karteikasten, Profil und Einstellungen.
// Lokal im Browser (localStorage) und – im Claude-Link – zusätzlich privat in der Artifact-Datenbank,
// damit nichts verloren geht und der Stand auf allen Geräten gleich ist.
(() => {
  const KEY = 'sphair-lern-v1';
  const BOX_DAYS = [0, 1, 3, 7, 16, 35]; // Wiederholungsabstand je Fach

  const pad = (n) => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const addDays = (key, n) => {
    const [y, m, d] = key.split('-').map(Number);
    return dayKey(new Date(y, m - 1, d + n));
  };

  const defaults = () => ({
    settings: { name: '', screeningDate: '', school: '', theme: 'auto', design: 'standard', apiKey: '', model: 'claude-opus-5-5', aiEnabled: true, onboarded: false },
    xp: 0,
    streak: { count: 0, best: 0, last: '' },
    days: {},       // 'YYYY-MM-DD' -> { done: [taskIds], xp }
    lessons: {},    // 'topic:index' -> true
    heft: {},       // 'abschnitt' -> true (gelesen im GuV-Heft)
    cards: {},      // 'topic:index' -> { box, due }
    topics: {},     // topicId -> { right, wrong }
    trainers: {},   // trainerId -> { runs, best, last: [scores] }
    sims: [],       // Screening-Simulationen { date, score, parts }
    profile: null,  // Antworten aus dem Fragebogen
    updatedAt: 0,   // Zeitpunkt der letzten Änderung (für den Abgleich mit der Cloud)
  });

  const normalize = (d) => {
    const out = Object.assign(defaults(), d || {});
    out.settings = Object.assign(defaults().settings, out.settings);
    return out;
  };

  let data;
  try {
    data = normalize(JSON.parse(localStorage.getItem(KEY) || '{}'));
  } catch {
    data = defaults();
  }

  // ---- Cloud-Speicher (nur im Claude-Link verfügbar) ----
  let cloudDoc = null;      // Dokument data/users/<id>/state
  let cloudTimer = null;
  let cloudBusy = false;
  let cloudDirty = false;
  const listeners = [];
  const cloud = { status: 'local' }; // local | loading | synced | saving | error

  // Nur was den Lernstand ausmacht; der API-Schlüssel bleibt auf dem Gerät
  const forCloud = () => {
    const d = JSON.parse(JSON.stringify(data));
    if (d.settings) delete d.settings.apiKey;
    // alte Tageseinträge kürzen (nur die letzten 120 Tage sind nötig)
    const keys = Object.keys(d.days || {}).sort();
    keys.slice(0, Math.max(0, keys.length - 120)).forEach((k) => delete d.days[k]);
    return d;
  };

  const setStatus = (st) => { cloud.status = st; listeners.forEach((f) => { try { f(st); } catch { /* egal */ } }); };

  async function pushCloud() {
    if (!cloudDoc) return;
    if (cloudBusy) { cloudDirty = true; return; }
    cloudBusy = true;
    cloudDirty = false;
    setStatus('saving');
    try {
      await cloudDoc.set({ v: 1, state: forCloud() });
      setStatus('synced');
    } catch (e) {
      setStatus('error');
      if (e && e.code === 'unavailable') { cloudBusy = false; setTimeout(pushCloud, 1500 + Math.random() * 1500); return; }
    }
    cloudBusy = false;
    if (cloudDirty) pushCloud();
  }

  const save = () => {
    data.updatedAt = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* Speicher voll oder gesperrt */ }
    if (cloudDoc) { clearTimeout(cloudTimer); cloudTimer = setTimeout(pushCloud, 1200); }
  };

  // Beim Start: Cloud-Stand laden und den neueren Stand behalten
  async function connectCloud() {
    if (!window.claude?.use) return;
    setStatus('loading');
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      const uid = db && user ? await user.id() : null;
      if (!uid) { setStatus('local'); return; }
      cloudDoc = db.doc(`data/users/${uid}/state`);
      const snap = await cloudDoc.get();
      const remote = snap.exists ? snap.data()?.state : null;
      if (remote && (remote.updatedAt || 0) > (data.updatedAt || 0)) {
        const apiKey = data.settings.apiKey;
        data = normalize(remote);
        data.settings.apiKey = apiKey;
        try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* egal */ }
        setStatus('synced');
        window.dispatchEvent(new CustomEvent('store:loaded'));
      } else if (data.updatedAt) {
        await pushCloud();
      } else {
        setStatus('synced');
      }
    } catch {
      setStatus('error');
    }
  }

  // Beim Verlassen sofort speichern
  addEventListener('pagehide', () => { if (cloudTimer) { clearTimeout(cloudTimer); pushCloud(); } });
  document.addEventListener('visibilitychange', () => { if (document.hidden && cloudTimer) { clearTimeout(cloudTimer); cloudTimer = null; pushCloud(); } });

  const S = {
    get data() { return data; },
    get settings() { return data.settings; },
    dayKey, addDays,
    save,

    today() {
      const k = dayKey();
      return (data.days[k] ||= { done: [], xp: 0 });
    },

    addXp(n) {
      data.xp += n;
      this.today().xp += n;
      save();
    },

    // Streak: zählt, wenn das Tagesziel erreicht ist
    completeDay() {
      const k = dayKey();
      const st = data.streak;
      if (st.last === k) return false;
      st.count = st.last === addDays(k, -1) ? st.count + 1 : 1;
      st.best = Math.max(st.best, st.count);
      st.last = k;
      save();
      return true;
    },

    // Aktuelle Streak (0, wenn gestern verpasst)
    streakNow() {
      const k = dayKey();
      const st = data.streak;
      return st.last === k || st.last === addDays(k, -1) ? st.count : 0;
    },

    markTask(id) {
      const t = this.today();
      if (!t.done.includes(id)) { t.done.push(id); save(); }
    },

    lessonRead(topic, i) {
      data.lessons[`${topic}:${i}`] = true;
      save();
    },

    // Karteikasten (Leitner) für Quizfragen
    answer(topic, qi, right) {
      const id = `${topic}:${qi}`;
      const c = data.cards[id] || { box: 0, due: dayKey() };
      c.box = right ? Math.min(c.box + 1, BOX_DAYS.length - 1) : 1;
      c.due = addDays(dayKey(), BOX_DAYS[c.box]);
      data.cards[id] = c;
      const ts = (data.topics[topic] ||= { right: 0, wrong: 0 });
      right ? ts.right++ : ts.wrong++;
      save();
    },

    isDue(topic, qi) {
      const c = data.cards[`${topic}:${qi}`];
      return !c || c.due <= dayKey();
    },

    mastery(topic) {
      const t = window.Content.topic(topic);
      if (!t) return 0;
      const boxes = t.questions.map((_, i) => (data.cards[`${topic}:${i}`]?.box || 0));
      const read = t.lessons.filter((_, i) => data.lessons[`${topic}:${i}`]).length;
      const quiz = boxes.reduce((a, b) => a + Math.min(b, 3), 0) / (t.questions.length * 3);
      return Math.round((0.3 * read / t.lessons.length + 0.7 * quiz) * 100);
    },

    trainerResult(id, score) {
      const t = (data.trainers[id] ||= { runs: 0, best: 0, last: [] });
      t.runs++;
      t.best = Math.max(t.best, score);
      t.last = [...t.last, score].slice(-10);
      save();
    },

    trainerAvg(id) {
      const l = data.trainers[id]?.last || [];
      return l.length ? Math.round(l.reduce((a, b) => a + b, 0) / l.length) : null;
    },

    saveSettings() { save(); },
    get cloud() { return cloud.status; },
    onCloud(f) { listeners.push(f); },
    connectCloud,

    exportJson() { return JSON.stringify(data, null, 2); },
    importJson(text) {
      const d = JSON.parse(text);
      if (!d || typeof d !== 'object' || !d.settings) throw new Error('Keine gültige Sicherung');
      const apiKey = data.settings.apiKey;
      data = normalize(d);
      data.settings.apiKey = data.settings.apiKey || apiKey;
      save();
    },
    reset() {
      const keep = { apiKey: data.settings.apiKey, model: data.settings.model, name: data.settings.name, design: data.settings.design, theme: data.settings.theme };
      const profile = data.profile;
      data = defaults();
      data.profile = profile;
      Object.assign(data.settings, keep, { onboarded: true });
      save();
    },
  };

  window.Store = S;
})();
