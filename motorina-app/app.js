/* =====================================================
   DieselLog — logica aplicației
   Datele se salvează local (localStorage). Fără dependențe.
   ===================================================== */
'use strict';

const KEY = 'dieselog.v2';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const STATIONS = ['NOW', 'Rompetrol', 'Bemol', 'Lukoil', 'Petrom', 'Altă stație'];

/* ---------- formatare ---------- */
const MONTHS = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTHS_L = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
const DAYS_L = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'];
const DAYS_S = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'];

function fmt(v, d = 0) {
  if (v == null || !isFinite(v)) return '—';
  const neg = v < 0 && Math.abs(v).toFixed(d) !== (0).toFixed(d);
  const [i, f] = Math.abs(v).toFixed(d).split('.');
  return (neg ? '−' : '') + i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (f ? ',' + f : '');
}
const pad = (n) => String(n).padStart(2, '0');
const toStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const startOfDay = (d = new Date()) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const dayDiff = (a, b) => Math.round((startOfDay(a) - startOfDay(b)) / 864e5);
const ago = (s) => { const n = dayDiff(new Date(), parse(s)); return n <= 0 ? 'azi' : n === 1 ? 'ieri' : `acum ${n} zile`; };
const hm = (min) => { min = Math.round(min); const h = Math.floor(min / 60); return h ? `${h} h ${pad(min % 60)} min` : `${min} min`; };
const dayLabel = (s) => { const d = parse(s); return `${DAYS_L[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`; };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = (v) => parseFloat(String(v).trim().replace(/\s/g, '').replace(',', '.'));
const icon = (n) => `<svg class="ico"><use href="#i-${n}"/></svg>`;
const round1 = (v) => Math.round(v * 10) / 10;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
let uidN = 0;
const uid = () => Date.now() * 1000 + (uidN++ % 1000);

/* ---------- stare ---------- */
function initialState() {
  const odo = 226618;
  return {
    v: 2,
    odo,
    car: { name: 'Renault Kadjar', engine: '1.5 motorină', power: 110, year: 2015, plate: '', tank: 55, baseCons: 5.6 },
    service: [{ id: uid(), label: 'Schimb ulei', type: 'km', every: 10000, last: round1(odo - 4617.7) }],
    fills: [],
    trips: [],
    settings: { theme: 'auto', motion: !matchMedia('(prefers-reduced-motion: reduce)').matches, notif: true, alert: true },
  };
}
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const s = JSON.parse(raw); if (s && s.v === 2) return s; }
  } catch (e) { /* ignorat */ }
  const s = initialState(); persist(s); return s;
}
function persist(s = state) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* mod privat */ } }

let state = load();
let S = null;
const view = { kmRange: 30, routesRange: 30, tripLimit: 20 };

const carSub = () => [state.car.engine, state.car.power ? state.car.power + ' CP' : '', state.car.year].filter(Boolean).join(' · ') || 'Completează datele mașinii';
const byAsc = (a, b) => a.date.localeCompare(b.date) || a.odo - b.odo;
const byTime = (a, b) => b.date.localeCompare(a.date) || (b.time || '').localeCompare(a.time || '') || b.id - a.id;

/* ---------- statistici ---------- */
function computeStats() {
  const fills = [...state.fills].sort(byAsc);
  const cons = [];
  let lastFull = null, acc = 0;
  for (const f of fills) {
    if (lastFull !== null) {
      acc += f.liters;
      if (f.full) {
        const km = f.odo - lastFull;
        if (km > 20) cons.push({ id: f.id, date: f.date, v: (acc / km) * 100, km, l: acc });
        acc = 0; lastFull = f.odo;
      }
    } else if (f.full) { lastFull = f.odo; acc = 0; }
  }
  const recent = cons.slice(-6);
  const rl = recent.reduce((a, c) => a + c.l, 0), rk = recent.reduce((a, c) => a + c.km, 0);
  const avgCons = rk ? (rl / rk) * 100 : state.car.baseCons;

  const kmByDate = {};
  state.trips.forEach((t) => { kmByDate[t.date] = (kmByDate[t.date] || 0) + t.km; });
  const kmSum = (days) => { let s = 0; for (let i = 0; i < days; i++) s += kmByDate[toStr(addDays(startOfDay(), -i))] || 0; return s; };

  const now = new Date(), ym = (d) => d.slice(0, 7);
  const thisM = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
  const pd = new Date(now.getFullYear(), now.getMonth() - 1, 1), prevM = `${pd.getFullYear()}-${pad(pd.getMonth() + 1)}`;
  const spendBy = {};
  fills.forEach((f) => { const k = ym(f.date); spendBy[k] = (spendBy[k] || 0) + f.liters * f.ppl; });

  const lastFills = fills.slice(-4);
  const avgPrice = lastFills.length ? lastFills.reduce((a, f) => a + f.ppl, 0) / lastFills.length : null;
  const totalL = fills.reduce((a, f) => a + f.liters, 0), totalSpend = fills.reduce((a, f) => a + f.liters * f.ppl, 0);

  // nivelul din rezervor: pornim de la ultima alimentare plină
  let tankL = null, tankAgo = '';
  const k = fills.map((f) => f.full).lastIndexOf(true);
  if (k >= 0) {
    const base = fills[k], extra = fills.slice(k + 1).reduce((a, f) => a + f.liters, 0);
    const kmSince = Math.max(0, state.odo - base.odo);
    tankL = clamp(state.car.tank - (kmSince * avgCons) / 100 + extra, 0, state.car.tank);
    tankAgo = ago(fills[fills.length - 1].date);
  }
  return {
    fills, cons, recent, avgCons, consEst: !rk, last: cons[cons.length - 1], kmByDate, kmSum, spendBy,
    monthSpend: spendBy[thisM] || 0, prevSpend: spendBy[prevM] || 0,
    monthKm: state.trips.filter((t) => ym(t.date) === thisM).reduce((a, t) => a + t.km, 0),
    avgPrice, allAvgPrice: totalL ? totalSpend / totalL : null, totalL, totalSpend,
    costPerKm: avgPrice != null ? (avgCons / 100) * avgPrice : null,
    todayKm: kmByDate[toStr(startOfDay())] || 0, avgDaily: kmSum(30) / 30,
    tankL, tankPct: tankL == null ? null : tankL / state.car.tank, range: tankL == null ? null : (tankL / avgCons) * 100, tankAgo,
  };
}
const consOf = (id) => S.cons.find((c) => c.id === id);

/* ---------- numere animate ---------- */
const motionOn = () => document.documentElement.dataset.motion === 'full';
function countUp(el, to, dec, dur = 1000) {
  cancelAnimationFrame(el._raf);
  if (to == null || !isFinite(to)) { el.textContent = '—'; return; }
  if (!motionOn()) { el.textContent = fmt(to, dec); return; }
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    el.textContent = fmt(to * e, dec);
    if (p < 1) el._raf = requestAnimationFrame(tick);
  };
  el._raf = requestAnimationFrame(tick);
}
function setStat(id, v, dec = 0) { countUp($(id), v, dec); }
const setText = (id, t) => { $(id).textContent = t; };
const afterPaint = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

