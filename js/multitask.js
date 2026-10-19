// Multitasking-Trainer: Punkt in der Mitte halten + gleichzeitig auf Zahlen und Warnlampe reagieren
(() => {
  function run(root, { seconds = 60 } = {}, done) {
    root.innerHTML = `
<div class="mt">
  <div class="mt-head"><span id="mtTime">${seconds}s</span><span id="mtNum" class="mt-num"></span><span id="mtLamp" class="mt-lamp"></span></div>
  <canvas id="mtCanvas" width="320" height="320" aria-label="Tracking-Feld"></canvas>
  <div class="mt-btns">
    <button class="btn" data-k="even">Gerade <kbd>A</kbd></button>
    <button class="btn warn" data-k="warn">Warnung <kbd>Leertaste</kbd></button>
    <button class="btn" data-k="odd">Ungerade <kbd>L</kbd></button>
  </div>
  <p class="hint">Halte den Punkt im Ring (ziehen auf dem Feld oder Pfeiltasten). Zahl erscheint → gerade/ungerade. Lampe rot → Warnung.</p>
</div>`;
    const cv = root.querySelector('#mtCanvas');
    const ctx = cv.getContext('2d');
    const css = getComputedStyle(document.documentElement);
    const col = (n) => css.getPropertyValue(n).trim();

    let x = 0, y = 0, vx = 0, vy = 0; // Position relativ zur Mitte
    let jx = 0, jy = 0;               // Steuereingabe
    let dist = { x: 0, y: 0, tx: 0, ty: 0 };
    let inTime = 0, total = 0, hits = 0, events = 0;
    let task = null, lampOn = false, lampAt = 0, nextTask = 2, nextLamp = 5;
    const keys = new Set();
    const start = performance.now();
    let last = start, raf, ended = false;

    const setTask = (now) => {
      const n = 1 + Math.floor(Math.random() * 9);
      task = { n, at: now };
      events++;
      root.querySelector('#mtNum').textContent = n;
    };
    const answer = (k) => {
      const now = performance.now();
      if (k === 'warn') {
        if (lampOn) { hits++; lampOn = false; flash(true); } else flash(false);
      } else if (task) {
        const ok = (task.n % 2 === 0) === (k === 'even');
        if (ok) hits++;
        flash(ok);
        task = null;
        root.querySelector('#mtNum').textContent = '';
      } else flash(false);
      lampRender();
      return now;
    };
    const flash = (ok) => {
      cv.classList.remove('ok', 'bad');
      void cv.offsetWidth;
      cv.classList.add(ok ? 'ok' : 'bad');
    };
    const lampRender = () => root.querySelector('#mtLamp').classList.toggle('on', lampOn);

    root.querySelectorAll('[data-k]').forEach((b) => b.addEventListener('click', () => answer(b.dataset.k)));
    const onKey = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) { e.preventDefault(); e.type === 'keydown' ? keys.add(e.key) : keys.delete(e.key); }
      if (e.type === 'keydown' && !e.repeat) {
        if (e.key === 'a' || e.key === 'A') answer('even');
        if (e.key === 'l' || e.key === 'L') answer('odd');
        if (e.key === ' ') { e.preventDefault(); answer('warn'); }
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);

    // Joystick: Ziehen auf dem Feld
    let drag = null;
    cv.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY }; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', (e) => { if (drag) { jx = Math.max(-1, Math.min(1, (e.clientX - drag.x) / 60)); jy = Math.max(-1, Math.min(1, (e.clientY - drag.y) / 60)); } });
    const end = () => { drag = null; jx = 0; jy = 0; };
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = (now - start) / 1000;
      const left = Math.max(0, seconds - t);
      root.querySelector('#mtTime').textContent = `${Math.ceil(left)}s`;

      // Störung ändert sich langsam (wird mit der Zeit stärker)
      if (Math.random() < dt * 0.8) { const s = 70 + t * 1.5; dist.tx = (Math.random() - 0.5) * s; dist.ty = (Math.random() - 0.5) * s; }
      dist.x += (dist.tx - dist.x) * dt; dist.y += (dist.ty - dist.y) * dt;
      let kx = jx, ky = jy;
      if (keys.has('ArrowLeft')) kx -= 1;
      if (keys.has('ArrowRight')) kx += 1;
      if (keys.has('ArrowUp')) ky -= 1;
      if (keys.has('ArrowDown')) ky += 1;
      vx += (dist.x + kx * 140 - vx) * dt * 3;
      vy += (dist.y + ky * 140 - vy) * dt * 3;
      x = Math.max(-150, Math.min(150, x + vx * dt));
      y = Math.max(-150, Math.min(150, y + vy * dt));

      total += dt;
      if (Math.hypot(x, y) < 30) inTime += dt;

      // Nebenaufgaben
      if (!task && t > nextTask) { setTask(now); nextTask = t + 2.5 + Math.random() * 2; }
      if (task && now - task.at > 2200) { task = null; root.querySelector('#mtNum').textContent = ''; flash(false); }
      if (!lampOn && t > nextLamp) { lampOn = true; lampAt = now; events++; nextLamp = t + 5 + Math.random() * 6; lampRender(); }
      if (lampOn && now - lampAt > 2500) { lampOn = false; lampRender(); flash(false); }

      draw();
      if (left <= 0) return finish();
      raf = requestAnimationFrame(frame);
    }

    function draw() {
      const w = cv.width, h = cv.height, cx = w / 2, cy = h / 2;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = col('--line'); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
      ctx.strokeStyle = col('--accent'); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.stroke();
      const inside = Math.hypot(x, y) < 30;
      ctx.fillStyle = inside ? col('--good') : col('--bad');
      ctx.beginPath(); ctx.arc(cx + x, cy + y, 9, 0, Math.PI * 2); ctx.fill();
    }

    function finish() {
      if (ended) return;
      ended = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKey);
      const track = total ? inTime / total : 0;
      const react = events ? hits / events : 0;
      const score = Math.round((0.6 * track + 0.4 * Math.min(1, react)) * 100);
      done(score, `Tracking ${Math.round(track * 100)} % · Reaktionen ${hits}/${events}`);
    }

    raf = requestAnimationFrame(frame);
    return () => { ended = true; cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKey); };
  }

  window.Multitask = { run };
})();
