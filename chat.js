/* OBIRA style concierge: a playful, non-invasive product helper */
(function () {
  const state = { step: 0, answers: {} };
  const questions = [
    { key: 'occasion', text: 'Hi, style seeker ✨ What are we dressing up for?', options: [['everyday', 'Everyday sparkle'], ['date', 'A date / special moment 💕'], ['party', 'A party or celebration'], ['gift', 'I am shopping for a gift']] },
    { key: 'recipient', text: 'Cute question: who is the lucky person? No judgement, promise 😄', options: [['self', 'Me — I deserve nice things'], ['special', 'A special girl 💖'], ['mom', 'Mum — the real queen'], ['sister', 'My sister / bestie'], ['other', 'Someone wonderfully mysterious']] },
    { key: 'mood', text: 'Pick the vibe and I’ll match the sparkle:', options: [['minimal', 'Minimal & elegant'], ['bold', 'Bold & attention-grabbing'], ['sweet', 'Soft & romantic'], ['playful', 'Fun & colourful']] }
  ];

  function productUrl(category) { return `store.html#${category}`; }
  function recommendation() {
    const { occasion, recipient, mood } = state.answers;
    let category = 'bracelets';
    let title = 'The easy-elegance edit';
    let copy = 'Start with a bracelet and add a chain for a polished OBIRA pairing.';
    if (recipient === 'mom') { category = 'chains'; title = 'For the queen at home'; copy = 'A graceful chain is thoughtful, timeless, and very difficult to get wrong.'; }
    else if (recipient === 'sister' || mood === 'playful') { category = 'clips'; title = 'The fun bestie edit'; copy = 'A playful hair clip adds instant charm without needing a style emergency.'; }
    else if (occasion === 'date' || mood === 'sweet') { category = 'bracelets'; title = 'The special-moment edit'; copy = 'Choose a romantic bracelet, then pair it with a chain to make the look say “I planned this.”'; }
    else if (mood === 'bold' || occasion === 'party') { category = 'chains'; title = 'The statement edit'; copy = 'Lead with a standout chain and let the rest of the look stay effortlessly calm.'; }
    return `<div class="obira-chat-result"><strong>${title}</strong><br>${copy}<br><a href="${productUrl(category)}">Show me the ${category}</a></div>`;
  }
  function render() {
    const body = document.querySelector('.obira-chat-body');
    if (!body) return;
    if (state.step >= questions.length) { body.innerHTML = `<div class="obira-chat-message bot">I have a little edit ready for you — no overthinking required 😉</div>${recommendation()}<div class="obira-chat-note">I’m a playful style helper, not a human stylist. Your choices stay in this browser.</div>`; return; }
    const q = questions[state.step];
    body.innerHTML = `<div class="obira-chat-message bot">${q.text}</div><div class="obira-chat-options">${q.options.map(([value,label]) => `<button class="obira-chat-option" data-value="${value}">${label}</button>`).join('')}</div><div class="obira-chat-note">Question ${state.step + 1} of ${questions.length} · zero pressure, maximum sparkle</div>`;
    body.querySelectorAll('.obira-chat-option').forEach(button => button.addEventListener('click', () => { state.answers[q.key] = button.dataset.value; state.step += 1; render(); }));
  }
  function init() {
    if (document.querySelector('.obira-chat')) return;
    document.body.insertAdjacentHTML('beforeend', `<button class="obira-chat-launcher" aria-controls="obira-chat" aria-expanded="false">✨ Help me choose</button><aside id="obira-chat" class="obira-chat" aria-label="OBIRA style helper"><div class="obira-chat-head"><div><strong>OBIRA Style Concierge</strong><small>Find your sparkle in 3 fun questions</small></div><button class="obira-chat-close" aria-label="Close">×</button></div><div class="obira-chat-body"></div></aside>`);
    const chat = document.querySelector('.obira-chat'); const launcher = document.querySelector('.obira-chat-launcher');
    launcher.addEventListener('click', () => { chat.classList.toggle('open'); launcher.setAttribute('aria-expanded', chat.classList.contains('open')); if (chat.classList.contains('open')) render(); });
    chat.querySelector('.obira-chat-close').addEventListener('click', () => { chat.classList.remove('open'); launcher.setAttribute('aria-expanded', 'false'); });
  }
  window.addEventListener('DOMContentLoaded', init);
})();
