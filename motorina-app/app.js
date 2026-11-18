/* =====================================================
   DieselLog — logica aplicației (macheta)
   Date salvate local (localStorage). Fără dependențe.
   ===================================================== */
'use strict';

const KEY = 'dieselog.v1';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- formatare ---------- */
const MONTHS = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTHS_L = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
const DAYS_L = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'];
const DAYS_S = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'];

function fmt(v, d = 0) {
  if (!isFinite(v)) return '—';
  const neg = v < 0;
  const [i, f] = Math.abs(v).toFixed(d).split('.');
  const g = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (neg ? '−' : '') + g + (f ? ',' + f : '');
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
const num = (v) => parseFloat(String(v).replace(',', '.'));
const icon = (n) => `<svg class="ico"><use href="#i-${n}"/></svg>`;

/* ---------- date demo (deterministe) ---------- */
function rng(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STATIONS = ['Petrom', 'OMV', 'MOL', 'Rompetrol', 'Lukoil', 'Socar', 'Altă stație'];

function seedData() {
  const r = rng(20260301);
  const rand = (a, b) => a + (b - a) * r();
  const DAYS = 120;
  const today = startOfDay();
  let odo = 147920, tank = 33, price = 7.02, id = 1, nextFill = rand(14, 22);
  const CAP = 50;
  const trips = [], fills = [];

  for (let i = DAYS; i >= 0; i--) {
    const d = addDays(today, -i), dow = d.getDay(), ds = toStr(d);
    const legs = [];
    const wk = Math.floor(i / 7);
    if (dow >= 1 && dow <= 5) {
      if (r() < 0.93) {
        legs.push(['Acasă', 'Birou', 18 + rand(-1.2, 1.6), rand(30, 46)]);
        if (i > 0) {
          const ev = r();
          if (ev < 0.3) { legs.push(['Birou', 'Sala de sport', 8.2 + rand(-.5, .6), rand(16, 24)], ['Sala de sport', 'Acasă', 9 + rand(-.5, .6), rand(18, 26)]); }
          else if (ev < 0.46) { legs.push(['Birou', 'Supermarket', 12 + rand(-.6, .7), rand(20, 30)], ['Supermarket', 'Acasă', 6 + rand(-.4, .4), rand(11, 16)]); }
          else legs.push(['Birou', 'Acasă', 18 + rand(-1.2, 1.6), rand(34, 55)]);
        }
      }
    } else if (dow === 6) {
      if (r() < 0.72) legs.push(['Acasă', 'Mall', 14 + rand(-.6, .6), rand(24, 34)], ['Mall', 'Acasă', 14 + rand(-.6, .6), rand(24, 36)]);
      else if (r() < 0.6) legs.push(['Acasă', 'Supermarket', 6 + rand(-.3, .3), rand(11, 16)], ['Supermarket', 'Acasă', 6 + rand(-.3, .3), rand(11, 16)]);
    } else {
      if (wk % 4 === 2) legs.push(['Acasă', 'Cabană Valea Mare', 118 + rand(-2, 3), rand(125, 150)], ['Cabană Valea Mare', 'Acasă', 118 + rand(-2, 3), rand(125, 155)]);
      else if (r() < 0.42) legs.push(['Acasă', 'Părinți', 47 + rand(-1, 1.5), rand(55, 70)], ['Părinți', 'Acasă', 47 + rand(-1, 1.5), rand(55, 72)]);
    }
    if (wk % 6 === 4 && dow === 5 && i > 0) legs.push(['Acasă', 'Aeroport', 32 + rand(-1, 1), rand(40, 55)], ['Aeroport', 'Acasă', 32 + rand(-1, 1), rand(40, 55)]);

    let t = dow >= 1 && dow <= 5 ? 7 * 60 + 10 + Math.floor(rand(0, 40)) : 10 * 60 + Math.floor(rand(0, 120));
    legs.forEach(([from, to, km, min], idx) => {
      km = Math.round(km * 10) / 10; min = Math.round(min);
      if (idx === 1 && dow >= 1 && dow <= 5) t = 16 * 60 + 30 + Math.floor(rand(0, 70));
      else if (idx > 1) t += 40;
      trips.push({ id: id++, date: ds, time: `${pad(Math.floor(t / 60) % 24)}:${pad(t % 60)}`, from, to, km, min });
      t += min + 30;
      odo += km;
      const cons = (km > 40 ? rand(5.0, 5.8) : rand(5.9, 7.1));
      tank -= (km * cons) / 100;
    });

    if (tank < nextFill) {
      const partial = r() < 0.12;
      const liters = Math.round((partial ? rand(24, 32) : CAP - tank + rand(-.5, .8)) * 100) / 100;
      price = Math.min(7.65, Math.max(6.85, price + rand(-0.05, 0.07)));
      fills.push({ id: id++, date: ds, odo: Math.round(odo), liters, ppl: Math.round(price * 100) / 100, station: STATIONS[Math.floor(r() * 5)], full: !partial });
      tank = partial ? tank + liters : CAP - rand(0, 1);
      nextFill = rand(11, 22);
    }
  }

  const iso = (n) => toStr(addDays(today, n));
  return {
    v: 1,
    odo: Math.round(odo),
    car: {
      name: 'Volkswagen Golf 2.0 TDI', sub: 'Generația 7 · 2018 · Motorină', plate: 'B 123 ABC', tank: CAP,
      specs: [
        ['Motorizare', '2.0 TDI · 1968 cm³'], ['Putere', '150 CP · 110 kW'], ['Cuplu maxim', '340 Nm'], ['Cutie de viteze', 'Manuală, 6 trepte'],
        ['Tracțiune', 'Față'], ['Normă poluare', 'Euro 6'], ['Rezervor', `${CAP} L`], ['Consum omologat', '4,6 L/100 km'],
        ['Pneuri', '205/55 R16'], ['Capacitate ulei', '4,3 L · 5W-30'], ['Anul fabricației', '2018'], ['VIN', 'WVW••••••••••1234'],
      ],
      service: [
        { key: 'oil', label: 'Schimb ulei', type: 'km', every: 15000, last: Math.round(odo) - 11200, icon: 'drop' },
        { key: 'brakes', label: 'Plăcuțe de frână', type: 'km', every: 40000, last: Math.round(odo) - 21000, icon: 'wrench' },
        { key: 'vig', label: 'Rovinietă', type: 'date', due: iso(9), days: 365 },
        { key: 'rca', label: 'Asigurare RCA', type: 'date', due: iso(46), days: 365 },
        { key: 'itp', label: 'ITP', type: 'date', due: iso(143), days: 730 },
      ],
    },
    fills,
    trips,
    settings: { theme: 'auto', motion: !matchMedia('(prefers-reduced-motion: reduce)').matches, notif: true, alert: true, fuel: 'Motorină standard' },
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const s = JSON.parse(raw); if (s && s.v === 1) return s; }
  } catch (e) { /* ignorat */ }
  const s = seedData();
  persist(s);
  return s;
}
function persist(s = state) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* mod privat */ } }

