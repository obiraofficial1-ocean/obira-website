/* OBIRA Style Concierge — warm, celebratory and playful without assuming anything about the shopper */
(function () {
  const state = { step: 0, answers: {} };

  const questions = [
    {
      key: 'occasion',
      text: 'Welcome to OBIRA ✨ What beautiful moment are we shopping for today?',
      options: [
        ['accomplishment', 'A promotion, graduation or big win 🎓'],
        ['birthday', 'A birthday or personal milestone 🎂'],
        ['celebration', 'A celebration or special event 🥂'],
        ['everyday', 'A little everyday joy — why not? ✨']
      ]
    },
    {
      key: 'recipient',
      text: 'Who deserves a little extra sparkle? We celebrate every choice — including choosing yourself 💛',
      options: [
        ['self', 'Me — I earned this'],
        ['partner', 'My partner / someone special'],
        ['mom', 'Mum — the original icon'],
        ['sibling', 'My sister, brother or sibling'],
        ['friend', 'A friend who always shows up'],
        ['colleague', 'A colleague or mentor']
      ]
    },
    {
      key: 'vibe',
      text: 'Now let’s find their kind of shine. What should the gift say?',
      options: [
        ['elegant', 'Quietly elegant'],
        ['confident', 'Strong and confident'],
        ['romantic', 'Thoughtful and heartfelt'],
        ['playful', 'Bright, fun and full of personality']
      ]
    }
  ];

  function getRecommendation() {
    const { occasion, recipient, vibe } = state.answers;
    let category = 'bracelets';
    let title = 'The confident everyday edit';
    let copy = 'A polished bracelet is an easy, personal choice. Add a chain for a complete look with a little extra presence.';
    let celebration = 'A lovely choice — let’s make the moment feel even more special.';

    if (occasion === 'accomplishment' || recipient === 'self' || vibe === 'confident') {
      category = 'bracelets';
      title = 'The “I earned this” edit';
      copy = 'Choose a bracelet that feels like a wearable reminder of how far you’ve come. Pair it with a chain when the occasion calls for a statement.';
      celebration = 'Congratulations — every achievement deserves to be marked and remembered. 🌟';
    } else if (recipient === 'mom') {
      category = 'chains';
      title = 'For the original icon';
      copy = 'A graceful chain makes a thoughtful, timeless gift — elegant enough for a milestone and easy enough for everyday wear.';
      celebration = 'That is a beautiful way to celebrate someone who has always been there. 💛';
    } else if (recipient === 'colleague' || vibe === 'elegant') {
      category = 'chains';
      title = 'The polished congratulations edit';
      copy = 'A refined chain says “well done” with warmth and professionalism. It is thoughtful without making the recipient guess your taste.';
      celebration = 'A tasteful way to celebrate success — thoughtful, confident and beautifully appropriate.';
    } else if (recipient === 'sibling' || recipient === 'friend' || vibe === 'playful') {
      category = 'clips';
      title = 'The personality-packed edit';
      copy = 'A playful clip adds instant charm. Pair it with a bracelet for a fun little gift set that feels chosen, not generic.';
      celebration = 'Perfect for someone whose personality lights up every room. ✨';
    } else if (occasion === 'birthday' || occasion === 'celebration' || vibe === 'romantic') {
      category = 'bracelets';
      title = 'The heartfelt celebration edit';
      copy = 'Start with a bracelet that carries the feeling, then add a matching-style chain for a gift that feels wonderfully complete.';
      celebration = 'A thoughtful surprise is on its way — excellent taste, by the way. 💕';
    }

    return `
      <div class="obira-chat-result">
        <span class="obira-chat-kicker">Your OBIRA edit</span>
        <strong>${title}</strong>
        <p>${celebration}</p>
        <p>${copy}</p>
        <div class="obira-chat-result-actions">
          <a href="store.html#${category}">Explore ${category}</a>
          <button class="obira-chat-restart" type="button">Start again</button>
        </div>
      </div>
    `;
  }

  function render() {
    const body = document.querySelector('.obira-chat-body');
    if (!body) return;

    if (state.step >= questions.length) {
      body.innerHTML = `
        <div class="obira-chat-message bot">I’ve got a thoughtful direction for you — no pressure, no assumptions, just a little help finding the right sparkle.</div>
        ${getRecommendation()}
        <div class="obira-chat-note">Your answers stay in this browser and are only used for this recommendation.</div>
      `;
      const restart = body.querySelector('.obira-chat-restart');
      if (restart) restart.addEventListener('click', () => { state.step = 0; state.answers = {}; render(); });
      return;
    }

    const question = questions[state.step];
    body.innerHTML = `
      <div class="obira-chat-progress"><span style="width:${((state.step + 1) / questions.length) * 100}%"></span></div>
      <div class="obira-chat-message bot">${question.text}</div>
      <div class="obira-chat-options">
        ${question.options.map(([value, label]) => `<button class="obira-chat-option" type="button" data-value="${value}">${label}</button>`).join('')}
      </div>
      <div class="obira-chat-note">Step ${state.step + 1} of ${questions.length} · thoughtful choices, zero pressure</div>
    `;

    body.querySelectorAll('.obira-chat-option').forEach(button => {
      button.addEventListener('click', () => {
        state.answers[question.key] = button.dataset.value;
        state.step += 1;
        render();
      });
    });
  }

  function init() {
    if (document.querySelector('.obira-chat')) return;

    document.body.insertAdjacentHTML('beforeend', `
      <button class="obira-chat-launcher" aria-controls="obira-chat" aria-expanded="false">✨ Find my perfect gift</button>
      <aside id="obira-chat" class="obira-chat" aria-label="OBIRA style concierge">
        <div class="obira-chat-head">
          <div><strong>OBIRA Style Concierge</strong><small>Professional guidance, a little sparkle</small></div>
          <button class="obira-chat-close" aria-label="Close">×</button>
        </div>
        <div class="obira-chat-body"></div>
      </aside>
    `);

    const chat = document.querySelector('.obira-chat');
    const launcher = document.querySelector('.obira-chat-launcher');
    launcher.addEventListener('click', () => {
      const open = chat.classList.toggle('open');
      launcher.setAttribute('aria-expanded', String(open));
      if (open) render();
    });
    chat.querySelector('.obira-chat-close').addEventListener('click', () => {
      chat.classList.remove('open');
      launcher.setAttribute('aria-expanded', 'false');
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();
