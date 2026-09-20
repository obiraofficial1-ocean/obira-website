/* OBIRA merchandising, coupons, pairing and showcase behavior */
const OBIRA_TAX_RATE = 2;
const OBIRA_BASE_DISCOUNT = 8;
const OBIRA_COUPONS = { OBIRA5: 5, GLOW10: 10, WELCOME8: 8 };
const OBIRA_PAIR_DISCOUNT = 10;

function getCoupon() { return localStorage.getItem('obiraCoupon') || 'WELCOME8'; }
function getCouponRate() { return OBIRA_COUPONS[getCoupon()] || OBIRA_BASE_DISCOUNT; }
function formatINR(value) { return `₹${Math.max(0, Math.round(value))}`; }
function discountedPrice(price, rate) { return Math.round(price * (1 - rate / 100)); }

function obiraInitShowcase() {
  const slides = [...document.querySelectorAll('.story-review-slide')];
  const dots = [...document.querySelectorAll('.slider-dot')];
  if (!slides.length) return;
  let active = 0;
  const show = index => { active = (index + slides.length) % slides.length; slides.forEach((s, i) => s.classList.toggle('active', i === active)); dots.forEach((d, i) => d.classList.toggle('active', i === active)); };
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  setInterval(() => show(active + 1), 4200);
}

function spinCouponWheel() {
  const wheel = document.getElementById('coupon-wheel');
  const result = document.getElementById('coupon-result');
  if (!wheel || !result || wheel.dataset.spinning === 'true') return;
  wheel.dataset.spinning = 'true';
  const alreadyTried = localStorage.getItem('obiraWheelTried') === 'true';
  const wins = [{ code: 'GLOW10', rate: 10 }, { code: 'OBIRA5', rate: 5 }];
  const won = !alreadyTried && Math.random() < 0.18;
  const prize = won ? wins[Math.floor(Math.random() * wins.length)] : null;
  localStorage.setItem('obiraWheelTried', 'true');
  wheel.style.transform = `rotate(${1440 + Math.floor(Math.random() * 360)}deg)`;
  result.textContent = 'The wheel is spinning…';
  setTimeout(() => {
    if (prize) { localStorage.setItem('obiraCoupon', prize.code); result.textContent = `Rare win: ${prize.rate}% extra off — ${prize.code} applied.`; }
    else result.textContent = 'No bonus this time — your 8% OBIRA launch saving remains active.';
    wheel.dataset.spinning = 'false';
    updateCouponLabels();
    if (typeof loadStore === 'function') loadStore();
    if (typeof loadCart === 'function') loadCart();
  }, 2300);
}

function applyCoupon() {
  const input = document.getElementById('coupon-code');
  const code = input ? input.value.trim().toUpperCase() : '';
  const message = document.getElementById('coupon-message');
  if (OBIRA_COUPONS[code]) { localStorage.setItem('obiraCoupon', code); if (message) message.textContent = `${code} applied: ${OBIRA_COUPONS[code]}% off`; showNotification(`${code} applied`); }
  else if (message) message.textContent = 'Use OBIRA5, WELCOME8 or GLOW10.';
  updateCouponLabels();
  if (typeof loadStore === 'function') loadStore();
  if (typeof loadCart === 'function') loadCart();
}
function updateCouponLabels() { document.querySelectorAll('[data-coupon-label]').forEach(el => el.textContent = `${getCoupon()} · ${getCouponRate()}% off`); }
function getPairFor(product) { if (!product) return null; const target = product.category === 'bracelets' ? 'chains' : (product.category === 'chains' ? 'bracelets' : 'clips'); return products.find(p => p.category === target) || products.find(p => p.category === 'chains'); }
function renderPairing(product) { const host = document.getElementById('pairing-slot'); if (!host || !product) return; const pair = getPairFor(product); if (!pair) return; const offer = discountedPrice(product.price + pair.price, OBIRA_PAIR_DISCOUNT); host.innerHTML = `<div class="pairing-panel"><h3>Complete the look · Save ${OBIRA_PAIR_DISCOUNT}%</h3><div class="pair-options"><button class="pair-option" onclick="addPairToCart('${pair.id}')"><img src="${pair.image}" alt="${pair.name}"><span><strong>${pair.name}</strong><small>${formatINR(offer)} for both · add pair</small></span></button></div></div>`; }
function addPairToCart(pairId) { const selected = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null'); if (selected && typeof increaseQty === 'function') increaseQty(selected.id); if (typeof increaseQty === 'function') increaseQty(pairId); showNotification('Pair added — bundle savings unlocked!'); }
function obiraLoadProductEnhancement() { const product = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null'); if (product) renderPairing(product); }
function obiraEnhanceCart() { if (typeof loadCart === 'function') loadCart(); }
window.addEventListener('load', () => { obiraInitShowcase(); obiraLoadProductEnhancement(); updateCouponLabels(); });
