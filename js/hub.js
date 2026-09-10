/* ============================================================
   Plants Hub — the shelf
   The plant itself is drawn, lit and grown by js/plant-draw.js, which this page shares
   with the Plants Lab. This file is the hub's own behaviour: the stages along the
   bottom, the field notebook, the growth that runs on its own, the topics and the lab,
   the deep links. The hub is a map and an introduction: the theory lives in the lab,
   and every stage sends the student to the station that teaches it. Adding a lab means
   editing topics.js only.
   ============================================================ */
(function () {
  'use strict';

  var P = window.PLANT || { parts: [], stages: [], scene: { w: 1600, h: 1120, horizon: 700, plantX: 560 } };
  var STAGES = window.STAGES || [];
  var TOPICS = window.TOPICS || [];
  var svg = document.getElementById('plant'), map = document.getElementById('map'), tag = document.getElementById('tag');
  var said = document.getElementById('said'), card = document.getElementById('card'), steps = document.getElementById('steps');
  var playBtn = document.getElementById('play'), toastEl = document.getElementById('toast');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = window.matchMedia('(max-width: 900px)');
  var LAB = TOPICS[0] || {};
  var LAB_URL = (LAB.url || 'https://mompel226.github.io/plants-lab/').replace(/#.*$/, '');
  var G = {}; (P.parts || []).forEach(function (p) { G[p.id] = p; });
  var BY = {}; STAGES.forEach(function (s) { BY[s.id] = s; });
  var STAGE_IDS = (P.stages || []).map(function (s) { return s.id; });

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }

  /* ---------- 1. the plant, framed to the window ---------- */
  var ROI = { x: -220, y: 0, w: 1320, h: 1370 };         /* the plant a little right of centre, clear of the masthead; both companions in; sky above the sun and soil below the roots for the caption */
  var ROI_PHONE = { x: -100, y: 0, w: 1320, h: 1180 };   /* on a phone the caption sits below the picture, so no soil is kept for it */
  var plant = window.PlantDraw(svg, P, {
    map: map, tag: tag,
    onEnter: function (kind, id) { stopTour(); var st = stageOfPart(id); if (st) show(st, false); else if (G[id]) plant.pin(plant.elFor(id), G[id].label, G[id].colour); },
    onLeave: function () { leave(); restTour(); },
    onClick: function (kind, id) { var st = stageOfPart(id); if (st) hold(st); }
  });
  function fit(animate) {
    var box = plant.frame(narrow.matches ? ROI_PHONE : ROI, 20);
    if (!animate) { svg.setAttribute('viewBox', [box.x, box.y, box.w, box.h].map(function (v) { return Math.round(v * 10) / 10; }).join(' ')); return; }
    plant.flyTo(box);
  }
  /* which stage a part belongs to, for a click on the plant */
  var PART_STAGE = { seed: 'seed', roots: 'root', seedling: 'shoot', sun: 'shoot', tip: 'shoot', stem: 'stem', leaf: 'leaf', leaves: 'leaf', flower: 'flower', fruit: 'fruit', xerophyte: 'adapted', hydrophyte: 'adapted', plant: null };
  function stageOfPart(id) { return PART_STAGE[id] || null; }

  /* ---------- 2. what is shown, and what the notebook says ---------- */
  var current = null, held = null, cardState = null;
  function colourOf(id) { var st = (P.stages || []).filter(function (s) { return s.id === id; })[0]; var p = st && st.lit && G[st.lit[0]]; return p ? p.colour : '#B8F08E'; }
  function say(name, note, c) {
    if (c) said.style.setProperty('--c', c); else said.style.removeProperty('--c');
    said.innerHTML = '<span class="said__name">' + esc(name) + '</span><span class="said__note">' + esc(note) + '</span>';
  }
  function picture(img) {
    if (!img) return '';
    var b = img.base;
    return '<figure class="fig"><picture>' +
      '<source type="image/webp" srcset="' + b + '-900.webp 900w, ' + b + '-1400.webp 1400w" sizes="340px">' +
      '<img src="' + b + '-900.jpg" srcset="' + b + '-900.jpg 900w, ' + b + '-1400.jpg 1400w" sizes="340px" alt="' + esc(img.alt) + '" loading="lazy" decoding="async">' +
      '</picture><figcaption>' + (img.caption ? esc(img.caption) + ' · ' : '') + '<a href="' + esc(img.url) + '" target="_blank" rel="noopener">' + esc(String(img.credit).replace(/ · Wikimedia Commons$/, '')) + '</a></figcaption></figure>';
  }
  function backLink() { return held ? '<button type="button" class="back" data-back>The whole plant</button>' : ''; }
  function topicChips(ids) {
    return '<div class="chips">' + (ids || []).map(function (t) { return '<span class="chip"><b>' + esc(t) + '</b>' + esc(sectionName(t)) + '</span>'; }).join('') + '</div>';
  }
  var SECTIONS = { '6.1': 'Photosynthesis', '6.2': 'Leaf structure', '8.1': 'Xylem and phloem', '8.2': 'Water uptake', '8.3': 'Transpiration', '8.4': 'Translocation', '14.5': 'Tropic responses', '16.3': 'Sexual reproduction in plants', '18.2': 'Adaptive features' };
  function sectionName(t) { return SECTIONS[t] || ''; }

  function show(stageId, withCard) {
    var st = BY[stageId]; if (!st) return;
    var r = plant.grow(stageId);
    var c = r ? r.colour : colourOf(stageId);
    say(st.title, 'Stage ' + st.n + ' of ' + STAGES.length + ' · ' + (st.chip || ''), c);
    markStrip(stageId);
    current = stageId;
    if (withCard === false) return;
    card.style.setProperty('--c', c);
    card.innerHTML = backLink() +
      '<span class="eyebrow">Stage ' + st.n + ' of ' + STAGES.length + '</span><h2><mark>' + esc(st.title) + '</mark></h2>' +
      '<p class="book__text">' + esc(st.text) + '</p>' +
      (st.real ? '<p class="real">' + esc(st.real) + '</p>' : '') +
      labLinks(st) +
      topicChips(st.topics) +
      (st.img2 ? '<div class="figs">' + picture(st.img) + picture(st.img2) + '</div>' : picture(st.img));
    cardState = 'stage:' + stageId;
    wireCard();
    if (narrow.matches && held) card.scrollIntoView({ block: 'nearest', behavior: still ? 'auto' : 'smooth' });
  }
  /* the way into the lab: the station that teaches this stage, and any second one */
  function labLinks(st) {
    var sts = st.stations || [];
    if (LAB.status !== 'live' || !sts.length) return '<p class="lab">Plants Lab · being built</p>';
    var first = sts[0], more = sts.slice(1);
    return '<a class="golab" href="' + esc(LAB_URL + '#' + first.id) + '"><span class="golab__t">Learn it in the Plants Lab</span>' +
      '<small>Station ' + first.n + ' · ' + esc(first.title) + ': the theory, the questions, the marks</small></a>' +
      more.map(function (m) { return '<a class="golab__more" href="' + esc(LAB_URL + '#' + m.id) + '">and station ' + m.n + ' · ' + esc(m.title) + '</a>'; }).join('');
  }
  function idle() {
    plant.grow(null); current = null;
    [said, card].forEach(function (e) { e.style.removeProperty('--c'); });
    markStrip(null);
    say('The whole plant', narrow.matches ? 'nine stages · tap one, or let it grow' : 'nine stages · point at one, or let it grow');
    if (cardState !== 'idle') renderIdleCard();
  }
  function leave() { if (held) show(held, true); else idle(); }

  /* ---------- 3. the notebook at rest: the stages, the topics, the lab, and how you are doing ---------- */
  function progressBlock() {
    var REG = window.LABS_REGISTER || {}, LP = window.LabProgress;
    var lab = (REG.labs || []).filter(function (l) { return l.shelf === 'plants'; })[0];
    if (!lab || !LP) return '';
    var p = LP.local(lab);
    if (!p.started && !p.handedIn) return '';
    return '<div class="prog"><div class="prog__top"><span>Your Plants Lab</span><b>' + LP.pct(p) + '%</b></div>' +
      '<span class="pbar"><span class="pbar__fill" style="width:' + LP.pct(p) + '%"></span></span>' +
      '<small>' + p.done + ' of ' + p.total + ' questions right' + (p.handedIn ? ' · handed in' : '') + ', counted in this browser.</small></div>';
  }
  function renderIdleCard() {
    var h = '<span class="eyebrow">Start here</span><h2 class="book__h">Nine stages, one plant</h2>' +
      '<ul class="steps">' + STAGES.map(function (s) {
        return '<li><button type="button" data-stage="' + s.id + '"><span class="n">' + s.n + '</span>' +
               '<span class="w"><span class="t">' + esc(s.title) + '</span><span class="s">' + esc(s.chip) + (s.topics && s.topics.length ? ' · ' + s.topics.join(', ') : '') + '</span></span></button></li>';
      }).join('') + '</ul>';
    if (LAB.status === 'live' && LAB.url) {
      h += '<div class="band"><span class="eyebrow">Open now</span></div>' +
        '<a class="hero" href="' + esc(LAB_URL) + '" data-lab="all"><span class="hero__no">Topics 6 · 8 · 14.5 · 16.3 · 18.2</span>' +
        '<span class="hero__name">' + esc(LAB.lab) + '</span><span class="hero__sub">Every plant topic, on one bean: twelve stations from the seed to the fruit, with the potometer practical</span>' +
        '<span class="hero__go">Open the lab</span>' + (LAB.detail ? '<span class="hero__stat">' + esc(labDetail()) + '</span>' : '') + '</a>' + progressBlock();
    }
    h += '<div class="band"><span class="eyebrow">The topics</span><span class="count">' + TOPICS.length + ' in one lab</span></div>' +
      '<ul class="topics">' + TOPICS.map(function (t) {
        return '<li><a href="' + esc(t.url) + '" data-topic="' + t.id + '"><span class="no">' + esc(String(t.no)) + '</span>' +
               '<span class="l">' + esc(t.title) + '<small>' + esc(t.detail || '') + '</small></span><span class="go">open →</span></a></li>';
      }).join('') + '</ul>';
    card.innerHTML = h;
    cardState = 'idle';
    wireCard();
  }
  function labDetail() {
    var REG = window.LABS_REGISTER || {};
    var lab = (REG.labs || []).filter(function (l) { return l.shelf === 'plants'; })[0];
    return lab ? lab.stations + ' stations · ' + lab.questions + ' questions' : '';
  }
  function more() { card.classList.toggle('more', card.scrollTop + card.clientHeight < card.scrollHeight - 6); }
  card.addEventListener('scroll', more, { passive: true });
  window.addEventListener('resize', more);
  function wireCard() {
    more();
    card.querySelectorAll('[data-stage]').forEach(function (b) {
      var id = b.getAttribute('data-stage');
      b.addEventListener('mouseenter', function () { stopTour(); show(id, false); });
      b.addEventListener('mouseleave', function () { leave(); restTour(); });
      b.addEventListener('click', function () { hold(id); });
    });
    card.querySelectorAll('[data-topic]').forEach(function (a) {
      var t = TOPICS.filter(function (x) { return x.id === a.getAttribute('data-topic'); })[0];
      if (!t) return;
      a.addEventListener('mouseenter', function () { stopTour(); show(t.stage, false); });
      a.addEventListener('mouseleave', function () { leave(); restTour(); });
    });
    card.querySelectorAll('[data-back]').forEach(function (b) { b.addEventListener('click', release); });
  }

  /* ---------- 4. the strip ---------- */
  STAGES.forEach(function (s) {
    var li = document.createElement('li'); li.className = 'step'; li.dataset.stage = s.id;
    li.style.setProperty('--c', colourOf(s.id));
    li.innerHTML = '<button type="button" aria-label="Stage ' + s.n + ': ' + esc(s.title) + '"><span class="n">' + s.n + '</span><span class="w">' + esc(s.chip) + '</span></button>';
    var b = li.firstChild;
    b.addEventListener('mouseenter', function () { stopTour(); show(s.id, false); });
    b.addEventListener('mouseleave', function () { leave(); restTour(); });
    b.addEventListener('focus', function () { stopTour(); show(s.id, false); });
    b.addEventListener('blur', function () { leave(); restTour(); });
    b.addEventListener('click', function () { hold(s.id); });
    steps.appendChild(li);
  });
  function markStrip(id) {
    var passed = true;
    steps.querySelectorAll('.step').forEach(function (li) {
      var mine = li.dataset.stage === id;
      if (mine) passed = false;
      li.classList.toggle('is-on', mine);
      li.classList.toggle('is-past', !!id && passed && !mine);
    });
  }

  /* ---------- 5. holding, letting go ---------- */
  function hold(id) {
    stopTour();
    held = id;
    document.body.classList.add('is-held');
    show(id, true);
    if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
  }
  function release() {
    held = null;
    document.body.classList.remove('is-held');
    idle();
    history.replaceState(null, '', location.pathname);
    restTour();
  }
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && held) release(); });
  window.addEventListener('resize', function () { fit(false); if (tag) tag.classList.remove('on'); });

  /* ---------- 6. the plant grows on its own ----------
     Left alone, the plant grows stage by stage, seed to fruit and on to the two plants built
     for hard places, and starts again. Any touch stops it; it picks up after a long pause. */
  var tour = null, resume = null, ti = 0, TOUR_MS = 5200, wantTour = !still;
  function startTour() { if (still || tour || held || !STAGE_IDS.length || !wantTour) return; stepTour(); tour = setInterval(stepTour, TOUR_MS); paintPlay(); }
  function stepTour() { var id = STAGE_IDS[ti % STAGE_IDS.length]; ti++; show(id, true); }
  function stopTour() { clearInterval(tour); tour = null; clearTimeout(resume); paintPlay(); }
  function restTour() {
    clearTimeout(resume);
    if (still || held || !wantTour) return;
    resume = setTimeout(function () {
      if (!document.querySelector('.step button:hover,.steps button:hover,.topics a:hover,.book:hover,.pl-hit:hover')) startTour();
    }, 14000);
  }
  function paintPlay() { if (playBtn) { playBtn.setAttribute('aria-pressed', tour ? 'true' : 'false'); playBtn.textContent = tour ? '⏸ Growing' : '⏵ Grow'; } }
  if (playBtn) playBtn.addEventListener('click', function () {
    if (tour) { wantTour = false; stopTour(); leave(); }
    else { wantTour = true; if (held) release(); startTour(); }
  });
  ['pointerdown', 'wheel', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, function (e) {
      if (e.target && e.target.closest && e.target.closest('#play')) return;
      if (tour) { stopTour(); restTour(); }
      else if (!held) { clearTimeout(resume); if (wantTour) resume = setTimeout(startTour, 14000); }
    }, { passive: true });
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { clearInterval(tour); tour = null; }
    else if (!held && wantTour) { clearTimeout(resume); resume = setTimeout(startTour, 2500); }
  });

  /* ---------- 7. a link straight to something ---------- */
  function openHash() {
    var h = (location.hash || '').replace(/^#/, '');
    if (!h) return false;
    if (BY[h]) { hold(h); return true; }
    var t = TOPICS.filter(function (x) { return x.id === h; })[0];
    if (t && BY[t.stage]) { hold(t.stage); return true; }
    return false;
  }
  window.addEventListener('hashchange', function () { if (!openHash()) release(); });

  /* ---------- 8. credits, toast ---------- */
  var cr = document.getElementById('creditsList');
  if (cr) {
    var seen = {}, out = [];
    STAGES.forEach(function (s) { [s.img, s.img2].forEach(function (im) { if (im && !seen[im.base]) { seen[im.base] = 1; out.push('<a href="' + esc(im.url) + '" target="_blank" rel="noopener">' + esc((im.caption || im.alt).toLowerCase()) + '</a>, ' + esc(im.credit)); } }); });
    cr.innerHTML = 'The plant, the ground and the two companions are drawn by the page. Photographs: ' + out.join(' · ') +
      '. The full list with licences is in <a href="https://github.com/Mompel226/plants-hub/blob/main/assets/CREDITS.md" target="_blank" rel="noopener">assets/CREDITS.md</a>.';
  }
  var timer;
  function toast(msg) { if (!toastEl) return; toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(timer); timer = setTimeout(function () { toastEl.classList.remove('on'); }, 2600); }

  /* ---------- 9. start ---------- */
  fit(false);
  idle();
  if (!openHash()) setTimeout(startTour, 1800);
})();