let state = load();
let S = null; // statistici derivate
const view = { kmRange: 30, routesRange: 30, tripLimit: 24 };

/* ---------- statistici ---------- */
function computeStats() {
  const fills = [...state.fills].sort((a, b) => a.date.localeCompare(b.date) || a.odo - b.odo);
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
  const avgCons = rk ? (rl / rk) * 100 : 6.2;
  const last = cons[cons.length - 1];

  const kmByDate = {};
  state.trips.forEach((t) => { kmByDate[t.date] = (kmByDate[t.date] || 0) + t.km; });
  const kmSum = (days) => { let s = 0; for (let i = 0; i < days; i++) s += kmByDate[toStr(addDays(startOfDay(), -i))] || 0; return s; };

  const now = new Date(), ym = (d) => d.slice(0, 7);
  const thisM = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
  const prevD = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevM = `${prevD.getFullYear()}-${pad(prevD.getMonth() + 1)}`;
  const spendBy = {};
  fills.forEach((f) => { const k = ym(f.date); spendBy[k] = (spendBy[k] || 0) + f.liters * f.ppl; });
  const monthKm = state.trips.filter((t) => ym(t.date) === thisM).reduce((a, t) => a + t.km, 0);

  const lastFills = fills.slice(-4);
  const avgPrice = lastFills.length ? lastFills.reduce((a, f) => a + f.ppl, 0) / lastFills.length : 7;
  const totalL = fills.reduce((a, f) => a + f.liters, 0);
  const totalSpend = fills.reduce((a, f) => a + f.liters * f.ppl, 0);
  const allAvgPrice = totalL ? totalSpend / totalL : 0;

  const lf = fills[fills.length - 1];
  const cap = state.car.tank;
  let tankL = cap, tankAgo = '—';
  if (lf) {
    const used = (Math.max(0, state.odo - lf.odo) * avgCons) / 100;
    tankL = Math.max(1.5, Math.min(cap, cap - used));
    tankAgo = ago(lf.date);
  }

  return {
    fills, cons, avgCons, last, kmByDate, kmSum, thisM, prevM, spendBy,
    monthSpend: spendBy[thisM] || 0, prevSpend: spendBy[prevM] || 0, monthKm,
    avgPrice, allAvgPrice, totalL, totalSpend, costPerKm: (avgCons / 100) * avgPrice,
    todayKm: kmByDate[toStr(startOfDay())] || 0, avgDaily: kmSum(30) / 30,
    tankL, tankPct: tankL / cap, range: (tankL / avgCons) * 100, tankAgo,
  };
}
const consOf = (id) => S.cons.find((c) => c.id === id);

/* ---------- animații numerice ---------- */
const motionOn = () => document.documentElement.dataset.motion !== 'reduced' && (state.settings.motion || !matchMedia('(prefers-reduced-motion: reduce)').matches);

function countUp(el, to = +el.dataset.count, dur = 1300) {
  const dec = +(el.dataset.dec || 0);
  el.dataset.count = to;
  if (!motionOn()) { el.textContent = fmt(to, dec); return; }
  const from = 0, t0 = performance.now();
  cancelAnimationFrame(el._raf);
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    el.textContent = fmt(from + (to - from) * e, dec);
    if (p < 1) el._raf = requestAnimationFrame(tick);
  };
  el._raf = requestAnimationFrame(tick);
}
function setCount(id, v) { const el = $(id); el.dataset.count = v; countUp(el); }

/* ---------- UI: selecturi, segmente ---------- */
function initSelect(root, { options, value, onChange }) {
  let cur = value, menu = null, focusIdx = -1;
  root.classList.add('select');
  root.innerHTML = `<button type="button" class="select__btn" aria-haspopup="listbox" aria-expanded="false"><span class="select__label"></span>${icon('chev')}</button>`;
  const btn = $('.select__btn', root), lab = $('.select__label', root);
  const labelOf = (v) => (options.find((o) => o.v === v) || options[0]).l;
  lab.textContent = labelOf(cur);

  function close() {
    if (!menu) return;
    menu.remove(); menu = null; root.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('pointerdown', outside, true); window.removeEventListener('resize', close);
    document.removeEventListener('scroll', close, true);
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
    menu.style.left = r.left + 'px'; menu.style.width = r.width + 'px';
    menu.style.top = (up ? r.top - mh - 8 : r.bottom + 8) + 'px';
    menu.classList.toggle('is-up', up);
    root.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true');
    focusIdx = options.findIndex((o) => o.v === cur);
    menu.addEventListener('click', (e) => { const o = e.target.closest('.select__opt'); if (o) pick(options[+o.dataset.i].v); });
    document.addEventListener('pointerdown', outside, true); window.addEventListener('resize', close);
    document.addEventListener('scroll', close, true);
  }
  function setFocus(i) {
    focusIdx = (i + options.length) % options.length;
    $$('.select__opt', menu).forEach((el, k) => el.classList.toggle('is-focus', k === focusIdx));
  }
  btn.addEventListener('click', open);
  btn.addEventListener('keydown', (e) => {
    if (!menu && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); open(); setFocus(focusIdx); return; }
    if (!menu) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setFocus(focusIdx + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocus(focusIdx - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (focusIdx >= 0) pick(options[focusIdx].v); }
  });
  return { get value() { return cur; }, set(v) { cur = v; lab.textContent = labelOf(v); }, close };
}

function initSeg(root, { options, value, onChange }) {
  root.innerHTML = '<i class="seg__pill"></i>' + options.map((o) => `<button type="button" data-v="${o.v}" class="${o.v === value ? 'is-on' : ''}">${o.l}</button>`).join('');
  const pill = $('.seg__pill', root);
  const place = () => {
    const b = $('.is-on', root); if (!b || !b.offsetWidth) return;
    pill.style.width = b.offsetWidth + 'px'; pill.style.transform = `translateX(${b.offsetLeft - 4}px)`;
  };
  root.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', root).forEach((x) => x.classList.toggle('is-on', x === b));
    place(); onChange(+b.dataset.v || b.dataset.v);
  });
  root._place = place; requestAnimationFrame(place);
  return { place };
}

