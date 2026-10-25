// Baut den Lernplan (js/lernplan.js): das ganze Heft Seite für Seite plus alle Themen-Lektionen,
// aufgeteilt in Sessions von ca. 10 Minuten (ca. 7 Min. lesen + 3 Min. Quiz).
// Aufruf: node tools/build-lernplan.cjs
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
global.window = {};
require(path.join(root, 'js/heft.js'));
require(path.join(root, 'js/content.js'));
require(path.join(root, 'js/kontrollfragen.js'));
const H = window.HEFT;
const C = window.Content;
const K = window.KONTROLLFRAGEN;

const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
const GUV_CH = JSON.parse(app.match(/const GUV_CH = (\[\[.*?\]\]);/)[1].replace(/'/g, '"'));
const PAGES = 566;

const TARGET = 390;   // Sekunden Lesezeit pro Session (+ ca. 3 Min. Quiz = 10 Min.)
const MIN = 240;      // darunter nur an Kapitelgrenzen trennen
const MAX = 540;      // spätestens hier wird getrennt
const WPM = 110;      // Fachtext mit Bildern: eher langsam lesen

const words = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').split(/\s+/).filter(Boolean).length;
const chEnd = (c) => (GUV_CH[c + 1]?.[1] || PAGES + 1) - 1;
const chOfPage = (p) => [...GUV_CH].reverse().find((c) => p >= c[1])[0];

// Wörter pro Seite: Text jedes Abschnitts gleichmässig auf seine Seiten verteilen
const pageWords = new Array(PAGES + 1).fill(0);
const secStart = {}; // Seite -> [Abschnittsnummern]
const secByN = {};
for (const ch of H) {
  ch.s.forEach((s, i) => {
    secByN[s.n] = s;
    (secStart[s.p] ||= []).push(s.n);
    const nx = ch.s[i + 1];
    const last = Math.min(chEnd(ch.c), nx ? Math.max(s.p, nx.p - 1) : chEnd(ch.c));
    const w = words(s.h);
    for (let p = s.p; p <= last; p++) pageWords[p] += w / (last - s.p + 1);
  });
}
const pageSec = (p) => Math.round(15 + (pageWords[p] / WPM) * 60);

// Themen-Lektionen: wann kommen sie dran? (nach dem Kapitel, zu dem sie passen)
const AFTER = { technik: 1, aero: 4, hf: 11, betrieb: 13, navi: 18, meteo: 18, recht: 20, funk: 21 };
const lessonsAfter = {}; // Kapitel -> [ 'topic:i' ]
const start = [];
for (const t of C.TOPICS) {
  t.lessons.forEach((l, i) => {
    const key = `${t.id}:${i}`;
    if (t.id === 'weg' || (t.id === 'flugkurs' && i < 2)) return start.push(key);
    let c = AFTER[t.id];
    if (c == null) {
      const refs = [...(l.t.match(/\(([^)]*)\)/)?.[1] || '').matchAll(/\d+/g)].map(Number);
      const chs = (l.t.match(/\(([^)]*)\)/)?.[1] || '').split(/[–&,]/).map((x) => parseInt(x, 10)).filter((x) => x >= 0 && x <= 21);
      c = chs.length ? Math.max(...chs) : (refs.length ? refs[0] : 21);
    }
    (lessonsAfter[c] ||= []).push(key);
  });
}
const lessonSec = (key) => { const [t, i] = key.split(':'); const l = C.topic(t).lessons[i]; return Math.round(20 + (words(l.b) / WPM) * 60); };

// Lern-Einheiten in Reihenfolge
const units = start.map((k) => ({ k, sec: lessonSec(k), lesson: true }));
for (let p = 1; p <= PAGES; p++) {
  units.push({ k: p, sec: pageSec(p), chStart: GUV_CH.some((c) => c[1] === p), secStart: !!secStart[p] });
  const c = chOfPage(p);
  if (p === chEnd(c)) (lessonsAfter[c] || []).forEach((k, j) => units.push({ k, sec: lessonSec(k), lesson: true, block: j === 0 }));
}

// In Sessions packen
const sessions = [];
let cur = null;
const flush = () => { if (cur && cur.u.length) sessions.push(cur); cur = null; };
for (const u of units) {
  if (cur) {
    const kindSwitch = !!u.lesson !== !!cur.lesson;
    let brk = false;
    if (kindSwitch || u.chStart) brk = true;
    else if (u.block) brk = cur.sec >= 150;
    else if (cur.sec + u.sec > MAX) brk = true;
    else if (cur.sec + u.sec > TARGET && cur.sec >= MIN && (u.lesson || u.secStart)) brk = true;
    if (brk) flush();
  }
  cur ||= { u: [], sec: 0, lesson: !!u.lesson };
  cur.u.push(u.k);
  cur.sec += u.sec;
}
flush();
// Zu kurze Sessions mit der vorherigen gleicher Art (gleiches Kapitel) zusammenlegen
const chOf = (x) => (x.lesson ? 'L' : chOfPage(x.u[0]));
for (let i = sessions.length - 1; i > 0; i--) {
  const a = sessions[i - 1], b = sessions[i];
  if (b.sec < 210 && chOf(a) === chOf(b) && a.sec + b.sec <= 570 && (b.lesson ? sessions.indexOf(a) === i - 1 : true)) {
    a.u.push(...b.u); a.sec += b.sec; sessions.splice(i, 1);
  }
}

