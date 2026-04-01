// ════════════════ PLAN SEMANAL A/B COMPONENT ════════════════
(function() {

const STYLES = `
.pab-subtabs { display: flex; gap: 0; margin-bottom: 1rem; border-bottom: 1px solid var(--border, #2c2c36); overflow-x: auto; }
.pab-subtab { padding: 8px 16px; font-size: 13px; font-weight: 600; cursor: pointer; border-bottom: 2px solid transparent; color: #72728a; white-space: nowrap; transition: all 0.12s; background: none; border-top: none; border-left: none; border-right: none; }
.pab-subtab.active { color: #7a9e50; border-bottom-color: #7a9e50; }
.pab-pane { display: none; }
.pab-pane.active { display: block; }
.pab-intro { font-size: 13px; color: #a0a0b0; line-height: 1.6; padding: 10px 14px; background: #1a1a1f; border-radius: 8px; margin-bottom: 1.25rem; border-left: 3px solid #7a9e50; }
.pab-day-grid { display: flex; flex-direction: column; gap: 8px; margin-bottom: 1.25rem; }
.pab-day-card { background: #131316; border: 1px solid #2c2c36; border-radius: 12px; overflow: hidden; transition: border-color 0.2s; }
.pab-day-card.pab-today { border: 2px solid #7a9e50; }
.pab-day-card.pab-today .pab-day-header { background: #1a2a14; }
.pab-today-label { font-size: 10px; font-weight: 700; color: #7a9e50; background: #173404; padding: 1px 8px; border-radius: 10px; margin-left: 8px; }
.pab-day-header { background: #1a1a1f; padding: 8px 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 4px; }
.pab-day-name { font-weight: 600; font-size: 13px; color: #e2e2ea; }
.pab-day-cook { font-size: 11px; color: #7a9e50; }
.pab-day-meals { padding: 8px 14px 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 520px) { .pab-day-meals { grid-template-columns: 1fr; } }
.pab-meal-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: #72728a; margin-bottom: 3px; }
.pab-meal-main { font-size: 13px; font-weight: 600; color: #e2e2ea; line-height: 1.35; }
.pab-meal-side { font-size: 12px; color: #72728a; margin-top: 2px; line-height: 1.4; }
.pab-badge { display: inline-block; font-size: 10px; padding: 1px 7px; border-radius: 10px; margin-top: 4px; font-weight: 500; }
.pab-badge-reuse { background: #173404; color: #c0dd97; }
.pab-badge-cook { background: #412402; color: #fac775; }
.pab-badge-easy { background: #042c53; color: #85b7eb; }
.pab-badge-free { background: #26215c; color: #afa9ec; }
.pab-section-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: #72728a; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #2c2c36; margin-top: 1.25rem; }
.pab-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 1rem; }
.pab-g3 { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 8px; margin-bottom: 1rem; }
@media (max-width: 520px) { .pab-g2 { grid-template-columns: 1fr; } .pab-g3 { grid-template-columns: 1fr 1fr; } }
.pab-card { background: #131316; border: 1px solid #2c2c36; border-radius: 8px; padding: 10px 12px; }
.pab-card-title { font-weight: 600; font-size: 13px; color: #e2e2ea; margin-bottom: 4px; }
.pab-card-sub { font-size: 11px; color: #7a9e50; margin-bottom: 5px; }
.pab-card-body { font-size: 12px; color: #a0a0b0; line-height: 1.55; }
.pab-note { font-size: 12px; color: #a0a0b0; background: #1a1a1f; border-radius: 8px; padding: 10px 14px; line-height: 1.6; margin-bottom: 1rem; }
.pab-month-row { display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 6px; margin-bottom: 1.25rem; }
.pab-mc { text-align: center; padding: 10px 6px; border-radius: 8px; font-size: 13px; font-weight: 600; }
.pab-mc-a { background: #173404; color: #c0dd97; }
.pab-mc-b { background: #042c53; color: #85b7eb; }
.pab-mc-c { background: #412402; color: #fac775; }
.pab-shop-intro { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 8px; }
.pab-shop-intro p { font-size: 13px; color: #a0a0b0; line-height: 1.5; }
.pab-clear-btn { font-size: 12px; color: #72728a; border: 1px solid #2c2c36; background: none; border-radius: 6px; padding: 4px 12px; cursor: pointer; }
.pab-shop-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; margin-bottom: 1rem; }
@media (max-width: 600px) { .pab-shop-grid { grid-template-columns: 1fr; } }
.pab-shop-sec { background: #131316; border: 1px solid #2c2c36; border-radius: 10px; overflow: hidden; }
.pab-shop-head { background: #1a1a1f; padding: 8px 14px; font-weight: 600; font-size: 13px; color: #e2e2ea; border-bottom: 1px solid #2c2c36; display: flex; justify-content: space-between; align-items: center; }
.pab-shop-count { font-size: 11px; font-weight: 400; color: #72728a; }
.pab-shop-body { padding: 4px 14px 10px; }
.pab-shop-item { display: flex; justify-content: space-between; align-items: baseline; padding: 6px 0; border-bottom: 1px solid #1e1e24; cursor: pointer; gap: 8px; transition: opacity 0.12s; }
.pab-shop-item:last-child { border-bottom: none; }
.pab-shop-item.done { opacity: 0.35; text-decoration: line-through; }
.pab-shop-n { font-size: 12.5px; color: #e2e2ea; flex: 1; }
.pab-shop-q { font-size: 11px; font-weight: 600; color: #7a9e50; white-space: nowrap; }
.pab-shop-q.var { color: #fac775; }
`;

// ── Week A/B calculation ──
// Week 1=A, 2=B, 3=A, 4=B, 5=A (odd=A, even=B)
function getWeekOfMonth(date) {
  const d = new Date(date);
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
  return Math.ceil((d.getDate() + firstDay.getDay()) / 7);
}

function getCurrentWeekType() {
  const week = getWeekOfMonth(new Date());
  return week % 2 === 1 ? 'A' : 'B';
}

// 0=Lunes..6=Domingo (JS getDay: 0=Sun, 1=Mon..6=Sat)
function getTodayIndex() {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

let pabShop = {};
let pabDone = JSON.parse(localStorage.getItem('shop_ab_done') || '{}');
let pabWeeksData = null;

function savePabDone() { localStorage.setItem('shop_ab_done', JSON.stringify(pabDone)); }

function renderWeek(week, weekType) {
  const todayIdx = getTodayIndex();
  const isCurrentWeek = getCurrentWeekType() === weekType;
  const isWeekend = todayIdx >= 5;

  return `
    <div class="pab-intro">${week.intro}</div>
    <div class="pab-day-grid">
      ${week.days.map((d, i) => {
        const isToday = isCurrentWeek && i === todayIdx;
        return `
        <div class="pab-day-card${isToday ? ' pab-today' : ''}">
          <div class="pab-day-header">
            <span class="pab-day-name">${d.name}${isToday ? '<span class="pab-today-label">HOY</span>' : ''}</span>
            <span class="pab-day-cook">${/^(Sin|Rápido|Sobrante)/.test(d.cookNote) ? '✓ ' : '🍳 '}${d.cookNote}</span>
          </div>
          <div class="pab-day-meals">
            ${Object.entries(d.meals).map(([meal, m]) => `
              <div>
                <div class="pab-meal-label">${meal === 'almuerzo' ? 'Almuerzo' : 'Cena'}</div>
                <div class="pab-meal-main">${m.main}</div>
                <div class="pab-meal-side">${m.side}</div>
                <span class="pab-badge pab-badge-${m.badge}">${m.badge === 'reuse' ? '🔄 ' : ''}${m.badgeText}</span>
              </div>
            `).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>
    <div class="pab-section-title">Fin de semana</div>
    <div class="pab-g2">
      <div class="pab-card${isCurrentWeek && todayIdx === 5 ? ' pab-today' : ''}"><div class="pab-card-title">Sábado${isCurrentWeek && todayIdx === 5 ? '<span class="pab-today-label">HOY</span>' : ''}</div><div class="pab-card-body"><strong>Almuerzo:</strong> ${week.weekend.sabado.almuerzo}<br><strong>Cena:</strong> ${week.weekend.sabado.cena}</div></div>
      <div class="pab-card${isCurrentWeek && todayIdx === 6 ? ' pab-today' : ''}"><div class="pab-card-title">Domingo${isCurrentWeek && todayIdx === 6 ? '<span class="pab-today-label">HOY</span>' : ''}</div><div class="pab-card-body"><strong>Almuerzo:</strong> ${week.weekend.domingo.almuerzo}<br><strong>Cena:</strong> ${week.weekend.domingo.cena}</div></div>
    </div>
    <div class="pab-note"><strong>${week.note}</strong></div>
  `;
}

function renderLogic(logic) {
  const rotClasses = ['pab-mc-a', 'pab-mc-b', 'pab-mc-a', 'pab-mc-b', 'pab-mc-c'];
  return `
    <div class="pab-intro">${logic.intro}</div>
    <div class="pab-section-title">Regla por proteína</div>
    <div class="pab-g2">
      ${logic.proteinRules.map(r => `<div class="pab-card"><div class="pab-card-title">${r.title}</div><div class="pab-card-sub">${r.sub}</div><div class="pab-card-body">${r.body.replace(/\n/g, '<br>')}</div></div>`).join('')}
    </div>
    <div class="pab-section-title">Opciones de cena de ensalada (sin cocción o casi)</div>
    <div class="pab-g3">
      ${logic.saladOptions.map(s => `<div class="pab-card"><div class="pab-card-title">${s.title}</div><div class="pab-card-body">${s.body}</div></div>`).join('')}
    </div>
    <div class="pab-section-title">Alternancia en el mes</div>
    <div class="pab-month-row">
      ${logic.monthRotation.map((w, i) => `<div class="pab-mc ${rotClasses[i]}">Sem ${i+1}<br>${w}</div>`).join('')}
    </div>
    <div class="pab-note">${logic.monthNote}</div>
  `;
}

function renderPabShop() {
  const grid = document.getElementById('pabShopGrid');
  if (!grid) return;
  grid.innerHTML = '';
  Object.entries(pabShop).forEach(([cat, items]) => {
    const doneCount = items.filter((_, i) => pabDone[cat + '_' + i]).length;
    const sec = document.createElement('div');
    sec.className = 'pab-shop-sec';
    sec.innerHTML = `
      <div class="pab-shop-head">
        <span>${cat}</span>
        <span class="pab-shop-count">${doneCount}/${items.length}</span>
      </div>
      <div class="pab-shop-body">
        ${items.map((item, i) => {
          const key = cat + '_' + i;
          const isDone = !!pabDone[key];
          return `<div class="pab-shop-item${isDone ? ' done' : ''}" onclick="pabToggle('${key.replace(/'/g, "\\'")}', this)">
            <span class="pab-shop-n">${item.n}</span>
            <span class="pab-shop-q${item.v ? ' var' : ''}">${item.q}</span>
          </div>`;
        }).join('')}
      </div>`;
    grid.appendChild(sec);
  });
}

// Expose toggle/clear to global scope for onclick handlers
window.pabToggle = function(key, el) {
  pabDone[key] = !pabDone[key];
  savePabDone();
  el.classList.toggle('done', !!pabDone[key]);
  const sec = el.closest('.pab-shop-sec');
  const total = sec.querySelectorAll('.pab-shop-item').length;
  const doneN = sec.querySelectorAll('.pab-shop-item.done').length;
  sec.querySelector('.pab-shop-count').textContent = doneN + '/' + total;
};

window.pabClearShop = function() {
  pabDone = {};
  savePabDone();
  renderPabShop();
};

window.pabShowSub = function(id, el) {
  document.querySelectorAll('.pab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.pab-subtab').forEach(t => t.classList.remove('active'));
  document.getElementById('pab-' + id).classList.add('active');
  el.classList.add('active');
};

// ── Init ──
window.initPlanAB = async function() {
  const container = document.getElementById('pane-planab');
  if (!container || container.dataset.loaded) return;
  container.dataset.loaded = 'true';

  // Inject styles
  if (!document.getElementById('pab-styles')) {
    const style = document.createElement('style');
    style.id = 'pab-styles';
    style.textContent = STYLES;
    document.head.appendChild(style);
  }

  // Load data
  const [weeks, logic, shopping] = await Promise.all([
    fetch('data/plan-ab-weeks.json').then(r => r.json()),
    fetch('data/plan-ab-logic.json').then(r => r.json()),
    fetch('data/plan-ab-shopping.json').then(r => r.json()),
  ]);

  // Build shopping data
  for (const [cat, items] of Object.entries(shopping.categories)) {
    pabShop[cat] = items.map(i => ({ n: i.name, q: i.quantity, v: i.variable || false }));
  }

  // Store for planner tab
  pabWeeksData = weeks;

  // Determine current week
  const currentType = getCurrentWeekType();
  const isA = currentType === 'A';

  // Render
  container.innerHTML = `
    <div style="margin-bottom: 12px;">
      <span style="font-size: 12px; color: #72728a;">Semana actual:</span>
      <span style="font-size: 13px; font-weight: 700; color: #7a9e50; margin-left: 4px;">Semana ${currentType}</span>
    </div>
    <div class="pab-subtabs">
      <button class="pab-subtab${isA ? ' active' : ''}" onclick="pabShowSub('A', this)">Semana A</button>
      <button class="pab-subtab${!isA ? ' active' : ''}" onclick="pabShowSub('B', this)">Semana B</button>
      <button class="pab-subtab" onclick="pabShowSub('logica', this)">Lógica</button>
      <button class="pab-subtab" onclick="pabShowSub('compras', this)">🛒 Compras</button>
    </div>
    <div id="pab-A" class="pab-pane${isA ? ' active' : ''}">${renderWeek(weeks.weekA, 'A')}</div>
    <div id="pab-B" class="pab-pane${!isA ? ' active' : ''}">${renderWeek(weeks.weekB, 'B')}</div>
    <div id="pab-logica" class="pab-pane">${renderLogic(logic)}</div>
    <div id="pab-compras" class="pab-pane">
      <div class="pab-shop-intro">
        <p>${shopping.intro}</p>
        <button class="pab-clear-btn" onclick="pabClearShop()">↺ Reiniciar</button>
      </div>
      <div class="pab-shop-grid" id="pabShopGrid"></div>
      <div class="pab-note">${shopping.note}</div>
    </div>
  `;

  renderPabShop();

  // Scroll to today's card
  setTimeout(() => {
    const todayCard = container.querySelector('.pab-today');
    if (todayCard) todayCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
};

// ── Get today's plan for the Planner tab ──
window.getTodayPlan = async function() {
  if (!pabWeeksData) {
    pabWeeksData = await fetch('data/plan-ab-weeks.json').then(r => r.json());
  }
  const weekType = getCurrentWeekType();
  const week = weekType === 'A' ? pabWeeksData.weekA : pabWeeksData.weekB;
  const todayIdx = getTodayIndex();

  if (todayIdx < 5) {
    // Weekday
    return { weekType, dayName: DAY_NAMES[todayIdx], meals: week.days[todayIdx].meals, cookNote: week.days[todayIdx].cookNote };
  } else {
    // Weekend
    const wknd = todayIdx === 5 ? week.weekend.sabado : week.weekend.domingo;
    return {
      weekType,
      dayName: DAY_NAMES[todayIdx],
      meals: {
        almuerzo: { main: wknd.almuerzo, side: '', badge: 'easy', badgeText: 'fin de semana' },
        cena: { main: wknd.cena, side: '', badge: 'free', badgeText: 'libre' }
      },
      cookNote: 'Fin de semana'
    };
  }
};

})();
