/* Adds a short, occasion-aware message to the completed-order page. */
(function () {
  const messages = {
    romantic: ['A little luxury for the one who makes ordinary moments feel unforgettable. 💕', 'A thoughtful gift, a little flirtation, and a whole lot of feeling — perfect.'],
    accomplishment: ['Congratulations — every achievement deserves to be marked and remembered. 🌟', 'You did the work. Now celebrate the win.'],
    self: ['You earned this. Own it — success looks good on you. ✨', 'A little luxury for someone who knows their worth.'],
    family: ['A little sparkle for the people who make life feel full. 💛', 'The best gifts bring people closer and become part of the memory.'],
    friend: ['For the friend who brings the vibe — excellent taste, obviously. 😄', 'A little sparkle for the one who makes life more fun.'],
    office: ['A polished celebration of hard work, achievement, and well-earned success. 🏆', 'Excellence deserves to be recognised — congratulations.'],
    birthday: ['A little something to make the celebration even more memorable. 🎂'],
    everyday: ['A little everyday joy, beautifully chosen. ✨']
  };
  function getNote() {
    let context = {};
    try { context = JSON.parse(localStorage.getItem('obiraGiftContext') || '{}'); } catch (_) {}
    const key = context.occasion === 'romantic' || context.recipient === 'partner' ? 'romantic' : context.occasion === 'accomplishment' || context.recipient === 'self' ? 'self' : context.occasion || 'everyday';
    const options = messages[key] || messages.everyday;
    return options[Math.floor(Math.random() * options.length)];
  }
  function addNote() {
    const host = document.getElementById('occasion-note');
    if (host) host.textContent = getNote();
  }
  window.addEventListener('load', addNote);
})();