/* ---------- tooltip ---------- */
const tip = $('#tip');
let tipTimer;
function showTip(el, x, y) {
  tip.innerHTML = el.dataset.tip; tip.hidden = false;
  const w = tip.offsetWidth; tip.style.left = Math.min(Math.max(x, w / 2 + 8), innerWidth - w / 2 - 8) + 'px'; tip.style.top = Math.max(y, 60) + 'px';
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
let gid = 0;

function drawKmChart() {
  const el = $('#chart-km'); const W = el.clientWidth; if (!W) return;
  const H = 240, n = view.kmRange, id = 'kg' + ++gid;
  const days = Array.from({ length: n }, (_, i) => addDays(startOfDay(), -(n - 1 - i)));
  const vals = days.map((d) => S.kmByDate[toStr(d)] || 0);
  const mx = niceMax(Math.max(...vals, 10)), m = { l: 38, r: 6, t: 14, b: 28 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b, slot = iw / n, bw = Math.max(2.5, slot * (n <= 14 ? 0.56 : 0.64));
  const y = (v) => m.t + ih * (1 - v / mx);
  const total = vals.reduce((a, b) => a + b, 0), avg = total / n;
  $('#km-sum').textContent = `${fmt(total, 0)} km în ${n === 7 ? 'ultimele 7 zile' : n === 30 ? 'ultimele 30 de zile' : 'ultimele 90 de zile'} · medie ${fmt(avg, 1)} km/zi`;
  let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ef2c0"/><stop offset="1" stop-color="#4fb7ff" stop-opacity=".75"/></linearGradient><linearGradient id="${id}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd36e"/><stop offset="1" stop-color="#ff8f5a"/></linearGradient></defs>`;
  for (let k = 0; k <= 4; k++) { const yy = y((mx * k) / 4); s += `<line class="grid-l" x1="${m.l}" x2="${W - m.r}" y1="${yy}" y2="${yy}"/><text x="${m.l - 8}" y="${yy + 3.5}" text-anchor="end">${fmt((mx * k) / 4, mx < 10 ? 1 : 0)}</text>`; }
  vals.forEach((v, i) => {
    const x = m.l + slot * i + (slot - bw) / 2, d = days[i], isToday = i === n - 1;
    const h = Math.max(v > 0 ? 3 : 2, ih * (v / mx));
    const tipHtml = `<b>${fmt(v, 1)} km</b><small>${dayLabel(toStr(d))}</small>`;
    s += `<rect class="bar" style="--i:${i}" x="${x.toFixed(1)}" y="${(m.t + ih - h).toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="${Math.min(bw / 2, 6).toFixed(1)}" fill="${v === 0 ? 'var(--line-2)' : isToday ? `url(#${id}t)` : `url(#${id})`}" data-tip="${esc(tipHtml)}"/>`;
    const lab = n === 7 ? DAYS_S[d.getDay()] : (n - 1 - i) % (n === 30 ? 5 : 15) === 0 ? `${d.getDate()}.${pad(d.getMonth() + 1)}` : '';
    if (lab) s += `<text x="${(x + bw / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle">${lab}</text>`;
  });
  if (avg > 0) s += `<line class="avg-l" x1="${m.l}" x2="${W - m.r}" y1="${y(avg)}" y2="${y(avg)}"/><text class="avg-t" x="${W - m.r}" y="${y(avg) - 6}" text-anchor="end">medie ${fmt(avg, 0)}</text>`;
  el.innerHTML = s + '</svg>';
}

function lineChart(el, pts, { color = '#5ef2c0', dec = 1, unit = '', avg = null, pad: yp = 0.15 } = {}) {
  const W = el.clientWidth; if (!W) return;
  if (pts.length < 2) { el.innerHTML = '<div class="empty">Adaugă cel puțin două alimentări pline<br>pentru a vedea evoluția.</div>'; return; }
  const H = 240, id = 'lg' + ++gid, m = { l: 40, r: 14, t: 16, b: 28 };
  const vs = pts.map((p) => p.v); let lo = Math.min(...vs, avg ?? Infinity), hi = Math.max(...vs, avg ?? -Infinity);
  const sp = (hi - lo) || 1; lo -= sp * yp; hi += sp * yp;
  const tdec = (hi - lo) / 4 < (dec === 1 ? 0.2 : 0.02) ? dec + 1 : dec; // axa: mai multe zecimale când intervalul e îngust
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const X = (i) => m.l + (iw * i) / (pts.length - 1), Y = (v) => m.t + ih * (1 - (v - lo) / (hi - lo));
  const P = pts.map((p, i) => [X(i), Y(p.v)]);
  let d = `M${P[0][0]},${P[0][1]}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2, t = 0.18;
    d += ` C${p1[0] + (p2[0] - p0[0]) * t},${p1[1] + (p2[1] - p0[1]) * t} ${p2[0] - (p3[0] - p1[0]) * t},${p2[1] - (p3[1] - p1[1]) * t} ${p2[0]},${p2[1]}`;
  }
  let s = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".35"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>`;
  for (let k = 0; k <= 4; k++) { const v = lo + ((hi - lo) * k) / 4, yy = Y(v); s += `<line class="grid-l" x1="${m.l}" x2="${W - m.r}" y1="${yy}" y2="${yy}"/><text x="${m.l - 8}" y="${yy + 3.5}" text-anchor="end">${fmt(v, tdec)}</text>`; }
  if (avg != null) s += `<line class="avg-l" x1="${m.l}" x2="${W - m.r}" y1="${Y(avg)}" y2="${Y(avg)}"/><text class="avg-t" x="${W - m.r}" y="${Y(avg) - 6}" text-anchor="end">medie ${fmt(avg, dec)}</text>`;
  s += `<path class="line-a" d="${d} L${P[P.length - 1][0]},${m.t + ih} L${P[0][0]},${m.t + ih}Z" fill="url(#${id})"/>`;
  s += `<path class="line-p" pathLength="1" d="${d}" stroke="${color}" style="filter:drop-shadow(0 4px 10px ${color}88)"/>`;
  const step = Math.ceil(pts.length / Math.max(2, Math.floor(iw / 62)));
  pts.forEach((p, i) => {
    s += `<circle class="dot" style="--i:${i};color:${color}" cx="${P[i][0]}" cy="${P[i][1]}" r="5" fill="var(--card-solid)" stroke="${color}" stroke-width="2.6" data-tip="${esc(`<b>${fmt(p.v, dec + (dec === 1 ? 1 : 0))} ${unit}</b><small>${p.label}</small>`)}"/>`;
    if ((pts.length - 1 - i) % step === 0) s += `<text x="${P[i][0]}" y="${H - 8}" text-anchor="middle">${p.short}</text>`;
  });
  el.innerHTML = s + '</svg>';
}

function drawConsChart() {
  const pts = S.cons.slice(-10).map((c) => { const d = parse(c.date); return { v: c.v, label: dayLabel(c.date) + ` · ${fmt(c.km, 0)} km`, short: `${d.getDate()} ${MONTHS[d.getMonth()]}` }; });
  lineChart($('#chart-cons'), pts, { color: '#5ef2c0', dec: 1, unit: 'L/100 km', avg: S.avgCons });
}
function drawPriceChart() {
  const pts = S.fills.slice(-12).map((f) => { const d = parse(f.date); return { v: f.ppl, label: `${dayLabel(f.date)} · ${f.station}`, short: `${d.getDate()} ${MONTHS[d.getMonth()]}` }; });
  lineChart($('#chart-price'), pts, { color: '#ffbe4d', dec: 2, unit: 'lei/L', avg: S.allAvgPrice });
}

function drawSpark() {
  const vals = Array.from({ length: 30 }, (_, i) => S.kmByDate[toStr(addDays(startOfDay(), -(29 - i)))] || 0);
  const mx = Math.max(...vals, 1), w = 300, h = 64;
  const P = vals.map((v, i) => [(w * i) / 29, h - 8 - (h - 18) * (v / mx)]);
  let d = `M${P[0][0]},${P[0][1]}`;
  for (let i = 1; i < P.length; i++) { const cx = (P[i - 1][0] + P[i][0]) / 2; d += ` C${cx},${P[i - 1][1]} ${cx},${P[i][1]} ${P[i][0]},${P[i][1]}`; }
  $('#h-spark').innerHTML = `<defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ef2c0" stop-opacity=".35"/><stop offset="1" stop-color="#5ef2c0" stop-opacity="0"/></linearGradient></defs><path class="spark__area" d="${d} L${w},${h} L0,${h}Z" fill="url(#sg)"/><path class="spark__line" pathLength="1" d="${d}"/>`;
}

/* ---------- odometru ---------- */
function renderOdo(value) {
  const el = $('#odo'); const s = fmt(Math.round(value), 0); let k = 0;
  el.classList.remove('is-on');
  el.innerHTML = [...s].map((c) => c === '.' ? '<span class="odo__sep">.</span>' : `<span class="odo__d"><span class="odo__reel" style="--n:${+c + 10};--k:${k++}">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<span>${n}</span>`).join('')}</span></span>`).join('') + '<span class="odo__unit">km</span>';
  el.setAttribute('aria-label', `${s} kilometri`);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-on')));
}

/* ---------- gauge ---------- */
function renderGauge() {
  const pct = S.tankPct, off = 251.3 * (1 - pct), deg = -90 + 180 * pct;
  const ticks = [0, .25, .5, .75, 1].map((t) => { const a = Math.PI * (1 - t), x1 = 100 + 68 * Math.cos(a), y1 = 100 - 68 * Math.sin(a), x2 = 100 + 74 * Math.cos(a), y2 = 100 - 74 * Math.sin(a); return `<line class="gauge__tick" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`; }).join('');
  const el = $('#gauge');
  el.classList.remove('is-on');
  el.style.setProperty('--off', off); el.style.setProperty('--deg', deg + 'deg');
  el.innerHTML = `<svg viewBox="0 0 200 112"><defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff7d95"/><stop offset=".35" stop-color="#ffbe4d"/><stop offset="1" stop-color="#5ef2c0"/></linearGradient></defs>
    <path class="gauge__track" d="M20 100 A80 80 0 0 1 180 100"/><path class="gauge__val" d="M20 100 A80 80 0 0 1 180 100"/>${ticks}
    <g class="gauge__needle"><line x1="100" y1="100" x2="100" y2="38"/><circle cx="100" cy="100" r="7"/></g></svg>
    <div class="gauge__pct"><span id="g-pct" data-count="${Math.round(pct * 100)}">0</span><i>%</i></div>`;
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-on')));
  countUp($('#g-pct'));
  $('#g-ago').textContent = 'Ultima: ' + S.tankAgo;
  setCount('#g-l', S.tankL); setCount('#g-km', Math.round(S.range / 10) * 10);
}

/* ---------- liste ---------- */
function tripItem(t, i = 0, extra = '') {
  const kmh = t.min ? (t.km / (t.min / 60)) : 0;
  return `<li class="item ${extra}" style="--i:${i}"><span class="item__ic">${icon('pin')}</span>
    <div class="item__body"><b>${esc(t.from)}<span class="arrow">→</span>${esc(t.to)}</b><small>${t.time} · ${hm(t.min)} · ${fmt(kmh, 0)} km/h</small></div>
    <div class="item__end"><b>${fmt(t.km, 1)} km</b><small>≈ ${fmt((t.km * S.avgCons * S.avgPrice) / 100, 1)} lei</small></div></li>`;
}
function fillItem(f, i = 0, extra = '') {
  const c = consOf(f.id);
  const cb = c ? `<span class="badge ${c.v <= S.avgCons ? 'badge--good' : 'badge--bad'}">${fmt(c.v, 1)} L/100</span>` : '';
  return `<li class="item ${extra}" style="--i:${i}"><span class="item__ic item__ic--amber">${icon('fuel')}</span>
    <div class="item__body"><b>${esc(f.station)}${f.full ? '' : '<span class="badge">parțial</span>'}${cb}</b><small>${dayLabel(f.date)} · ${fmt(f.odo, 0)} km</small></div>
    <div class="item__end"><b>${fmt(f.liters * f.ppl, 2)} lei</b><small>${fmt(f.liters, 2)} L × ${fmt(f.ppl, 2)}</small></div></li>`;
}
const byTime = (a, b) => b.date.localeCompare(a.date) || (b.time || '').localeCompare(a.time || '') || b.id - a.id;

/* ---------- pagini ---------- */
function renderDash(newId) {
  const now = new Date(), h = now.getHours();
  $('#dash-date').textContent = `${DAYS_L[now.getDay()]}, ${now.getDate()} ${MONTHS_L[now.getMonth()]}`;
  $('#dash-greet').textContent = h < 5 ? 'Noapte bună' : h < 12 ? 'Bună dimineața' : h < 18 ? 'Bună ziua' : 'Bună seara';
  renderOdo(state.odo);
  setCount('#h-month', S.monthKm); setCount('#h-avg', S.avgDaily); setCount('#h-today', S.todayKm);
  drawSpark(); renderGauge();

  setCount('#k-cons', S.avgCons);
  const dEl = $('#k-cons-d');
  if (S.last) { const diff = S.last.v - S.avgCons; dEl.className = 'delta ' + (diff > 0.05 ? 'delta--up' : diff < -0.05 ? '' : 'delta--flat'); dEl.textContent = `${diff > 0.05 ? '▲' : diff < -0.05 ? '▼' : '●'} ${fmt(Math.abs(diff), 1)} ultima alimentare`; }
  else dEl.textContent = 'date insuficiente';
  setCount('#k-spend', S.monthSpend);
  $('#k-spend-d').textContent = S.prevSpend ? `Luna trecută: ${fmt(S.prevSpend, 0)} lei` : 'Prima lună înregistrată';
  setCount('#k-cpk', S.costPerKm);
  $('#k-cpk-d').textContent = `≈ ${fmt(S.costPerKm * 100, 0)} lei la 100 km`;
  setCount('#k-price', S.avgPrice);
  const pf = S.fills.slice(-2);
  const dEl2 = $('#k-price-d');
  if (pf.length === 2) { const df = pf[1].ppl - pf[0].ppl; dEl2.className = 'delta ' + (df > 0.005 ? 'delta--up' : df < -0.005 ? '' : 'delta--flat'); dEl2.textContent = `${df > 0.005 ? '▲' : df < -0.005 ? '▼' : '●'} ${fmt(Math.abs(df), 2)} lei vs. anterior`; }

  drawKmChart(); drawConsChart();
  $('#recent-trips').innerHTML = [...state.trips].sort(byTime).slice(0, 5).map((t, i) => tripItem(t, i, t.id === newId ? 'is-new' : '')).join('');
  $('#recent-fills').innerHTML = [...state.fills].sort(byTime).slice(0, 4).map((f, i) => fillItem(f, i, f.id === newId ? 'is-new' : '')).join('') || '<li class="empty">Nicio alimentare încă.</li>';
}

function renderFuel(newId) {
  setCount('#f-l', S.totalL); setCount('#f-spend', S.totalSpend); setCount('#f-price', S.allAvgPrice); setCount('#f-n', state.fills.length);
  drawPriceChart();
  const months = [];
  const now = new Date();
  for (let i = 3; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); months.push({ k: `${d.getFullYear()}-${pad(d.getMonth() + 1)}`, l: MONTHS_L[d.getMonth()].slice(0, 3) }); }
  const mx = Math.max(...months.map((m) => S.spendBy[m.k] || 0), 1);
  $('#cols-month').innerHTML = months.map((m, i) => `<div class="col ${i === 3 ? 'is-cur' : ''}"><span class="col__v">${fmt(S.spendBy[m.k] || 0, 0)}</span><div class="col__bar" style="--i:${i};--h:${((S.spendBy[m.k] || 0) / mx) * 78}%" data-tip="<b>${fmt(S.spendBy[m.k] || 0, 2)} lei</b>"></div><span class="col__l">${m.l}</span></div>`).join('');
  requestAnimationFrame(() => requestAnimationFrame(() => $$('#cols-month .col__bar').forEach((b) => (b.style.height = b.style.getPropertyValue('--h')))));
  const groups = {};
  [...state.fills].sort(byTime).forEach((f) => { (groups[f.date.slice(0, 7)] ||= []).push(f); });
  $('#fill-history').innerHTML = Object.keys(groups).sort().reverse().map((k) => {
    const [y, mo] = k.split('-'), arr = groups[k], tot = arr.reduce((a, f) => a + f.liters * f.ppl, 0), l = arr.reduce((a, f) => a + f.liters, 0);
    return `<div class="group"><div class="group__h"><span>${MONTHS_L[+mo - 1]} ${y}</span><span>${fmt(l, 1)} L · ${fmt(tot, 2)} lei</span></div><ul class="list">${arr.map((f, i) => fillItem(f, i, f.id === newId ? 'is-new' : '')).join('')}</ul></div>`;
  }).join('') || '<div class="empty">Nicio alimentare încă.</div>';
}

/* ---- hartă ---- */
const PLACE_POS = { 'Acasă': [.46, .58], 'Birou': [.76, .42], 'Supermarket': [.33, .78], 'Sala de sport': [.64, .82], 'Mall': [.22, .5], 'Părinți': [.17, .2], 'Cabană Valea Mare': [.8, .12], 'Aeroport': [.9, .7] };
const PALETTE = ['#5ef2c0', '#4fb7ff', '#ffbe4d', '#8c9bff', '#ff7d95', '#ff9d4d', '#c58cff'];
function hash(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return Math.abs(h); }
function posOf(name) {
  if (PLACE_POS[name]) return PLACE_POS[name];
  const h = hash(name), a = (h % 360) * (Math.PI / 180), r = 0.22 + ((h >> 8) % 20) / 100;
  return [Math.min(.92, Math.max(.08, .46 + Math.cos(a) * r)), Math.min(.9, Math.max(.1, .58 + Math.sin(a) * r * 0.9))];
}

function drawMap(trips) {
  const el = $('#map'); const W = el.clientWidth; if (!W) return;
  const H = W < 520 ? Math.round(W * 1.12) : 400;
  const edges = {}, nodes = {};
  trips.forEach((t) => {
    const key = [t.from, t.to].sort().join('|');
    const e = (edges[key] ||= { a: t.from, b: t.to, n: 0, km: 0 }); e.n++; e.km += t.km;
    [t.from, t.to].forEach((p) => { nodes[p] = (nodes[p] || 0) + 1; });
  });
  const names = Object.keys(nodes);
  if (!names.length) { el.innerHTML = '<div class="empty">Niciun traseu în perioada aleasă.</div>'; return; }
  const P = (n) => { const [x, y] = posOf(n); return [x * W, y * H]; };
  const home = P('Acasă'); el.style.setProperty('--cx', ((home[0] / W) * 100).toFixed(1) + '%'); el.style.setProperty('--cy', ((home[1] / H) * 100).toFixed(1) + '%');
  const maxN = Math.max(...Object.values(edges).map((e) => e.n));
  const sorted = Object.values(edges).sort((a, b) => b.n - a.n);
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><defs><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="var(--grid-dot)"/></pattern>
    <linearGradient id="eg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5ef2c0"/><stop offset="1" stop-color="#4fb7ff"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#dots)"/>`;
  [0.17, 0.3, 0.46].forEach((r) => (s += `<circle cx="${home[0]}" cy="${home[1]}" r="${r * W}" fill="none" stroke="var(--line)" stroke-dasharray="2 7"/>`));
  let carPath = '';
  sorted.forEach((e, i) => {
    const [x1, y1] = P(e.a), [x2, y2] = P(e.b), mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
    const sign = hash(e.a + e.b) % 2 ? 1 : -1, k = 0.16 * sign;
    const d = `M${x1},${y1} Q${mx - dy * k},${my + dx * k} ${x2},${y2}`;
    if (!carPath) carPath = d;
    const w = 1.6 + (e.n / maxN) * 5;
    s += `<g><path class="map__edge" pathLength="1" style="--i:${i}" d="${d}" stroke="url(#eg)" stroke-width="${w.toFixed(1)}" opacity="${(0.35 + 0.5 * (e.n / maxN)).toFixed(2)}" data-tip="${esc(`<b>${esc(e.a)} ↔ ${esc(e.b)}</b><small>${e.n} deplasări · ${fmt(e.km, 0)} km</small>`)}"/><path class="map__flow" d="${d}"/></g>`;
  });
  const maxV = Math.max(...Object.values(nodes));
  names.forEach((n, i) => {
    const [x, y] = P(n), c = n === 'Acasă' ? '#5ef2c0' : PALETTE[1 + (hash(n) % (PALETTE.length - 1))], r = 6 + (nodes[n] / maxV) * 8;
    const left = x > W * 0.78, tx = left ? x - r - 8 : x + r + 8;
    s += `<g class="map__node" data-tip="${esc(`<b>${esc(n)}</b><small>${nodes[n]} treceri</small>`)}"><circle class="map__halo" style="--i:${i}" cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".5"/><circle class="map__core" style="--i:${i}" cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="var(--bg)" stroke-width="3"/>${n === 'Acasă' ? `<circle cx="${x}" cy="${y}" r="3" fill="var(--bg)"/>` : ''}<text x="${tx}" y="${y + 4}" text-anchor="${left ? 'end' : 'start'}">${esc(n)}</text></g>`;
  });
  if (carPath && motionOn()) s += `<circle r="5" fill="#fff" style="filter:drop-shadow(0 0 8px #fff)"><animateMotion dur="7s" repeatCount="indefinite" path="${carPath}" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear"/></circle>`;
  el.innerHTML = s + '</svg>';
  el.style.minHeight = H + 'px';
}

function renderRoutes(newId) {
  const since = toStr(addDays(startOfDay(), -(view.routesRange - 1)));
  const trips = state.trips.filter((t) => t.date >= since);
  const km = trips.reduce((a, t) => a + t.km, 0), min = trips.reduce((a, t) => a + t.min, 0);
  setCount('#r-km', km); setCount('#r-n', trips.length); setCount('#r-cost', (km * S.costPerKm));
  $('#r-time').textContent = hm(min).replace(' min', '′').replace(' h ', ' h ');
  drawMap(trips);

  const places = {};
  trips.forEach((t) => { const p = (places[t.to] ||= { n: 0, km: 0 }); p.n++; p.km += t.km; });
  const top = Object.entries(places).sort((a, b) => b[1].n - a[1].n).slice(0, 6), mx = top.length ? top[0][1].n : 1;
  $('#top-places').innerHTML = top.map(([n, p], i) => `<li style="--i:${i}"><b><i style="--c:${PALETTE[i % PALETTE.length]}"></i>${esc(n)}</b><span>${p.n}× · ${fmt(p.km, 0)} km</span><div class="bars__track"><span class="bars__fill" style="--c:${PALETTE[i % PALETTE.length]};--w:${(p.n / mx) * 100}%;--i:${i}"></span></div></li>`).join('') || '<li class="empty">Nicio destinație.</li>';
  requestAnimationFrame(() => requestAnimationFrame(() => $$('#top-places .bars__fill').forEach((b) => (b.style.width = b.style.getPropertyValue('--w')))));

  const sorted = [...trips].sort(byTime), shown = sorted.slice(0, view.tripLimit), groups = {};
  shown.forEach((t) => (groups[t.date] ||= []).push(t));
  $('#trip-history').innerHTML = Object.keys(groups).sort().reverse().map((d) => {
    const arr = groups[d], tk = trips.filter((t) => t.date === d).reduce((a, t) => a + t.km, 0);
    return `<div class="group"><div class="group__h"><span>${dayLabel(d)}</span><span>${fmt(tk, 1)} km</span></div><ul class="list">${arr.map((t, i) => tripItem(t, i, t.id === newId ? 'is-new' : '')).join('')}</ul></div>`;
  }).join('') || '<div class="empty">Niciun traseu în perioada aleasă.</div>';
  const more = $('#trip-more'); more.hidden = sorted.length <= shown.length;
  more.textContent = `Arată mai multe (${sorted.length - shown.length})`;
}

function serviceInfo(s) {
  if (s.type === 'km') {
    const used = state.odo - s.last, left = s.every - used, p = Math.max(0, Math.min(1, left / s.every));
    return { p, big: fmt(Math.max(0, left) / 1000, 1) + 'k', small: 'km rămași', sub: `la ${fmt(s.last + s.every, 0)} km` };
  }
  const left = dayDiff(parse(s.due), new Date()), p = Math.max(0, Math.min(1, left / s.days));
  const d = parse(s.due);
  return { p, big: String(Math.max(0, left)), small: left === 1 ? 'zi' : 'zile', sub: `până pe ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`, urgent: left <= 14 };
}

function renderCar() {
  const c = state.car;
  $$('.js-carname').forEach((e) => (e.textContent = c.name)); $$('.js-carplate').forEach((e) => (e.textContent = c.plate)); $$('.js-carsub').forEach((e) => (e.textContent = c.sub));
  $('#specs').innerHTML = [['Kilometraj', fmt(state.odo, 0) + ' km'], ...c.specs].map(([k, v], i) => `<div style="--i:${i}"><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('');
  const rings = $('#rings'); rings.classList.remove('is-on');
  rings.innerHTML = c.service.map((s, i) => {
    const inf = serviceInfo(s), col = inf.p < 0.1 || inf.urgent ? 'var(--rose)' : inf.p < 0.3 ? 'var(--amber)' : 'var(--mint)';
    return `<div class="ring" style="--i:${i}"><div class="ring__svg"><svg viewBox="0 0 80 80"><circle class="ring__bg" cx="40" cy="40" r="34"/><circle class="ring__fg" style="--c:${col};--i:${i};--off:${(214 * (1 - Math.max(0.04, inf.p))).toFixed(1)}" cx="40" cy="40" r="34"/></svg><div class="ring__n"><span>${inf.big}<small>${inf.small}</small></span></div></div><b>${esc(s.label)}</b><small>${inf.sub}</small></div>`;
  }).join('');
  requestAnimationFrame(() => requestAnimationFrame(() => rings.classList.add('is-on')));
  renderInstallCard();
}

/* ---------- routing ---------- */
const PAGES = ['dash', 'fuel', 'routes', 'car'];
let current = null;
function renderPage(p, newId) { ({ dash: renderDash, fuel: renderFuel, routes: renderRoutes, car: renderCar })[p](newId); }
function placeNavIndicators() {
  $$('.nav').forEach((nav) => {
    const a = $('.nav__item.is-active', nav), ind = $('.nav__ind', nav); if (!a || !a.offsetWidth) return;
    if (nav.classList.contains('nav--tab')) { ind.style.setProperty('--x', a.offsetLeft - nav.clientLeft - 7 + 'px'); ind.style.setProperty('--w', a.offsetWidth + 'px'); }
    else { ind.style.setProperty('--y', a.offsetTop + 'px'); ind.style.setProperty('--h', a.offsetHeight + 'px'); }
  });
}
function route() {
  const p = (location.hash.match(/^#\/(\w+)/) || [])[1];
  const page = PAGES.includes(p) ? p : 'dash';
  if (page === current) return;
  current = page;
  $$('.page').forEach((el) => el.classList.toggle('is-active', el.dataset.page === page));
  $$('.nav__item').forEach((a) => a.classList.toggle('is-active', a.dataset.page === page));
  placeNavIndicators(); window.scrollTo({ top: 0 }); closeFab();
  $$('.tip').forEach((t) => (t.hidden = true));
  renderPage(page);
  document.title = { dash: 'Acasă', fuel: 'Alimentări', routes: 'Trasee', car: 'Mașina' }[page] + ' — DieselLog';
}
window.addEventListener('hashchange', route);
let rz, lastW = innerWidth; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { if (innerWidth === lastW) return; lastW = innerWidth; placeNavIndicators(); $$('.seg').forEach((s) => s._place && s._place()); if (current === 'dash') { drawKmChart(); drawConsChart(); } if (current === 'fuel') drawPriceChart(); if (current === 'routes') drawMap(state.trips.filter((t) => t.date >= toStr(addDays(startOfDay(), -(view.routesRange - 1))))); }, 160); });

/* ---------- foi / formulare ---------- */
const wrap = $('#sheetwrap');
let openSheet = null, stationSel = null;
function showSheet(kind) {
  closeFab();
  const sh = $('#sheet-' + kind); openSheet = sh;
  wrap.classList.remove('is-closing'); wrap.hidden = false; $$('.sheet', wrap).forEach((x) => { x.hidden = x !== sh; x.classList.remove('is-closing'); });
  document.body.classList.add('is-locked');
  const f = sh, last = [...state.fills].sort(byTime)[0];
  $$('.field', f).forEach((x) => x.classList.remove('is-bad')); $('.form-err', f).hidden = true;
  const now = new Date();
  f.date.value = toStr(now);
  if (kind === 'fill') {
    f.odo.value = state.odo; f.liters.value = ''; f.ppl.value = last ? fmt(last.ppl, 2) : ''; f.full.checked = true;
    stationSel.set(last ? last.station : STATIONS[0]); updateTotal();
  } else {
    f.from.value = ''; f.to.value = ''; f.km.value = ''; f.min.value = ''; f.time.value = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const names = [...new Set(state.trips.flatMap((t) => [t.from, t.to]))];
    $('#places').innerHTML = names.map((n) => `<option value="${esc(n)}">`).join('');
  }
  setTimeout(() => { const first = $('input:not([type=date])', f); first && matchMedia('(hover:hover)').matches && first.focus({ preventScroll: true }); }, 350);
}
async function hideSheet() {
  if (!openSheet) return;
  const sh = openSheet; openSheet = null;
  sh.classList.add('is-closing'); wrap.classList.add('is-closing');
  await sleep(motionOn() ? 280 : 0);
  wrap.hidden = true; sh.hidden = true; document.body.classList.remove('is-locked');
}
document.addEventListener('click', (e) => {
  const o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); showSheet(o.dataset.open); }
  if (e.target.closest('[data-close]')) hideSheet();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openSheet && !$('.select__menu')) hideSheet(); });

function updateTotal() {
  const f = $('#sheet-fill'), t = num(f.liters.value) * num(f.ppl.value);
  const el = $('#fill-total'), v = isFinite(t) && t > 0 ? t : 0, from = +el.dataset.v || 0;
  el.dataset.v = v;
  if (!motionOn()) { el.textContent = fmt(v, 2); return; }
  const t0 = performance.now(); cancelAnimationFrame(el._raf);
  const tick = (now) => { const p = Math.min(1, (now - t0) / 350), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (v - from) * e, 2); if (p < 1) el._raf = requestAnimationFrame(tick); };
  el._raf = requestAnimationFrame(tick);
}
function fail(form, name, msg) {
  const inp = form[name]; const fld = inp.closest('.field'); fld && fld.classList.add('is-bad');
  const err = $('.form-err', form); err.textContent = msg; err.hidden = false; inp.focus({ preventScroll: true });
}

function submitFill(e) {
  e.preventDefault();
  const f = e.currentTarget; $$('.field', f).forEach((x) => x.classList.remove('is-bad')); $('.form-err', f).hidden = true;
  const odo = Math.round(num(f.odo.value)), liters = num(f.liters.value), ppl = num(f.ppl.value);
  const lastOdo = Math.max(0, ...state.fills.map((x) => x.odo));
  if (!f.date.value) return fail(f, 'date', 'Alege data alimentării.');
  if (!(odo > 0)) return fail(f, 'odo', 'Introdu kilometrajul de pe bord.');
  if (odo < lastOdo - 0 && state.fills.some((x) => x.date <= f.date.value && x.odo > odo) ) return fail(f, 'odo', `Kilometrajul trebuie să fie cel puțin ${fmt(lastOdo, 0)} km (ultima alimentare).`);
  if (!(liters > 0 && liters < 200)) return fail(f, 'liters', 'Introdu numărul de litri alimentați.');
  if (!(ppl > 0 && ppl < 30)) return fail(f, 'ppl', 'Introdu prețul pe litru.');
  const rec = { id: Date.now(), date: f.date.value, odo, liters: Math.round(liters * 100) / 100, ppl: Math.round(ppl * 100) / 100, station: stationSel.value, full: f.full.checked };
  state.fills.push(rec); state.odo = Math.max(state.odo, odo);
  persist(); S = computeStats(); hideSheet(); renderPage(current, rec.id);
  toast(`Alimentare salvată · ${fmt(rec.liters * rec.ppl, 2)} lei`);
}
function submitTrip(e) {
  e.preventDefault();
  const f = e.currentTarget; $$('.field', f).forEach((x) => x.classList.remove('is-bad')); $('.form-err', f).hidden = true;
  const from = f.from.value.trim(), to = f.to.value.trim(), km = num(f.km.value), min = Math.round(num(f.min.value));
  if (!from) return fail(f, 'from', 'Spune de unde ai plecat.');
  if (!to) return fail(f, 'to', 'Spune unde ai ajuns.');
  if (!(km > 0 && km < 3000)) return fail(f, 'km', 'Introdu distanța parcursă.');
  if (!(min > 0 && min < 3000)) return fail(f, 'min', 'Introdu durata în minute.');
  const rec = { id: Date.now(), date: f.date.value || toStr(new Date()), time: f.time.value || '12:00', from, to, km: Math.round(km * 10) / 10, min };
  state.trips.push(rec); state.odo = Math.round((state.odo + rec.km) * 10) / 10;
  state.odo = Math.round(state.odo);
  persist(); S = computeStats(); hideSheet(); renderPage(current, rec.id);
  toast(`Traseu salvat · ${fmt(rec.km, 1)} km`);
}

function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = `<i>${icon('check')}</i><span>${esc(msg)}</span>`;
  $('#toasts').appendChild(t); setTimeout(() => t.remove(), 3300);
}

/* ---------- FAB ---------- */
const fab = $('#fab');
function closeFab() { fab.classList.remove('is-open'); $('#fab-main').setAttribute('aria-expanded', 'false'); $$('.fab__opt', fab).forEach((b) => (b.tabIndex = -1)); }
$('#fab-main').addEventListener('click', () => { const o = fab.classList.toggle('is-open'); $('#fab-main').setAttribute('aria-expanded', o); $$('.fab__opt', fab).forEach((b) => (b.tabIndex = o ? 0 : -1)); });
document.addEventListener('pointerdown', (e) => { if (!e.target.closest('.fab')) closeFab(); });

/* ---------- efecte: spotlight, tilt, ripple ---------- */
document.addEventListener('pointermove', (e) => {
  const c = e.target.closest && e.target.closest('.card'); if (!c || e.pointerType === 'touch') return;
  const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px');
  if (c.classList.contains('tilt') && matchMedia('(hover:hover)').matches && motionOn()) {
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(1000px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`;
  }
});
document.addEventListener('pointerout', (e) => { const c = e.target.closest && e.target.closest('.tilt'); if (c && !c.contains(e.relatedTarget)) c.style.transform = ''; });
document.addEventListener('pointerdown', (e) => {
  const b = e.target.closest('.btn'); if (!b || !motionOn()) return;
  const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), rp = document.createElement('i');
  rp.className = 'ripple'; rp.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  b.appendChild(rp); setTimeout(() => rp.remove(), 700);
});

