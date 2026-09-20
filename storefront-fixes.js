/* Store navigation, filtering, bundles and Spin Win modal */
(function () {
  const categoryNames = { bracelets: 'Bracelets', chains: 'Chain Edit', clips: 'Hair Accessories', bands: 'Hair Accessories', pomeli: 'Pomeli' };
  const categoryOf = value => value === 'hair' ? ['clips', 'bands'] : [value];
  function renderCategoryStore() {
    const host = document.getElementById('store-products');
    if (!host || typeof products === 'undefined') return;
    const params = new URLSearchParams(location.search);
    const requested = params.get('category') || location.hash.replace('#', '') || 'all';
    const categories = requested === 'all' ? null : categoryOf(requested);
    const visible = categories ? products.filter(p => categories.includes(p.category)) : products;
    const cart = typeof getCart === 'function' ? getCart() : [];
    const wishlist = typeof getWishlist === 'function' ? getWishlist() : [];
    const title = document.querySelector('[data-store-title]');
    if (title) title.textContent = categories ? (categoryNames[requested] || 'OBIRA Edit') : 'Shop the OBIRA Edit';
    host.innerHTML = visible.map(p => {
      const qty = cart.find(i => String(i.id) === String(p.id))?.qty || 0;
      const liked = wishlist.some(i => String(i.id) === String(p.id));
      const price = typeof getDiscountedPrice === 'function' ? getDiscountedPrice(p.price) : Math.round(p.price * .92);
      return `<article class="product-card"><div class="product-image-container"><img class="product-img" src="${p.image}" alt="${p.name}" onclick="openProduct('${p.id}')"><button class="wishlist-btn ${liked ? 'active' : ''}" onclick="toggleWishlist('${p.id}',event)">♥</button></div><h3>${p.name}</h3><div class="price-stack"><span class="price">₹${price}</span><span class="original-price">₹${p.price}</span><span class="discount-badge">Launch saving</span></div><div class="qty-controls"><button onclick="decreaseQty('${p.id}')">−</button><span>${qty}</span><button onclick="increaseQty('${p.id}')">+</button></div></article>`;
    }).join('') || '<div class="empty-state">No pieces here yet — try another edit.</div>';
    if (typeof updateCartBadge === 'function') updateCartBadge();
    if (typeof updateWishlistBadge === 'function') updateWishlistBadge();
  }
  function addItems(ids) { ids.forEach(id => { if (typeof increaseQty === 'function') increaseQty(id); }); showNotification('Your OBIRA combo is ready in the cart ✨'); }
  function showSpinWin() {
    if (document.getElementById('spin-win-modal')) return;
    document.body.insertAdjacentHTML('beforeend', `<div id="spin-win-modal" class="spin-win-modal"><div class="spin-win-dialog"><button class="spin-win-close" aria-label="Close">×</button><p class="obira-chat-kicker">A little extra sparkle</p><h2>Spin Win 🎡</h2><div class="spin-win-wheel" id="spin-win-wheel"><strong>SPIN</strong></div><p id="spin-win-status">The wheel is warming up…</p><button class="wheel-button" id="spin-win-button">Spin Win</button></div></div>`);
    const modal = document.getElementById('spin-win-modal'); const wheel = document.getElementById('spin-win-wheel'); const status = document.getElementById('spin-win-status'); const button = document.getElementById('spin-win-button');
    modal.querySelector('.spin-win-close').onclick = () => modal.remove();
    button.onclick = () => { if (button.disabled) return; button.disabled = true; status.textContent = 'Spinning… will it be sparkle or suspense?'; wheel.style.transform = `rotate(${1800 + Math.floor(Math.random() * 720)}deg)`; setTimeout(() => { const won = !localStorage.getItem('obiraWheelTried') && Math.random() < .18; localStorage.setItem('obiraWheelTried','true'); if (won) { localStorage.setItem('obiraCoupon','GLOW10'); status.textContent = 'Rare win! 10% extra sparkle unlocked 🎉'; } else status.textContent = 'No bonus this time — the wheel is keeping its secrets. Your launch saving is still active 😉'; button.textContent = 'Done'; }, 2300); };
  }
  window.obiraAddCombo = addItems; window.obiraShowSpinWin = showSpinWin; window.obiraRenderCategoryStore = renderCategoryStore;
  window.addEventListener('load', () => { renderCategoryStore(); document.querySelectorAll('[data-spin-win]').forEach(b => b.addEventListener('click', showSpinWin)); });
})();
