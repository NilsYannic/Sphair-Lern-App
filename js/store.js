// Speicher: Fortschritt, Streak, Karteikasten und Einstellungen (localStorage)
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
    settings: { name: '', screeningDate: '', theme: 'auto', apiKey: '', model: 'claude-opus-5-5', aiEnabled: true, onboarded: false },
    xp: 0,
    streak: { count: 0, best: 0, last: '' },
    days: {},       // 'YYYY-MM-DD' -> { done: [taskIds], xp }
    lessons: {},    // 'topic:index' -> true
    cards: {},      // 'topic:index' -> { box, due }
    topics: {},     // topicId -> { right, wrong }
    trainers: {},   // trainerId -> { runs, best, last: [scores] }
    sims: [],       // Screening-Simulationen { date, score, parts }
  });

  let data;
  try {
    data = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}'));
    data.settings = Object.assign(defaults().settings, data.settings);
  } catch {
    data = defaults();
  }

  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* Speicher voll oder gesperrt */ }
  };

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

    exportJson() { return JSON.stringify(data, null, 2); },
    importJson(text) {
      const d = JSON.parse(text);
      if (!d || typeof d !== 'object' || !d.settings) throw new Error('Keine gültige Sicherung');
      data = Object.assign(defaults(), d);
      save();
    },
    reset() {
      const keep = { apiKey: data.settings.apiKey, model: data.settings.model };
      data = defaults();
      Object.assign(data.settings, keep, { onboarded: true });
      save();
    },
  };

  window.Store = S;
})();
