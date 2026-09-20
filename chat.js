/* OBIRA Style Concierge — short, respectful occasion-aware helper */
(function () {
  const state = { step: 0, answers: {} };
  const questions = [
    { key: 'occasion', text: 'What are we celebrating today? ✨', options: [['accomplishment','A promotion, graduation or big win 🎓'],['birthday','A birthday or milestone 🎂'],['romantic','A romantic moment 💕'],['family','A family celebration 💛'],['friend','A friend who deserves sparkle 😄'],['office','A professional achievement 🏆'],['everyday','A little everyday joy ✨']] },
    { key: 'recipient', text: 'Who is the lucky person — including you? 💛', options: [['self','Me — I earned this'],['partner','My partner / someone special'],['family','A family member'],['friend','A friend'],['colleague','A colleague or mentor']] },
    { key: 'vibe', text: 'What feeling should the gift carry?', options: [['elegant','Quietly elegant'],['confident','Strong and confident'],['heartfelt','Thoughtful and heartfelt'],['playful','Bright and fun']] }
  ];

  function saveContext() { localStorage.setItem('obiraGiftContext', JSON.stringify(state.answers)); }
  function recommendation() {
    const { occasion, recipient, vibe } = state.answers;
    let category = 'bracelets';
    let title = 'The confident everyday edit';
    let copy = 'A polished bracelet is personal and easy to wear. Add a chain when you want a complete look.';
    if (occasion === 'office' || recipient === 'colleague') { category = 'chains'; title = 'The polished congratulations edit'; copy = 'A refined chain says well done with warmth and professionalism.'; }
    else if (occasion === 'romantic' || recipient === 'partner') { category = 'bracelets'; title = 'The thoughtful romance edit'; copy = 'A bracelet with a matching chain makes the message feel beautifully intentional.'; }
    else if (occasion === 'family' || recipient === 'family') { category = 'chains'; title = 'The family celebration edit'; copy = 'A timeless chain is a warm way to mark a memory and strengthen the bond.'; }
    else if (occasion === 'friend' || recipient === 'friend' || vibe === 'playful') { category = 'clips'; title = 'The fun friend edit'; copy = 'A playful clip says “I know your taste” without taking itself too seriously.'; }
    else if (occasion === 'accomplishment' || recipient === 'self' || vibe === 'confident') { category = 'bracelets'; title = 'The “I earned this” edit'; copy = 'Choose a bracelet as a wearable reminder of how far you have come.'; }
    return `<div class="obira-chat-result"><span class="obira-chat-kicker">Your OBIRA edit</span><strong>${title}</strong><p>${copy}</p><div class="obira-chat-result-actions"><a href="store.html#${category}">Explore ${category}</a><button class="obira-chat-restart" type="button">Start again</button></div></div>`;
  }
  function render() {
    const body = document.querySelector('.obira-chat-body');
    if (!body) return;
    if (state.step >= questions.length) {
      saveContext();
      body.innerHTML = `<div class="obira-chat-message bot">Perfect — I’ll remember the feeling behind this order so your confirmation message feels personal too. ✨</div>${recommendation()}<div class="obira-chat-note">Your answers stay in this browser and only guide your OBIRA recommendation.</div>`;
      body.querySelector('.obira-chat-restart')?.addEventListener('click', () => { state.step = 0; state.answers = {}; render(); });
      return;
    }
    const question = questions[state.step];
    body.innerHTML = `<div class="obira-chat-progress"><span style="width:${((state.step + 1) / questions.length) * 100}%"></span></div><div class="obira-chat-message bot">${question.text}</div><div class="obira-chat-options">${question.options.map(([value,label]) => `<button class="obira-chat-option" type="button" data-value="${value}">${label}</button>`).join('')}</div><div class="obira-chat-note">Step ${state.step + 1} of ${questions.length} · thoughtful choices, zero pressure</div>`;
    body.querySelectorAll('.obira-chat-option').forEach(button => button.addEventListener('click', () => { state.answers[question.key] = button.dataset.value; state.step += 1; render(); }));
  }
  function init() {
    if (document.querySelector('.obira-chat')) return;
    document.body.insertAdjacentHTML('beforeend', `<button class="obira-chat-launcher" aria-controls="obira-chat" aria-expanded="false">✨ Find my perfect gift</button><aside id="obira-chat" class="obira-chat" aria-label="OBIRA style concierge"><div class="obira-chat-head"><div><strong>OBIRA Style Concierge</strong><small>Professional guidance, a little sparkle</small></div><button class="obira-chat-close" aria-label="Close">×</button></div><div class="obira-chat-body"></div></aside>`);
    const chat = document.querySelector('.obira-chat');
    const launcher = document.querySelector('.obira-chat-launcher');
    launcher.addEventListener('click', () => { const open = chat.classList.toggle('open'); launcher.setAttribute('aria-expanded', String(open)); if (open) render(); });
    chat.querySelector('.obira-chat-close').addEventListener('click', () => { chat.classList.remove('open'); launcher.setAttribute('aria-expanded', 'false'); });
  }
  window.addEventListener('DOMContentLoaded', init);
})();
