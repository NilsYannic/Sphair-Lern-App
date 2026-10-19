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

  function applyTheme() {
    const th = S.settings.theme;
    if (th === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', th);
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
    if (day.plan) return day.plan;
    const seed = seedOf(S.dayKey());
    const nl = nextLesson();
    const trainers = T.TRAINERS;
    const tr = trainers[seed % trainers.length];
    const wt = weakestTopic();
    day.plan = [
      nl
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

<section class="card streak-card">
  <div class="streak-num"><span class="flame ${day.complete ? 'lit' : ''}">🔥</span><div><b>${streak}</b><small>${streak === 1 ? 'Tag' : 'Tage'} Streak</small></div></div>
  <div class="week">${week.map((d) => `<div class="wd ${d.done ? 'done' : ''} ${d.today ? 'today' : ''}"><span>${d.done ? '✓' : ''}</span><small>${d.label}</small></div>`).join('')}</div>
  <p class="muted small">${day.complete ? 'Heute erledigt – stark! Morgen geht\'s weiter.' : 'Erledige alle 3 Tagesaufgaben, damit deine Streak wächst.'} Rekord: ${S.data.streak.best}</p>
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
    view.querySelectorAll('[data-task]').forEach((a) => a.addEventListener('click', () => { activeTask = a.dataset.task; }));
  }

  // ---------- Ansicht: Lernen ----------
  function renderLernen() {
    activeTask = null;
    view.innerHTML = `
<section class="hero"><h1>Lernen</h1><p class="muted">Die Theorie für Flugkurs und Airline-Weg. Lies die Lektionen, dann festigt das Quiz dein Wissen.</p></section>
<a class="card review" href="#checkliste"><span class="ticon">📋</span><span class="tt"><b>Checkliste deiner Flugschule</b><small>${esc(T.checklistOf().key)} – offizielle SPHAIR-Checkliste</small></span><span class="chev">›</span></a>
<a class="card review" href="#quiz/all"><span class="ticon">🔁</span><span class="tt"><b>Fällige Karten wiederholen</b><small>${dueAll().length} Fragen sind heute dran</small></span><span class="chev">›</span></a>
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
      chat.push({ role: 'bot', text: `Hoi${S.settings.name ? ` ${S.settings.name}` : ''}! Ich bin dein SPHAIR-Coach ✈️ Frag mich alles zu Theorie, Screening oder dem Weg ins Airline-Cockpit.${ai ? '' : '\n\n(Offline-Modus – für echte KI-Gespräche trag im **Profil** einen API-Schlüssel ein.)'}` });
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

  // ---------- Ansicht: Profil ----------
  function renderProfil() {
    activeTask = null;
    const st = S.settings;
    const d = S.data;
    const lessonsRead = Object.keys(d.lessons).length;
    const totalLessons = C.TOPICS.reduce((a, t) => a + t.lessons.length, 0);
    const runs = Object.values(d.trainers).reduce((a, t) => a + t.runs, 0);
    view.innerHTML = `
<section class="hero"><h1>Profil</h1></section>
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
  <label>Darstellung<select id="pTheme"><option value="auto">Automatisch</option><option value="light">Hell</option><option value="dark">Dunkel</option></select></label>
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

  // ---------- Willkommen ----------
  function renderWelcome() {
    view.innerHTML = `
<section class="welcome">
  <img src="icons/icon.svg" alt="" width="84" height="84">
  <h1>Willkommen beim SPHAIR Coach</h1>
  <p class="muted">Dein Trainingspartner auf dem Weg ins Airline-Cockpit. Jeden Tag ein paar Minuten – und du bist bereit fürs Screening.</p>
  <ul class="feat">
    <li><span>📖</span>Alle Theorie-Themen für Flugkurs & Airline</li>
    <li><span>🎯</span>Trainer für jeden Screening-Test</li>
    <li><span>🔥</span>Tagesaufgaben & Streak</li>
    <li><span>💬</span>Persönlicher KI-Coach</li>
  </ul>
  <label class="name-in">Wie heisst du?<input id="wName" placeholder="Vorname"></label>
  <button class="btn wide" id="wGo">Los geht's ✈️</button>
</section>`;
    $('#wGo').addEventListener('click', () => {
      S.settings.name = $('#wName').value.trim();
      S.settings.onboarded = true;
      S.saveSettings();
      go('#heute');
    });
  }

  // ---------- Router ----------
  function go(hash) {
    if (location.hash === hash) route(true);
    else location.hash = hash;
  }

  function route(force) {
    if (cleanup) { try { cleanup(); } catch { /* ignorieren */ } cleanup = null; }
    view.onkeydown = null;
    const [page, a, b] = (location.hash.slice(1) || 'heute').split('/');
    const tab = { heute: 'heute', lernen: 'lernen', thema: 'lernen', checkliste: 'lernen', lektion: 'lernen', quiz: 'lernen', training: 'training', simulation: 'training', coach: 'coach', profil: 'profil' }[page] || 'heute';
    document.querySelectorAll('.tabs a').forEach((x) => x.classList.toggle('active', x.dataset.tab === tab));
    document.body.classList.toggle('in-chat', page === 'coach');
    if (!S.settings.onboarded) return renderWelcome();
    switch (page) {
      case 'lernen': renderLernen(); break;
      case 'thema': renderThema(a); break;
      case 'lektion': renderLektion(a, b); break;
      case 'quiz': renderQuiz(a, b); break;
      case 'training': a ? renderTrainer(a) : renderTraining(); break;
      case 'simulation': renderSimulation(); break;
      case 'checkliste': renderCheckliste(); break;
      case 'coach': renderCoach(); break;
      case 'profil': renderProfil(); break;
      default: renderHeute();
    }
    if (!force) window.scrollTo(0, 0);
    updateTop();
  }

  window.addEventListener('hashchange', () => route());
  // Neuer Tag während die App offen ist → Ansicht neu laden
  document.addEventListener('visibilitychange', () => { if (!document.hidden && (location.hash || '#heute') === '#heute') route(true); });
  applyTheme();
  route();

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
