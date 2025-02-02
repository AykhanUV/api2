let $ = (selector) => document.querySelector(selector);
let $$ = (selector) => document.querySelectorAll(selector);
let buttons = $$('.buttons button'),
  inputs = $('#inputs');
let tmdb = $('#tmdb'),
  season = $('#season'),
  embed = $('#embed');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((b) => {
      if (b != button) b.classList.remove('active');
      else b.classList.add('active');
    });
    let type = button.getAttribute('type');
    inputs.setAttribute('type', type);
    tmdb.value = type === 'movie' ? 533535 : 456;
    season.value = 13;
    episode.value = 2;
    tmdb.dispatchEvent(new Event('change'));
  });
});
[tmdb, season, episode, embed].forEach((input) => {
  input.addEventListener('change', () => {
    let base = `${window.location.origin}/embed`;
    let type = inputs.getAttribute('type');
    if (type == 'movie')
      embed.value = `${base}/${type}/${tmdb.value}`;
    else
      embed.value = `${base}/${type}/${tmdb.value}/${season.value}/${episode.value}`;
    return ($('iframe').src = embed.value);
  });
});