/* ---------- dropdown și segmente ---------- */
function initSelect(root, { options, value, onChange }) {
  let cur = value, menu = null, focusIdx = -1;
  root.classList.add('select');
  root.innerHTML = `<button type="button" class="select__btn" aria-haspopup="listbox" aria-expanded="false"><span class="select__label"></span>${icon('chev')}</button>`;
  const btn = $('.select__btn', root), lab = $('.select__label', root);
  const labelOf = (v) => (options.find((o) => o.v === v) || options[0]).l;
  lab.textContent = labelOf(cur);
  if (root.getAttribute('aria-labelledby')) btn.setAttribute('aria-labelledby', root.getAttribute('aria-labelledby'));

  function close() {
    if (!menu) return;
    menu.remove(); menu = null; root.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('pointerdown', outside, true); window.removeEventListener('resize', close); document.removeEventListener('scroll', close, true);
  }
  function outside(e) { if (menu && !menu.contains(e.target) && !root.contains(e.target)) close(); }
  function pick(v) { cur = v; lab.textContent = labelOf(v); close(); onChange && onChange(v); btn.focus({ preventScroll: true }); }
  function open() {
    if (menu) return close();
    menu = document.createElement('div');
    menu.className = 'select__menu'; menu.setAttribute('role', 'listbox');
    menu.innerHTML = options.map((o, i) => `<div class="select__opt ${o.v === cur ? 'is-sel' : ''}" role="option" data-i="${i}" aria-selected="${o.v === cur}"><span>${esc(o.l)}</span>${icon('check')}</div>`).join('');
    document.body.appendChild(menu);
    const r = btn.getBoundingClientRect(), mh = menu.offsetHeight;
    const up = innerHeight - r.bottom < mh + 16 && r.top > mh + 16;
    menu.style.left = r.left + 'px'; menu.style.width = r.width + 'px'; menu.style.top = (up ? r.top - mh - 6 : r.bottom + 6) + 'px';
    root.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true');
    focusIdx = options.findIndex((o) => o.v === cur);
    menu.addEventListener('click', (e) => { const o = e.target.closest('.select__opt'); if (o) pick(options[+o.dataset.i].v); });
    document.addEventListener('pointerdown', outside, true); window.addEventListener('resize', close); document.addEventListener('scroll', close, true);
  }
  function setFocus(i) { focusIdx = (i + options.length) % options.length; $$('.select__opt', menu).forEach((el, k) => el.classList.toggle('is-focus', k === focusIdx)); }
  btn.addEventListener('click', open);
  btn.addEventListener('keydown', (e) => {
    if (!menu && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); open(); setFocus(focusIdx); return; }
    if (!menu) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setFocus(focusIdx + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocus(focusIdx - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (focusIdx >= 0) pick(options[focusIdx].v); }
  });
  return { get value() { return cur; }, set(v) { cur = v; lab.textContent = labelOf(v); }, close };
}

function initSeg(root, { options, value, onChange }) {
  root.innerHTML = '<i class="seg__pill"></i>' + options.map((o) => `<button type="button" data-v="${o.v}" class="${o.v === value ? 'is-on' : ''}">${o.l}</button>`).join('');
  const pill = $('.seg__pill', root);
  const place = () => { const b = $('.is-on', root); if (!b || !b.offsetWidth) return; pill.style.width = b.offsetWidth + 'px'; pill.style.transform = `translateX(${b.offsetLeft - 3}px)`; };
  root.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', root).forEach((x) => x.classList.toggle('is-on', x === b));
    place(); onChange(+b.dataset.v || b.dataset.v);
  });
  root._place = place; requestAnimationFrame(place);
}

/* ---------- tooltip ---------- */
const tip = $('#tip');
let tipTimer;
function showTip(el, x, y) {
  tip.innerHTML = el.dataset.tip; tip.hidden = false;
  const w = tip.offsetWidth; tip.style.left = clamp(x, w / 2 + 8, innerWidth - w / 2 - 8) + 'px'; tip.style.top = Math.max(y, 60) + 'px';
}
document.addEventListener('pointerover', (e) => { const t = e.target.closest('[data-tip]'); if (t && e.pointerType !== 'touch') showTip(t, e.clientX, e.clientY); });
document.addEventListener('pointermove', (e) => { if (!tip.hidden && e.pointerType !== 'touch') { const t = e.target.closest('[data-tip]'); if (t) showTip(t, e.clientX, e.clientY); } });
document.addEventListener('pointerout', (e) => { if (e.target.closest('[data-tip]') && e.pointerType !== 'touch') tip.hidden = true; });
document.addEventListener('pointerdown', (e) => {
  const t = e.target.closest('[data-tip]');
  if (t && e.pointerType === 'touch') { showTip(t, e.clientX, e.clientY - 6); clearTimeout(tipTimer); tipTimer = setTimeout(() => (tip.hidden = true), 2200); }
  else if (!t) tip.hidden = true;
});

/* ---------- grafice ---------- */
function niceMax(v) {
  if (v <= 0) return 10;
  const p = Math.pow(10, Math.floor(Math.log10(v))), f = v / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
}
const emptyBox = (msg, cta) => `<div class="empty"><p>${msg}</p>${cta || ''}</div>`;
const ctaTrip = '<button class="btn btn--sm" data-open="trip">Adaugă primul traseu</button>';
const ctaFill = '<button class="btn btn--sm" data-open="fill">Adaugă o alimentare</button>';