/* ---------- temă, preferințe ---------- */
const mq = matchMedia('(prefers-color-scheme: dark)');
function applyTheme() {
  const t = state.settings.theme, dark = t === 'dark' || (t === 'auto' && mq.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  $('meta[name=theme-color]').content = dark ? '#06080c' : '#eef1f6';
  $$('.js-theme use').forEach((u) => u.setAttribute('href', dark ? '#i-sun' : '#i-moon'));
  themeSel && themeSel.set(t);
}
mq.addEventListener('change', () => state.settings.theme === 'auto' && applyTheme());
function applyMotion() { document.documentElement.dataset.motion = state.settings.motion ? 'full' : 'reduced'; }
let themeSel;
$$('.js-theme').forEach((b) => b.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  state.settings.theme = dark ? 'light' : 'dark'; persist(); applyTheme();
  if (current === 'dash') { drawKmChart(); drawConsChart(); }
}));

function initSettings() {
  themeSel = initSelect($('#sel-theme'), { options: [{ v: 'auto', l: 'Automat (sistem)' }, { v: 'dark', l: 'Întunecat' }, { v: 'light', l: 'Luminos' }], value: state.settings.theme, onChange: (v) => { state.settings.theme = v; persist(); applyTheme(); } });
  initSelect($('#sel-fuel'), { options: ['Motorină standard', 'Motorină premium', 'Benzină 95', 'GPL'].map((v) => ({ v, l: v })), value: state.settings.fuel, onChange: (v) => { state.settings.fuel = v; persist(); } });
  stationSel = initSelect($('#sel-station'), { options: STATIONS.map((v) => ({ v, l: v })), value: STATIONS[0] });
  initSelect($('#sel-range'), { options: [{ v: 7, l: 'Ultimele 7 zile' }, { v: 30, l: 'Ultimele 30 de zile' }, { v: 90, l: 'Ultimele 90 de zile' }], value: view.routesRange, onChange: (v) => { view.routesRange = v; view.tripLimit = 24; renderRoutes(); } });
  initSeg($('#seg-km'), { options: [{ v: 7, l: '7 z' }, { v: 30, l: '30 z' }, { v: 90, l: '90 z' }], value: view.kmRange, onChange: (v) => { view.kmRange = v; drawKmChart(); } });
  [['#sw-motion', 'motion'], ['#sw-notif', 'notif'], ['#sw-alert', 'alert']].forEach(([id, k]) => {
    const el = $(id); el.checked = !!state.settings[k];
    el.addEventListener('change', () => { state.settings[k] = el.checked; persist(); if (k === 'motion') applyMotion(); });
  });
  $('#trip-more').addEventListener('click', () => { view.tripLimit += 24; renderRoutes(); });
  const ff = $('#sheet-fill');
  ['liters', 'ppl'].forEach((n) => ff[n].addEventListener('input', updateTotal));
  ff.addEventListener('submit', submitFill); $('#sheet-trip').addEventListener('submit', submitTrip);

  $('#btn-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `dieselog-${toStr(new Date())}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Datele au fost exportate');
  });
  $('#btn-reset').addEventListener('click', () => {
    if (!confirm('Resetezi toate datele la valorile demonstrative? Ce ai adăugat tu se pierde.')) return;
    localStorage.removeItem(KEY); state = load(); S = computeStats(); applyTheme(); applyMotion(); renderPage(current); toast('Date demo restabilite');
  });
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
  if (isStandalone()) { st.textContent = 'Instalată'; st.className = 'chip chip--mint'; tx.textContent = 'Rulezi aplicația instalată. Datele sunt salvate pe acest dispozitiv și funcționează și fără internet.'; }
  else if (deferred) { st.textContent = 'Disponibilă'; st.className = 'chip chip--amber'; tx.textContent = 'Instalează DieselLog pe ecranul principal: se deschide ca o aplicație obișnuită, pe tot ecranul, și merge și fără internet.'; }
  else if (isIOS()) { st.textContent = 'iPhone / iPad'; st.className = 'chip chip--amber'; tx.textContent = 'Pe iOS instalarea se face manual din Safari:'; steps.hidden = false; }
  else { st.textContent = 'Din browser'; st.className = 'chip'; tx.textContent = 'Deschide aplicația pe telefon (Chrome) și alege „Instalează aplicația” / „Adaugă pe ecranul principal” din meniul browserului. Funcționează doar pe adrese securizate (HTTPS).'; }
}

/* ---------- pornire ---------- */
function boot() {
  S = computeStats();
  $$('.js-carname').forEach((e) => (e.textContent = state.car.name)); $$('.js-carplate').forEach((e) => (e.textContent = state.car.plate)); $$('.js-carsub').forEach((e) => (e.textContent = state.car.sub));
  applyMotion(); initSettings(); applyTheme();
  $$('.page').forEach((p) => $$('[data-anim]', p).forEach((el, i) => el.style.setProperty('--i', i)));
  if (!location.hash) history.replaceState(null, '', '#/dash');
  route();
  const add = new URLSearchParams(location.search).get('add');
  if (add === 'fill' || add === 'trip') setTimeout(() => showSheet(add), 500);
  renderInstallCard();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
  document.fonts && document.fonts.ready.then(placeNavIndicators);
}
boot();
