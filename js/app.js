// Oberfläche: Navigation, Tagesaufgaben, Lernen, Training, Coach, Profil
(() => {
  const S = window.Store;
  const C = window.Content;
  const T = window.Trainers;
  const Coach = window.Coach;
  const $ = (s, r = document) => r.querySelector(s);
  const view = $('#view');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let cleanup = null;     // läuft beim Verlassen einer Ansicht (Timer, Spiele)
  let activeTask = null;  // Tagesaufgabe, die gerade bearbeitet wird

  // ---------- Hilfen ----------
  function toast(msg, ms = 2400) {
    const t = $('#toast');
    t.innerHTML = msg;
    t.classList.add('show');
    clearTimeout(toast.h);
    toast.h = setTimeout(() => t.classList.remove('show'), ms);
  }

  const DESIGNS = [
    { id: 'standard', name: 'Standard', c: ['#2f5bea', '#5b7cff', '#f5f6fa'] },
    { id: 'swiss', name: 'Swiss Rot', c: ['#d52b1e', '#f0544a', '#f7f5f5'] },
    { id: 'cockpit', name: 'Cockpit', c: ['#ffb020', '#0f1726', '#070b14'] },
    { id: 'sunset', name: 'Sonnenuntergang', c: ['#e8590c', '#f5a00f', '#fff8f2'] },
    { id: 'alpen', name: 'Alpen', c: ['#13804f', '#2fb67a', '#f2f7f4'] },
    { id: 'violett', name: 'Nachtflug', c: ['#6d4aff', '#a083ff', '#f6f4ff'] },
  ];

  function applyTheme() {
    const th = S.settings.theme;
    const root = document.documentElement;
    if (th === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', th);
    const d = S.settings.design || 'standard';
    if (d === 'standard') root.removeAttribute('data-design');
    else root.setAttribute('data-design', d);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getComputedStyle(root).getPropertyValue('--accent').trim() || '#2f5bea');
  }

  function updateTop() {
    $('#topStreak').textContent = `🔥 ${S.streakNow()}`;
    $('#topXp').textContent = `⭐ ${S.data.xp}`;
  }

  function md(text) {
    // Minimal-Markdown: **fett**, Listen, Zeilenumbrüche
    const lines = esc(text).split('\n');
    let html = '', inList = false;
    for (const l of lines) {
      const m = l.match(/^\s*(?:[-•*]|\d+\.)\s+(.*)/);
      if (m) { if (!inList) { html += '<ul>'; inList = true; } html += `<li>${m[1]}</li>`; continue; }
      if (inList) { html += '</ul>'; inList = false; }
      html += l.trim() ? `<p>${l}</p>` : '';
    }
    if (inList) html += '</ul>';
    return html.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  }

  const seedOf = (k) => k.split('-').reduce((a, b) => a * 31 + Number(b), 7);

  // ---------- Tagesaufgaben ----------
  function nextLesson() {
    for (const t of C.TOPICS) {
      const i = t.lessons.findIndex((_, j) => !S.data.lessons[`${t.id}:${j}`]);
      if (i >= 0) return { topic: t.id, i };
    }
    return null;
  }

  function weakestTopic() {
    const seen = C.TOPICS.filter((t) => t.lessons.some((_, i) => S.data.lessons[`${t.id}:${i}`]));
    const pool = seen.length ? seen : [C.TOPICS[0]];
    return pool.sort((a, b) => S.mastery(a.id) - S.mastery(b.id))[0];
  }

  function todayPlan() {
    const day = S.today();
    // ältere Tagespläne: Lese-Aufgabe durch die Lernplan-Session ersetzen
    if (day.plan && PLAN[planCur()] && !day.done.includes('lesson') && !day.plan[0].href.startsWith('#session')) day.plan = null;
    if (day.plan) return day.plan;
    const seed = seedOf(S.dayKey());
    const nl = nextLesson();
    const trainers = T.TRAINERS;
    const tr = trainers[seed % trainers.length];
    const wt = weakestTopic();
    const pc = planCur();
    day.plan = [
      PLAN[pc]
        ? { id: 'lesson', icon: '🎯', title: `Session ${pc + 1} (≈ ${sessMin(PLAN[pc])} Min.)`, sub: PLAN[pc].t, href: `#session/${pc + 1}` }
        : nl
        ? { id: 'lesson', icon: '📖', title: 'Lektion lesen', sub: `${C.topic(nl.topic).name}: ${C.topic(nl.topic).lessons[nl.i].t}`, href: `#lektion/${nl.topic}/${nl.i}` }
        : { id: 'lesson', icon: '🔁', title: 'Wiederholen', sub: '10 fällige Karten aus allen Themen', href: '#quiz/all' },
      { id: 'train', icon: tr.icon, title: 'Screening-Training', sub: tr.name, href: `#training/${tr.id}` },
      { id: 'quiz', icon: '✅', title: '5 Quizfragen', sub: wt.name, href: `#quiz/${wt.id}/5` },
    ];
    S.save();
    return day.plan;
  }

  function finishTask(id) {
    if (!id) return;
    const day = S.today();
    if (day.done.includes(id)) return;
    S.markTask(id);
    S.addXp(5);
    const plan = todayPlan();
    if (plan.every((p) => day.done.includes(p.id)) && !day.complete) {
      day.complete = true;
      S.completeDay();
      S.addXp(20);
      celebrate(`🔥 Tagesziel geschafft! Streak: <b>${S.streakNow()}</b> ${S.streakNow() === 1 ? 'Tag' : 'Tage'}`);
    } else toast('✓ Tagesaufgabe erledigt (+5 ⭐)');
    updateTop();
  }

  function celebrate(msg) {
    toast(msg, 3500);
    const box = document.createElement('div');
    box.className = 'confetti';
    box.innerHTML = Array.from({ length: 24 }, (_, i) => `<i style="--x:${Math.random() * 100}vw;--d:${0.6 + Math.random() * 0.9}s;--r:${Math.random() * 360}deg">${['✈️', '⭐', '🔥', '🎉'][i % 4]}</i>`).join('');
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 2200);
  }

  // ---------- Ansicht: Heute ----------
  function renderHeute() {
    const name = S.settings.name;
    const plan = todayPlan();
    const day = S.today();
    const doneN = plan.filter((p) => day.done.includes(p.id)).length;
    const streak = S.streakNow();
    const week = Array.from({ length: 7 }, (_, i) => {
      const k = S.addDays(S.dayKey(), i - 6);
      const d = new Date(`${k}T12:00`);
      return { k, label: d.toLocaleDateString('de-CH', { weekday: 'narrow' }), done: !!S.data.days[k]?.complete, today: i === 6 };
    });
    const sd = S.settings.screeningDate;
    const daysLeft = sd ? Math.ceil((new Date(sd) - new Date(S.dayKey())) / 864e5) : null;
    const allLessons = C.TOPICS.flatMap((t) => t.lessons.map((l) => ({ t, l })));
    const fact = allLessons[seedOf(S.dayKey()) % allLessons.length];
    const w = Coach.weakest();
    const hour = new Date().getHours();
    const hello = hour < 11 ? 'Guten Morgen' : hour < 18 ? 'Hoi' : 'Guten Abend';

    view.innerHTML = `
<section class="hero">
  <p class="muted">${new Date().toLocaleDateString('de-CH', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
  <h1>${hello}${name ? ` ${esc(name)}` : ''}! 👋</h1>
</section>
${S.data.profile?.done ? '' : `
<a class="card review" href="#fragebogen/0"><span class="ticon">📝</span><span class="tt"><b>Richte dein Profil ein</b><small>2 Minuten – dann kennt dich dein Coach viel besser.</small></span><span class="chev">›</span></a>`}

${PLAN.length ? `<a class="card review plan-next" href="#plan"><span class="ticon">🎯</span><span class="tt"><b>Lernplan: ${planDoneN()} von ${PLAN.length} Sessions</b><small>${planCur() < PLAN.length ? `1 Session pro Tag → fertig am ${finishDate(1)}` : 'Alles gelernt! 🎓'}</small><span class="bar"><i style="width:${(planDoneN() / PLAN.length) * 100}%"></i></span></span><span class="chev">›</span></a>` : ''}
<section class="card streak-card">
  <div class="streak-num"><span class="flame ${day.complete ? 'lit' : ''}">🔥</span><div><b>${streak}</b><small>${streak === 1 ? 'Tag' : 'Tage'} Streak</small></div></div>
  <div class="week">${week.map((d) => `<div class="wd ${d.done ? 'done' : ''} ${d.today ? 'today' : ''}"><span>${d.done ? '✓' : ''}</span><small>${d.label}</small></div>`).join('')}</div>
  <p class="muted small">${day.complete ? 'Heute erledigt – stark! Morgen geht\'s weiter.' : 'Schaffe eine Session aus deinem Lernplan (oder alle 3 Tagesaufgaben), damit deine Streak wächst.'} Rekord: ${S.data.streak.best}</p>
</section>

<section class="card">
  <div class="card-head"><h2>Tagesaufgaben</h2><span class="muted">${doneN}/${plan.length}</span></div>
  <div class="bar"><i style="width:${(doneN / plan.length) * 100}%"></i></div>
  <ul class="tasks">
    ${plan.map((p) => `<li><a class="task ${day.done.includes(p.id) ? 'done' : ''}" href="${p.href}" data-task="${p.id}">
      <span class="ticon">${day.done.includes(p.id) ? '✓' : p.icon}</span>
      <span class="tt"><b>${p.title}</b><small>${esc(p.sub)}</small></span><span class="chev">›</span></a></li>`).join('')}
  </ul>
</section>

${daysLeft != null ? `<section class="card countdown"><div><b>${daysLeft > 0 ? daysLeft : 0}</b><small>Tage bis zum Screening</small></div><span>🛫</span></section>` : ''}

<section class="card coach-tip">
  <div class="card-head"><h2>Coach-Tipp</h2></div>
  <p>Dein schwächstes Thema ist <b>${w.topic.name}</b> (${S.mastery(w.topic.id)} %). ${w.trainerAvg < 0 ? `Den Trainer <b>${w.trainer.name}</b> hast du noch nie probiert.` : `Beim Trainer <b>${w.trainer.name}</b> liegst du bei Ø ${w.trainerAvg} %.`}</p>
  <a class="btn ghost" href="#coach">Mit dem Coach reden</a>
</section>

<section class="card">
  <div class="card-head"><h2>Wusstest du?</h2><span class="tag" style="--c:${fact.t.color}">${fact.t.name}</span></div>
  <h3>${fact.l.t}</h3>
  <div class="fact">${fact.l.b}</div>
</section>`;
    view.querySelectorAll('[data-task]').forEach((a) => a.addEventListener('click', () => { activeTask = a.dataset.task; taskPages = 0; }));
  }

  // ---------- Ansicht: Lernen ----------
  function renderLernen() {
    activeTask = null;
    view.innerHTML = `
<section class="hero"><h1>Lernen</h1><p class="muted">Die Theorie für Flugkurs und Airline-Weg. Lies die Lektionen, dann festigt das Quiz dein Wissen.</p></section>
<a class="card review plan-next" href="#plan"><span class="ticon">🎯</span><span class="tt"><b>Dein Lernplan</b><small>Session ${Math.min(planCur() + 1, PLAN.length)} von ${PLAN.length} · ${Math.round((planDoneN() / PLAN.length) * 100)} % geschafft</small><span class="bar"><i style="width:${(planDoneN() / PLAN.length) * 100}%"></i></span></span><span class="chev">›</span></a>
<a class="card review" href="#quiz/all"><span class="ticon">🔁</span><span class="tt"><b>Fällige Karten wiederholen</b><small>${dueAll().length} Fragen sind heute dran</small></span><span class="chev">›</span></a>
<div class="sec-title"><h2>📕 Das Heft – Kapitel für Kapitel</h2><a class="muted small" href="#heft">Suchen ›</a></div>
<p class="muted small sec-sub">Jedes Kapitel ist ein eigener Lernabschnitt mit den Originalseiten aus «Grundlagen und Verfahren».</p>
<ul class="chapters">${GUV_CH.map((c) => { const pr = chapterProgress(c[0]); const r = chRange(c[0]); return `<li><a class="card chap" href="#heft/${c[0]}">
  <span class="cnum ${pr >= 100 ? 'done' : ''}">${pr >= 100 ? '✓' : c[0]}</span><span class="tt"><b>${esc(c[2])}</b><small>${r[1] - r[0] + 1} Originalseiten${chNeed(c[0]) ? ' · <span class="need-tag">Need to know</span>' : ''}</small><span class="bar"><i style="width:${pr}%"></i></span></span><span class="chev">›</span></a></li>`; }).join('')}</ul>
<div class="sec-title"><h2>🧰 Mehr zum Lernen</h2></div>
<a class="card review" href="#kf"><span class="ticon">🗂️</span><span class="tt"><b>Kontrollfragen aus dem Heft</b><small>${(window.KONTROLLFRAGEN || []).length} Lernkarten mit Lösungen</small></span><span class="chev">›</span></a>
<a class="card review" href="#checkliste"><span class="ticon">📋</span><span class="tt"><b>Checkliste deiner Flugschule</b><small>${esc(T.checklistOf().key)} – offizielle SPHAIR-Checkliste</small></span><span class="chev">›</span></a>
<div class="sec-title"><h2>💡 Themen-Wissen</h2></div>
<div class="grid">
  ${C.TOPICS.map((t) => { const m = S.mastery(t.id); return `<a class="card topic" href="#thema/${t.id}" style="--c:${t.color}">
    <span class="ticon tint">${t.icon}</span><b>${t.name}</b><small class="muted">${t.desc}</small>
    <div class="bar"><i style="width:${m}%"></i></div><small class="muted">${m} % gemeistert</small></a>`; }).join('')}
</div>`;
  }

  function dueAll() {
    return C.TOPICS.flatMap((t) => t.questions.map((_, i) => ({ t, i })).filter(({ i }) => S.data.cards[`${t.id}:${i}`] && S.isDue(t.id, i)));
  }

  function renderThema(id) {
    const t = C.topic(id);
    if (!t) return go('#lernen');
    const due = t.questions.filter((_, i) => S.isDue(t.id, i)).length;
    view.innerHTML = `
<a class="back" href="#lernen">‹ Lernen</a>
<section class="hero"><span class="ticon tint big" style="--c:${t.color}">${t.icon}</span><h1>${t.name}</h1><p class="muted">${t.desc}</p></section>
<section class="card">
  <div class="card-head"><h2>Lektionen</h2><span class="muted">${t.lessons.filter((_, i) => S.data.lessons[`${t.id}:${i}`]).length}/${t.lessons.length}</span></div>
  <ul class="tasks">${t.lessons.map((l, i) => { const r = S.data.lessons[`${t.id}:${i}`]; return `<li><a class="task ${r ? 'done' : ''}" href="#lektion/${t.id}/${i}"><span class="ticon">${r ? '✓' : i + 1}</span><span class="tt"><b>${l.t}</b></span><span class="chev">›</span></a></li>`; }).join('')}</ul>
</section>
${(TOPIC_CH[t.id] || []).length ? `<section class="card">
  <div class="card-head"><h2>📄 Dazu im Original-Heft</h2></div>
  <ul class="tasks">${TOPIC_CH[t.id].map((c) => `<li><a class="task" href="#heft/${c}"><span class="snum">${c}</span><span class="tt"><b>${esc(GUV_CH[c][2])}</b><small>${chapterProgress(c)} % gelesen</small></span><span class="chev">›</span></a></li>`).join('')}</ul>
</section>` : ''}
<section class="card">
  <div class="card-head"><h2>Quiz</h2><span class="muted">${t.questions.length} Fragen · ${due} fällig</span></div>
  <p class="muted small">Richtig beantwortete Fragen kommen später wieder (Karteikasten). Falsche gleich morgen.</p>
  <div class="row"><a class="btn" href="#quiz/${t.id}/10">Quiz starten</a><a class="btn ghost" href="#quiz/${t.id}/all">Alle Fragen</a></div>
</section>`;
  }

  function renderLektion(id, i) {
    const t = C.topic(id);
    i = Number(i);
    const l = t?.lessons[i];
    if (!l) return go('#lernen');
    const read = S.data.lessons[`${id}:${i}`];
    view.innerHTML = `
<a class="back" href="#thema/${id}">‹ ${t.name}</a>
<article class="card lesson" style="--c:${t.color}">
  <p class="muted small">Lektion ${i + 1} von ${t.lessons.length}</p>
  <h1>${l.t}</h1>
  <div class="lesson-body">${l.b}</div>
  <div id="lessonOrig"></div>
</article>
<div class="row sticky-actions">
  ${i > 0 ? `<a class="btn ghost" href="#lektion/${id}/${i - 1}">‹ Zurück</a>` : ''}
  <button class="btn" id="readBtn">${read ? 'Weiter ›' : 'Verstanden ✓'}</button>
</div>
<button class="link-btn" id="askCoach">💬 Frag den Coach zu dieser Lektion</button>`;
    $('#readBtn').addEventListener('click', () => {
      if (!S.data.lessons[`${id}:${i}`]) { S.lessonRead(id, i); S.addXp(10); toast('+10 ⭐ Lektion gelesen'); }
      if (activeTask === 'lesson') { finishTask('lesson'); activeTask = null; }
      updateTop();
      go(i + 1 < t.lessons.length ? `#lektion/${id}/${i + 1}` : `#quiz/${id}/5`);
    });
    $('#askCoach').addEventListener('click', () => { coachPrefill = `Erklär mir «${l.t}» (${t.name}) nochmal ganz einfach, mit einem Beispiel.`; go('#coach'); });
    const box = $('#lessonOrig');
    loadHeft().then((H) => { if (box.isConnected) box.innerHTML = lessonOriginals(H, t, l); }).catch(() => {});
  }

  // ---------- Quiz ----------
  function renderQuiz(id, n) {
    let pool;
    if (id === 'all') {
      pool = dueAll();
      if (!pool.length) pool = C.TOPICS.flatMap((t) => t.questions.map((_, i) => ({ t, i })));
      pool = T.shuffle(pool).slice(0, 10);
    } else {
      const t = C.topic(id);
      if (!t) return go('#lernen');
      const all = t.questions.map((_, i) => ({ t, i }));
      const due = T.shuffle(all.filter(({ i }) => S.isDue(t.id, i)));
      const rest = T.shuffle(all.filter(({ i }) => !S.isDue(t.id, i)));
      pool = [...due, ...rest].slice(0, n === 'all' ? all.length : Number(n) || 10);
    }
    const items = pool.map(({ t, i }) => {
      const q = t.questions[i];
      return { kind: 'mc', prompt: `<p class="tag" style="--c:${t.color}">${t.name}</p><p class="big-q">${q.q}</p>`, options: q.a, answer: q.a[q.c], explain: q.e, ref: { topic: t.id, i, name: q.q } };
    });
    const task = activeTask;
    runSession({
      title: id === 'all' ? 'Wiederholung' : C.topic(id).name,
      back: id === 'all' ? '#lernen' : `#thema/${id}`,
      items: (k) => items[k], count: items.length, untimed: true,
      onAnswer: (item, ok) => { S.answer(item.ref.topic, item.ref.i, ok); if (ok) S.addXp(2); updateTop(); },
      onFinish: (score) => { if (task === 'quiz' || (task === 'lesson' && id === 'all')) finishTask(task); activeTask = null; return score; },
    });
  }

  // ---------- Generischer Aufgaben-Ablauf ----------
  function runSession({ title, back, items, count, untimed, exam, onAnswer, onFinish, embedded }) {
    const root = embedded || view;
    let k = 0, right = 0, timer = null, preTimer = null, advTimer = null, startedAt = 0, dead = false;
    const times = [];
    const wrongs = [];
    const stop = () => { clearInterval(timer); clearTimeout(preTimer); clearTimeout(advTimer); if (window.speechSynthesis) speechSynthesis.cancel(); };
    cleanup = () => { dead = true; stop(); };

    const shell = (inner) => {
      root.innerHTML = `
${embedded ? '' : `<a class="back" href="${back}">‹ Abbrechen</a>`}
<div class="sess-head"><b>${title}</b><span class="muted">${Math.min(k + 1, count)}/${count}</span></div>
<div class="bar thin"><i style="width:${(k / count) * 100}%"></i></div>
<div class="card q-card">${inner}</div>`;
    };

    function next() {
      if (dead) return;
      stop();
      if (k >= count) return finish();
      const item = items(k);
      if (item.pre) {
        shell(`<div class="pre">${item.pre.html}</div><div class="bar timer"><i id="preBar"></i></div>`);
        requestAnimationFrame(() => { const b = $('#preBar', root); b.style.transition = `width ${item.pre.ms}ms linear`; b.style.width = '100%'; });
        preTimer = setTimeout(() => { if (!dead) ask(item); }, item.pre.ms);
      } else ask(item);
    }

    function ask(item) {
      const opts = item.kind === 'mc' ? (item.noShuffle ? item.options : T.shuffle(item.options)) : [];
      shell(`
<div class="prompt">${item.prompt}</div>
${item.kind === 'mc'
    ? `<div class="opts ${item.options.length === 2 ? 'two' : ''} ${opts.some((o) => o.startsWith('<svg')) ? 'shapes' : ''}">${opts.map((o, i) => `<button class="opt" data-i="${i}"><kbd>${i + 1}</kbd><span>${o.startsWith('<svg') ? o : esc(o)}</span></button>`).join('')}</div>`
    : `<form class="num-form"><input id="ans" ${item.numeric ? 'inputmode="decimal"' : ''} autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Antwort"><button class="btn">OK</button></form>`}
${!untimed && item.time ? '<div class="bar timer"><i id="tBar"></i></div>' : ''}
<div id="fb"></div>`);
      let answered = false;
      const decide = (val) => {
        if (answered) return;
        answered = true;
        stop();
        const t = (performance.now() - startedAt) / 1000;
        times.push(t);
        const norm = (s) => String(s).trim().replace(/[\s']/g, '').replace(',', '.').toLowerCase();
        const num = (x) => Number(norm(x));
        const ok = val != null && (norm(val) === norm(item.answer)
          || (item.tol != null && Number.isFinite(num(val)) && Math.abs(num(val) - num(item.answer)) <= item.tol));
        if (ok) right++; else wrongs.push(item);
        onAnswer?.(item, ok);
        root.querySelectorAll('.opt').forEach((b) => {
          const o = opts[b.dataset.i];
          if (o === item.answer) b.classList.add('right');
          else if (o === val) b.classList.add('wrong');
          b.disabled = true;
        });
        const input = $('#ans', root);
        if (input) { input.disabled = true; input.classList.add(ok ? 'right' : 'wrong'); }
        k++;
        if (exam) { advTimer = setTimeout(next, 250); return; }
        const fb = $('#fb', root);
        if (ok) {
          fb.innerHTML = `<p class="fb good">✓ Richtig!${item.explain && untimed ? ` <span class="muted">${item.explain}</span>` : ''}</p>`;
          if (untimed && item.explain) { fb.insertAdjacentHTML('beforeend', '<button class="btn" id="nextBtn">Weiter</button>'); $('#nextBtn', root).focus(); $('#nextBtn', root).onclick = next; } else advTimer = setTimeout(next, 650);
        } else {
          fb.innerHTML = `<p class="fb bad">${val == null ? '⏱ Zeit abgelaufen.' : '✗ Leider falsch.'} Richtig: <b>${item.answer.startsWith?.('<svg') ? 'siehe grün markiert' : esc(item.answer)}</b></p>${item.explain ? `<p class="muted small">${item.explain}</p>` : ''}<button class="btn" id="nextBtn">Weiter</button>`;
          $('#nextBtn', root).focus();
          $('#nextBtn', root).onclick = next;
        }
      };
      root.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => decide(opts[b.dataset.i])));
      const form = $('.num-form', root);
      if (form) {
        form.addEventListener('submit', (e) => { e.preventDefault(); const v = $('#ans', root).value; if (v.trim()) decide(v); });
        setTimeout(() => $('#ans', root)?.focus(), 30);
      }
      const startTimer = () => {
        startedAt = performance.now();
        if (untimed || !item.time) return;
        const bar = $('#tBar', root);
        if (bar) { bar.style.transition = `width ${item.time}s linear`; requestAnimationFrame(() => { bar.style.width = '100%'; }); }
        timer = setInterval(() => { if ((performance.now() - startedAt) / 1000 >= item.time) decide(null); }, 200);
      };
      if (item.speak && window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance(item.speak);
        u.lang = 'de-DE';
        u.rate = 0.95;
        u.onend = startTimer;
        u.onerror = startTimer;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
        startedAt = performance.now();
      } else {
        if (item.speak) $('.prompt', root).insertAdjacentHTML('beforeend', `<p class="big-q">${esc(item.explain?.split(' =')[0] || '')}</p><p class="hint">(Sprachausgabe nicht verfügbar)</p>`);
        startTimer();
      }
      // Tastatur: Zahlen 1–4 für Antworten
      root.onkeydown = (e) => {
        if (!answered && item.kind === 'mc' && /^[1-9]$/.test(e.key) && document.activeElement?.tagName !== 'INPUT') {
          const b = root.querySelector(`.opt[data-i="${Number(e.key) - 1}"]`);
          if (b) b.click();
        }
      };
    }

    function finish() {
      stop();
      root.onkeydown = null;
      const score = Math.round((right / count) * 100);
      const avgT = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;
      const result = onFinish ? onFinish(score, avgT) : score;
      if (embedded) return;
      view.innerHTML = `
<section class="card result">
  <div class="ring" style="--p:${score}"><span>${score}%</span></div>
  <h1>${score >= 85 ? 'Hervorragend! 🚀' : score >= 65 ? 'Gut gemacht! 👍' : score >= 40 ? 'Dranbleiben! 💪' : 'Übung macht den Pilot! ✈️'}</h1>
  <p class="muted">${right} von ${count} richtig${!untimed ? ` · Ø ${avgT.toFixed(1)} s pro Aufgabe` : ''}</p>
  ${typeof result === 'string' ? `<p>${result}</p>` : ''}
  ${wrongs.length && untimed ? `<details class="wrongs"><summary>Fehler ansehen (${wrongs.length})</summary>${wrongs.map((w) => `<div class="wr"><b>${w.ref?.name || ''}</b><p>✓ ${esc(w.answer)}</p><p class="muted small">${w.explain || ''}</p></div>`).join('')}</details>` : ''}
  <div class="row"><a class="btn ghost" href="${back}">Fertig</a><button class="btn" id="again">Nochmal</button></div>
</section>`;
      $('#again').addEventListener('click', () => route(true));
    }

    next();
  }

  // ---------- Das Heft: Grundlagen & Verfahren (GuV) ----------
  const GUV_PDF = 'https://storagesphairprod.blob.core.windows.net/strapimedia-abn/assets/2026_GUV_d_401edd35e6.pdf';
  // Kapitel aus der offiziellen «Need to know»-Liste (werden am 1. Kurstag geprüft)
  const NEED = ['1.2.2', '1.2.3', '2.9.1', '2.9.2', '2.9.3', '2.9.4', '2.9.5', '2.9.6', '2.9.7', '2.9.8', '3.1.3', '3.1.4', '3.1.5', '3.3.1', '3.5', '3.6.1', '3.9', '3.11', '4.1.1', '4.1.2', '4.1.3', '4.1.4', '4.1.8', '4.2.3', '4.4.3', '4.4.5', '4.4.7', '4.6.2', '4.6.3', '4.6.4', '4.13', '5.2.1', '5.2.2', '5.3.3', '6.2', '7.2.3', '7.2.4', '7.4.2', '7.4.3', '8.2.4', '8.3.3', '8.4.1', '9.1.4', '9.2.1', '9.2.2', '9.2.3', '9.4', '12.4', '12.5.2', '12.5.3', '12.5.4', '12.9.1', '13.1', '13.5.4', '13.7.1', '13.7.4'];
  const isNeed = (n) => NEED.some((x) => n === x || n.startsWith(`${x}.`));
  let heftPromise;
  function loadHeft() {
    if (window.HEFT) return Promise.resolve(window.HEFT);
    return (heftPromise ||= new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'js/heft.js';
      s.onload = () => res(window.HEFT);
      s.onerror = () => { heftPromise = null; rej(new Error('Heft konnte nicht geladen werden')); };
      document.head.appendChild(s);
    }));
  }
  const plain = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ');
  const normTxt = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const sectionKey = (s) => s.n;
  const readable = (c) => c.s.filter((s) => s.h.length > 40);

  async function renderHeft(c, i) {
    view.innerHTML = '<p class="muted" style="padding:40px 0;text-align:center">Heft wird geladen…</p>';
    let H;
    try { H = await loadHeft(); } catch (e) { view.innerHTML = `<section class="card"><p>${esc(e.message)}. Bist du online?</p></section>`; return; }
    if (c == null) return renderHeftIndex(H);
    const ch = H.find((x) => String(x.c) === String(c));
    if (!ch) return go('#heft');
    if (i == null) return renderHeftChapter(ch);
    return renderHeftSection(H, ch, Number(i));
  }

  function heftProgress(ch) {
    const r = readable(ch);
    return r.length ? Math.round((r.filter((s) => S.data.heft[sectionKey(s)]).length / r.length) * 100) : 0;
  }

  function renderHeftIndex(H) {
    const total = H.reduce((a, c) => a + readable(c).length, 0);
    const done = H.reduce((a, c) => a + readable(c).filter((s) => S.data.heft[sectionKey(s)]).length, 0);
    view.innerHTML = `
<a class="back" href="#lernen">‹ Lernen</a>
<section class="hero"><h1>Das Heft</h1><p class="muted">«Grundlagen und Verfahren» 2026 – das offizielle SPHAIR-Lehrbuch für den Flugkurs, komplett. <span class="need-tag">Need to know</span> = wird am 1. Kurstag geprüft.</p></section>
<a class="card review heft-card" href="#seite"><span class="ticon">📄</span><span class="tt"><b>Originalseiten blättern</b><small>Alle 566 Seiten genau wie im gedruckten Heft – mit Bildern</small></span><span class="chev">›</span></a>
<section class="card">
  <div class="card-head"><h2>Dein Fortschritt</h2><span class="muted">${done}/${total} Abschnitte</span></div>
  <div class="bar"><i style="width:${total ? (done / total) * 100 : 0}%"></i></div>
  <form class="search" id="hSearch"><input id="hq" type="search" placeholder="Im Heft suchen, z.B. «Vergaser» oder «Platzrunde»" autocomplete="off"></form>
  <div id="hRes"></div>
</section>
<ul class="chapters">${H.map((c) => { const p = heftProgress(c); const need = c.s.some((s) => isNeed(s.n)); return `<li><a class="card chap" href="#heft/${c.c}">
  <span class="cnum">${c.c}</span><span class="tt"><b>${esc(c.t)}</b><small>${esc(c.en)}${need ? ' · <span class="need-tag">Need to know</span>' : ''}</small><span class="bar"><i style="width:${p}%"></i></span></span><span class="chev">›</span></a></li>`; }).join('')}</ul>
<p class="note">© 2026 Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe. Text aus dem PDF übernommen; Bilder und Zeichnungen findest du unter «Originalseiten blättern». <a href="${GUV_PDF}" target="_blank" rel="noopener">Original-PDF öffnen</a></p>`;
    const res = $('#hRes');
    const search = () => {
      const q = normTxt($('#hq').value.trim());
      if (q.length < 3) { res.innerHTML = ''; return; }
      const hits = [];
      for (const c of H) c.s.forEach((s, i) => {
        if (s.h.length <= 40) return;
        const txt = plain(s.h); const t = normTxt(`${s.t} ${txt}`);
        const at = t.indexOf(q);
        if (at >= 0) hits.push({ c, s, i, snip: txt.slice(Math.max(0, at - s.t.length - 60), at - s.t.length + 90) });
      });
      res.innerHTML = hits.length ? `<p class="muted small">${hits.length} Treffer</p><ul class="hits">${hits.slice(0, 40).map((h) => `<li><a href="#heft/${h.c.c}/${h.i}"><b>${h.s.n} ${esc(h.s.t)}</b><small>…${esc(h.snip)}…</small></a></li>`).join('')}</ul>` : '<p class="muted small">Nichts gefunden.</p>';
    };
    let t;
    $('#hq').addEventListener('input', () => { clearTimeout(t); t = setTimeout(search, 200); });
    $('#hSearch').addEventListener('submit', (e) => { e.preventDefault(); search(); });
  }

  function renderHeftChapter(ch) {
    const [a, z] = chRange(ch.c);
    const n = z - a + 1;
    const seen = pagesSeen(ch.c);
    const next = Array.from({ length: n }, (_, k) => a + k).find((p) => !S.data.heft[`p${p}`]);
    const resume = next ? next - a + 1 : 1;
    const kf = (window.KONTROLLFRAGEN || []).filter((k) => k.c === ch.c).length;
    const nextCh = GUV_CH[ch.c + 1];
    view.innerHTML = `
<a class="back" href="#lernen">‹ Lernen</a>
<section class="hero"><p class="muted">Kapitel ${ch.c} · ${esc(ch.en)}</p><h1>${esc(ch.t)}</h1></section>
<section class="card orig-card">
  <div class="card-head"><h2>📄 Originalseiten</h2><span class="muted">${seen}/${n} Seiten</span></div>
  <div class="bar"><i style="width:${(seen / n) * 100}%"></i></div>
  <a class="orig-thumb" href="#kapitel/${ch.c}/${resume}" aria-label="Seite ${resume} öffnen">${origImg(a + resume - 1)}</a>
  <a class="btn wide" href="#kapitel/${ch.c}/${resume}">${seen === 0 ? 'Kapitel starten ›' : seen >= n ? 'Nochmals blättern ›' : `Weiterlesen ab Seite ${resume} ›`}</a>
  <p class="muted small">Seiten ${a}–${z} im Heft · blättern mit Tippen links/rechts oder Wischen.</p>
</section>
${kf ? `<a class="card review" href="#kf/${ch.c}"><span class="ticon">🗂️</span><span class="tt"><b>Kontrollfragen zu Kapitel ${ch.c}</b><small>${kf} Lernkarten mit Lösungen</small></span><span class="chev">›</span></a>` : ''}
<section class="card">
  <div class="card-head"><h2>📝 Abschnitte</h2><span class="muted">${heftProgress(ch)} % gelesen</span></div>
  <p class="muted small">Jeder Abschnitt mit Originalseite und Text zum Nachlesen.</p>
  <ul class="tasks sec-list">${ch.s.map((s, i) => {
    const depth = s.n.split('.').length;
    if (s.h.length <= 40) return `<li class="sec-head d${depth}">${s.n} ${esc(s.t)}</li>`;
    const r = S.data.heft[sectionKey(s)];
    return `<li><a class="task ${r ? 'done' : ''} d${depth}" href="#heft/${ch.c}/${i}"><span class="snum">${r ? '✓' : s.n}</span><span class="tt"><b>${esc(s.t)}</b>${isNeed(s.n) ? '<small><span class="need-tag">Need to know</span></small>' : ''}</span><span class="chev">›</span></a></li>`;
  }).join('')}</ul>
</section>
${nextCh ? `<a class="card review" href="#heft/${nextCh[0]}"><span class="cnum">${nextCh[0]}</span><span class="tt"><small>Nächstes Kapitel</small><b>${esc(nextCh[2])}</b></span><span class="chev">›</span></a>` : ''}`;
  }

  // Originalseiten eines Kapitels: #kapitel/<kapitel>/<seite im kapitel>
  function renderKapitel(c, k) {
    const ch = GUV_CH[Number(c)];
    if (!ch) return go('#lernen');
    const [a, z] = chRange(ch[0]);
    const n = z - a + 1;
    const i = Math.min(n, Math.max(1, Number(k) || 1));
    const p = a + i - 1;
    const first = !S.data.heft[`p${p}`];
    if (first) { S.data.heft[`p${p}`] = true; S.save(); }
    if (activeTask === 'lesson') { taskPages++; if (taskPages >= 5) { finishTask('lesson'); activeTask = null; } }
    const done = pagesSeen(ch[0]) >= n;
    if (first && done) { S.addXp(25); celebrate(`📕 Kapitel ${ch[0]} komplett gelesen! +25 ⭐`); }
    const nextCh = GUV_CH[ch[0] + 1];
    const kf = (window.KONTROLLFRAGEN || []).some((x) => x.c === ch[0]);
    pageViewer({
      back: `#heft/${ch[0]}`, backLabel: `Kapitel ${ch[0]}`, title: ch[2],
      pg: guvPage(p), i, n, hrefOf: (x) => `#kapitel/${ch[0]}/${x}`,
      preload: [guvPage(Math.min(z, p + 1)).f, guvPage(Math.min(z, p + 2)).f],
      extra: i === n ? `<div class="pv-end"><b>Geschafft 🎉</b>${kf ? `<a class="btn small" href="#kf/${ch[0]}">🗂️ Kontrollfragen</a>` : ''}${nextCh ? `<a class="btn ghost small" href="#heft/${nextCh[0]}">Kap. ${nextCh[0]} ›</a>` : ''}</div>` : '',
      note: `Seite ${p} im Heft · © 2026 Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe.`,
    });
  }

  function renderHeftSection(H, ch, i) {
    const s = ch.s[i];
    if (!s) return go(`#heft/${ch.c}`);
    // nächster / vorheriger lesbarer Abschnitt (auch über Kapitelgrenzen)
    const flat = H.flatMap((c) => c.s.map((x, j) => ({ c, x, j })).filter((o) => o.x.h.length > 40));
    const pos = flat.findIndex((o) => o.c === ch && o.j === i);
    const prev = flat[pos - 1], next = flat[pos + 1];
    const parents = ch.s.filter((x, j) => j < i && x.h.length <= 40 && s.n.startsWith(`${x.n}.`)).map((x) => x.t);
    view.innerHTML = `
<a class="back" href="#heft/${ch.c}">‹ Kapitel ${ch.c}: ${esc(ch.t)}</a>
<article class="card lesson heft-sec">
  <p class="muted small">${parents.length ? esc(parents.join(' › ')) : `Kapitel ${ch.c}`}</p>
  <h1><span class="snum-h">${s.n}</span> ${esc(s.t)}</h1>
  ${isNeed(s.n) ? '<p><span class="need-tag">Need to know</span> <span class="muted small">Dieser Abschnitt wird am 1. Kurstag geprüft.</span></p>' : ''}
  <div class="seg" role="tablist"><button role="tab" data-v="orig" aria-selected="${hView() === 'orig'}">📄 Originalseite</button><button role="tab" data-v="text" aria-selected="${hView() === 'text'}">📝 Text</button></div>
  <div class="orig-pages" ${hView() === 'orig' ? '' : 'hidden'}>${secPages(ch, i).map((pg) => `<a class="orig-thumb" href="#seite/${pg}" aria-label="Seite ${pg} gross ansehen">${origImg(pg)}</a>`).join('')}<p class="muted small">Tippe auf eine Seite, um sie gross zu sehen.</p></div>
  <div class="lesson-body" ${hView() === 'text' ? '' : 'hidden'}>${s.h}</div>
</article>
<div class="row sticky-actions">
  ${prev ? `<a class="btn ghost" href="#heft/${prev.c.c}/${prev.j}">‹ Zurück</a>` : ''}
  <button class="btn" id="hNext">${next ? 'Gelesen, weiter ›' : 'Gelesen ✓'}</button>
</div>
<button class="link-btn" id="askCoach">💬 Frag den Coach zu diesem Abschnitt</button>`;
    view.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => {
      S.settings.heftView = b.dataset.v; S.save();
      view.querySelectorAll('.seg button').forEach((x) => x.setAttribute('aria-selected', x === b));
      $('.orig-pages').hidden = b.dataset.v !== 'orig';
      $('.heft-sec .lesson-body').hidden = b.dataset.v !== 'text';
    }));
    $('#hNext').addEventListener('click', () => {
      if (!S.data.heft[sectionKey(s)]) { S.data.heft[sectionKey(s)] = true; secPages(ch, i).forEach((pg) => { S.data.heft[`p${pg}`] = true; }); S.addXp(3); S.save(); updateTop(); }
      if (activeTask === 'lesson') { finishTask('lesson'); activeTask = null; }
      go(next ? `#heft/${next.c.c}/${next.j}` : '#heft');
    });
    $('#askCoach').addEventListener('click', () => { coachPrefill = `Erklär mir den Abschnitt ${s.n} «${s.t}» aus Grundlagen & Verfahren ganz einfach, mit einem Beispiel.`; go('#coach'); });
  }

  // ---------- Originalseiten (Heft und Flugschul-Unterlagen) ----------
  const GUV_PAGES = 566;
  const GUV_CH = [[0, 1, 'Einführung'], [1, 21, 'Vertraut werden mit dem Flugzeug'], [2, 43, 'Vorbereitung und Abschluss eines Fluges'], [3, 75, 'Angewöhnungsflug'], [4, 97, 'Wirkung der Steuer'], [5, 133, 'Rollen'], [6, 159, 'Horizontaler Geradeausflug'], [7, 173, 'Steigen'], [8, 191, 'Absinken'], [9, 211, 'Kurven'], [10, 225, 'Langsamflug und Strömungsabriss'], [11, 253, 'Abnormale Situationen'], [12, 277, 'Start und Steigflug bis zum Gegenanflug'], [13, 309, 'Platzverkehr, Anflug, Landung'], [14, 361, 'Erster Alleinflug'], [15, 373, 'Kurven mit erhöhten Anforderungen'], [16, 383, 'Notlandung ohne Triebwerkleistung'], [17, 405, 'Vorsorgliche Landung'], [18, 415, 'Navigation'], [19, 495, 'Einführung in den Instrumentenflug'], [20, 517, 'Luftraum'], [21, 535, 'Kommunikation']];
  const guvPage = (p) => ({ f: `guv/s${String(Math.ceil(p / 2)).padStart(3, '0')}.webp`, y: p % 2 ? 0 : 1287, h: 1287, w: 910, H: 2574 });
  const chapterOfPage = (p) => [...GUV_CH].reverse().find((c) => p >= c[1]);
  let pvZoom = false;
  let taskPages = 0;
  // Seitenbereich eines Kapitels [erste, letzte]
  const chRange = (c) => [GUV_CH[c][1], (GUV_CH[c + 1]?.[1] || GUV_PAGES + 1) - 1];
  const pagesSeen = (c) => { const [a, z] = chRange(c); let n = 0; for (let p = a; p <= z; p++) if (S.data.heft[`p${p}`]) n++; return n; };
  const chNeed = (c) => NEED.some((x) => x.split('.')[0] === String(c));
  function chapterProgress(c) {
    const [a, z] = chRange(c);
    const pages = pagesSeen(c) / (z - a + 1);
    const ch = window.HEFT?.[c];
    const text = ch ? readable(ch).filter((s) => S.data.heft[sectionKey(s)]).length / Math.max(1, readable(ch).length) : 0;
    return Math.round(Math.max(pages, text) * 100);
  }
  // Originalseite als Bild (halbe Doppelbild-Datei)
  const origImg = (p) => { const g = guvPage(p); return `<span class="orig-page"><img src="${g.f}" alt="Originalseite ${p}" loading="lazy" style="top:${g.y ? -100 : 0}%"></span>`; };
  const hView = () => S.settings.heftView || 'orig';
  // Seiten, die zu einem Abschnitt gehören (bis zum nächsten Abschnitt, max. 4)
  function secPages(ch, i) {
    const s = ch.s[i];
    const nx = ch.s[i + 1] || window.HEFT?.[ch.c + 1]?.s[0];
    const last = Math.min(chRange(ch.c)[1], nx ? Math.max(s.p, nx.p - 1) : chRange(ch.c)[1], s.p + 3);
    const out = [];
    for (let p = s.p; p <= last; p++) out.push(p);
    return out;
  }
  // Themen → passende Kapitel im Heft
  const TOPIC_CH = { flugkurs: [1, 2, 3, 4, 5, 6, 7, 8, 9], guv2: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], aero: [4, 10], technik: [1, 2], navi: [18], recht: [20], funk: [21], betrieb: [2, 12, 13], hf: [11, 19] };
  const STOP = new Set(['und', 'oder', 'der', 'die', 'das', 'mit', 'beim', 'eine', 'einer', 'nach', 'über', 'ueber', 'deine', 'dein', 'was', 'wie', 'für', 'vom', 'zum', 'zur', 'den', 'des', 'ins', 'auf', 'aus']);
  function lessonOriginals(H, t, l) {
    const bodyTxt = plain(`${l.t} ${l.b}`);
    const all = H.flatMap((c) => c.s.map((x, j) => ({ c, x, j })));
    let hits = [];
    // 1) ausdrückliche Verweise wie «(4.1.3)» oder «GuV 9.2.1»
    for (const m of bodyTxt.matchAll(/(?:GuV\s*|\()(\d{1,2}(?:\.\d{1,2}){1,3})/g)) {
      const h = all.find((o) => o.x.n === m[1]);
      if (h && !hits.includes(h)) hits.push(h);
    }
    // 2) Kapitel-Verweise im Titel wie «(10)»
    const chs = [...l.t.matchAll(/\((\d{1,2})\)/g)].map((m) => Number(m[1])).filter((c) => GUV_CH[c]);
    // 3) sonst passende Abschnittstitel in den Kapiteln des Themas
    if (!hits.length && !chs.length && TOPIC_CH[t.id]) {
      const words = normTxt(l.t).split(/[^a-z0-9äöü]+/).filter((w) => w.length >= 5 && !STOP.has(w));
      const scored = all.filter((o) => TOPIC_CH[t.id].includes(o.c.c) && o.x.h.length > 40)
        .map((o) => ({ o, sc: words.filter((w) => normTxt(o.x.t).includes(w.slice(0, Math.max(5, w.length - 2)))).length }))
        .filter((r) => r.sc > 0).sort((a, b) => b.sc - a.sc);
      hits = scored.slice(0, 2).map((r) => r.o);
    }
    hits = hits.slice(0, 3);
    if (!hits.length && !chs.length) return '';
    return `<div class="lesson-orig">
  <h3>📄 Im Original-Heft</h3>
  ${hits.map((h) => `<a class="orig-thumb" href="#heft/${h.c.c}/${h.j}" aria-label="Abschnitt ${h.x.n} öffnen">${origImg(h.x.p)}</a><a class="orig-cap" href="#heft/${h.c.c}/${h.j}">${h.x.n} ${esc(h.x.t)} · Seite ${h.x.p} ›</a>`).join('')}
  ${chs.map((c) => `<a class="card review" href="#heft/${c}"><span class="cnum">${c}</span><span class="tt"><small>Ganzes Kapitel mit Originalseiten</small><b>${esc(GUV_CH[c][2])}</b></span><span class="chev">›</span></a>`).join('')}
</div>`;
  }

  // Zeigt eine Seite bildschirmfüllend: Knöpfe oben, Tippen links/rechts, Wischen, Pfeiltasten
  function pageViewer({ back, backLabel, title, extra, pg, i, n, hrefOf, preload, note }) {
    view.innerHTML = `
<div class="pv-top">
  <a class="back" href="${back}">‹ ${esc(backLabel)}</a>
  <span class="pv-title">${esc(title)}</span>
</div>
${extra || ''}
<div class="pv-nav">
  <a class="btn ghost pv-arrow ${i <= 1 ? 'off' : ''}" href="${i > 1 ? hrefOf(i - 1) : '#'}" aria-label="Vorherige Seite">‹</a>
  <form id="pvGo" class="pv-go"><input id="pvNum" inputmode="numeric" value="${i}" aria-label="Seite"><span class="muted">/ ${n}</span></form>
  <button class="btn ghost pv-arrow" id="pvZoom" aria-pressed="${pvZoom}" aria-label="Zoom">${pvZoom ? '⤡' : '🔍'}</button>
  <a class="btn ghost pv-arrow ${i >= n ? 'off' : ''}" href="${i < n ? hrefOf(i + 1) : '#'}" aria-label="Nächste Seite">›</a>
</div>
<div class="pv-stage ${pvZoom ? 'zoom' : ''}" id="pvStage" style="--ar:${pg.w / pg.h}">
  <div class="pv-page" id="pvPage" role="img" aria-label="${esc(title)}, Seite ${i}">
    <img src="${pg.f}" alt="" style="height:${(pg.H / pg.h) * 100}%;top:${(-pg.y / pg.h) * 100}%">
    ${pvZoom ? '' : `${i > 1 ? `<a class="pv-tap left" href="${hrefOf(i - 1)}" aria-hidden="true" tabindex="-1"></a>` : ''}${i < n ? `<a class="pv-tap right" href="${hrefOf(i + 1)}" aria-hidden="true" tabindex="-1"></a>` : ''}`}
  </div>
</div>
${note ? `<p class="note pv-note">${note}</p>` : ''}`;
    (preload || []).forEach((f) => { const im = new Image(); im.src = f; });
    const to = (x) => go(hrefOf(Math.min(n, Math.max(1, x))));
    view.querySelectorAll('.off').forEach((x) => x.addEventListener('click', (e) => e.preventDefault()));
    $('#pvGo').addEventListener('submit', (e) => { e.preventDefault(); to(Number($('#pvNum').value)); });
    $('#pvZoom').addEventListener('click', () => { pvZoom = !pvZoom; route(true); });
    const stage = $('#pvStage');
    let sx = null, sy = 0;
    stage.addEventListener('touchstart', (e) => { if (e.touches.length === 1) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; } }, { passive: true });
    stage.addEventListener('touchend', (e) => {
      if (sx == null || pvZoom) return;
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) to(dx < 0 ? i + 1 : i - 1);
    });
    const k = (e) => { if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return; if (e.key === 'ArrowRight') to(i + 1); if (e.key === 'ArrowLeft') to(i - 1); };
    window.addEventListener('keydown', k);
    cleanup = () => window.removeEventListener('keydown', k);
  }

  function renderSeite(n) {
    let last = 1;
    try { last = Number(localStorage.getItem('guvPage')) || 1; } catch { /* egal */ }
    const p = Math.min(GUV_PAGES, Math.max(1, Number(n) || last));
    try { localStorage.setItem('guvPage', p); } catch { /* egal */ }
    const ch = chapterOfPage(p);
    pageViewer({
      back: '#heft', backLabel: 'Das Heft', title: `Grundlagen & Verfahren · Kap. ${ch[0]}`,
      extra: `<select id="pvCh" class="pv-select" aria-label="Kapitel">${GUV_CH.map((c) => `<option value="${c[1]}" ${c === ch ? 'selected' : ''}>${c[0]} · ${esc(c[2])}</option>`).join('')}</select>`,
      pg: guvPage(p), i: p, n: GUV_PAGES, hrefOf: (x) => `#seite/${x}`,
      preload: [guvPage(Math.min(GUV_PAGES, p + 2)).f, guvPage(Math.max(1, p - 1)).f],
      note: 'Originalseiten © 2026 Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe – SPHAIR Grundlagen & Verfahren 2026.',
    });
    $('#pvCh').addEventListener('change', (e) => go(`#seite/${e.target.value}`));
  }

  // Flugschul-Unterlagen: #doc/<flugzeug>/<dokument>/<seite>
  function renderDoc(a, b, c) {
    const keys = Object.keys(window.SCHULDOKS || {});
    const key = keys[Number(a)];
    const docs = window.SCHULDOKS?.[key];
    const d = docs?.[Number(b)];
    if (!d) return go('#checkliste');
    const n = d.p.length;
    const i = Math.min(n, Math.max(1, Number(c) || 1));
    pageViewer({
      back: '#checkliste', backLabel: 'Checkliste', title: `${key} · ${d.t}`,
      extra: `<select id="pvDoc" class="pv-select" aria-label="Dokument">${docs.map((x, j) => `<option value="${j}" ${j === Number(b) ? 'selected' : ''}>${esc(x.t)}</option>`).join('')}</select>`,
      pg: d.p[i - 1], i, n, hrefOf: (x) => `#doc/${a}/${b}/${x}`,
      preload: [d.p[Math.min(n, i + 1) - 1].f],
      note: 'Quelle: sphair.ch «Checklists & Procedures» (2026). Im Kurs gilt die Papier-Version deiner Flugschule.',
    });
    $('#pvDoc').addEventListener('change', (e) => go(`#doc/${a}/${e.target.value}/1`));
  }

  // ---------- Lernplan: tägliche 10-Minuten-Sessions ----------
  // Der Plan (js/lernplan.js) führt Seite für Seite durchs ganze Heft und durch alle Lektionen.
  // Nach jeder Session prüft ein Quiz, ob alles sitzt. Falsches kommt später automatisch wieder.
  const PLAN = window.LERNPLAN || [];
  const PASS = 70;
  const planState = () => (S.data.plan ||= { done: {}, tries: {} });
  const planCur = () => { const d = planState().done; const i = PLAN.findIndex((_, j) => d[j] == null); return i < 0 ? PLAN.length : i; };
  const planDoneN = () => Object.keys(planState().done).length;
  const planLeftMin = () => PLAN.reduce((a, o, j) => a + (planState().done[j] == null ? o.m + 3 : 0), 0);
  const sessMin = (o) => o.m + 3;
  const finishDate = (perDay = 1) => {
    const left = PLAN.length - planDoneN();
    const d = new Date();
    d.setDate(d.getDate() + Math.ceil(left / perDay) - 1);
    return d.toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  const unitLabel = (u) => (typeof u === 'number' ? `Seite ${u}` : C.topic(u.split(':')[0])?.lessons[u.split(':')[1]]?.t || 'Lektion');

  function renderPlan() {
    activeTask = null;
    const cur = planCur();
    const st = planState();
    const pct = Math.round((planDoneN() / PLAN.length) * 100);
    const o = PLAN[cur];
    // nach Kapiteln bzw. Themen-Blöcken gruppieren
    const groups = [];
    PLAN.forEach((x, j) => {
      const g = x.c != null ? `Kapitel ${x.c} · ${GUV_CH[x.c][2]}` : `Wissen: ${x.t}`;
      if (!groups.length || groups[groups.length - 1].g !== g) groups.push({ g, items: [] });
      groups[groups.length - 1].items.push(j);
    });
    view.innerHTML = `
<a class="back" href="#lernen">‹ Lernen</a>
<section class="hero"><h1>Dein Lernplan</h1><p class="muted">Das ganze Heft – Seite für Seite – und alle Lektionen in ${PLAN.length} Sessions à ca. 10 Minuten. Nach jeder Session prüft ein Quiz, ob du es verstanden hast.</p></section>
<section class="card">
  <div class="card-head"><h2>${planDoneN()} von ${PLAN.length} Sessions</h2><span class="muted">${pct} %</span></div>
  <div class="bar"><i style="width:${pct}%"></i></div>
  <p class="muted small">${cur >= PLAN.length ? 'Alles gelernt – Gratulation! 🎓 Wiederhole jetzt fällige Karten.' : `Mit 1 Session pro Tag bist du am <b>${finishDate(1)}</b> fertig, mit 2 pro Tag schon am <b>${finishDate(2)}</b>. Noch ca. ${Math.round(planLeftMin() / 60)} Stunden.`}</p>
</section>
${o ? `<a class="card review plan-next" href="#session/${cur + 1}"><span class="ticon">🎯</span><span class="tt"><small>Als Nächstes · Session ${cur + 1}</small><b>${esc(o.t)}</b><small>≈ ${sessMin(o)} Min. · ${o.u.length} ${o.c != null ? (o.u.length === 1 ? 'Seite' : 'Seiten') : (o.u.length === 1 ? 'Lektion' : 'Lektionen')} + Quiz</small></span><span class="chev">›</span></a>` : ''}
${groups.map((gr) => `<details class="card plan-group" ${gr.items.includes(cur) ? 'open' : ''}>
  <summary><b>${esc(gr.g)}</b><span class="muted small">${gr.items.filter((j) => st.done[j] != null).length}/${gr.items.length}</span></summary>
  <ul class="tasks">${gr.items.map((j) => { const x = PLAN[j]; const d = st.done[j]; const lock = j > cur; return `<li><a class="task ${d != null ? 'done' : ''} ${lock ? 'locked' : ''}" href="${lock ? '#plan' : `#session/${j + 1}`}" ${lock ? 'aria-disabled="true"' : ''}><span class="snum">${d != null ? '✓' : lock ? '🔒' : '▶'}</span><span class="tt"><b>Session ${j + 1}${x.c != null && x.t.includes('Teil') ? ` · ${esc(x.t.split('· ')[1])}` : ''}</b><small>${esc((x.h[0] || '').slice(0, 70))}${x.h.length > 1 ? ' …' : ''} · ${sessMin(x)} Min.${d != null ? ` · Quiz ${d} %` : ''}</small></span></a></li>`; }).join('')}</ul>
</details>`).join('')}`;
    view.querySelectorAll('.task.locked').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); toast('🔒 Erst die Sessions davor – Schritt für Schritt!'); }));
  }

  function renderSessionRoute(n, k) {
    const idx = Number(n) - 1;
    const o = PLAN[idx];
    if (!o) return go('#plan');
    if (idx > planCur()) { toast('🔒 Diese Session ist noch gesperrt'); return go(`#session/${planCur() + 1}`); }
    if (k === 'quiz') return renderSessionQuiz(idx);
    if (k == null || k === '') return renderSessionIntro(idx);
    return renderSessionUnit(idx, Math.min(o.u.length, Math.max(1, Number(k) || 1)));
  }

  function renderSessionIntro(idx) {
    const o = PLAN[idx];
    const st = planState();
    const pos = st.pos?.i === idx ? st.pos.k : 0;
    const isHeft = o.c != null;
    view.innerHTML = `
<a class="back" href="#plan">‹ Lernplan</a>
<section class="hero"><p class="muted">Session ${idx + 1} von ${PLAN.length} · ≈ ${sessMin(o)} Min.</p><h1>${esc(o.t)}</h1></section>
<section class="card">
  <h2>${isHeft ? '📄 Das liest du heute' : '📖 Das lernst du heute'}</h2>
  <ul class="plan-list">${o.h.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
  <p class="muted small">${isHeft ? `Originalseiten ${o.u[0]}–${o.u[o.u.length - 1]} im Heft (${o.u.length} ${o.u.length === 1 ? 'Seite' : 'Seiten'}).` : `${o.u.length} ${o.u.length === 1 ? 'Lektion' : 'Lektionen'}.`} Danach: Quiz – ab ${PASS} % ist die Session geschafft.</p>
</section>
${st.done[idx] != null ? `<p class="note">✓ Schon geschafft (Quiz ${st.done[idx]} %). Du kannst sie jederzeit wiederholen.</p>` : ''}
<div class="row">
  <a class="btn" href="#session/${idx + 1}/${pos || 1}">${pos > 1 ? `Weiter bei ${esc(unitLabel(o.u[pos - 1]))} ›` : 'Los geht\'s ›'}</a>
  ${st.done[idx] != null || pos ? `<a class="btn ghost" href="#session/${idx + 1}/quiz">Direkt zum Quiz</a>` : ''}
</div>
<p class="muted small center">Tipp: Lies in Ruhe. Das Quiz fragt nach dem, was auf diesen Seiten steht.</p>`;
    if (activeTask === 'lesson') sessTask = true;
  }
  let sessTask = false;

  function renderSessionUnit(idx, k) {
    const o = PLAN[idx];
    const n = o.u.length;
    const u = o.u[k - 1];
    const st = planState();
    st.pos = { i: idx, k };
    if (activeTask === 'lesson') sessTask = true;
    const last = k === n;
    const head = `<div class="sess-bar"><span class="muted small">Session ${idx + 1} · ${k}/${n}</span><span class="bar thin"><i style="width:${(k / n) * 100}%"></i></span>${last ? `<a class="btn small" href="#session/${idx + 1}/quiz">Zum Quiz ›</a>` : ''}</div>`;
    if (typeof u === 'number') {
      if (!S.data.heft[`p${u}`]) S.data.heft[`p${u}`] = true;
      S.save();
      pageViewer({
        back: `#session/${idx + 1}`, backLabel: `Session ${idx + 1}`, title: o.t,
        extra: head, pg: guvPage(u), i: k, n, hrefOf: (x) => `#session/${idx + 1}/${x}`,
        preload: o.u.slice(k, k + 2).filter((x) => typeof x === 'number').map((x) => guvPage(x).f),
        note: `Seite ${u} im Heft · © 2026 Schweizerische Eidgenossenschaft, vertreten durch die Luftwaffe.`,
      });
      return;
    }
    S.save();
    const [tid, li] = u.split(':');
    const t = C.topic(tid);
    const l = t.lessons[li];
    view.innerHTML = `
<a class="back" href="#session/${idx + 1}">‹ Session ${idx + 1}</a>
${head}
<article class="card lesson" style="--c:${t.color}">
  <p class="muted small">${esc(t.name)}</p>
  <h1>${l.t}</h1>
  <div class="lesson-body">${l.b}</div>
</article>
<div class="row sticky-actions">
  ${k > 1 ? `<a class="btn ghost" href="#session/${idx + 1}/${k - 1}">‹ Zurück</a>` : ''}
  <a class="btn" id="sNext" href="${last ? `#session/${idx + 1}/quiz` : `#session/${idx + 1}/${k + 1}`}">${last ? 'Zum Quiz ›' : 'Weiter ›'}</a>
</div>`;
    $('#sNext').addEventListener('click', () => { if (!S.data.lessons[u]) { S.lessonRead(tid, Number(li)); S.addXp(5); } });
  }

  // --- Quiz zusammenstellen ---
  function qFromKey(key) {
    const [a, b] = key.split(':');
    if (a === 'kf') {
      const k = (window.KONTROLLFRAGEN || []).find((x) => String(x.id) === b);
      return k && { kind: 'flash', q: k.q, ans: k.a, src: k.src, key };
    }
    const t = C.topic(a);
    const q = t?.questions[b];
    return q && { kind: 'mc', q: q.q, a: q.a, c: q.a[q.c], e: q.e, key, tag: t.name };
  }
  const cardKey = (key) => { const i = key.lastIndexOf(':'); return [key.slice(0, i), key.slice(i + 1)]; };
  const cardSeen = (key) => !!S.data.cards[key];
  const cardDue = (key) => { const [t, i] = cardKey(key); return S.isDue(t, i); };

  // Text der Abschnitte, die auf den Seiten dieser Session stehen
  function sessionText(H, o) {
    if (o.c == null) return o.u.map((k) => { const [t, i] = k.split(':'); const l = C.topic(t).lessons[i]; return { n: l.t, p: null, txt: plain(l.b) }; });
    const a = o.u[0], z = o.u[o.u.length - 1];
    const out = [];
    for (const ch of H) ch.s.forEach((s, i) => {
      if (s.h.length <= 40 || /COPYRIGHT|INHALTSVERZEICHNIS/i.test(s.t)) return;
      const nx = ch.s[i + 1];
      const end = nx ? Math.max(s.p, nx.p - 1) : s.p + 2;
      if (s.p <= z && end >= a) out.push({ n: s.n, t: s.t, p: Math.max(s.p, a), txt: plain(s.h).replace(/\[Grafik – siehe PDF\]/g, '') });
    });
    return out;
  }

  // Lückentext-Fragen aus dem Text (wenn keine KI verfügbar ist)
  function clozeQs(secs, want) {
    const termRe = /\b[A-ZÄÖÜ][A-ZÄÖÜ-]{3,}(?:\s+[A-ZÄÖÜ][A-ZÄÖÜ-]{1,}){0,3}\b/g;
    const pool = new Set();
    secs.forEach((s) => (s.txt.match(termRe) || []).forEach((m) => { if (m.length <= 40) pool.add(m.trim()); }));
    const norm = (x) => x.toLowerCase().replace(/[^a-zäöü]/g, '');
    const seen = new Set();
    const terms = [...pool].filter((x) => { const k = norm(x); if (seen.has(k)) return false; seen.add(k); return true; });
    const cands = [];
    secs.forEach((s) => s.txt.split(/(?<=[.!?])\s+/).forEach((sen) => {
      if (sen.length < 50 || sen.length > 240) return;
      const ms = (sen.match(termRe) || []).filter((m) => m.length <= 40);
      if (ms.length !== 1) return;
      const term = ms[0].trim();
      if (sen.replace(term, '').trim().length < 30) return;
      const wrong = T.shuffle(terms.filter((x) => norm(x) !== norm(term) && !norm(term).includes(norm(x)) && !norm(x).includes(norm(term)) && !sen.includes(x))).slice(0, 3);
      if (wrong.length < 3) return;
      cands.push({ kind: 'mc', q: `Welcher Begriff gehört in die Lücke?<br><span class="cloze">«${esc(sen.replace(term, '_____'))}»</span>`, html: true, a: [term, ...wrong], c: term, e: `Abschnitt ${s.n}`, src: s.n, p: s.p, key: 'gen', tag: 'Lückentext' });
    }));
    return T.shuffle(cands).slice(0, want);
  }

  async function aiQs(idx, secs, want) {
    const cacheKey = 'sphair-genq';
    let cache = {};
    try { cache = JSON.parse(localStorage.getItem(cacheKey) || '{}'); } catch { /* egal */ }
    if (cache[idx]?.length >= want) return cache[idx];
    if (!Coach.AI.enabled) return null;
    const age = S.data.profile?.age;
    let text = '';
    for (const s of secs) { if (text.length > 14000) break; text += `\n\n[${s.n}${s.t ? ` ${s.t}` : ''}]\n${s.txt.slice(0, 5000)}`; }
    const prompt = `Du erstellst ein Verständnis-Quiz für eine Lern-App zur SPHAIR-Vorbereitung (Schweizer Luftwaffe, Pilotenausbildung).${age ? ` Der Lernende ist ${age} Jahre alt.` : ''}
Unten steht der Text, den er gerade gelesen hat (aus «Grundlagen und Verfahren» bzw. Lektionen). Erstelle genau ${want} Multiple-Choice-Fragen auf Deutsch (Schweizer Schreibweise, kein ß), die prüfen, ob er das Wichtigste VERSTANDEN hat – Abläufe, Gründe, Zusammenhänge, Werte. Keine Fragen zu Copyright, Seitenzahlen, Arbeitsblättern oder Formalien. Nur was eindeutig aus dem Text folgt. Jede Frage mit genau 4 kurzen Antworten, nur eine richtig, plausible falsche Antworten.
Antworte nur mit einem JSON-Array, Beispiel: [{"q":"Frage?","a":["richtig","falsch","falsch","falsch"],"c":0,"e":"kurze Erklärung (1 Satz)","s":"4.1.2"}] – "c" ist der Index der richtigen Antwort, "s" die Abschnittsnummer aus den eckigen Klammern.

TEXT:${text}`;
    try {
      const arr = await Coach.AI.json(prompt);
      const qs = (Array.isArray(arr) ? arr : []).filter((x) => x && typeof x.q === 'string' && Array.isArray(x.a) && x.a.length >= 3 && Number.isInteger(x.c) && x.a[x.c] != null)
        .slice(0, want).map((x) => {
          const sec = secs.find((s) => s.n === String(x.s)) || secs[0];
          return { kind: 'mc', q: x.q, a: x.a.map(String), c: String(x.a[x.c]), e: x.e ? String(x.e) : '', src: sec?.p ? sec.n : null, p: sec?.p || null, key: 'gen', tag: '✨ KI-Frage' };
        });
      if (qs.length) {
        cache[idx] = qs;
        const keys = Object.keys(cache);
        keys.slice(0, Math.max(0, keys.length - 8)).forEach((k2) => delete cache[k2]);
        try { localStorage.setItem(cacheKey, JSON.stringify(cache)); } catch { /* egal */ }
      }
      return qs;
    } catch { return null; }
  }

  async function buildQuiz(idx) {
    const o = PLAN[idx];
    const own = T.shuffle(o.q.map(qFromKey).filter(Boolean));
    const mc = own.filter((x) => x.kind === 'mc');
    const fl = own.filter((x) => x.kind === 'flash');
    // zuerst Fragen, die noch nie oder falsch beantwortet wurden
    const pri = (x) => (!cardSeen(x.key) ? 0 : cardDue(x.key) ? 1 : 2);
    mc.sort((a, b) => pri(a) - pri(b));
    fl.sort((a, b) => pri(a) - pri(b));
    const picked = [...mc.slice(0, 4), ...fl.slice(0, 2)];
    // Wiederholung: Fälliges aus früheren Sessions
    const today = S.dayKey();
    const rev = (S.data.review || []).filter((r) => r.due <= today).slice(0, 2).map((r) => ({ ...r, kind: 'mc', key: 'rev', tag: '🔁 Wiederholung' }));
    if (rev.length < 2) {
      const old = PLAN.slice(0, idx).flatMap((x) => x.q).filter((k) => cardSeen(k) && cardDue(k));
      T.shuffle(old).slice(0, 2 - rev.length).forEach((k) => { const q = qFromKey(k); if (q) rev.push({ ...q, tag: '🔁 Wiederholung' }); });
    }
    let gen = [];
    const want = Math.max(o.c != null ? 3 : 1, 6 - picked.length);
    const H = await loadHeft().catch(() => null);
    const secs = H ? sessionText(H, o) : [];
    if (secs.length) {
      gen = (await aiQs(idx, secs, want)) || [];
      if (gen.length < want) gen = gen.concat(clozeQs(secs, want - gen.length));
    }
    // zu wenige Fragen? Mit Fragen aus früheren Sessions auffüllen
    const all = [...picked, ...gen, ...rev];
    if (all.length < 4) {
      const have = new Set(all.map((x) => x.key));
      T.shuffle(PLAN.slice(Math.max(0, idx - 12), idx).flatMap((x) => x.q).filter((k) => !have.has(k))).slice(0, 4 - all.length)
        .forEach((k) => { const q = qFromKey(k); if (q) rev.push({ ...q, tag: '🔁 Wiederholung' }); });
    }
    return T.shuffle([...picked, ...gen]).concat(rev).slice(0, 9);
  }

  async function renderSessionQuiz(idx) {
    const o = PLAN[idx];
    view.innerHTML = `<section class="card center" style="padding:40px 20px"><div class="spinner"></div><p class="muted">Dein Quiz wird vorbereitet…${Coach.AI.enabled ? '<br><small>Die KI schreibt Fragen genau zu deinen Seiten.</small>' : ''}</p></section>`;
    const token = (renderSessionQuiz.t = (renderSessionQuiz.t || 0) + 1);
    const items = await buildQuiz(idx);
    if (token !== renderSessionQuiz.t || !location.hash.startsWith(`#session/${idx + 1}/quiz`)) return;
    if (!items.length) return sessionResult(idx, 100, []);
    let k = 0, right = 0;
    const wrongs = [];
    const show = (open) => {
      const it = items[k];
      view.innerHTML = `
<a class="back" href="#session/${idx + 1}">‹ Session ${idx + 1}</a>
<div class="sess-head"><b>Quiz · Session ${idx + 1}</b><span class="muted">${k + 1}/${items.length}</span></div>
<div class="bar thin"><i style="width:${(k / items.length) * 100}%"></i></div>
<section class="card q-card ${it.kind === 'flash' ? 'flash' : ''}">
  ${it.tag ? `<p class="tag">${esc(it.tag)}</p>` : it.kind === 'flash' ? '<p class="tag">Kontrollfrage aus dem Heft</p>' : ''}
  <p class="big-q">${it.html ? it.q : esc(it.q)}</p>
  ${it.kind === 'mc' ? `<div class="opts">${(it.opts ||= T.shuffle(it.a)).map((x, i) => `<button class="opt" data-i="${i}"><kbd>${i + 1}</kbd><span>${esc(x)}</span></button>`).join('')}</div><div id="fb"></div>`
    : open ? `<div class="flash-a"><p>${esc(it.ans)}</p>${it.src ? `<p class="muted small">Fundstelle im Heft: ${esc(it.src)}</p>` : ''}</div><p class="muted small">Ehrlich sein: Hast du es gewusst?</p><div class="row two-btn"><button class="btn ghost" id="kfNo">✗ Nicht gewusst</button><button class="btn" id="kfYes">✓ Gewusst</button></div>`
      : '<p class="muted small">Überleg dir zuerst deine Antwort – dann aufdecken.</p><button class="btn wide" id="kfShow">Antwort zeigen</button>'}
</section>`;
      const nextQ = () => { k++; if (k < items.length) show(false); else sessionResult(idx, Math.round((right / items.length) * 100), wrongs); };
      const record = (ok) => {
        if (ok) right++; else wrongs.push(it);
        if (it.key === 'rev') reviewAnswer(it, ok);
        else if (it.key === 'gen') { if (!ok) reviewAdd(it); }
        else { const [t, i] = cardKey(it.key); S.answer(t, i, ok); }
        if (ok) S.addXp(2);
        updateTop();
      };
      if (it.kind === 'flash') {
        if (!open) { $('#kfShow').addEventListener('click', () => show(true)); return; }
        $('#kfNo').addEventListener('click', () => { record(false); nextQ(); });
        $('#kfYes').addEventListener('click', () => { record(true); nextQ(); });
        return;
      }
      let done = false;
      view.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
        if (done) return;
        done = true;
        const val = it.opts[b.dataset.i];
        const ok = val === it.c;
        record(ok);
        view.querySelectorAll('.opt').forEach((x) => { const v = it.opts[x.dataset.i]; if (v === it.c) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); x.disabled = true; });
        const pageLink = it.p ? ` <a href="#seite/${it.p}">📄 Seite ${it.p}</a>` : '';
        $('#fb').innerHTML = `${ok ? '<p class="fb good">✓ Richtig!</p>' : `<p class="fb bad">✗ Richtig ist: <b>${esc(it.c)}</b></p>`}${it.e ? `<p class="muted small">${esc(it.e)}${ok ? '' : pageLink}</p>` : ''}<button class="btn" id="nextBtn">${k + 1 < items.length ? 'Weiter' : 'Auswertung'}</button>`;
        $('#nextBtn').addEventListener('click', nextQ);
        $('#nextBtn').focus();
      }));
      view.onkeydown = (e) => { if (/^[1-4]$/.test(e.key)) view.querySelector(`.opt[data-i="${Number(e.key) - 1}"]`)?.click(); };
    };
    show(false);
  }

  // Falsch beantwortete KI-/Lückentext-Fragen kommen später wieder
  function reviewAdd(it) {
    const r = (S.data.review ||= []);
    if (r.some((x) => x.q === it.q)) return;
    r.push({ q: it.q, a: it.a, c: it.c, e: it.e, p: it.p, html: !!it.html, box: 1, due: S.addDays(S.dayKey(), 1) });
    if (r.length > 60) r.splice(0, r.length - 60);
    S.save();
  }
  function reviewAnswer(it, ok) {
    const r = S.data.review || [];
    const x = r.find((y) => y.q === it.q);
    if (!x) return;
    if (ok) { x.box++; x.due = S.addDays(S.dayKey(), [0, 3, 7, 16][Math.min(x.box, 3)]); if (x.box >= 4) r.splice(r.indexOf(x), 1); }
    else { x.box = 1; x.due = S.addDays(S.dayKey(), 1); }
    S.save();
  }

  function sessionResult(idx, score, wrongs) {
    const o = PLAN[idx];
    const st = planState();
    const pass = score >= PASS;
    const first = st.done[idx] == null;
    st.tries[idx] = (st.tries[idx] || 0) + (pass ? 0 : 1);
    if (pass) {
      st.done[idx] = Math.max(score, st.done[idx] || 0);
      st.pos = null;
      delete st.tries[idx];
      if (first) S.addXp(20);
    }
    S.save();
    if (pass && first && (sessTask || activeTask === 'lesson' || todayPlan().find((p) => p.id === 'lesson')?.href.startsWith('#session'))) finishTask('lesson');
    sessTask = false;
    activeTask = null;
    // Eine geschaffte Session reicht, damit die Streak wächst
    let streakUp = false;
    if (pass) { const day = S.today(); if (!day.complete) { day.complete = true; streakUp = S.completeDay(); S.save(); updateTop(); } }
    const nx = PLAN[planCur()];
    const tries = st.tries[idx] || 0;
    const weak = [...new Map(wrongs.filter((w) => w.p).map((w) => [w.p, w])).values()];
    view.innerHTML = `
<section class="card result">
  <div class="ring" style="--p:${score}"><span>${score}%</span></div>
  <h1>${pass ? (score >= 90 ? 'Perfekt verstanden! 🚀' : 'Session geschafft! ✈️') : 'Fast! Noch nicht ganz sicher 💪'}</h1>
  <p class="muted">${pass ? `${first ? '+20 ⭐ · ' : ''}Session ${idx + 1} von ${PLAN.length} erledigt.` : `Ab ${PASS} % ist die Session geschafft. Schau dir die Stellen nochmal an und versuch es erneut.`}</p>
  ${wrongs.length ? `<details class="wrongs" ${pass ? '' : 'open'}><summary>Das solltest du nochmal anschauen (${wrongs.length})</summary>${wrongs.map((w) => `<div class="wr"><b>${w.html ? w.q.replace(/<br>.*$/, '') : esc(w.q)}</b><p>✓ ${esc(w.kind === 'flash' ? w.ans : w.c)}</p>${w.p ? `<p class="small"><a href="#seite/${w.p}">📄 Seite ${w.p} ansehen</a></p>` : ''}</div>`).join('')}<p class="muted small">Falsches kommt in den nächsten Sessions als Wiederholung wieder.</p></details>` : ''}
  <div class="row">
    ${pass ? (nx ? `<a class="btn ghost" href="#heute">Fertig für heute</a><a class="btn" href="#session/${planCur() + 1}">Nächste Session ›</a>` : '<a class="btn" href="#plan">Zum Lernplan</a>')
    : `<a class="btn ghost" href="#session/${idx + 1}/${weak[0] ? Math.max(1, o.u.indexOf(weak[0].p) + 1) : 1}">📄 Nochmal lesen</a><button class="btn" id="again">Quiz nochmal</button>`}
  </div>
  ${!pass && tries >= 2 ? '<button class="link-btn" id="skip">Trotzdem weiter (kommt später als Wiederholung)</button>' : ''}
  ${pass && nx ? `<p class="muted small">Als Nächstes: ${esc(nx.t)} · ≈ ${sessMin(nx)} Min.</p>` : ''}
</section>`;
    if (streakUp) celebrate(`🔥 Session geschafft – Streak: <b>${S.streakNow()}</b> ${S.streakNow() === 1 ? 'Tag' : 'Tage'}!`);
    else if (pass && first) celebrate(`🎯 Session ${idx + 1} geschafft!`);
    $('#again')?.addEventListener('click', () => route(true));
    $('#skip')?.addEventListener('click', () => { st.done[idx] = score; delete st.tries[idx]; st.pos = null; S.save(); wrongs.forEach((w) => w.key === 'gen' && reviewAdd(w)); go(`#session/${planCur() + 1}`); });
  }


  // ---------- Kontrollfragen aus dem Heft (Lernkarten) ----------
  function renderKf(sel) {
    const all = window.KONTROLLFRAGEN || [];
    const chapters = [...new Set(all.map((k) => k.c))];
    if (sel == null) {
      const due = all.filter((k) => S.isDue('kf', k.id)).length;
      const known = all.filter((k) => (S.data.cards[`kf:${k.id}`]?.box || 0) >= 2).length;
      view.innerHTML = `
<a class="back" href="#lernen">‹ Lernen</a>
<section class="hero"><h1>Kontrollfragen</h1><p class="muted">Alle Kontrollfragen aus «Grundlagen & Verfahren» als Lernkarten. Erst selbst überlegen (am besten laut), dann aufdecken und ehrlich bewerten.</p></section>
<section class="card">
  <div class="card-head"><h2>Dein Stand</h2><span class="muted">${known}/${all.length} sitzen</span></div>
  <div class="bar"><i style="width:${(known / all.length) * 100}%"></i></div>
  <a class="btn wide" href="#kf/due">${due} fällige Karten lernen</a>
</section>
<ul class="chapters">${chapters.map((c) => { const ks = all.filter((k) => k.c === c); const ok = ks.filter((k) => (S.data.cards[`kf:${k.id}`]?.box || 0) >= 2).length; const t = (GUV_CH.find((x) => x[0] === c) || [c, 0, ''])[2]; return `<li><a class="card chap" href="#kf/${c}"><span class="cnum">${c}</span><span class="tt"><b>${esc(t)}</b><small>${ks.length} Fragen · ${ok} sitzen</small><span class="bar"><i style="width:${(ok / ks.length) * 100}%"></i></span></span><span class="chev">›</span></a></li>`; }).join('')}</ul>`;
      return;
    }
    let deck = sel === 'due' ? T.shuffle(all.filter((k) => S.isDue('kf', k.id))).slice(0, 15) : all.filter((k) => String(k.c) === String(sel));
    if (!deck.length) deck = T.shuffle(all).slice(0, 10);
    let i = 0, right = 0;
    const task = activeTask;
    const show = (open) => {
      const k = deck[i];
      const t = (GUV_CH.find((x) => x[0] === k.c) || [k.c, 0, ''])[2];
      view.innerHTML = `
<a class="back" href="#kf">‹ Kontrollfragen</a>
<div class="sess-head"><b>Kapitel ${k.c} · ${esc(t)}</b><span class="muted">${i + 1}/${deck.length}</span></div>
<div class="bar thin"><i style="width:${(i / deck.length) * 100}%"></i></div>
<section class="card q-card flash">
  <p class="big-q">${esc(k.q)}</p>
  ${open ? `<div class="flash-a"><p>${esc(k.a)}</p><p class="muted small">Fundstelle im Heft: ${esc(k.src)}</p></div>
  <div class="row two-btn"><button class="btn ghost" id="kfNo">✗ Nochmal</button><button class="btn" id="kfYes">✓ Gewusst</button></div>`
    : '<button class="btn wide" id="kfShow">Antwort zeigen</button>'}
</section>`;
      if (!open) { $('#kfShow').addEventListener('click', () => show(true)); $('#kfShow').focus(); return; }
      const rate = (ok) => {
        S.answer('kf', k.id, ok);
        if (ok) { right++; S.addXp(2); }
        updateTop();
        i++;
        if (i < deck.length) return show(false);
        if (task === 'quiz') finishTask('quiz');
        activeTask = null;
        view.innerHTML = `<section class="card result"><div class="ring" style="--p:${Math.round((right / deck.length) * 100)}"><span>${right}/${deck.length}</span></div><h1>${right === deck.length ? 'Alles gewusst! 🚀' : 'Gut geübt! 💪'}</h1><p class="muted">Nicht gewusste Karten kommen morgen wieder.</p><div class="row"><a class="btn ghost" href="#kf">Fertig</a><button class="btn" id="again">Nochmal</button></div></section>`;
        $('#again').addEventListener('click', () => route(true));
      };
      $('#kfNo').addEventListener('click', () => rate(false));
      $('#kfYes').addEventListener('click', () => rate(true));
    };
    show(false);
  }

  // ---------- Checkliste lesen / abdecken ----------
  function renderCheckliste() {
    const cl = T.checklistOf();
    const keys = Object.keys(window.CHECKLISTS || {});
    view.innerHTML = `
<a class="back" href="#lernen">‹ Lernen</a>
<section class="hero"><h1>Checkliste</h1><p class="muted">Offizielle SPHAIR-Checkliste der Flugschule. Tipp: «Werte abdecken» einschalten und laut aufsagen – wie im Cockpit.</p></section>
<section class="card form">
  <label>Flugschule & Flugzeug<select id="clSel">${keys.map((k) => `<option value="${esc(k)}" ${k === cl.key ? 'selected' : ''}>${esc(k)}</option>`).join('')}</select></label>
  <label class="check"><input type="checkbox" id="clHide"> Werte abdecken (antippen zum Aufdecken)</label>
</section>
${(() => { const keys = Object.keys(window.SCHULDOKS || {}); const ki = keys.indexOf(cl.key); const docs = window.SCHULDOKS?.[cl.key] || []; return docs.length ? `<section class="card"><div class="card-head"><h2>Original-Unterlagen</h2></div><p class="muted small">Genau so, wie du sie von der Flugschule bekommst. Die <b>Procedures</b> (Platzrunde) musst du laut SPHAIR <b>wörtlich</b> können – Prio 1!</p><div class="doc-grid">${docs.map((d, j) => `<a class="doc-btn" href="#doc/${ki}/${j}/1"><b>${esc(d.t)}</b><small>${d.p.length} ${d.p.length === 1 ? 'Seite' : 'Seiten'}</small></a>`).join('')}</div></section>` : ''; })()}
<div id="clList">${cl.checks.map((c) => `<section class="card cl"><h2>${esc(c.name)}</h2><ol>${c.items.map(([k, v], i) => `<li><span><small class="muted">${i + 1}.</small> ${esc(k)}</span><b class="clv">${esc(v)}</b></li>`).join('')}</ol><p class="muted small">${esc(c.name)} COMPLETED</p></section>`).join('')}</div>
<p class="note">Quelle: sphair.ch «Checklists & Procedures» (2026). Im Kurs gilt immer die Papier-Checkliste deiner Flugschule.</p>
<a class="btn wide" href="#training/checkliste">Checkliste trainieren</a>`;
    $('#clSel').addEventListener('change', (e) => { S.settings.school = e.target.value; S.saveSettings(); renderCheckliste(); });
    $('#clHide').addEventListener('change', (e) => $('#clList').classList.toggle('hide', e.target.checked));
    $('#clList').addEventListener('click', (e) => { const v = e.target.closest('.clv'); if (v) v.classList.toggle('show'); });
  }

  // ---------- Ansicht: Training ----------
  function levelFor(id) {
    const a = S.trainerAvg(id);
    return a == null || a < 60 ? 1 : a < 80 ? 2 : 3;
  }

  function renderTraining() {
    const blocks = [1, 2, 3, 4, 5];
    const names = { 1: 'Block 1 · Englisch, Kopfrechnen, Räumlich', 2: 'Block 2 · Merken, Konzentration, Technik', 3: 'Block 3 · Wahrnehmung, Rechnen', 4: 'Block 4 · Psychomotorik, Multitasking', 5: 'Flugkurs · Verfahren & Checkliste' };
    const lastSim = S.data.sims[S.data.sims.length - 1];
    view.innerHTML = `
<section class="hero"><h1>Training</h1><p class="muted">Trainiere alle Tests des Screenings. Der Schwierigkeitsgrad passt sich automatisch an.</p></section>
<a class="card sim" href="#simulation">
  <span class="ticon">🎓</span><span class="tt"><b>Screening-Simulation</b><small>Alle 4 Blöcke am Stück (~20 min)${lastSim ? ` · letztes Mal ${lastSim.score} %` : ''}</small></span><span class="chev">›</span>
</a>
${blocks.map((b) => `<h2 class="block-h">${names[b]}</h2><div class="grid">${T.TRAINERS.filter((t) => t.block === b).map((t) => { const a = S.trainerAvg(t.id); return `
  <a class="card trainer" href="#training/${t.id}"><span class="ticon">${t.icon}</span><b>${t.name}</b><small class="muted">${t.desc}</small>
  <div class="tmeta"><span class="lvl">Stufe ${levelFor(t.id)}</span>${a != null ? `<span class="muted">Ø ${a} %</span>` : '<span class="muted">neu</span>'}</div></a>`; }).join('')}</div>`).join('')}`;
  }

  function renderTrainer(id) {
    const tr = T.get(id);
    if (!tr) return go('#training');
    const task = activeTask;
    const finishTrainer = (score, detail) => {
      S.trainerResult(id, score);
      S.addXp(5 + Math.round(score / 10));
      if (task === 'train') finishTask('train');
      activeTask = null;
      updateTop();
      return detail;
    };
    if (tr.custom) {
      view.innerHTML = `<a class="back" href="#training">‹ Training</a><div class="sess-head"><b>${tr.icon} ${tr.name}</b></div><div class="card" id="mtRoot"></div>`;
      const intro = $('#mtRoot');
      intro.innerHTML = `<p>60 Sekunden: Halte den Punkt im Ring und reagiere gleichzeitig auf Zahlen (gerade/ungerade) und die Warnlampe.</p><button class="btn" id="go">Start</button>`;
      $('#go').addEventListener('click', () => {
        cleanup = window.Multitask.run(intro, { seconds: 60 }, (score, detail) => {
          finishTrainer(score, detail);
          intro.innerHTML = `<div class="result"><div class="ring" style="--p:${score}"><span>${score}%</span></div><p class="muted">${detail}</p><div class="row"><a class="btn ghost" href="#training">Fertig</a><button class="btn" id="again">Nochmal</button></div></div>`;
          $('#again').addEventListener('click', () => route(true));
        });
      });
      return;
    }
    const level = levelFor(id);
    view.innerHTML = `
<a class="back" href="#training">‹ Training</a>
<section class="card intro">
  <span class="ticon big">${tr.icon}</span>
  <h1>${tr.name}</h1>
  <p class="muted">${tr.desc} · ${tr.count} Aufgaben mit Zeitlimit</p>
  <div class="seg" role="radiogroup" aria-label="Stufe">${[1, 2, 3].map((l) => `<button data-l="${l}" class="${l === level ? 'on' : ''}">Stufe ${l}</button>`).join('')}</div>
  ${id === 'kopfhoer' ? '<p class="hint">🔊 Ton einschalten!</p>' : ''}
  <button class="btn wide" id="go">Los geht's</button>
</section>`;
    let lv = level;
    view.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => {
      lv = Number(b.dataset.l);
      view.querySelectorAll('.seg button').forEach((x) => x.classList.toggle('on', x === b));
    }));
    $('#go').addEventListener('click', () => runSession({
      title: `${tr.icon} ${tr.name}`, back: '#training', count: tr.count,
      items: () => tr.make(lv),
      onFinish: (score, avgT) => finishTrainer(score, `Ø ${avgT.toFixed(1)} s pro Aufgabe`),
    }));
  }

  // ---------- Screening-Simulation ----------
  const SIM = [
    { id: 'englisch', n: 8 }, { id: 'kopf', n: 8 }, { id: 'kopfhoer', n: 4 }, { id: 'wuerfel', n: 4 }, { id: 'figuren', n: 3 },
    { id: 'merken', n: 4 }, { id: 'zahlen', n: 3 }, { id: 'vergleich', n: 10 }, { id: 'technik', n: 5 },
    { id: 'instrumente', n: 6 }, { id: 'blitz', n: 4 }, { id: 'rechnen', n: 4 }, { id: 'multi', n: 1 },
  ];

  function renderSimulation() {
    view.innerHTML = `
<a class="back" href="#training">‹ Training</a>
<section class="card intro">
  <span class="ticon big">🎓</span>
  <h1>Screening-Simulation</h1>
  <p class="muted">Wie am echten Screening: alle Tests nacheinander, ohne Feedback zwischendurch. Plane ca. 20 Minuten ein, Ton an, ruhiger Ort.</p>
  <ol class="sim-list">${SIM.map((p) => `<li>${T.get(p.id).icon} ${T.get(p.id).name}</li>`).join('')}</ol>
  <button class="btn wide" id="go">Simulation starten</button>
</section>`;
    $('#go').addEventListener('click', () => runSim());
  }

  function runSim() {
    const results = [];
    let idx = 0;
    const stepTo = () => {
      if (idx >= SIM.length) return simDone(results);
      const p = SIM[idx];
      const tr = T.get(p.id);
      view.innerHTML = `<div class="sess-head"><b>Simulation</b><span class="muted">Teil ${idx + 1}/${SIM.length}</span></div><div class="bar thin"><i style="width:${(idx / SIM.length) * 100}%"></i></div>
<section class="card intro"><span class="ticon big">${tr.icon}</span><h1>${tr.name}</h1><p class="muted">${tr.desc}</p><button class="btn wide" id="go">Start</button></section>
<button class="link-btn" id="abort">Simulation abbrechen</button>`;
      $('#abort').addEventListener('click', () => go('#training'));
      $('#go').addEventListener('click', () => {
        const box = document.createElement('div');
        view.innerHTML = '';
        view.appendChild(box);
        const done = (score) => { results.push({ id: p.id, score }); idx++; stepTo(); };
        if (tr.custom) cleanup = window.Multitask.run(box, { seconds: 45 }, (s) => done(s));
        else {
          runSession({ title: `${tr.icon} ${tr.name}`, count: p.n, exam: true, embedded: box, items: () => tr.make(2), onFinish: (s) => done(s) });
        }
      });
    };
    stepTo();
  }

  function simDone(results) {
    const score = Math.round(results.reduce((a, r) => a + r.score, 0) / results.length);
    S.data.sims.push({ date: S.dayKey(), score, parts: results });
    S.addXp(40);
    results.forEach((r) => S.trainerResult(r.id, r.score));
    updateTop();
    const worst = [...results].sort((a, b) => a.score - b.score).slice(0, 3);
    view.innerHTML = `
<section class="card result">
  <div class="ring" style="--p:${score}"><span>${score}%</span></div>
  <h1>Simulation fertig! 🎓</h1>
  <p class="muted">+40 ⭐ · Das ist ein Übungswert, kein offizielles Resultat.</p>
  <ul class="sim-res">${results.map((r) => `<li><span>${T.get(r.id).icon} ${T.get(r.id).name}</span><div class="bar"><i style="width:${r.score}%"></i></div><b>${r.score}%</b></li>`).join('')}</ul>
  <p>Am meisten Potenzial: ${worst.map((w) => `<a href="#training/${w.id}">${T.get(w.id).name}</a>`).join(', ')}.</p>
  <div class="row"><a class="btn" href="#training">Fertig</a></div>
</section>`;
  }

  // ---------- Ansicht: Coach ----------
  let chat = [];
  let coachPrefill = '';
  function renderCoach() {
    activeTask = null;
    const ai = Coach.AI.enabled;
    if (!chat.length) {
      chat.push({ role: 'bot', text: `Hoi${S.settings.name ? ` ${S.settings.name}` : ''}! Ich bin dein SPHAIR-Coach ✈️ Frag mich alles zu Theorie, Screening oder dem Weg ins Airline-Cockpit.${ai ? '' : '\n\n(Gerade offline – ich antworte mit eingebauten Tipps. Im Claude-Link bin ich automatisch eine echte KI.)'}` });
      if (!ai) Coach.AI.ready.then(() => { if (Coach.AI.enabled && location.hash.startsWith('#coach') && chat.length === 1) { chat = []; route(true); } });
    }
    view.innerHTML = `
<section class="chat-wrap">
  <div class="chat-head"><h1>Coach</h1><span class="pill ${ai ? 'on' : ''}">${ai ? 'KI aktiv' : 'Offline'}</span></div>
  <div class="chat" id="chat"></div>
  <div class="chips">${['Was soll ich heute lernen?', 'Wo bin ich schwach?', 'Erklär mir den Föhn', 'Wie läuft das Screening ab?', 'Stell mir eine Prüfungsfrage', 'Motivier mich!'].map((c) => `<button class="chip">${c}</button>`).join('')}</div>
  <form class="chat-form" id="chatForm"><textarea id="chatIn" rows="1" placeholder="Frag deinen Coach…"></textarea><button class="btn round" aria-label="Senden">➤</button></form>
</section>`;
    const box = $('#chat');
    const draw = () => {
      box.innerHTML = chat.map((m) => `<div class="msg ${m.role}">${m.role === 'bot' ? md(m.text) : `<p>${esc(m.text)}</p>`}</div>`).join('');
      box.scrollTop = box.scrollHeight;
    };
    draw();
    const send = async (text) => {
      text = text.trim();
      if (!text) return;
      chat.push({ role: 'me', text });
      const bot = { role: 'bot', text: '…' };
      chat.push(bot);
      draw();
      const last = box.lastElementChild;
      last.classList.add('typing');
      if (Coach.AI.enabled) {
        try {
          const out = await Coach.AI.ask(text, (partial) => { bot.text = partial; if (last.isConnected) { last.classList.remove('typing'); last.innerHTML = md(partial); box.scrollTop = box.scrollHeight; } });
          bot.text = out || bot.text;
        } catch (e) {
          bot.text = `${await Coach.AI.describeError(e)}\n\n${Coach.offline(text)}`;
        }
      } else {
        await new Promise((r) => setTimeout(r, 350));
        bot.text = Coach.offline(text);
      }
      if (box.isConnected) draw();
    };
    $('#chatForm').addEventListener('submit', (e) => { e.preventDefault(); const v = $('#chatIn').value; $('#chatIn').value = ''; send(v); });
    $('#chatIn').addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('#chatForm').requestSubmit(); } });
    view.querySelectorAll('.chip').forEach((c) => c.addEventListener('click', () => send(c.textContent)));
    if (coachPrefill) { const p = coachPrefill; coachPrefill = ''; send(p); }
  }

  function saveText() {
    return { local: '💾 Wird automatisch auf diesem Gerät gespeichert', loading: '☁️ Lade gespeicherten Stand…', synced: '☁️ Automatisch gespeichert – auch auf deinen anderen Geräten', saving: '☁️ Speichert…', error: '⚠️ Online-Speichern gerade nicht möglich – lokal gesichert' }[S.cloud] || '';
  }

  // ---------- Ansicht: Profil ----------
  function renderProfil() {
    activeTask = null;
    const st = S.settings;
    const d = S.data;
    const lessonsRead = Object.keys(d.lessons).length;
    const totalLessons = C.TOPICS.reduce((a, t) => a + t.lessons.length, 0);
    const runs = Object.values(d.trainers).reduce((a, t) => a + t.runs, 0);
    view.innerHTML = `
<section class="hero"><h1>Profil</h1><p class="muted small" id="saveState">${saveText()}</p></section>
<a class="card review" href="#fragebogen/0"><span class="ticon">📝</span><span class="tt"><b>Fragebogen ${d.profile?.done ? 'bearbeiten' : 'ausfüllen'}</b><small>${d.profile?.done ? `Ziel: ${esc(d.profile.goal || '–')} · ${esc(d.profile.minutes || '')} pro Tag` : 'Damit der Coach dich besser kennt (2 Min.)'}</small></span><span class="chev">›</span></a>
<section class="stats">
  <div class="stat"><b>${S.streakNow()}</b><small>Streak</small></div>
  <div class="stat"><b>${d.streak.best}</b><small>Rekord</small></div>
  <div class="stat"><b>${d.xp}</b><small>XP</small></div>
  <div class="stat"><b>${lessonsRead}/${totalLessons}</b><small>Lektionen</small></div>
  <div class="stat"><b>${runs}</b><small>Trainings</small></div>
  <div class="stat"><b>${d.sims.length}</b><small>Simulationen</small></div>
</section>

<section class="card form">
  <h2>Über dich</h2>
  <label>Vorname<input id="pName" value="${esc(st.name)}" placeholder="z.B. Nils"></label>
  <label>Screening-Datum (falls bekannt)<input id="pDate" type="date" value="${esc(st.screeningDate)}"></label>
  <label>SPHAIR-Flugschule (für die Checkliste)<select id="pSchool"><option value="">Noch nicht bekannt (Beispiel: Bern-Belp)</option>${Object.keys(window.CHECKLISTS || {}).map((k) => `<option value="${esc(k)}">${esc(k)}</option>`).join('')}</select></label>
  <div class="design-pick"><b class="small">Design</b><div class="design-grid">${DESIGNS.map((d) => `<button type="button" class="design-btn" data-design="${d.id}" aria-pressed="${(st.design || 'standard') === d.id}"><span class="sw">${d.c.map((c) => `<i style="background:${c}"></i>`).join('')}</span>${d.name}</button>`).join('')}</div></div>
  <label>Hell / Dunkel<select id="pTheme"><option value="auto">Automatisch</option><option value="light">Hell</option><option value="dark">Dunkel</option></select></label>
</section>

<section class="card form">
  <h2>KI-Coach</h2>
  <p class="muted small">Mit einem eigenen <a href="https://console.anthropic.com/" target="_blank" rel="noopener">Anthropic-API-Schlüssel</a> wird der Coach zu einer echten KI (Claude). Der Schlüssel bleibt nur auf diesem Gerät. Frag deine Eltern, bevor du einen Schlüssel mit Guthaben einrichtest.</p>
  <label class="check"><input type="checkbox" id="pAi" ${st.aiEnabled ? 'checked' : ''}> KI verwenden</label>
  <label>API-Schlüssel<input id="pKey" type="password" value="${esc(st.apiKey)}" placeholder="sk-ant-…" autocomplete="off"></label>
  <label>Modell<select id="pModel">
    <option value="claude-opus-5-5">Claude Opus 5.5 (beste Erklärungen)</option>
    <option value="claude-sonnet-5-5">Claude Sonnet 5.5 (schnell)</option>
    <option value="claude-haiku-5-5">Claude Haiku 5.5 (am günstigsten)</option>
  </select></label>
</section>

<section class="card">
  <h2>Offizielle Quellen</h2>
  <p class="muted small">Die Inhalte basieren auf diesen Seiten. Lade dir die offiziellen Übungstests direkt auf sphair.ch (MySPHAIR) herunter.</p>
  <ul class="sources">${C.SOURCES.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`).join('')}</ul>
