/* Final OBIRA shopping experience: category routing, two relevant add-ons, combos, gifting note and Spin Win. */
(function () {
  const categoryNames = { all: 'Shop the OBIRA Edit', bracelets: 'The Bracelet Edit', chains: 'The Chain Edit', hair: 'Hair Accessories' };
  const categoryGroups = { hair: ['clips', 'bands'] };
  const category = () => new URLSearchParams(location.search).get('category') || location.hash.slice(1) || 'all';
  const byCategory = (value) => categoryGroups[value] || [value];
  const price = (item) => typeof getDiscountedPrice === 'function' ? getDiscountedPrice(item.price) : Math.round(item.price * .92);
  const money = value => `₹${Math.round(value)}`;

  function renderStore() {
    const host = document.getElementById('store-products');
    if (!host || typeof products === 'undefined') return;
    const selected = category();
    const visible = selected === 'all' ? products : products.filter(p => byCategory(selected).includes(p.category));
    const cart = getCart();
    const wishlist = getWishlist();
    const heading = document.querySelector('[data-store-title]');
    if (heading) heading.textContent = categoryNames[selected] || 'OBIRA Edit';
    host.innerHTML = visible.length ? visible.map(p => {
      const qty = cart.find(i => String(i.id) === String(p.id))?.qty || 0;
      const liked = wishlist.some(i => String(i.id) === String(p.id));
      return `<article class="product-card"><div class="product-image-container"><img class="product-img" src="${p.image}" alt="${p.name}" onclick="openProduct('${p.id}')"><button class="wishlist-btn ${liked ? 'active' : ''}" onclick="toggleWishlist('${p.id}',event)" aria-label="Favourite ${p.name}">♥</button></div><h3>${p.name}</h3><div class="price-stack"><span class="price">${money(price(p))}</span><span class="original-price">${money(p.price)}</span><span class="discount-badge">Launch saving</span></div><div class="qty-controls"><button onclick="decreaseQty('${p.id}')">−</button><span>${qty}</span><button onclick="increaseQty('${p.id}')">+</button></div></article>`;
    }).join('') : `<div class="empty-state">No pieces in this edit yet. Try another collection.</div>`;
    updateCartBadge(); updateWishlistBadge();
  }

  function related(product) {
    if (!product) return [];
    const categories = product.category === 'bracelets' ? ['chains', 'clips'] : product.category === 'chains' ? ['bracelets', 'clips'] : ['bracelets', 'chains'];
    return categories.map(c => products.find(p => p.category === c)).filter(Boolean).slice(0, 2);
  }

  function renderProductAddOns() {
    const product = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null');
    const host = document.getElementById('final-addons');
    if (!product || !host) return;
    const options = related(product);
    host.innerHTML = `<div class="related-offer"><div><span class="eyebrow">Complete your look</span><h2>Two thoughtful add-ons</h2><p>Keep <strong>${product.name}</strong> as the star. Add one small detail or build the complete pairing.</p></div><div class="related-options">${options.map(item => `<button class="related-option" onclick="addSuggestedPair('${product.id}','${item.id}')"><img src="${item.image}" alt="${item.name}"><span><strong>${item.name}</strong><small>${money(price(item))} · add this piece</small></span></button>`).join('')}</div></div>`;
  }

  window.addSuggestedPair = function (mainId, addOnId) {
    increaseQty(mainId); increaseQty(addOnId); showNotification('Your considered pairing is in the cart ✨');
  };
  window.addCombo = function (ids) { ids.forEach(increaseQty); showNotification('Your combo is ready in the cart ✨'); };

  function giftingNote() {
    let context = {}; try { context = JSON.parse(localStorage.getItem('obiraGiftContext') || '{}'); } catch (_) {}
    if (context.occasion === 'office' || context.recipient === 'colleague') return 'A polished way to celebrate hard work and a well-earned achievement.';
    if (context.occasion === 'romantic' || context.recipient === 'partner') return 'A little sparkle for the person who makes ordinary moments feel special.';
    if (context.occasion === 'family' || context.recipient === 'family') return 'A thoughtful gift for the people who make life feel full.';
    if (context.occasion === 'friend' || context.recipient === 'friend') return 'A fun little reminder that great friends deserve great taste.';
    if (context.occasion === 'accomplishment' || context.recipient === 'self') return 'You earned this. Let your success have a little sparkle.';
    return 'A beautiful choice for a moment worth remembering.';
  }
  window.getObiraGiftingNote = giftingNote;

  function addSpinWin() {
    document.querySelectorAll('[data-spin-win]').forEach(button => button.addEventListener('click', () => {
      if (document.getElementById('spin-win-modal')) return;
      document.body.insertAdjacentHTML('beforeend', `<div id="spin-win-modal" class="spin-win-modal"><div class="spin-win-dialog"><button class="spin-win-close">×</button><span class="eyebrow">A rare little bonus</span><h2>Spin Win 🎡</h2><div class="spin-win-wheel" id="spin-win-wheel"><strong>SPIN</strong></div><p id="spin-win-status">Will it be sparkle or suspense?</p><button class="wheel-button" id="spin-win-button">Spin Win</button></div></div>`);
      const modal = document.getElementById('spin-win-modal'); const wheel = document.getElementById('spin-win-wheel'); const status = document.getElementById('spin-win-status'); const spin = document.getElementById('spin-win-button');
      modal.querySelector('.spin-win-close').onclick = () => modal.remove();
      spin.onclick = () => { spin.disabled = true; status.textContent = 'Spinning… the sparkle committee is deciding.'; wheel.style.transform = `rotate(${1800 + Math.floor(Math.random() * 720)}deg)`; setTimeout(() => { const win = !localStorage.getItem('obiraWheelTried') && Math.random() < .18; localStorage.setItem('obiraWheelTried', 'true'); status.textContent = win ? 'Rare win! 10% extra sparkle unlocked 🎉' : 'No bonus this time — even the wheel needs boundaries 😉 Your launch saving remains active.'; if (win) localStorage.setItem('obiraCoupon', 'GLOW10'); spin.textContent = 'Done'; }, 2300); };
    }));
  }

  window.addEventListener('load', () => { renderStore(); renderProductAddOns(); addSpinWin(); });
})();