function drawKmChart() {
  const el = $('#chart-km'); const W = el.clientWidth; if (!W) return;
  if (!state.trips.length) { el.innerHTML = emptyBox('Nu ai notat niciun traseu încă. Kilometrii pe zi apar aici, din traseele tale.', ctaTrip); setText('#km-sum', ''); return; }
  const H = 240, n = view.kmRange;
  const days = Array.from({ length: n }, (_, i) => addDays(startOfDay(), -(n - 1 - i)));
  const vals = days.map((d) => S.kmByDate[toStr(d)] || 0);
  const mx = niceMax(Math.max(...vals, 10)), m = { l: 38, r: 4, t: 14, b: 28 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b, slot = iw / n, bw = Math.max(2.5, slot * (n <= 14 ? 0.58 : 0.66));
  const y = (v) => m.t + ih * (1 - v / mx);
  const total = vals.reduce((a, b) => a + b, 0), avg = total / n;
  setText('#km-sum', `${fmt(total, 1)} km în ${n === 7 ? 'ultimele 7 zile' : n === 30 ? 'ultimele 30 de zile' : 'ultimele 90 de zile'} · medie ${fmt(avg, 1)} km/zi`);
  let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  for (let k = 0; k <= 4; k++) { const yy = y((mx * k) / 4); s += `<line class="grid-l" x1="${m.l}" x2="${W - m.r}" y1="${yy}" y2="${yy}"/><text x="${m.l - 8}" y="${yy + 3.5}" text-anchor="end">${fmt((mx * k) / 4, mx < 10 ? 1 : 0)}</text>`; }
  vals.forEach((v, i) => {
    const x = m.l + slot * i + (slot - bw) / 2, d = days[i], isToday = i === n - 1, h = Math.max(v > 0 ? 3 : 2, ih * (v / mx));
    s += `<rect class="bar ${v === 0 ? 'bar--zero' : isToday ? 'bar--today' : ''}" style="--i:${i}" x="${x.toFixed(1)}" y="${(m.t + ih - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" data-tip="${esc(`<b>${fmt(v, 1)} km</b><small>${dayLabel(toStr(d))}</small>`)}"/>`;
    const lab = n === 7 ? DAYS_S[d.getDay()] : (n - 1 - i) % (n === 30 ? 5 : 15) === 0 ? `${d.getDate()}.${pad(d.getMonth() + 1)}` : '';
    if (lab) s += `<text x="${(x + bw / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle">${lab}</text>`;
  });
  if (avg > 0) s += `<line class="avg-l" x1="${m.l}" x2="${W - m.r}" y1="${y(avg)}" y2="${y(avg)}"/><text class="avg-t" x="${m.l + 4}" y="${y(avg) - 6}">medie ${fmt(avg, 1)} km/zi</text>`;
  el.innerHTML = s + '</svg>';
}

function lineChart(el, pts, { dec = 1, unit = '', avg = null, emptyMsg, cta }) {
  const W = el.clientWidth; if (!W) return;
  if (pts.length < 2) { el.innerHTML = emptyBox(emptyMsg, cta); return; }
  const H = 240, m = { l: 42, r: 14, t: 16, b: 28 };
  const vs = pts.map((p) => p.v); let lo = Math.min(...vs, avg ?? Infinity), hi = Math.max(...vs, avg ?? -Infinity);
  const sp = hi - lo || 1; lo -= sp * 0.18; hi += sp * 0.18;
  const tdec = (hi - lo) / 4 < (dec === 1 ? 0.2 : 0.02) ? dec + 1 : dec;
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const X = (i) => m.l + (iw * i) / (pts.length - 1), Y = (v) => m.t + ih * (1 - (v - lo) / (hi - lo));
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)},${Y(p.v).toFixed(1)}`).join(' ');
  let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  for (let k = 0; k <= 4; k++) { const v = lo + ((hi - lo) * k) / 4, yy = Y(v); s += `<line class="grid-l" x1="${m.l}" x2="${W - m.r}" y1="${yy}" y2="${yy}"/><text x="${m.l - 8}" y="${yy + 3.5}" text-anchor="end">${fmt(v, tdec)}</text>`; }
  if (avg != null) s += `<line class="avg-l" x1="${m.l}" x2="${W - m.r}" y1="${Y(avg)}" y2="${Y(avg)}"/><text class="avg-t" x="${W - m.r}" y="${Y(avg) - 6}" text-anchor="end">medie ${fmt(avg, dec + (dec === 1 ? 0 : 0))}</text>`;
  s += `<path class="line-p" pathLength="1" d="${d}"/>`;
  const step = Math.ceil(pts.length / Math.max(2, Math.floor(iw / 64)));
  pts.forEach((p, i) => {
    s += `<circle class="dot ${i === pts.length - 1 ? 'dot--last' : ''}" style="--i:${i}" cx="${X(i).toFixed(1)}" cy="${Y(p.v).toFixed(1)}" r="4.5" data-tip="${esc(`<b>${fmt(p.v, dec + 1)} ${unit}</b><small>${p.label}</small>`)}"/>`;
    if ((pts.length - 1 - i) % step === 0) s += `<text x="${X(i).toFixed(1)}" y="${H - 8}" text-anchor="middle">${p.short}</text>`;
  });
  el.innerHTML = s + '</svg>';
}
const shortDate = (s) => { const d = parse(s); return `${d.getDate()} ${MONTHS[d.getMonth()]}`; };
function drawConsChart() {
  const pts = S.cons.slice(-10).map((c) => ({ v: c.v, label: `${dayLabel(c.date)} · ${fmt(c.km, 0)} km`, short: shortDate(c.date) }));
  const one = S.cons.length === 1 ? ` Prima măsurătoare: ${fmt(S.cons[0].v, 1)} L/100 km.` : '';
  lineChart($('#chart-cons'), pts, { dec: 1, unit: 'L/100 km', avg: S.avgCons, emptyMsg: `Consumul se calculează între două alimentări pline. Graficul apare după a treia alimentare plină.${one}`, cta: ctaFill });
}
function drawPriceChart() {
  const pts = S.fills.slice(-12).map((f) => ({ v: f.ppl, label: `${dayLabel(f.date)} · ${esc(f.station)}`, short: shortDate(f.date) }));
  lineChart($('#chart-price'), pts, { dec: 2, unit: 'lei/L', avg: S.allAvgPrice, emptyMsg: 'Evoluția prețului apare după cel puțin două alimentări.', cta: ctaFill });
}

/* ---------- odometru și rezervor ---------- */
function drum(n, k, cls = '') {
  return `<span class="odo__d ${cls}"><span class="odo__reel" style="--n:${n + 10};--k:${k}">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => `<span>${x}</span>`).join('')}</span></span>`;
}
function renderOdo(value) {
  const el = $('#odo'), total = Math.round(value * 10), int = Math.floor(total / 10), tenth = total % 10;
  const s = String(int).padStart(6, '0'); let k = 0, html = '';
  [...s].forEach((c, i) => { if (i > 0 && (s.length - i) % 3 === 0) html += '<span class="odo__gap"></span>'; html += drum(+c, k++); });
  html += drum(tenth, k++, 'odo__d--t') + '<span class="odo__unit">km</span>';
  el.classList.remove('is-on'); el.innerHTML = html;
  el.setAttribute('aria-label', `${fmt(value, 1)} kilometri`);
  afterPaint(() => el.classList.add('is-on'));
}
function renderFuelBar() {
  const bar = $('#fuelbar'); const on = S.tankPct == null ? 0 : Math.max(S.tankL > 0.5 ? 1 : 0, Math.round(S.tankPct * 20));
  bar.className = 'fuelbar' + (S.tankPct != null && S.tankPct < 0.2 ? ' is-low' : '');
  bar.innerHTML = Array.from({ length: 20 }, (_, i) => `<i style="--k:${i}"></i>`).join('');
  afterPaint(() => { bar.classList.add('is-set'); $$('i', bar).slice(0, on).forEach((x) => x.classList.add('on')); });
  setStat('#g-l', S.tankL, 0); setStat('#g-km', S.range == null ? null : Math.round(S.range / 10) * 10, 0);
  setText('#g-note', S.tankL == null ? 'Adaugă o alimentare cu rezervor plin și aplicația estimează cât ai rămas.' : `Estimat din ultima alimentare (${S.tankAgo}) și consumul mediu.`);
}

/* ---------- rânduri de registru ---------- */
function dateBlock(s) { const d = parse(s); return `<div class="row__date"><b>${pad(d.getDate())}</b><span>${MONTHS[d.getMonth()]}</span></div>`; }
const delBtn = (kind, id) => `<button class="row__del" data-del="${kind}" data-id="${id}" aria-label="Șterge înregistrarea">${icon('trash')}</button>`;
function tripRow(t, i = 0, { del = true, isNew = false } = {}) {
  const kmh = t.min ? t.km / (t.min / 60) : 0;
  return `<div class="row ${del ? '' : 'row--nodel'} ${isNew ? 'is-new' : ''}" style="--i:${i}">${dateBlock(t.date)}
    <div class="row__body"><b>${esc(t.from)}<span class="arrow">→</span>${esc(t.to)}</b><small>${t.time || ''} · ${fmt(kmh, 0)} km/h</small></div>
    <div class="row__end"><b>${fmt(t.km, 1)} km</b><small>${hm(t.min)}</small></div>${del ? delBtn('trip', t.id) : ''}</div>`;
}
function fillRow(f, i = 0, { del = true, isNew = false } = {}) {
  const c = consOf(f.id);
  const cb = c ? `<span class="chip ${c.v <= S.avgCons ? 'chip--good' : 'chip--bad'}">${fmt(c.v, 1)} L/100</span>` : '';
  return `<div class="row ${del ? '' : 'row--nodel'} ${isNew ? 'is-new' : ''}" style="--i:${i}">${dateBlock(f.date)}
    <div class="row__body"><b>${esc(f.station)}${f.full ? '' : '<span class="chip">parțial</span>'}${cb}</b><small>${fmt(f.odo, 0)} km · ${f.full ? 'plin' : 'parțial'}</small></div>
    <div class="row__end"><b>${fmt(f.liters * f.ppl, 2)} lei</b><small>${fmt(f.liters, 2)} L × ${fmt(f.ppl, 2)}</small></div>${del ? delBtn('fill', f.id) : ''}</div>`;
}
const emptyTrips = () => emptyBox('Niciun traseu încă. Notează de unde până unde ai mers și câți kilometri ai făcut.', ctaTrip);
const emptyFills = () => emptyBox('Nicio alimentare încă. Notează prima alimentare ca să vezi consumul și costurile.', ctaFill);

/* ---------- întreținere ---------- */
function svcInfo(s) {
  if (s.type === 'km') {
    const left = s.every - (state.odo - s.last), frac = clamp(left / s.every, 0, 1);
    return { left, frac, big: fmt(Math.abs(left), 0), small: left >= 0 ? 'km rămași' : 'km depășiți', sub: `la ${fmt(s.last + s.every, 0)} km · interval ${fmt(s.every, 0)} km`, level: left < 0 || frac < 0.1 ? 'bad' : frac < 0.25 ? 'warn' : '' };
  }
  const left = dayDiff(parse(s.due), new Date()), frac = clamp(left / 365, 0, 1), d = parse(s.due);
  return { left, frac, big: String(Math.abs(left)), small: left >= 0 ? (left === 1 ? 'zi rămasă' : 'zile rămase') : 'zile depășite', sub: `scadent pe ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`, level: left < 0 || left <= 14 ? 'bad' : left <= 45 ? 'warn' : '' };
}
function svcRow(s, i, actions) {
  const inf = svcInfo(s);
  return `<div class="svc ${inf.level ? 'is-' + inf.level : ''}" style="--i:${i}"><div class="svc__t"><b>${esc(s.label)}</b><small>${inf.sub}</small></div>
    <div class="svc__v">${inf.big}<small>${inf.small}</small></div>
    ${actions ? `<div class="svc__act">${s.type === 'km' ? `<button class="btn btn--sm" data-svcdone="${s.id}">Făcut acum</button>` : ''}${delBtn('service', s.id)}</div>` : '<span></span>'}
    <div class="svc__bar"><i style="--w:${Math.max(2, inf.frac * 100)}%"></i></div></div>`;
}
const growBars = (root) => afterPaint(() => $$('.svc__bar i, .bars__fill', root).forEach((b) => (b.style.width = b.style.getPropertyValue('--w'))));

/* ---------- pagini ---------- */
function renderDash(newId) {
  const now = new Date();
  setText('#dash-date', `${DAYS_L[now.getDay()]}, ${now.getDate()} ${MONTHS_L[now.getMonth()]}`);
  renderOdo(state.odo);
  setStat('#h-month', S.monthKm, 1); setStat('#h-avg', S.avgDaily, 1); setStat('#h-today', S.todayKm, 1);
  renderFuelBar();

  setStat('#k-cons', S.avgCons, 1);
  let cn = S.consEst ? 'valoare de referință, introdusă de tine' : `din ultimele ${S.recent.length} ${S.recent.length === 1 ? 'alimentare plină' : 'alimentări pline'}`;
  if (S.last && state.settings.alert && S.last.v > S.avgCons * 1.1) cn += ' · ultima a ieșit peste medie';
  setText('#k-cons-n', cn);
  setStat('#k-spend', S.fills.length ? S.monthSpend : null, 0);
  setText('#k-spend-n', !S.fills.length ? 'după prima alimentare' : S.prevSpend ? `Luna trecută: ${fmt(S.prevSpend, 0)} lei` : 'nicio alimentare luna trecută');
  setStat('#k-cpk', S.costPerKm, 2);
  setText('#k-cpk-n', S.costPerKm == null ? 'după prima alimentare' : `≈ ${fmt(S.costPerKm * 100, 0)} lei la 100 km`);
  setStat('#k-price', S.avgPrice, 2);
  const pf = S.fills.slice(-2);
  setText('#k-price-n', pf.length === 2 ? `${pf[1].ppl > pf[0].ppl ? '▲' : pf[1].ppl < pf[0].ppl ? '▼' : '='} ${fmt(Math.abs(pf[1].ppl - pf[0].ppl), 2)} lei față de alimentarea anterioară` : S.fills.length ? 'media ultimelor alimentări' : 'după prima alimentare');

  drawKmChart(); drawConsChart();
  const sv = [...state.service].sort((a, b) => svcInfo(a).frac - svcInfo(b).frac).slice(0, 3);
  $('#dash-service').innerHTML = sv.length ? sv.map((s, i) => svcRow(s, i, false)).join('') : emptyBox('Nicio scadență adăugată. Notează ITP-ul, RCA-ul, rovinieta sau schimbul de ulei.', '<button class="btn btn--sm" data-open="service">Adaugă o scadență</button>');
  growBars($('#dash-service'));
  const rt = [...state.trips].sort(byTime).slice(0, 5), rf = [...state.fills].sort(byTime).slice(0, 5);
  $('#recent-trips').innerHTML = rt.length ? rt.map((t, i) => tripRow(t, i, { del: false, isNew: t.id === newId })).join('') : emptyTrips();
  $('#recent-fills').innerHTML = rf.length ? rf.map((f, i) => fillRow(f, i, { del: false, isNew: f.id === newId })).join('') : emptyFills();
}

function renderFuel(newId) {
  setStat('#f-l', S.fills.length ? S.totalL : null, 1); setStat('#f-spend', S.fills.length ? S.totalSpend : null, 0); setStat('#f-price', S.allAvgPrice, 2); setStat('#f-n', state.fills.length, 0);
  drawPriceChart();
  const now = new Date(), months = [];
  for (let i = 3; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); months.push({ k: `${d.getFullYear()}-${pad(d.getMonth() + 1)}`, l: MONTHS_L[d.getMonth()].slice(0, 3) }); }
  const mx = Math.max(...months.map((m) => S.spendBy[m.k] || 0), 1), el = $('#cols-month');
  el.innerHTML = months.map((m, i) => `<div class="col ${i === 3 ? 'is-cur' : ''}"><span class="col__v">${S.spendBy[m.k] ? fmt(S.spendBy[m.k], 0) : '—'}</span><div class="col__bar" style="--i:${i};--h:${((S.spendBy[m.k] || 0) / mx) * 78}%" data-tip="${esc(`<b>${fmt(S.spendBy[m.k] || 0, 2)} lei</b>`)}"></div></div>`).join('');
  let lab = $('#cols-labels'); if (!lab) { lab = document.createElement('div'); lab.id = 'cols-labels'; lab.className = 'colslab'; el.after(lab); }
  lab.innerHTML = months.map((m) => `<span>${m.l}</span>`).join('');
  afterPaint(() => $$('.col__bar', el).forEach((b) => (b.style.height = b.style.getPropertyValue('--h'))));
  const groups = {};
  [...state.fills].sort(byTime).forEach((f) => { (groups[f.date.slice(0, 7)] ||= []).push(f); });
  $('#fill-history').innerHTML = Object.keys(groups).sort().reverse().map((k) => {
    const [y, mo] = k.split('-'), arr = groups[k], tot = arr.reduce((a, f) => a + f.liters * f.ppl, 0), l = arr.reduce((a, f) => a + f.liters, 0);
    return `<div class="group"><div class="group__h"><span>${MONTHS_L[+mo - 1]} ${y}</span><span>${fmt(l, 1)} L · ${fmt(tot, 2)} lei</span></div>${arr.map((f, i) => fillRow(f, i, { isNew: f.id === newId })).join('')}</div>`;
  }).join('') || emptyFills();
}

function rankList(entries, unit) {
  if (!entries.length) return '<li class="empty"><p>Nimic de arătat în perioada aleasă.</p></li>';
  const mx = entries[0][1].n;
  return entries.map(([name, p], i) => `<li style="--i:${i}"><b>${name}</b><span class="v">${p.n}× · ${fmt(p.km, 0)} km</span><div class="bars__track"><span class="bars__fill" style="--w:${(p.n / mx) * 100}%;--i:${i}"></span></div></li>`).join('');
}
function renderRoutes(newId) {
  const since = toStr(addDays(startOfDay(), -(view.routesRange - 1)));
  const trips = state.trips.filter((t) => t.date >= since);
  const km = trips.reduce((a, t) => a + t.km, 0), min = trips.reduce((a, t) => a + t.min, 0);
  setStat('#r-km', km, 1); setStat('#r-n', trips.length, 0); setStat('#r-cost', S.costPerKm == null || !trips.length ? null : km * S.costPerKm, 0);
  setText('#r-time', hm(min));
  const routes = {}, places = {};
  trips.forEach((t) => {
    const r = (routes[`${esc(t.from)}<span class="arrow">→</span>${esc(t.to)}`] ||= { n: 0, km: 0 }); r.n++; r.km += t.km;
    const p = (places[esc(t.to)] ||= { n: 0, km: 0 }); p.n++; p.km += t.km;
  });
  const top = (o) => Object.entries(o).sort((a, b) => b[1].n - a[1].n || b[1].km - a[1].km).slice(0, 6);
  $('#top-routes').innerHTML = state.trips.length ? rankList(top(routes)) : `<li>${emptyTrips()}</li>`;
  $('#top-places').innerHTML = state.trips.length ? rankList(top(places)) : `<li>${emptyBox('Destinațiile tale apar după primele trasee.')}</li>`;
  growBars($('#page-routes'));

  const sorted = [...trips].sort(byTime), shown = sorted.slice(0, view.tripLimit), groups = {};
  shown.forEach((t) => (groups[t.date] ||= []).push(t));
  $('#trip-history').innerHTML = Object.keys(groups).sort().reverse().map((d) => {
    const tk = trips.filter((t) => t.date === d).reduce((a, t) => a + t.km, 0);
    return `<div class="group"><div class="group__h"><span>${dayLabel(d)}</span><span>${fmt(tk, 1)} km</span></div>${groups[d].map((t, i) => tripRow(t, i, { isNew: t.id === newId })).join('')}</div>`;
  }).join('') || (state.trips.length ? emptyBox('Niciun traseu în perioada aleasă.') : emptyTrips());
  const more = $('#trip-more'); more.hidden = sorted.length <= shown.length; more.textContent = `Arată mai multe (${sorted.length - shown.length})`;
}

function renderCar() {
  const c = state.car;
  $$('.js-carname').forEach((e) => (e.textContent = c.name)); $$('.js-carsub').forEach((e) => (e.textContent = carSub()));
  $$('.js-carplate').forEach((e) => (e.textContent = c.plate || (e.closest('.plate') ? '– – –' : '')));
  const rows = [['Marcă și model', c.name], ['Motorizare', c.engine], ['Putere', c.power ? `${c.power} CP · ${Math.round(c.power * 0.7355)} kW` : ''], ['Anul fabricației', c.year], ['Combustibil', 'Motorină'], ['Capacitate rezervor', `${fmt(c.tank, 0)} L`], ['Consum de referință', `${fmt(c.baseCons, 1)} L/100 km`], ['Kilometraj', `${fmt(state.odo, 1)} km`], ['Număr înmatriculare', c.plate]];
  $('#specs').innerHTML = rows.map(([k, v], i) => `<div style="--i:${i}"><dt>${k}</dt><dd class="${v ? '' : 'is-empty'}">${v ? esc(v) : '—'}</dd></div>`).join('');
  const l = $('#service-list');
  l.innerHTML = state.service.length ? state.service.map((s, i) => svcRow(s, i, true)).join('') : emptyBox('Nicio scadență adăugată.', '<button class="btn btn--sm" data-open="service">Adaugă o scadență</button>');
  growBars(l); renderInstallCard();
}

/* ---------- navigare ---------- */
const PAGES = ['dash', 'fuel', 'routes', 'car'];
let current = null;
function renderPage(p, newId) { ({ dash: renderDash, fuel: renderFuel, routes: renderRoutes, car: renderCar })[p](newId); }
function renderAll(newId) { S = computeStats(); fillCarText(); renderPage(current, newId); }
function fillCarText() {
  $$('.js-carname').forEach((e) => (e.textContent = state.car.name)); $$('.js-carsub').forEach((e) => (e.textContent = carSub()));
  $$('.js-carplate').forEach((e) => (e.textContent = state.car.plate || (e.closest('.plate') ? '– – –' : '')));
}
function route() {
  const p = (location.hash.match(/^#(\w+)/) || [])[1], page = PAGES.includes(p) ? p : 'dash';
  if (page === current) return;
  current = page;
  $$('.page').forEach((el) => el.classList.toggle('is-active', el.dataset.page === page));
  $$('[data-page]').forEach((a) => { if (a.matches('a')) a.classList.toggle('is-active', a.dataset.page === page); });
  window.scrollTo({ top: 0 }); tip.hidden = true;
  renderPage(page);
  document.title = { dash: 'Acasă', fuel: 'Alimentări', routes: 'Trasee', car: 'Mașina' }[page] + ' — DieselLog';
}
window.addEventListener('hashchange', route);
let rz, lastW = innerWidth;
window.addEventListener('resize', () => {
  clearTimeout(rz);
  rz = setTimeout(() => {
    if (innerWidth === lastW) return; lastW = innerWidth;
    $$('.seg').forEach((s) => s._place && s._place());
    if (current === 'dash') { drawKmChart(); drawConsChart(); } if (current === 'fuel') drawPriceChart();
  }, 160);
});

/* ---------- foi / formulare ---------- */
const wrap = $('#sheetwrap');
let openSheet = null, stationSel = null, stypeSel = null;
const el = (f, n) => f.elements[n];
function updateStationUI() { $('#station-other').hidden = stationSel.value !== 'Altă stație'; }
function updateTotal() {
  const f = $('#sheet-fill'), t = num(el(f, 'liters').value) * num(el(f, 'ppl').value), v = isFinite(t) && t > 0 ? t : 0;
  const o = $('#fill-total'), from = +o.dataset.v || 0; o.dataset.v = v;
  cancelAnimationFrame(o._raf);
  if (!motionOn()) { o.textContent = fmt(v, 2); return; }
  const t0 = performance.now();
  const tick = (now) => { const p = Math.min(1, (now - t0) / 280), e = 1 - Math.pow(1 - p, 3); o.textContent = fmt(from + (v - from) * e, 2); if (p < 1) o._raf = requestAnimationFrame(tick); };
  o._raf = requestAnimationFrame(tick);
}
function showSheet(kind) {
  const sh = $('#sheet-' + kind); if (!sh) return;
  const switching = !!openSheet; tip.hidden = true;
  $$('.sheet', wrap).forEach((x) => { x.hidden = x !== sh; x.classList.remove('is-closing'); });
  wrap.classList.remove('is-closing'); wrap.hidden = false; openSheet = sh;
  document.body.classList.add('is-locked');
  if (switching) { sh.style.animation = 'none'; void sh.offsetWidth; sh.style.animation = ''; }
  $$('.field', sh).forEach((x) => x.classList.remove('is-bad')); const er = $('.form-err', sh); if (er) er.hidden = true;
  const today = toStr(new Date()), now = new Date(), f = sh;
  if (kind === 'fill') {
    const last = [...state.fills].sort(byTime)[0];
    el(f, 'date').value = today; el(f, 'odo').value = round1(state.odo); el(f, 'liters').value = ''; el(f, 'ppl').value = last ? fmt(last.ppl, 2) : ''; el(f, 'full').checked = true; el(f, 'station_other').value = '';
    const st = last && STATIONS.includes(last.station) ? last.station : last ? 'Altă stație' : STATIONS[0];
    stationSel.set(st); if (st === 'Altă stație' && last) el(f, 'station_other').value = last.station; updateStationUI(); $('#fill-total').dataset.v = 0; updateTotal();
  } else if (kind === 'trip') {
    ['from', 'to', 'km', 'min'].forEach((n) => (el(f, n).value = ''));
    el(f, 'date').value = today; el(f, 'time').value = `${pad(now.getHours())}:${pad(now.getMinutes())}`; el(f, 'apply').checked = true;
    $('#places').innerHTML = [...new Set(state.trips.flatMap((t) => [t.from, t.to]))].map((n) => `<option value="${esc(n)}">`).join('');
  } else if (kind === 'car') {
    const c = state.car;
    el(f, 'name').value = c.name; el(f, 'engine').value = c.engine || ''; el(f, 'power').value = c.power || ''; el(f, 'year').value = c.year || ''; el(f, 'plate').value = c.plate || '';
    el(f, 'odo').value = round1(state.odo); el(f, 'tank').value = c.tank; el(f, 'cons').value = fmt(c.baseCons, 1);
  } else if (kind === 'service') {
    ['label', 'every', 'due'].forEach((n) => (el(f, n).value = '')); el(f, 'last').value = round1(state.odo); stypeSel.set('km'); updateServiceUI();
  }
  setTimeout(() => { const first = $('input:not([type=date]):not([type=time]):not([type=checkbox])', sh); if (first && matchMedia('(hover:hover)').matches) first.focus({ preventScroll: true }); }, 250);
}
function updateServiceUI() { $('#srv-km').hidden = stypeSel.value !== 'km'; $('#srv-date').hidden = stypeSel.value !== 'date'; }
async function hideSheet() {
  if (!openSheet) return;
  const sh = openSheet; openSheet = null;
  sh.classList.add('is-closing'); wrap.classList.add('is-closing');
  await sleep(motionOn() ? 220 : 0);
  if (openSheet) return; // s-a deschis altă foaie între timp
  wrap.hidden = true; sh.hidden = true; document.body.classList.remove('is-locked');
}
document.addEventListener('click', (e) => {
  const o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); showSheet(o.dataset.open); return; }
  if (e.target.closest('[data-close]')) hideSheet();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openSheet && !$('.select__menu')) hideSheet(); });

function fail(form, name, msg) {
  const inp = el(form, name), fld = inp.closest('.field'); if (fld) { fld.classList.remove('is-bad'); void fld.offsetWidth; fld.classList.add('is-bad'); }
  const err = $('.form-err', form); err.textContent = msg; err.hidden = false; inp.focus({ preventScroll: true });
}
const resetErr = (f) => { $$('.field', f).forEach((x) => x.classList.remove('is-bad')); $('.form-err', f).hidden = true; };

function submitFill(e) {
  e.preventDefault(); const f = e.currentTarget; resetErr(f);
  const date = el(f, 'date').value, odo = Math.round(num(el(f, 'odo').value)), liters = num(el(f, 'liters').value), ppl = num(el(f, 'ppl').value);
  const station = stationSel.value === 'Altă stație' ? el(f, 'station_other').value.trim() : stationSel.value;
  if (!date) return fail(f, 'date', 'Alege data alimentării.');
  if (!(odo > 0)) return fail(f, 'odo', 'Introdu kilometrajul de pe bord, în km.');
  const asc = [...state.fills].sort(byAsc), prior = asc.filter((x) => x.date <= date).pop(), later = asc.find((x) => x.date > date);
  if (prior && odo < prior.odo) return fail(f, 'odo', `Kilometrajul trebuie să fie cel puțin ${fmt(prior.odo, 0)} km (alimentarea din ${shortDate(prior.date)}).`);
  if (later && odo > later.odo) return fail(f, 'odo', `Kilometrajul trebuie să fie cel mult ${fmt(later.odo, 0)} km (alimentarea din ${shortDate(later.date)}).`);
  if (!(liters > 0 && liters < 300)) return fail(f, 'liters', 'Introdu numărul de litri alimentați.');
  if (!(ppl > 0 && ppl < 50)) return fail(f, 'ppl', 'Introdu prețul pe litru, în lei.');
  if (!station) return fail(f, 'station_other', 'Scrie numele benzinăriei.');
  const rec = { id: uid(), date, odo, liters: Math.round(liters * 100) / 100, ppl: Math.round(ppl * 100) / 100, station, full: el(f, 'full').checked };
  state.fills.push(rec); state.odo = Math.max(state.odo, odo);
  persist(); hideSheet(); renderAll(rec.id); toast(`Alimentare salvată · ${fmt(rec.liters * rec.ppl, 2)} lei`);
}
function submitTrip(e) {
  e.preventDefault(); const f = e.currentTarget; resetErr(f);
  const from = el(f, 'from').value.trim(), to = el(f, 'to').value.trim(), km = num(el(f, 'km').value), min = Math.round(num(el(f, 'min').value));
  if (!from) return fail(f, 'from', 'Spune de unde ai plecat.');
  if (!to) return fail(f, 'to', 'Spune unde ai ajuns.');
  if (!(km > 0 && km < 5000)) return fail(f, 'km', 'Introdu distanța parcursă, în km.');
  if (!(min > 0 && min < 5000)) return fail(f, 'min', 'Introdu durata, în minute.');
  if (!el(f, 'date').value) return fail(f, 'date', 'Alege data traseului.');
  const apply = el(f, 'apply').checked;
  const rec = { id: uid(), date: el(f, 'date').value, time: el(f, 'time').value || '12:00', from, to, km: round1(km), min, applied: apply };
  state.trips.push(rec); if (apply) state.odo = round1(state.odo + rec.km);
  persist(); hideSheet(); renderAll(rec.id); toast(`Traseu salvat · ${fmt(rec.km, 1)} km`);
}
function submitCar(e) {
  e.preventDefault(); const f = e.currentTarget; resetErr(f);
  const name = el(f, 'name').value.trim(), odo = num(el(f, 'odo').value), tank = num(el(f, 'tank').value), cons = num(el(f, 'cons').value);
  const power = el(f, 'power').value.trim() ? Math.round(num(el(f, 'power').value)) : 0, year = el(f, 'year').value.trim();
  if (!name) return fail(f, 'name', 'Scrie marca și modelul.');
  if (!(odo >= 0)) return fail(f, 'odo', 'Introdu kilometrajul curent.');
  if (!(tank > 5 && tank < 300)) return fail(f, 'tank', 'Introdu capacitatea rezervorului, în litri.');
  if (!(cons > 1 && cons < 40)) return fail(f, 'cons', 'Introdu consumul mediu, în L/100 km.');
  if (power && !(power > 0 && power < 2000)) return fail(f, 'power', 'Puterea trebuie să fie un număr, în CP.');
  Object.assign(state.car, { name, engine: el(f, 'engine').value.trim(), power, year, plate: el(f, 'plate').value.trim().toUpperCase(), tank, baseCons: cons });
  state.odo = round1(odo);
  persist(); hideSheet(); renderAll(); toast('Datele mașinii au fost salvate');
}
function submitService(e) {
  e.preventDefault(); const f = e.currentTarget; resetErr(f);
  const label = el(f, 'label').value.trim(), type = stypeSel.value;
  if (!label) return fail(f, 'label', 'Scrie denumirea scadenței.');
  let rec;
  if (type === 'km') {
    const every = Math.round(num(el(f, 'every').value)), last = num(el(f, 'last').value);
    if (!(every > 0)) return fail(f, 'every', 'Introdu intervalul în km.');
    if (!isFinite(last) || last < 0) return fail(f, 'last', 'Introdu kilometrajul la care s-a făcut ultima dată.');
    rec = { id: uid(), label, type, every, last: round1(last) };
  } else {
    const due = el(f, 'due').value; if (!due) return fail(f, 'due', 'Alege data scadenței.');
    rec = { id: uid(), label, type, due };
  }
  state.service.push(rec); persist(); hideSheet(); renderAll(); toast('Scadență adăugată');
}

/* ---------- ștergere (cu confirmare în pagină) ---------- */
document.addEventListener('click', (e) => {
  const d = e.target.closest('[data-svcdone]');
  if (d) { const s = state.service.find((x) => x.id === +d.dataset.svcdone); if (s) { s.last = round1(state.odo); persist(); renderAll(); toast(`${s.label}: marcat ca făcut la ${fmt(state.odo, 0)} km`); } return; }
  const b = e.target.closest('[data-del]'); if (!b) return;
  if (!b.classList.contains('is-armed')) {
    b.classList.add('is-armed'); b.textContent = 'Sigur?';
    setTimeout(() => { if (b.isConnected) { b.classList.remove('is-armed'); b.innerHTML = icon('trash'); } }, 3000);
    return;
  }
  const id = +b.dataset.id, kind = b.dataset.del;
  if (kind === 'trip') { const t = state.trips.find((x) => x.id === id); if (t && t.applied) state.odo = round1(state.odo - t.km); state.trips = state.trips.filter((x) => x.id !== id); }
  else if (kind === 'fill') state.fills = state.fills.filter((x) => x.id !== id);
  else if (kind === 'service') state.service = state.service.filter((x) => x.id !== id);
  persist(); renderAll(); toast('Înregistrare ștearsă');
});

function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = `${icon('check')}<span>${esc(msg)}</span>`;
  $('#toasts').appendChild(t); setTimeout(() => t.remove(), 3300);
}

/* ---------- temă, preferințe ---------- */
const mq = matchMedia('(prefers-color-scheme: dark)');
let themeSel;
function applyTheme() {
  const t = state.settings.theme, dark = t === 'dark' || (t === 'auto' && mq.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const tc = $('meta[name=theme-color]'); if (tc) tc.content = dark ? '#121413' : '#ecede8';
  $$('.js-theme use').forEach((u) => u.setAttribute('href', dark ? '#i-sun' : '#i-moon'));
  if (themeSel) themeSel.set(t);
}
mq.addEventListener('change', () => state.settings.theme === 'auto' && applyTheme());
function applyMotion() { document.documentElement.dataset.motion = state.settings.motion ? 'full' : 'reduced'; }
$$('.js-theme').forEach((b) => b.addEventListener('click', () => { state.settings.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; persist(); applyTheme(); }));

function initControls() {
  themeSel = initSelect($('#sel-theme'), { options: [{ v: 'auto', l: 'Automat (sistem)' }, { v: 'dark', l: 'Întunecat' }, { v: 'light', l: 'Luminos' }], value: state.settings.theme, onChange: (v) => { state.settings.theme = v; persist(); applyTheme(); } });
  stationSel = initSelect($('#sel-station'), { options: STATIONS.map((v) => ({ v, l: v })), value: STATIONS[0], onChange: updateStationUI });
  stypeSel = initSelect($('#sel-stype'), { options: [{ v: 'km', l: 'La un anumit kilometraj (ex. ulei)' }, { v: 'date', l: 'La o dată (ex. ITP, RCA)' }], value: 'km', onChange: updateServiceUI });
  initSelect($('#sel-range'), { options: [{ v: 7, l: 'Ultimele 7 zile' }, { v: 30, l: 'Ultimele 30 de zile' }, { v: 90, l: 'Ultimele 90 de zile' }, { v: 3650, l: 'Tot istoricul' }], value: view.routesRange, onChange: (v) => { view.routesRange = v; view.tripLimit = 20; renderRoutes(); } });
  initSeg($('#seg-km'), { options: [{ v: 7, l: '7 z' }, { v: 30, l: '30 z' }, { v: 90, l: '90 z' }], value: view.kmRange, onChange: (v) => { view.kmRange = v; drawKmChart(); } });
  [['#sw-motion', 'motion'], ['#sw-notif', 'notif'], ['#sw-alert', 'alert']].forEach(([id, k]) => {
    const c = $(id); c.checked = !!state.settings[k];
    c.addEventListener('change', () => { state.settings[k] = c.checked; persist(); if (k === 'motion') applyMotion(); if (k === 'alert' && current === 'dash') renderDash(); });
  });
  $('#trip-more').addEventListener('click', () => { view.tripLimit += 20; renderRoutes(); });
  const ff = $('#sheet-fill');
  ['liters', 'ppl'].forEach((n) => el(ff, n).addEventListener('input', updateTotal));
  ff.addEventListener('submit', submitFill); $('#sheet-trip').addEventListener('submit', submitTrip);
  $('#sheet-car').addEventListener('submit', submitCar); $('#sheet-service').addEventListener('submit', submitService);

  $('#btn-export').addEventListener('click', () => {
    const json = JSON.stringify(state, null, 2);
    if (window.self !== window.top) { // într-un frame descărcările sunt blocate: copiem în clipboard
      (navigator.clipboard ? navigator.clipboard.writeText(json) : Promise.reject()).then(() => toast('Datele (JSON) au fost copiate'), () => toast('Nu am putut copia datele'));
      return;
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' })); a.download = `dieselog-${toStr(new Date())}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000); toast('Datele au fost exportate');
  });
  let armed = false, t;
  $('#btn-reset').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    if (!armed) { armed = true; btn.classList.add('is-armed'); btn.textContent = 'Apasă din nou: se șterg alimentările și traseele'; t = setTimeout(() => { armed = false; btn.classList.remove('is-armed'); btn.textContent = 'Resetează datele'; }, 4000); return; }
    clearTimeout(t); armed = false; btn.classList.remove('is-armed'); btn.textContent = 'Resetează datele';
    try { localStorage.removeItem(KEY); } catch (err) { /* ignorat */ }
    state = load(); applyTheme(); applyMotion(); renderAll(); toast('Datele au fost resetate');
  });
  $('#btn-reset').textContent = 'Resetează datele';
}

