// Screening-Trainer: Aufgaben-Generatoren für alle 4 Testblöcke
(() => {
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  const fmt = (n) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100)).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  // Plausible falsche Antworten rund um die richtige Zahl
  const numOptions = (ans, spread = null) => {
    const s = spread || Math.max(1, Math.round(Math.abs(ans) * 0.12));
    const set = new Set([ans]);
    let guard = 0;
    while (set.size < 4 && guard++ < 50) {
      const d = pick([-3, -2, -1, 1, 2, 3]) * s;
      const v = ans + d;
      if (v >= 0) set.add(v);
    }
    while (set.size < 4) set.add(ans + set.size * 7);
    return [...set].map((v) => (typeof ans === 'number' ? fmt(v) : v));
  };

  // ---------- Kopfrechnen ----------
  function arithmetic(level) {
    const kinds = level === 1
      ? ['add', 'sub', 'mul1', 'sq']
      : level === 2 ? ['add', 'sub', 'mul2', 'div', 'sq', 'cube', 'pct']
      : ['mul2', 'div', 'sq', 'cube', 'pct', 'chain', 'dec'];
    const k = pick(kinds);
    let q, a;
    switch (k) {
      case 'add': { const x = rnd(15, level === 1 ? 99 : 999), y = rnd(15, level === 1 ? 99 : 999); q = `${x} + ${y}`; a = x + y; break; }
      case 'sub': { const x = rnd(50, level === 1 ? 150 : 999), y = rnd(11, x - 1); q = `${x} − ${y}`; a = x - y; break; }
      case 'mul1': { const x = rnd(12, 39), y = rnd(3, 9); q = `${x} × ${y}`; a = x * y; break; }
      case 'mul2': { const x = rnd(11, 29), y = rnd(11, level === 3 ? 49 : 19); q = `${x} × ${y}`; a = x * y; break; }
      case 'div': { const y = rnd(3, 15), a0 = rnd(6, level === 3 ? 60 : 25); q = `${a0 * y} : ${y}`; a = a0; break; }
      case 'sq': { const x = rnd(level === 1 ? 4 : 11, level === 1 ? 15 : 25); q = `${x}²`; a = x * x; break; }
      case 'cube': { const x = rnd(2, level === 3 ? 12 : 9); q = `${x}³`; a = x ** 3; break; }
      case 'pct': { const p = pick([5, 10, 15, 20, 25, 30, 40, 75]), b = pick([40, 60, 80, 120, 160, 240, 360, 480]); q = `${p} % von ${b}`; a = p * b / 100; break; }
      case 'chain': { const x = rnd(3, 12), y = rnd(3, 9), z = rnd(5, 40); q = `${x} × ${y} + ${z}`; a = x * y + z; break; }
      default: { const x = rnd(11, 49) / 10, y = rnd(2, 9); q = `${fmt(x)} × ${y}`; a = Math.round(x * y * 10) / 10; }
    }
    return { q, a };
  }

  // ---------- Rechenaufgaben aus der Fliegerei ----------
  function wordProblem(level) {
    const t = pick(['time', 'dist', 'fuel', 'conv', 'pct', 'climb', level > 1 ? 'gs' : 'time']);
    switch (t) {
      case 'time': { const gs = pick([60, 90, 120, 150, 180]), min = pick([10, 20, 30, 40]); const d = gs * min / 60; return { q: `Ein Flugzeug fliegt mit ${gs} kt. Wie viele Minuten braucht es für ${fmt(d)} NM?`, a: min, unit: 'min' }; }
      case 'dist': { const gs = pick([80, 100, 120, 140, 160]), min = pick([15, 30, 45, 90]); return { q: `Grundgeschwindigkeit ${gs} kt. Wie viele NM fliegst du in ${min} Minuten?`, a: gs * min / 60, unit: 'NM' }; }
      case 'fuel': { const lh = pick([24, 30, 36, 40, 48]), min = pick([30, 60, 90, 120]); return { q: `Verbrauch ${lh} l/h. Wie viele Liter brauchst du für ${min} Minuten?`, a: lh * min / 60, unit: 'l' }; }
      case 'conv': {
        const c = pick([
          () => { const ft = pick([1000, 3000, 5000, 10000]); return { q: `Wie viele Meter sind ${fmt(ft)} ft? (1 ft ≈ 0.3 m)`, a: ft * 0.3, unit: 'm' }; },
          () => { const nm = pick([2, 5, 10, 20]); return { q: `Wie viele km sind ${nm} NM? (1 NM ≈ 1.85 km)`, a: Math.round(nm * 1.85 * 10) / 10, unit: 'km' }; },
          () => { const m = pick([300, 600, 900, 1500]); return { q: `Wie viele ft sind ${m} m? (1 m ≈ 3.3 ft)`, a: Math.round(m * 3.3), unit: 'ft' }; },
        ]);
        return c();
      }
      case 'pct': { const seats = pick([100, 150, 180, 220]), p = pick([60, 75, 80, 90]); return { q: `Ein Flugzeug hat ${seats} Plätze und ist zu ${p} % besetzt. Wie viele Passagiere?`, a: seats * p / 100, unit: '' }; }
      case 'climb': { const rate = pick([500, 600, 750, 1000]), alt = pick([3000, 4500, 6000]); return { q: `Du steigst mit ${rate} ft/min von 0 auf ${fmt(alt)} ft. Wie viele Minuten dauert das?`, a: alt / rate, unit: 'min' }; }
      default: { const tas = pick([100, 120, 140]), wind = pick([10, 15, 20, 25]); const head = Math.random() < 0.5; return { q: `Eigengeschwindigkeit ${tas} kt, ${head ? 'Gegenwind' : 'Rückenwind'} ${wind} kt. Grundgeschwindigkeit?`, a: head ? tas - wind : tas + wind, unit: 'kt' }; }
    }
  }

  // ---------- Würfel kippen ----------
  const FACES = ['oben', 'unten', 'vorne', 'hinten', 'links', 'rechts'];
  const MOVES = {
    'nach vorne kippen': { oben: 'vorne', vorne: 'unten', unten: 'hinten', hinten: 'oben' },
    'nach hinten kippen': { oben: 'hinten', hinten: 'unten', unten: 'vorne', vorne: 'oben' },
    'nach rechts kippen': { oben: 'rechts', rechts: 'unten', unten: 'links', links: 'oben' },
    'nach links kippen': { oben: 'links', links: 'unten', unten: 'rechts', rechts: 'oben' },
    'im Uhrzeigersinn drehen (von oben)': { vorne: 'links', links: 'hinten', hinten: 'rechts', rechts: 'vorne' },
  };
  const ARROWS = { 'nach vorne kippen': '↓', 'nach hinten kippen': '↑', 'nach rechts kippen': '→', 'nach links kippen': '←', 'im Uhrzeigersinn drehen (von oben)': '↻' };

  function cubeSvg(face) {
    // Isometrischer Würfel: oben, vorne (links unten), rechts sichtbar
    const top = '50,10 90,30 50,50 10,30', front = '10,30 50,50 50,95 10,75', right = '50,50 90,30 90,75 50,95';
    const mark = { oben: [50, 30], vorne: [30, 62], rechts: [70, 62] }[face];
    return `<svg viewBox="0 0 100 105" class="cube"><polygon points="${top}" class="f1"/><polygon points="${front}" class="f2"/><polygon points="${right}" class="f3"/>${mark ? `<text x="${mark[0]}" y="${mark[1] + 5}" text-anchor="middle" class="mark">✕</text>` : ''}</svg>`;
  }

  function cubeTask(level) {
    const start = pick(['oben', 'vorne', 'rechts']);
    const n = level === 1 ? 2 : level === 2 ? 3 : rnd(4, 5);
    const moves = Array.from({ length: n }, () => pick(Object.keys(MOVES).slice(0, level === 1 ? 4 : 5)));
    let f = start;
    for (const m of moves) f = MOVES[m][f] || f;
    return {
      kind: 'mc', noShuffle: true,
      prompt: `<div class="row-c">${cubeSvg(start)}<ol class="moves">${moves.map((m) => `<li><span class="arr">${ARROWS[m]}</span> ${m}</li>`).join('')}</ol></div><p>Der Würfel hat ein ✕ (Seite <b>${start}</b>). Wo ist das ✕ nach allen Bewegungen?</p>`,
      options: FACES, answer: f,
      explain: `Schritt für Schritt: ${[start, ...moves.map((m, i) => { let x = start; for (let j = 0; j <= i; j++) x = MOVES[moves[j]][x] || x; return x; })].join(' → ')}`,
      time: 20 + n * 6,
    };
  }

  // ---------- Figuren drehen (gedreht vs. gespiegelt) ----------
  const norm = (cells) => {
    const mx = Math.min(...cells.map((c) => c[0])), my = Math.min(...cells.map((c) => c[1]));
    return cells.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  };
  const key = (cells) => JSON.stringify(norm(cells));
  const rot = (cells) => cells.map(([x, y]) => [y, -x]);
  const mir = (cells) => cells.map(([x, y]) => [-x, y]);
  const rotations = (cells) => { const r = [cells]; for (let i = 0; i < 3; i++) r.push(rot(r[r.length - 1])); return r; };

  function polyomino(n) {
    for (;;) {
      const cells = [[0, 0]];
      while (cells.length < n) {
        const [x, y] = pick(cells);
        const [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
        if (!cells.some((c) => c[0] === x + dx && c[1] === y + dy)) cells.push([x + dx, y + dy]);
      }
      const rk = new Set(rotations(cells).map(key));
      if (!rotations(mir(cells)).some((c) => rk.has(key(c)))) return cells; // chiral
    }
  }

  function shapeSvg(cells, cls = '') {
    const c = norm(cells), w = Math.max(...c.map((p) => p[0])) + 1, h = Math.max(...c.map((p) => p[1])) + 1;
    const s = 14, size = Math.max(w, h) * s;
    const ox = (size - w * s) / 2, oy = (size - h * s) / 2;
    return `<svg viewBox="-2 -2 ${size + 4} ${size + 4}" class="shape ${cls}">${c.map(([x, y]) => `<rect x="${ox + x * s}" y="${oy + y * s}" width="${s}" height="${s}" rx="2"/>`).join('')}</svg>`;
  }

  function rotateTask(level) {
    let cells, wrongs;
    do {
      cells = polyomino(level === 1 ? 4 : level === 2 ? 5 : 6);
      // Gespiegelte Varianten ohne Doppelte (symmetrische Formen haben weniger)
      const seen = new Set();
      wrongs = shuffle(rotations(mir(cells))).filter((c) => !seen.has(key(c)) && seen.add(key(c))).slice(0, 3);
    } while (wrongs.length < 3);
    const right = pick(rotations(cells).slice(1));
    const opts = shuffle([{ c: right, ok: true }, ...wrongs.map((c) => ({ c, ok: false }))]);
    return {
      kind: 'mc', html: true,
      prompt: `<div class="row-c">${shapeSvg(cells, 'big')}</div><p>Welche Figur ist nur <b>gedreht</b> (nicht gespiegelt)?</p>`,
      options: opts.map((o) => shapeSvg(o.c)), answer: shapeSvg(right), noShuffle: true,
      explain: 'Die anderen drei Figuren sind gespiegelt. Tipp: Achte auf eine markante Ecke und drehe sie im Kopf.',
      time: 25,
    };
  }

  // ---------- Englisch ----------
  const ENGLISH = [
    ['Synonym: «to commence»', 'to begin', ['to finish', 'to delay', 'to repeat']],
    ['Synonym: «to descend»', 'to go down', ['to climb', 'to turn', 'to accelerate']],
    ['Synonym: «adequate»', 'sufficient', ['excellent', 'missing', 'dangerous']],
    ['Synonym: «to assist»', 'to help', ['to ask', 'to avoid', 'to insist']],
    ['Synonym: «rapid»', 'fast', ['heavy', 'careful', 'steady']],
    ['Synonym: «to require»', 'to need', ['to repair', 'to request', 'to return']],
    ['Synonym: «hazard»', 'danger', ['luck', 'advice', 'speed']],
    ['Synonym: «to estimate»', 'to judge approximately', ['to calculate exactly', 'to forget', 'to destroy']],
    ['Opposite of «ascend»', 'descend', ['increase', 'arrive', 'extend']],
    ['Opposite of «visible»', 'invisible', ['unvisible', 'disvisible', 'nonvisible']],
    ['Opposite of «reliable»', 'unreliable', ['inreliable', 'disreliable', 'misreliable']],
    ['The aircraft ___ at 10:30 yesterday.', 'landed', ['lands', 'has landed', 'is landing']],
    ['If the weather ___ better, we will fly.', 'gets', ['will get', 'got', 'would get']],
    ['She has been a pilot ___ 2019.', 'since', ['for', 'from', 'ago']],
    ['We ___ already checked the fuel.', 'have', ['has', 'are', 'did']],
    ['There isn\'t ___ fuel left.', 'much', ['many', 'a few', 'several']],
    ['The passengers ___ boarding now.', 'are', ['is', 'be', 'was']],
    ['This is the ___ runway in Switzerland.', 'longest', ['most long', 'longer', 'more longest']],
    ['If I ___ a pilot, I would fly every day.', 'were', ['am', 'will be', 'be']],
    ['The flight was cancelled ___ fog.', 'due to', ['because', 'despite', 'although']],
    ['He asked me where I ___.', 'lived', ['live', 'do live', 'living']],
    ['The engine ___ by a mechanic every 100 hours.', 'is checked', ['checks', 'is checking', 'has check']],
    ['«Runway» means…', 'Piste', ['Rollweg', 'Vorfeld', 'Hangar']],
    ['«Taxiway» means…', 'Rollweg', ['Piste', 'Taxistand', 'Abflughalle']],
    ['«Fuel» means…', 'Treibstoff', ['Flug', 'Feuer', 'Volllast']],
    ['«Wind shear» means…', 'Windscherung', ['Windstille', 'Windfahne', 'Rückenwind']],
    ['«Go-around» means…', 'Durchstarten', ['Platzrunde', 'Umleitung', 'Rundflug']],
    ['«Landing gear» means…', 'Fahrwerk', ['Landeklappe', 'Getriebe', 'Bremse']],
    ['«Clearance» means…', 'Freigabe', ['Sauberkeit', 'Sichtweite', 'Abstand']],
    ['«Overcast» means…', 'bedeckt', ['überholt', 'überladen', 'sonnig']],
    ['«Stall» means…', 'Strömungsabriss', ['Stillstand am Boden', 'Hangar', 'Stau']],
    ['«Departure» means…', 'Abflug', ['Ankunft', 'Abteilung', 'Abstand']],
    ['«Altitude» means…', 'Höhe (über Meer)', ['Haltung', 'Breitengrad', 'Geschwindigkeit']],
    ['«Heading» means…', 'Steuerkurs', ['Überschrift', 'Kopfhörer', 'Ziel']],
    ['«to maintain» (ATC) means…', 'beibehalten', ['warten (reparieren)', 'erhöhen', 'melden']],
    ['«Expect delay» means…', 'Rechne mit Verspätung', ['Erwarte Freigabe', 'Keine Verspätung', 'Beeile dich']],
    ['«Hold short of runway 28» means…', 'Vor Piste 28 anhalten', ['Kurz auf Piste 28 halten', 'Piste 28 kreuzen', 'Auf Piste 28 landen']],
    ['Choose the correct sentence.', 'Neither the captain nor the crew was late.', ['Neither the captain or the crew was late.', 'Neither the captain nor the crew were lately.', 'Either the captain nor the crew was late.']],
    ['Choose the correct sentence.', 'I look forward to hearing from you.', ['I look forward to hear from you.', 'I am looking forward hear from you.', 'I look forward hearing from you.']],
    ['«Bear in mind» means…', 'remember / consider', ['forget', 'carry something', 'be afraid']],
    ['«To run out of fuel» means…', 'keinen Treibstoff mehr haben', ['tanken', 'Treibstoff ablassen', 'schnell fliegen']],
    ['Read: «Due to strong crosswinds, all departures from runway 16 are suspended until 1400 UTC.» – What is true?', 'No departures from RWY 16 before 1400 UTC', ['Runway 16 is closed for landings only', 'Departures resume at 1600 UTC', 'There is no wind']],
    ['Read: «Passengers must remain seated until the seatbelt sign has been switched off.» – Passengers may stand up…', 'after the sign is switched off', ['before the sign is off', 'whenever they want', 'during taxiing']],
  ];

  function englishTask() {
    const [q, a, wrong] = pick(ENGLISH);
    return { kind: 'mc', prompt: `<p class="big-q">${q}</p>`, options: [a, ...wrong], answer: a, time: 20 };
  }

  // ---------- Merkfähigkeit ----------
  function atcTask(level) {
    const cs = pick(['Swiss 2', 'Edelweiss 4', 'Hotel Bravo Kilo', 'Swiss 1']) + rnd(10, 99);
    const hdg = String(rnd(1, 36) * 10).padStart(3, '0');
    const alt = level === 1 ? `${rnd(3, 9)}000 ft` : `FL ${rnd(8, 24) * 10}`;
    const freq = `${rnd(118, 135)}.${pick(['050', '125', '275', '350', '425', '600', '775', '900'])}`;
    const sq = `${rnd(1, 6)}${rnd(0, 7)}${rnd(0, 7)}${rnd(0, 7)}`;
    const fields = [
      ['Steuerkurs', hdg, () => String(rnd(1, 36) * 10).padStart(3, '0')],
      ['Höhe', alt, () => (level === 1 ? `${rnd(3, 9)}000 ft` : `FL ${rnd(8, 24) * 10}`)],
      ['Frequenz', freq, () => `${rnd(118, 135)}.${pick(['050', '125', '275', '350', '425', '600', '775', '900'])}`],
      ['Transpondercode', sq, () => `${rnd(1, 6)}${rnd(0, 7)}${rnd(0, 7)}${rnd(0, 7)}`],
    ].slice(0, level + 1);
    const text = `<b>${cs}</b>, turn left heading <b>${hdg}</b>, climb <b>${alt}</b>${level >= 2 ? `, contact Zurich <b>${freq}</b>` : ''}${level >= 3 ? `, squawk <b>${sq}</b>` : ''}.`;
    const [label, val, gen] = pick(fields);
    const opts = new Set([val]);
    while (opts.size < 4) opts.add(gen());
    return {
      kind: 'mc', pre: { html: `<p class="hint">Merke dir die Anweisung:</p><div class="atc">${text}</div>`, ms: 4000 + level * 2000 },
      prompt: `<p class="big-q">Welcher <b>${label}</b> wurde genannt?</p>`, options: [...opts], answer: val, time: 15, explain: text,
    };
  }

  function digitTask(level) {
    const len = level === 1 ? rnd(5, 6) : level === 2 ? rnd(7, 8) : rnd(9, 10);
    const s = Array.from({ length: len }, () => rnd(0, 9)).join('');
    return {
      kind: 'text', pre: { html: `<p class="hint">Merke dir die Zahlenreihe:</p><div class="digits">${s.split('').join(' ')}</div>`, ms: len * 700 },
      prompt: '<p class="big-q">Tippe die Zahlenreihe ein.</p>', answer: s, time: 25, numeric: true,
    };
  }

  // ---------- Konzentration ----------
  function compareTask(level) {
    const letters = 'ABCDEFGHKLMNPRSTUVWXYZ';
    const a = `HB-${Array.from({ length: 3 }, () => pick(letters)).join('')} ${Array.from({ length: 3 + level }, () => rnd(0, 9)).join('')}`;
    let b = a;
    const same = Math.random() < 0.45;
    if (!same) {
      const chars = b.split('');
      const idx = pick(chars.map((c, i) => (/[A-Z0-9]/.test(c) && i > 2 ? i : -1)).filter((i) => i >= 0));
      const pool = /\d/.test(chars[idx]) ? '0123456789' : letters;
      let r; do { r = pick(pool); } while (r === chars[idx]);
      chars[idx] = r;
      b = chars.join('');
    }
    return {
      kind: 'mc', noShuffle: true, prompt: `<div class="cmp"><div>${a}</div><div>${b}</div></div>`,
      options: ['gleich', 'verschieden'], answer: same ? 'gleich' : 'verschieden', time: level === 3 ? 4 : 6,
    };
  }

  function countTask(level) {
    const target = pick(['▲', '●', '■']);
    const pool = { '▲': ['▲', '△', '▼'], '●': ['●', '○', '◐'], '■': ['■', '□', '▣'] }[target];
    const n = level === 1 ? 20 : level === 2 ? 30 : 40;
    const arr = Array.from({ length: n }, () => pick(pool));
    const count = arr.filter((x) => x === target).length;
    return {
      kind: 'text', numeric: true, prompt: `<p>Wie oft kommt <b class="sym">${target}</b> vor?</p><div class="symrow">${arr.join(' ')}</div>`,
      answer: String(count), time: 12 + n / 3,
    };
  }

  // ---------- Technisches Verständnis ----------
  function gearSvg(n) {
    const r = 16, gap = 2 * r + 2;
    return `<svg viewBox="0 0 ${n * gap + 4} 40" class="gears">${Array.from({ length: n }, (_, i) => `<circle cx="${i * gap + r + 2}" cy="20" r="${r}"/><text x="${i * gap + r + 2}" y="25" text-anchor="middle">${i + 1}</text>`).join('')}</svg>`;
  }

  const TECH = [
    ['Zwei Gefässe sind unten mit einem Rohr verbunden. In eines wird Wasser gegossen. Was passiert?', 'Der Wasserspiegel ist in beiden gleich hoch', ['Das Wasser bleibt im ersten Gefäss', 'Im zweiten wird es höher', 'Das Wasser fliesst zurück']],
    ['Ein Ball wird horizontal geworfen und einer gleichzeitig fallen gelassen (gleiche Höhe, keine Luft). Welcher landet zuerst?', 'Beide gleichzeitig', ['Der geworfene', 'Der fallen gelassene', 'Hängt von der Masse ab']],
    ['Zwei gleiche Lampen sind in Serie geschaltet. Eine brennt durch. Was passiert?', 'Beide gehen aus', ['Die andere leuchtet heller', 'Die andere leuchtet normal weiter', 'Nichts']],
    ['Zwei gleiche Lampen sind parallel geschaltet. Eine brennt durch. Was passiert?', 'Die andere leuchtet weiter', ['Beide gehen aus', 'Die Sicherung brennt durch', 'Die andere flackert']],
    ['Ein Metallring wird erhitzt. Was passiert mit dem Loch in der Mitte?', 'Es wird grösser', ['Es wird kleiner', 'Es bleibt gleich', 'Es verschwindet']],
    ['Eine Hydraulikpresse: kleiner Kolben 1 cm², grosser 50 cm². Du drückst mit 10 N. Kraft am grossen Kolben?', '500 N', ['50 N', '10 N', '5000 N']],
    ['Ein Eisblock schwimmt in einem randvollen Glas Wasser. Er schmilzt. Was passiert?', 'Das Glas läuft nicht über', ['Es läuft über', 'Der Spiegel sinkt stark', 'Das Wasser gefriert']],
    ['Ein Auto bremst stark. Wohin bewegt sich ein Ballon (mit Helium) im geschlossenen Auto?', 'Nach hinten', ['Nach vorne', 'Bleibt stehen', 'Nach unten']],
    ['Warum schwimmt ein Stahlschiff?', 'Es verdrängt so viel Wasser, wie es wiegt', ['Stahl ist leichter als Wasser', 'Wegen der Luft im Motor', 'Wegen der Oberflächenspannung']],
    ['Ein Rad mit grossem Durchmesser und eines mit kleinem sind durch einen Riemen verbunden. Welches dreht schneller?', 'Das kleine', ['Das grosse', 'Beide gleich', 'Keines']],
    ['Was passiert mit dem Luftdruck, wenn du einen Berg hochfährst?', 'Er sinkt', ['Er steigt', 'Er bleibt gleich', 'Er schwankt stark']],
    ['Ein Fahrrad hat vorne ein grosses und hinten ein kleines Zahnrad. Eine Pedalumdrehung bewirkt am Hinterrad…', 'mehr als eine Umdrehung', ['genau eine Umdrehung', 'weniger als eine Umdrehung', 'keine Umdrehung']],
    ['Wasser fliesst durch ein Rohr, das enger wird. Was passiert im engen Teil?', 'Schneller, tieferer Druck', ['Langsamer, höherer Druck', 'Gleich schnell', 'Es staut sich und stoppt']],
    ['Welcher Stoff leitet Wärme am besten?', 'Kupfer', ['Holz', 'Luft', 'Styropor']],
    ['Eine schwere und eine leichte Kiste stehen auf Eis. Du stösst beide gleich stark. Welche wird schneller?', 'Die leichte', ['Die schwere', 'Beide gleich', 'Keine']],
    ['Warum ist ein Seil an einer festen Rolle praktisch?', 'Es ändert die Kraftrichtung', ['Es halbiert die Kraft', 'Es verdoppelt die Kraft', 'Es spart Energie']],
  ];

  function techTask(level) {
    const t = pick(['bank', 'bank', 'gears', 'speed', 'lever', 'pulley']);
    if (t === 'gears') {
      const n = rnd(3, 4 + level);
      const same = n % 2 === 1;
      return { kind: 'mc', noShuffle: true, prompt: `<div class="row-c">${gearSvg(n)}</div><p>Zahnrad 1 dreht im <b>Uhrzeigersinn</b>. Wie dreht Zahnrad ${n}?</p>`, options: ['im Uhrzeigersinn', 'gegen den Uhrzeigersinn'], answer: same ? 'im Uhrzeigersinn' : 'gegen den Uhrzeigersinn', explain: 'Jedes Zahnrad dreht entgegengesetzt zum Nachbarn. Ungerade Position = gleiche Richtung wie Rad 1.', time: 15 };
    }
    if (t === 'speed') {
      const z1 = pick([10, 20, 30, 40]), z2 = pick([10, 20, 40, 60].filter((x) => x !== z1)), rpm = pick([60, 120, 300]);
      const a = rpm * z1 / z2;
      return { kind: 'mc', prompt: `<p>Zahnrad A (${z1} Zähne) dreht mit ${rpm} U/min und treibt Zahnrad B (${z2} Zähne). Wie schnell dreht B?</p>`, options: numOptions(a).map((x) => `${x} U/min`), answer: `${fmt(a)} U/min`, explain: `n_B = ${rpm} × ${z1} / ${z2}`, time: 25 };
    }
    if (t === 'lever') {
      const w = pick([100, 200, 300, 600]), a = pick([1, 2, 3]), b = pick([2, 3, 4, 6].filter((x) => x !== a));
      const f = w * a / b;
      return { kind: 'mc', prompt: `<p>Hebel: Eine Last von ${w} N hängt ${a} m vom Drehpunkt entfernt. Auf der anderen Seite drückst du ${b} m vom Drehpunkt. Welche Kraft brauchst du fürs Gleichgewicht?</p>`, options: numOptions(f).map((x) => `${x} N`), answer: `${fmt(f)} N`, explain: 'Kraft × Kraftarm = Last × Lastarm', time: 25 };
    }
    if (t === 'pulley') {
      const n = pick([2, 3, 4, 6]), load = pick([120, 240, 360, 600]);
      return { kind: 'mc', prompt: `<p>Ein Flaschenzug hat <b>${n} tragende Seilstücke</b>. Die Last wiegt ${load} N. Wie viel Kraft brauchst du (ohne Reibung)?</p>`, options: numOptions(load / n).map((x) => `${x} N`), answer: `${fmt(load / n)} N`, explain: 'Kraft = Last ÷ Anzahl tragender Seilstücke', time: 20 };
    }
    const [q, a, wrong] = pick(TECH);
    return { kind: 'mc', prompt: `<p>${q}</p>`, options: [a, ...wrong], answer: a, time: 25 };
  }

  // ---------- Wahrnehmung: Instrumente ----------
  function horizonSvg(bank, pitch) {
    // Künstlicher Horizont: Bank positiv = Rechtskurve (Horizont kippt nach links)
    const off = pitch * 3;
    return `<svg viewBox="-60 -60 120 120" class="ai"><defs><clipPath id="aiClip"><circle r="55"/></clipPath></defs>
<g clip-path="url(#aiClip)"><g transform="rotate(${-bank}) translate(0 ${off})"><rect x="-120" y="-120" width="240" height="120" class="sky"/><rect x="-120" y="0" width="240" height="120" class="ground"/><line x1="-120" x2="120" y1="0" y2="0" class="hl"/>
${[-10, -5, 5, 10].map((p) => `<line x1="${-8 - Math.abs(p)}" x2="${8 + Math.abs(p)}" y1="${-p * 3}" y2="${-p * 3}" class="pl"/>`).join('')}</g></g>
<circle r="55" class="rim"/><path d="M-30 0 H-10 L-5 6 L0 0 L5 6 L10 0 H30" class="plane"/><circle r="2" class="dot"/></svg>`;
  }

  function attitudeTask() {
    const bank = pick([-30, -20, 0, 20, 30]);
    const pitch = pick([-10, -5, 0, 5, 10]);
    const turn = (b) => (b < 0 ? 'Linkskurve' : b > 0 ? 'Rechtskurve' : 'Geradeaus');
    const vert = (p) => (p > 0 ? 'steigend' : p < 0 ? 'sinkend' : 'horizontal');
    const ans = `${turn(bank)}, ${vert(pitch)}`;
    const opts = new Set([ans]);
    while (opts.size < 4) opts.add(`${turn(pick([-1, 0, 1]))}, ${vert(pick([-1, 0, 1]))}`);
    return { kind: 'mc', prompt: `<div class="row-c">${horizonSvg(bank, pitch)}</div><p>Was macht das Flugzeug?</p>`, options: [...opts], answer: ans, time: 10, explain: 'Das kleine Flugzeugsymbol ist fest – der Horizont bewegt sich. Steht die Horizontlinie rechts höher als links, fliegst du eine Rechtskurve. Liegt der Horizont unter dem Symbol, steigst du.' };
  }

  function headingTask(level) {
    const h = rnd(0, 35) * 10;
    const t = pick(['turn', 'recip', level > 1 ? 'turn' : 'recip']);
    const f = (x) => String(((x % 360) + 360) % 360).padStart(3, '0');
    if (t === 'recip') {
      const a = f(h + 180);
      return { kind: 'mc', prompt: `<p class="big-q">Kurs ${f(h)}°. Was ist der Gegenkurs?</p>`, options: [a, f(h + 90), f(h - 90), f(h + 160)], answer: a, time: 10 };
    }
    const d = rnd(3, 15) * 10, right = Math.random() < 0.5;
    const a = f(h + (right ? d : -d));
    return { kind: 'mc', prompt: `<p class="big-q">Kurs ${f(h)}°. Du drehst <b>${d}° nach ${right ? 'rechts' : 'links'}</b>. Neuer Kurs?</p>`, options: [a, f(h + (right ? -d : d)), f(h + (right ? d + 20 : -d - 20)), f(h + (right ? d - 10 : -d + 10))], answer: a, time: 12 };
  }

  function flashTask(level) {
    const n = rnd(5, 8 + level * 2);
    const dots = [];
    while (dots.length < n) {
      const p = [rnd(8, 92), rnd(8, 52)];
      if (dots.every((d) => Math.hypot(d[0] - p[0], d[1] - p[1]) > 9)) dots.push(p);
    }
    return {
      kind: 'text', numeric: true, pre: { html: `<svg viewBox="0 0 100 60" class="flash">${dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2"/>`).join('')}</svg>`, ms: 900 - level * 150 },
      prompt: '<p class="big-q">Wie viele Punkte waren es?</p>', answer: String(n), time: 10,
    };
  }


  // ---------- Flugkurs: Verfahren wörtlich (GuV «exakt») ----------
  const PROCS = [
    { n: 'MOVE (vor jedem Anrollen)', ref: '5.3.3', l: [['Taxi Area', 'CLEAR'], ['Taxi Light', 'ON'], ['Power', '… SET'], ['Parking Brake', 'RELEASED']] },
    { n: 'BRAKE CHECK', ref: '5.3.3', l: [['Brakes', 'CHECKED']] },
    { n: 'STOP (nach jedem Anhalten)', ref: '5.3.3', l: [['Parking Brake', 'SET'], ['Power', '… SET'], ['Taxi Light', 'OFF']] },
    { n: 'Übergang in den Steigflug (PAT)', ref: '7.2.4', l: [['LOOKOUT', '–'], ['Mixture', 'RICH (OR ACC AFM)'], ['Climb Power', 'SET (REQUIRED) FULL POWER'], ['Climb Attitude', 'ADJUST FOR TYPE OF CLIMB'], ['Trim', 'REDUCE LOAD ON CONTROLS']] },
    { n: 'Level off Cruise aus dem Steigflug (APT)', ref: '7.4.2', l: [['Attitude', 'SET'], ['Power', 'SET'], ['Trim', 'SET'], ['Landing Light', 'AS REQUIRED'], ['CRUISE CHECK', '–']] },
    { n: 'Starting Descent (APT)', ref: '8.2.4', l: [['LOOKOUT', '–'], ['Mixture', 'SET'], ['Attitude', 'FOR DESCENT'], ['Power', 'ADJUST'], ['Trim', 'ADJUST']] },
    { n: 'Level off aus dem Sinkflug (PAT)', ref: '8.4.1', l: [['Power', 'SET'], ['Attitude', 'SET'], ['Trim', 'SET'], ['Mixture', 'SET FOR ALTITUDE'], ['CRUISE CHECK', '–']] },
    { n: 'Klappen aus-/einfahren', ref: '4.4.7', l: [['SPEED', 'WHITE ARC'], ['FLAPS', '… DEGREE/POSITION']] },
    { n: 'Static Take-off', ref: '12.4.1', l: [['THROTTLE', 'T/O POWER'], ['POWER', 'MIN … RPM'], ['BRAKES', 'RELEASED AND FREE']] },
    { n: 'Rolling Take-off', ref: '12.4.1', l: [['BRAKES', 'RELEASED AND FREE'], ['THROTTLE', 'T/O POWER'], ['POWER', 'MIN … RPM']] },
    { n: 'Acceleration Check', ref: '12.4.2', l: [['AIRSPEED', 'RISING']] },
    { n: 'Flaps Retraction', ref: '12.5.2', l: [['CLEAR OF OBSTACLES', 'SPEED CHECKED, FLAPS UP']] },
    { n: 'Übergabe der Steuer (PF → PM)', ref: '3.5', l: [['PF', '«YOU HAVE CONTROLS»'], ['PM', '«I HAVE CONTROLS»']] },
    { n: 'Notfall-Grundverfahren', ref: '11.1.2', l: [['1.', 'FLY'], ['2.', 'NAVIGATE'], ['3.', 'COMMUNICATE'], ['4.', 'EVALUATE'], ['5.', 'EXECUTE'], ['6.', 'DECISION MAKING']] },
  ];
  const ALL_VALUES = [...new Set(PROCS.flatMap((p) => p.l.map((x) => x[1])).filter((v) => v !== '–'))];

  function procTask() {
    const p = pick(PROCS);
    const items = p.l.filter((x) => x[1] !== '–');
    if (p.l.length >= 3 && Math.random() < 0.4) {
      // Reihenfolge: Was kommt nach …?
      const i = rnd(0, p.l.length - 2);
      const ans = `${p.l[i + 1][0]}${p.l[i + 1][1] !== '–' ? ` – ${p.l[i + 1][1]}` : ''}`;
      const others = shuffle(p.l.filter((_, j) => j !== i + 1).map((x) => `${x[0]}${x[1] !== '–' ? ` – ${x[1]}` : ''}`));
      const opts = [...new Set([ans, ...others])].slice(0, 4);
      return { kind: 'mc', prompt: `<p class="tag">GuV ${p.ref}</p><p class="big-q">${p.n}</p><p>Was kommt nach <b>${p.l[i][0]}${p.l[i][1] !== '–' ? ` – ${p.l[i][1]}` : ''}</b>?</p>`, options: opts, answer: ans, time: 20, explain: p.l.map((x) => `${x[0]}${x[1] !== '–' ? ` – ${x[1]}` : ''}`).join(' · ') };
    }
    const [k, v] = pick(items);
    const opts = new Set([v]);
    for (const x of shuffle(items.map((y) => y[1]))) if (opts.size < 4) opts.add(x);
    for (const x of shuffle(ALL_VALUES)) if (opts.size < 4) opts.add(x);
    return { kind: 'mc', prompt: `<p class="tag">GuV ${p.ref}</p><p class="big-q">${p.n}</p><p><b>${k}</b> ……… ?</p>`, options: [...opts], answer: v, time: 15, explain: p.l.map((x) => `${x[0]}${x[1] !== '–' ? ` – ${x[1]}` : ''}`).join(' · ') };
  }

  // ---------- Flugkurs: Checkliste der eigenen Flugschule ----------
  function checklistOf() {
    const all = window.CHECKLISTS || {};
    const key = window.Store?.settings.school;
    return all[key] ? { key, ...all[key] } : { key: Object.keys(all).find((k) => k.startsWith('Bern-Belp')) || Object.keys(all)[0], ...all[Object.keys(all).find((k) => k.startsWith('Bern-Belp')) || Object.keys(all)[0]] };
  }

  function checklistTask(level) {
    const cl = checklistOf();
    const checks = cl.checks.filter((c) => c.items.length >= 2);
    const c = pick(checks);
    const i = rnd(0, c.items.length - 1);
    const [k, v] = c.items[i];
    const head = `<p class="tag">${cl.key}</p><p class="big-q">${c.name}</p>`;
    const full = c.items.map((x, j) => `${j + 1}. ${x[0]} – ${x[1]}`).join('<br>');
    if (level > 1 && i < c.items.length - 1 && Math.random() < 0.5) {
      const nxt = c.items[i + 1][0];
      const opts = new Set([nxt]);
      for (const x of shuffle(c.items.map((y) => y[0]))) if (opts.size < 4 && x !== k) opts.add(x);
      for (const x of shuffle(checks.flatMap((y) => y.items.map((z) => z[0])))) if (opts.size < 4 && x !== k) opts.add(x);
      return { kind: 'mc', html: true, prompt: `${head}<p>Welcher Punkt kommt nach <b>${i + 1}. ${k}</b>?</p>`, options: [...opts], answer: nxt, time: 20, explain: full };
    }
    const opts = new Set([v]);
    for (const x of shuffle(c.items.map((y) => y[1]))) if (opts.size < 4) opts.add(x);
    for (const x of shuffle(checks.flatMap((y) => y.items.map((z) => z[1])))) if (opts.size < 4) opts.add(x);
    return { kind: 'mc', prompt: `${head}<p><b>${i + 1}. ${k}</b> ……… ?</p>`, options: [...opts], answer: v, time: 15, explain: full };
  }

  // ---------- Trainer-Definitionen ----------
  const TRAINERS = [
    { id: 'kopf', name: 'Kopfrechnen', icon: '➗', block: 1, desc: 'Schnell und ohne Notizen – visuell', count: 12,
      make: (l) => { const { q, a } = arithmetic(l); return { kind: 'text', numeric: true, prompt: `<p class="huge">${q} = ?</p>`, answer: fmt(a), time: l === 1 ? 12 : 18 }; } },
    { id: 'kopfhoer', name: 'Kopfrechnen (Hören)', icon: '🔊', block: 1, desc: 'Aufgaben werden vorgelesen', count: 10,
      make: (l) => { const { q, a } = arithmetic(Math.min(l, 2)); const spoken = q.replace('−', 'minus').replace('×', 'mal').replace(':', 'geteilt durch').replace('²', ' im Quadrat').replace('³', ' hoch drei').replace('%', 'Prozent'); return { kind: 'text', numeric: true, speak: `${spoken}`, prompt: '<p class="huge">🔊</p><p class="hint">Hör gut zu – die Aufgabe wird nur einmal vorgelesen.</p>', answer: fmt(a), time: 18, explain: `${q} = ${fmt(a)}` }; } },
    { id: 'englisch', name: 'Englisch', icon: '🇬🇧', block: 1, desc: 'Synonyme, Grammatik, Aviation English', count: 12, make: englishTask },
    { id: 'wuerfel', name: 'Würfel kippen', icon: '🎲', block: 1, desc: 'Räumliches Vorstellungsvermögen', count: 8, make: cubeTask },
    { id: 'figuren', name: 'Figuren drehen', icon: '🔷', block: 1, desc: 'Gedreht oder gespiegelt?', count: 8, make: rotateTask },
    { id: 'merken', name: 'Funksprüche merken', icon: '📻', block: 2, desc: 'Merkfähigkeit mit ATC-Anweisungen', count: 8, make: atcTask },
    { id: 'zahlen', name: 'Zahlenreihen', icon: '🔢', block: 2, desc: 'Kurzzeitgedächtnis', count: 8, make: digitTask },
    { id: 'vergleich', name: 'Vergleichen', icon: '👀', block: 2, desc: 'Konzentration: gleich oder verschieden?', count: 20, make: compareTask },
    { id: 'zaehlen', name: 'Symbole zählen', icon: '🎯', block: 2, desc: 'Konzentration unter Zeitdruck', count: 8, make: countTask },
    { id: 'technik', name: 'Technisches Verständnis', icon: '⚙️', block: 2, desc: 'Mechanik, Physik, Zahnräder', count: 10, make: techTask },
    { id: 'instrumente', name: 'Instrumente lesen', icon: '🧭', block: 3, desc: 'Künstlicher Horizont & Kurse', count: 12, make: (l) => (Math.random() < 0.55 ? attitudeTask() : headingTask(l)) },
    { id: 'blitz', name: 'Blitz-Wahrnehmung', icon: '⚡', block: 3, desc: 'Kurz sehen, richtig zählen', count: 10, make: flashTask },
    { id: 'rechnen', name: 'Rechenaufgaben', icon: '✈️', block: 3, desc: 'Zeit, Distanz, Treibstoff, Einheiten', count: 8,
      make: (l) => { const w = wordProblem(l); return { kind: 'text', numeric: true, prompt: `<p>${w.q}</p>${w.unit ? `<p class="hint">Antwort in ${w.unit}</p>` : ''}`, answer: fmt(w.a), tol: Math.max(0.1, Math.abs(w.a) * 0.02), time: 40 }; } },
    { id: 'multi', name: 'Multitasking', icon: '🕹️', block: 4, desc: 'Psychomotorik + Mehrfachaufgaben', count: 1, custom: true },
    { id: 'verfahren', name: 'Verfahren auswendig', icon: '🗣️', block: 5, desc: 'GuV-Kästen «exakt» wörtlich', count: 12, make: procTask },
    { id: 'checkliste', name: 'Checkliste', icon: '📋', block: 5, desc: 'Checkliste deiner SPHAIR-Flugschule', count: 12, make: checklistTask },
  ];

  window.Trainers = { TRAINERS, get: (id) => TRAINERS.find((t) => t.id === id), shuffle, fmt, checklistOf };
})();