// Fragen den Sessions zuordnen
const sessOfPage = {};
const sessOfLesson = {};
sessions.forEach((s, i) => s.u.forEach((k) => (typeof k === 'number' ? (sessOfPage[k] = i) : (sessOfLesson[k] = i))));
const sessOfRef = (ref) => {
  let n = ref;
  while (n && !secByN[n]) n = n.includes('.') ? n.slice(0, n.lastIndexOf('.')) : '';
  if (!n) return null;
  return sessOfPage[secByN[n].p];
};
sessions.forEach((s) => { s.q = []; });
for (const k of K) {
  const ref = (k.src || '').split(/[\s/,]+/)[0];
  let si = ref ? sessOfRef(ref) : null;
  if (si == null) si = sessOfPage[chEnd(k.c)];
  sessions[si].q.push(`kf:${k.id}`);
}
for (const t of C.TOPICS) {
  const lessonSess = [...new Set(t.lessons.map((_, i) => sessOfLesson[`${t.id}:${i}`]))];
  let rr = 0;
  t.questions.forEach((q, qi) => {
    const m = `${q.e || ''} ${q.q}`.match(/GuV\s*(\d{1,2}(?:\.\d{1,2})+)/);
    let si = m ? sessOfRef(m[1]) : null;
    if (si == null) si = lessonSess[rr++ % lessonSess.length];
    sessions[si].q.push(`${t.id}:${qi}`);
  });
}

// Titel und Inhalt
const chParts = {};
sessions.forEach((s) => {
  if (s.lesson) return;
  const c = chOfPage(s.u[0]);
  s.c = c;
  (chParts[c] ||= []).push(s);
});
const nice = (t) => t.toLowerCase().replace(/(^|[\s/(-])([a-zäöü])/g, (m, a, b) => a + b.toUpperCase());
const out = sessions.map((s) => {
  const o = { u: s.u, m: Math.max(3, Math.round(s.sec / 60)), q: s.q };
  if (s.lesson) {
    const topics = [...new Set(s.u.map((k) => k.split(':')[0]))];
    o.t = topics.map((t) => C.topic(t).name).join(' & ');
    o.h = s.u.map((k) => { const [t, i] = k.split(':'); return C.topic(t).lessons[i].t; });
  } else {
    const parts = chParts[s.c];
    o.c = s.c;
    o.t = `${GUV_CH[s.c][2]}${parts.length > 1 ? ` · Teil ${parts.indexOf(s) + 1}/${parts.length}` : ''}`;
    const secs = s.u.flatMap((p) => secStart[p] || []).filter((n) => secByN[n].h.length > 40);
    o.s = secs;
    o.h = secs.filter((n) => n.split('.').length <= 3).map((n) => `${n} ${nice(secByN[n].t)}`).slice(0, 6);
    if (!o.h.length && secs.length) o.h = [`${secs[0]} ${nice(secByN[secs[0]].t)}`];
  }
  return o;
});

const js = `// Lernplan: das ganze Heft Seite für Seite plus alle Themen-Lektionen in Sessions à ca. 10 Minuten.
// Automatisch erzeugt mit «node tools/build-lernplan.cjs» – nicht von Hand ändern.
// u = Einheiten (Zahl = Originalseite, 'thema:i' = Lektion), m = Lesezeit in Min., q = Quizfragen, s = Abschnitte, h = Inhalt
window.LERNPLAN = ${JSON.stringify(out)};
`;
fs.writeFileSync(path.join(root, 'js/lernplan.js'), js);
const tot = out.reduce((a, s) => a + s.m, 0);
console.log(`${out.length} Sessions, ${tot} Min. Lesezeit, Seiten: ${out.flatMap((s) => s.u).filter((k) => typeof k === 'number').length}, Lektionen: ${out.flatMap((s) => s.u).filter((k) => typeof k === 'string').length}`);
console.log('Fragen:', out.reduce((a, s) => a + s.q.length, 0), '· Sessions ohne Fragen:', out.filter((s) => !s.q.length).length);
console.log('Minuten-Verteilung:', JSON.stringify(out.reduce((a, s) => { a[s.m] = (a[s.m] || 0) + 1; return a; }, {})));
console.log(`${(js.length / 1024).toFixed(0)} KB`);