/* ---------- instalare PWA ---------- */
let deferred = null;
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; $$('.js-install').forEach((b) => (b.hidden = false)); renderInstallCard(); });
window.addEventListener('appinstalled', () => { deferred = null; $$('.js-install').forEach((b) => (b.hidden = true)); renderInstallCard(); toast('Aplicația a fost instalată'); });
$$('.js-install').forEach((b) => b.addEventListener('click', async () => { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; $$('.js-install').forEach((x) => (x.hidden = true)); renderInstallCard(); }));
function renderInstallCard() {
  const st = $('#install-state'), tx = $('#install-text'), steps = $('#install-steps'), btn = $('#install-card .js-install');
  steps.hidden = true; btn.hidden = !deferred;
  if (isStandalone()) { st.textContent = 'Instalată'; st.className = 'tag tag--ok'; tx.textContent = 'Rulezi aplicația instalată. Datele sunt salvate pe acest dispozitiv și merg și fără internet.'; }
  else if (deferred) { st.textContent = 'Disponibilă'; st.className = 'tag tag--warn'; tx.textContent = 'Instalează DieselLog pe ecranul principal: se deschide pe tot ecranul, ca o aplicație obișnuită, și merge și fără internet.'; }
  else if (isIOS()) { st.textContent = 'iPhone / iPad'; st.className = 'tag tag--warn'; tx.textContent = 'Pe iOS instalarea se face manual din Safari:'; steps.hidden = false; }
  else { st.textContent = 'Din browser'; st.className = 'tag'; tx.textContent = 'Deschide aplicația pe telefon, în Chrome, și alege „Instalează aplicația” sau „Adaugă pe ecranul principal” din meniul browserului. Instalarea merge doar pe adrese securizate (HTTPS).'; }
}

/* ---------- pornire ---------- */
function boot() {
  S = computeStats(); fillCarText();
  applyMotion(); initControls(); applyTheme();
  $$('.page').forEach((p) => $$('[data-anim]', p).forEach((e, i) => e.style.setProperty('--i', i)));
  route();
  const add = new URLSearchParams(location.search).get('add');
  if (add === 'fill' || add === 'trip') setTimeout(() => showSheet(add), 400);
  renderInstallCard();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
}
boot();
