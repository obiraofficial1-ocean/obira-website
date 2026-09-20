/* OBIRA merchandising, coupons, pairing and showcase behavior */
const OBIRA_TAX_RATE = 2;
const OBIRA_COUPONS = { OBIRA5: 5, GLOW10: 10, WELCOME8: 8 };
const OBIRA_PAIR_DISCOUNT = 10;

function getCoupon() { return localStorage.getItem('obiraCoupon') || ''; }
function getCouponRate() { return OBIRA_COUPONS[getCoupon()] || 0; }
function formatINR(value) { return `₹${Math.max(0, Math.round(value))}`; }
function discountedPrice(price, rate) { return Math.round(price * (1 - rate / 100)); }

function obiraInitShowcase() {
  const slides = [...document.querySelectorAll('.story-review-slide')];
  const dots = [...document.querySelectorAll('.slider-dot')];
  if (!slides.length) return;
  let active = 0;
  const show = index => { active = (index + slides.length) % slides.length; slides.forEach((s,i)=>s.classList.toggle('active',i===active)); dots.forEach((d,i)=>d.classList.toggle('active',i===active)); };
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
  setInterval(()=>show(active + 1), 4200);
}

function spinCouponWheel() {
  const wheel = document.getElementById('coupon-wheel');
  const result = document.getElementById('coupon-result');
  if (!wheel || !result || wheel.dataset.spinning === 'true') return;
  wheel.dataset.spinning = 'true';
  const prizes = [{ code:'WELCOME8', rate:8 }, { code:'OBIRA5', rate:5 }, { code:'GLOW10', rate:10 }, { code:'WELCOME8', rate:8 }];
  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  wheel.style.transform = `rotate(${1440 + Math.floor(Math.random() * 360)}deg)`;
  setTimeout(() => { localStorage.setItem('obiraCoupon', prize.code); result.textContent = `You won ${prize.rate}% off — code ${prize.code} is applied.`; wheel.dataset.spinning = 'false'; updateCouponLabels(); }, 2300);
}
function applyCoupon() {
  const input = document.getElementById('coupon-code');
  const code = input ? input.value.trim().toUpperCase() : '';
  const message = document.getElementById('coupon-message');
  if (OBIRA_COUPONS[code]) { localStorage.setItem('obiraCoupon', code); if (message) message.textContent = `${code} applied: ${OBIRA_COUPONS[code]}% off`; showNotification(`${code} applied`); } else if (message) message.textContent = 'Use OBIRA5, WELCOME8 or GLOW10.';
  updateCouponLabels();
  if (typeof loadCart === 'function') loadCart();
}
function updateCouponLabels() { document.querySelectorAll('[data-coupon-label]').forEach(el=>el.textContent = getCoupon() ? `${getCoupon()} · ${getCouponRate()}% off` : 'No coupon applied'); }

function getPairFor(product) {
  if (!product) return null;
  const target = product.category === 'bracelets' ? 'chains' : (product.category === 'chains' ? 'bracelets' : 'clips');
  return products.find(p => p.category === target) || products.find(p => p.category === 'chains');
}
function renderPairing(product) {
  const host = document.getElementById('pairing-slot');
  if (!host || !product) return;
  const pair = getPairFor(product);
  if (!pair) return;
  const total = product.price + pair.price;
  const offer = discountedPrice(total, OBIRA_PAIR_DISCOUNT);
  host.innerHTML = `<div class="pairing-panel"><h3>Complete the look · Save ${OBIRA_PAIR_DISCOUNT}%</h3><div class="pair-options"><button class="pair-option" onclick="addPairToCart('${pair.id}')"><img src="${pair.image}" alt="${pair.name}"><span><strong>${pair.name}</strong><small>${formatINR(offer)} for both · add pair</small></span></button></div></div>`;
}
function addPairToCart(pairId) { const selected = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null'); if (selected && typeof increaseQty === 'function') increaseQty(selected.id); if (typeof increaseQty === 'function') increaseQty(pairId); showNotification('Pair added — bundle savings unlocked!'); }

function obiraLoadProductEnhancement() {
  const product = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null');
  if (!product) return;
  renderPairing(product);
}

function obiraEnhanceCart() {
  const container = document.getElementById('cart-items');
  const summary = document.getElementById('price-summary');
  if (!container || !summary) return;
  const cart = getCart();
  if (!cart.length) return;
  const subtotal = cart.reduce((sum,item)=>sum + item.price * item.qty, 0);
  const pairSaving = cart.length >= 2 && cart.some(i=>i.category==='bracelets') && cart.some(i=>i.category==='chains') ? Math.round(subtotal * OBIRA_PAIR_DISCOUNT / 100) : 0;
  const couponSaving = Math.round((subtotal - pairSaving) * getCouponRate() / 100);
  const taxable = subtotal - pairSaving - couponSaving;
  const tax = Math.round(taxable * OBIRA_TAX_RATE / 100);
  const total = taxable + tax + SHIPPING_COST;
  summary.innerHTML = `<div class="summary-card"><h3>Order summary</h3><p class="summary-row"><span>Subtotal</span><strong>${formatINR(subtotal)}</strong></p><p class="summary-row"><span>Pairing savings</span><strong>-${formatINR(pairSaving)}</strong></p><p class="summary-row"><span>Coupon <small data-coupon-label>${getCoupon() ? `${getCoupon()} · ${getCouponRate()}% off` : 'No coupon applied'}</small></span><strong>-${formatINR(couponSaving)}</strong></p><p class="summary-row"><span>Tax (${OBIRA_TAX_RATE}%)</span><strong>${formatINR(tax)}</strong></p><p class="summary-row"><span>Shipping</span><strong>${formatINR(SHIPPING_COST)}</strong></p><p class="summary-row total"><span>Total</span><strong>${formatINR(total)}</strong></p><div class="coupon-box"><input id="coupon-code" placeholder="Coupon code"><button onclick="applyCoupon()">Apply</button></div><small id="coupon-message" data-coupon-label>${getCoupon() ? `${getCoupon()} applied` : 'Try the wheel or enter a coupon.'}</small><button class="checkout-btn" onclick="checkout()">Proceed to Payment</button></div>`;
}

window.addEventListener('load', () => { obiraInitShowcase(); obiraLoadProductEnhancement(); updateCouponLabels(); setTimeout(obiraEnhanceCart, 0); });