</section>

<section class="card form">
  <h2>Daten</h2>
  <p class="muted small">Dein Fortschritt wird auf diesem Gerät gespeichert. Mit «Sichern» kannst du ihn auf ein anderes Gerät mitnehmen.</p>
  <div class="row"><button class="btn ghost" id="pExport">Sichern</button><label class="btn ghost file">Wiederherstellen<input type="file" id="pImport" accept="application/json" hidden></label></div>
  <button class="link-btn danger" id="pReset">Fortschritt zurücksetzen</button>
</section>`;
    $('#pTheme').value = st.theme;
    $('#pSchool').value = st.school || '';
    $('#pSchool').addEventListener('change', (e) => { st.school = e.target.value; S.saveSettings(); toast('Gespeichert'); });
    $('#pModel').value = st.model;
    $('#pName').addEventListener('change', (e) => { st.name = e.target.value.trim(); S.saveSettings(); toast('Gespeichert'); });
    $('#pDate').addEventListener('change', (e) => { st.screeningDate = e.target.value; S.saveSettings(); toast('Gespeichert'); });
    $('#pTheme').addEventListener('change', (e) => { st.theme = e.target.value; S.saveSettings(); applyTheme(); });
    view.querySelectorAll('.design-btn').forEach((b) => b.addEventListener('click', () => {
      st.design = b.dataset.design; S.saveSettings(); applyTheme();
      view.querySelectorAll('.design-btn').forEach((x) => x.setAttribute('aria-pressed', x === b));
      toast(`Design: ${b.textContent.trim()}`);
    }));
    $('#pAi').addEventListener('change', (e) => { st.aiEnabled = e.target.checked; S.saveSettings(); Coach.AI.reset(); });
    $('#pKey').addEventListener('change', (e) => { st.apiKey = e.target.value.trim(); S.saveSettings(); Coach.AI.reset(); chat = []; toast(st.apiKey ? 'Schlüssel gespeichert' : 'Schlüssel entfernt'); });
    $('#pModel').addEventListener('change', (e) => { st.model = e.target.value; S.saveSettings(); Coach.AI.reset(); });
    $('#pExport').addEventListener('click', () => {
      const blob = new Blob([S.exportJson()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `sphair-coach-${S.dayKey()}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    $('#pImport').addEventListener('change', async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      try { S.importJson(await f.text()); applyTheme(); updateTop(); toast('Wiederhergestellt ✓'); renderProfil(); } catch (err) { toast(`Fehler: ${esc(err.message)}`); }
    });
    $('#pReset').addEventListener('click', () => {
      if (confirm('Wirklich allen Fortschritt löschen? Das kann nicht rückgängig gemacht werden.')) { S.reset(); updateTop(); toast('Zurückgesetzt'); renderProfil(); }
    });
  }

  // ---------- Fragebogen (Profil einrichten) ----------
  const SKILLS = [
    ['kopf', 'Kopfrechnen'], ['englisch', 'Englisch'], ['raum', 'Räumliches Vorstellen'], ['technik', 'Physik & Technik'],
    ['konz', 'Konzentration'], ['merken', 'Merkfähigkeit'], ['stress', 'Ruhe unter Stress'],
  ];
  const FB_STEPS = [
    { t: 'Über dich', icon: '👋', f: [
      { id: 'name', type: 'text', label: 'Wie heisst du?', ph: 'Vorname', req: true },
      { id: 'age', type: 'select', label: 'Wie alt bist du?', opts: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24+'] },
      { id: 'schule', type: 'text', label: 'Welche Schule / Klasse?', ph: 'z.B. Gymnasium, 2. Klasse' },
    ] },
    { t: 'Dein Ziel', icon: '🎯', f: [
      { id: 'goal', type: 'radio', label: 'Was willst du werden?', opts: ['Airline-Pilot/-in', 'Militärpilot/-in (Jet)', 'Militärpilot/-in (Helikopter)', 'Noch unsicher'] },
      { id: 'why', type: 'textarea', label: 'Warum willst du Pilot/-in werden? (freiwillig)', ph: 'Was fasziniert dich am Fliegen?' },
    ] },
    { t: 'Dein Stand', icon: '🛫', f: [
      { id: 'sphair', type: 'radio', label: 'Wie weit bist du bei SPHAIR?', opts: ['Noch nicht registriert', 'Registriert (MySPHAIR)', 'Screening gebucht', 'Screening bestanden'] },
      { id: 'screeningDate', type: 'date', label: 'Screening-Datum (falls bekannt)' },
      { id: 'flying', type: 'checks', label: 'Hast du schon Flugerfahrung?', opts: ['Noch nie selbst geflogen', 'Schnupperflug', 'Segelflug', 'Motorflug-Lektionen', 'Flugsimulator am PC', 'Modellflug / Drohnen'] },
      { id: 'englishLevel', type: 'select', label: 'Dein Englisch-Niveau', opts: ['Weiss nicht', 'A2', 'B1', 'B2', 'C1', 'C2'] },
      { id: 'glasses', type: 'radio', label: 'Trägst du eine Brille oder Linsen?', opts: ['Nein', 'Ja'] },
    ] },
    { t: 'Deine Stärken', icon: '💪', hint: 'Schätze dich ehrlich ein – 1 = fällt mir schwer, 5 = kann ich sehr gut. Der Coach und deine Tagesaufgaben richten sich danach.', f: SKILLS.map(([id, label]) => ({ id: `s_${id}`, type: 'scale', label })) },
    { t: 'Wie du lernst', icon: '📚', f: [
      { id: 'minutes', type: 'radio', label: 'Wie viel Zeit hast du pro Tag?', opts: ['5 Minuten', '10 Minuten', '20 Minuten', '30+ Minuten'] },
      { id: 'when', type: 'radio', label: 'Wann lernst du am liebsten?', opts: ['Am Morgen', 'Nach der Schule', 'Am Abend', 'Unterschiedlich'] },
      { id: 'style', type: 'radio', label: 'Wie soll der Coach erklären?', opts: ['Kurz und knapp', 'Ausführlich mit Beispielen'] },
      { id: 'tone', type: 'radio', label: 'Wie soll der Coach mit dir reden?', opts: ['Locker wie ein Kollege', 'Motivierend wie ein Trainer', 'Sachlich wie ein Fluglehrer'] },
      { id: 'hard', type: 'textarea', label: 'Was fällt dir schwer oder macht dir Sorgen? (freiwillig)', ph: 'z.B. Nervosität bei Prüfungen, Mathe, …' },
    ] },
    { t: 'Dein Look', icon: '🎨', design: true, f: [] },
  ];

  function renderFragebogen(stepArg) {
    const p = (S.data.profile ||= {});
    if (!p.name && S.settings.name) p.name = S.settings.name;
    const step = Math.min(FB_STEPS.length - 1, Math.max(0, Number(stepArg) || 0));
    const st = FB_STEPS[step];
    const first = !S.settings.onboarded;
    const val = (id) => p[id] ?? '';
    const field = (f) => {
      if (f.type === 'text') return `<label>${f.label}<input id="f_${f.id}" value="${esc(val(f.id))}" placeholder="${esc(f.ph || '')}" autocomplete="off"></label>`;
      if (f.type === 'date') return `<label>${f.label}<input id="f_${f.id}" type="date" value="${esc(val(f.id))}"></label>`;
      if (f.type === 'textarea') return `<label>${f.label}<textarea id="f_${f.id}" rows="3" placeholder="${esc(f.ph || '')}">${esc(val(f.id))}</textarea></label>`;
      if (f.type === 'select') return `<label>${f.label}<select id="f_${f.id}">${f.opts.map((o) => `<option ${val(f.id) === o ? 'selected' : ''}>${o}</option>`).join('')}</select></label>`;
      if (f.type === 'radio') return `<fieldset class="fb-choice"><legend>${f.label}</legend>${f.opts.map((o) => `<label class="chip-opt"><input type="radio" name="f_${f.id}" value="${esc(o)}" ${val(f.id) === o ? 'checked' : ''}><span>${o}</span></label>`).join('')}</fieldset>`;
      if (f.type === 'checks') return `<fieldset class="fb-choice"><legend>${f.label}</legend>${f.opts.map((o) => `<label class="chip-opt"><input type="checkbox" name="f_${f.id}" value="${esc(o)}" ${(p[f.id] || []).includes(o) ? 'checked' : ''}><span>${o}</span></label>`).join('')}</fieldset>`;
      if (f.type === 'scale') return `<fieldset class="fb-scale"><legend>${f.label}</legend><div>${[1, 2, 3, 4, 5].map((n) => `<label><input type="radio" name="f_${f.id}" value="${n}" ${Number(val(f.id)) === n ? 'checked' : ''}><span>${n}</span></label>`).join('')}</div></fieldset>`;
      return '';
    };
    view.innerHTML = `
${first && step === 0 ? `<section class="welcome compact"><img src="icons/icon.svg" alt="" width="64" height="64"><h1>Willkommen beim SPHAIR Coach</h1><p class="muted">Richte zuerst dein Profil ein (ca. 2 Minuten). Damit passen Tagesaufgaben und Coach genau zu dir. Alles wird automatisch gespeichert.</p></section>` : (first ? '' : '<a class="back" href="#profil">‹ Profil</a>')}
<div class="fb-steps" aria-label="Schritt ${step + 1} von ${FB_STEPS.length}">${FB_STEPS.map((x, i) => `<i class="${i < step ? 'done' : i === step ? 'on' : ''}"></i>`).join('')}</div>
<form class="card form fb" id="fbForm">
  <h2>${st.icon} ${st.t}</h2>
  ${st.hint ? `<p class="muted small">${st.hint}</p>` : ''}
  ${st.f.map(field).join('')}
  ${st.design ? `<p class="muted small">Wähle ein Design – du kannst es später im Profil jederzeit ändern.</p><div class="design-grid">${DESIGNS.map((d) => `<button type="button" class="design-btn" data-design="${d.id}" aria-pressed="${(S.settings.design || 'standard') === d.id}"><span class="sw">${d.c.map((c) => `<i style="background:${c}"></i>`).join('')}</span>${d.name}</button>`).join('')}</div>` : ''}
  <p class="fb-err" id="fbErr" hidden></p>
  <div class="row two-btn">
    ${step > 0 ? '<button type="button" class="btn ghost" id="fbBack">‹ Zurück</button>' : '<span></span>'}
    <button class="btn" id="fbNext">${step < FB_STEPS.length - 1 ? 'Weiter ›' : (first ? 'Los geht\'s ✈️' : 'Fertig ✓')}</button>
  </div>
</form>`;
    const collect = () => {
      for (const f of st.f) {
        if (f.type === 'radio' || f.type === 'scale') {
          const c = view.querySelector(`input[name="f_${f.id}"]:checked`);
          if (c) p[f.id] = f.type === 'scale' ? Number(c.value) : c.value;
        } else if (f.type === 'checks') {
          p[f.id] = [...view.querySelectorAll(`input[name="f_${f.id}"]:checked`)].map((x) => x.value);
        } else {
          const el = $(`#f_${f.id}`);
          if (el) p[f.id] = el.value.trim();
        }
      }
      if (p.name) S.settings.name = p.name;
      if (p.screeningDate !== undefined) S.settings.screeningDate = p.screeningDate || S.settings.screeningDate;
      S.save();
    };
    // jede Änderung sofort speichern
    view.querySelector('#fbForm').addEventListener('change', collect);
    view.querySelectorAll('.design-btn').forEach((b) => b.addEventListener('click', () => {
      S.settings.design = b.dataset.design; S.saveSettings(); applyTheme();
      view.querySelectorAll('.design-btn').forEach((x) => x.setAttribute('aria-pressed', x === b));
    }));
    $('#fbBack')?.addEventListener('click', () => { collect(); go(`#fragebogen/${step - 1}`); });
    $('#fbForm').addEventListener('submit', (e) => {
      e.preventDefault();
      collect();
      const missing = st.f.find((f) => f.req && !p[f.id]);
      if (missing) { const er = $('#fbErr'); er.hidden = false; er.textContent = 'Bitte gib noch deinen Namen ein.'; return; }
      if (step < FB_STEPS.length - 1) return go(`#fragebogen/${step + 1}`);
      p.done = S.dayKey();
      S.settings.onboarded = true;
      S.save();
      Coach.AI.reset();
      celebrate(`Profil gespeichert! Willkommen an Bord, ${esc(p.name || '')} ✈️`);
      go('#heute');
    });
    const firstInput = view.querySelector('#fbForm input, #fbForm select');
    if (firstInput && step === 0 && !p.name) firstInput.focus();
  }

  // ---------- Router ----------
  function go(hash) {
    if (location.hash === hash) route(true);
    else location.hash = hash;
  }

  function route(force) {
    if (cleanup) { try { cleanup(); } catch { /* ignorieren */ } cleanup = null; }
    view.onkeydown = null;
    const [page, a, b, c] = (location.hash.slice(1) || 'heute').split('/');
    const tab = { heute: 'heute', lernen: 'lernen', thema: 'lernen', checkliste: 'lernen', heft: 'lernen', kapitel: 'lernen', plan: 'lernen', session: 'lernen', fragebogen: 'profil', seite: 'lernen', doc: 'lernen', kf: 'lernen', lektion: 'lernen', quiz: 'lernen', training: 'training', simulation: 'training', coach: 'coach', profil: 'profil' }[page] || 'heute';
    document.querySelectorAll('.tabs a').forEach((x) => x.classList.toggle('active', x.dataset.tab === tab));
    document.body.classList.toggle('in-chat', page === 'coach');
    document.body.classList.toggle('in-viewer', page === 'seite' || page === 'doc' || page === 'kapitel' || (page === 'session' && /^\d+$/.test(b || '') && typeof PLAN[a - 1]?.u[b - 1] === 'number'));
    if (!S.settings.onboarded && page !== 'fragebogen') {
      if (S.cloud === 'loading') { view.innerHTML = '<p class="muted" style="padding:60px 0;text-align:center">Lade deinen Fortschritt…</p>'; return; }
      return renderFragebogen(0);
    }
    switch (page) {
      case 'lernen': renderLernen(); break;
      case 'thema': renderThema(a); break;
      case 'lektion': renderLektion(a, b); break;
      case 'quiz': renderQuiz(a, b); break;
      case 'training': a ? renderTrainer(a) : renderTraining(); break;
      case 'simulation': renderSimulation(); break;
      case 'checkliste': renderCheckliste(); break;
      case 'heft': renderHeft(a, b); break;
      case 'seite': renderSeite(a); break;
      case 'kapitel': renderKapitel(a, b); break;
      case 'plan': renderPlan(); break;
      case 'session': renderSessionRoute(a, b); break;
      case 'doc': renderDoc(a, b, c); break;
      case 'kf': renderKf(a); break;
      case 'coach': renderCoach(); break;
      case 'profil': renderProfil(); break;
      case 'fragebogen': renderFragebogen(a); break;
      default: renderHeute();
    }
    if (!force) window.scrollTo(0, 0);
    updateTop();
  }

  window.addEventListener('hashchange', () => route());
  // Neuer Tag während die App offen ist → Ansicht neu laden
  document.addEventListener('visibilitychange', () => { if (!document.hidden && (location.hash || '#heute') === '#heute') route(true); });
  applyTheme();
  // Gespeicherten Stand laden (im Claude-Link aus dem privaten Speicher) und danach neu anzeigen
  S.onCloud(() => { const el = document.getElementById('saveState'); if (el) el.textContent = saveText(); });
  window.addEventListener('store:loaded', () => { applyTheme(); route(true); toast('☁️ Dein Fortschritt wurde geladen'); });
  const cloudStart = S.connectCloud();
  route();
  cloudStart.finally(() => { if (!S.settings.onboarded) route(true); });
  setTimeout(() => { if (!S.settings.onboarded && S.cloud === 'loading') route(true); }, 6000);

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
