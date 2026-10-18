(function () {
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 40); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  document.getElementById('year').textContent = new Date().getFullYear();

  // reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // depth counter
  var counter = document.getElementById('meters');
  var done = false;
  function run() {
    if (done) return; done = true;
    var to = +counter.dataset.to, start = null, dur = 2200;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      counter.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e, o) {
      if (e[0].isIntersecting) { run(); o.disconnect(); }
    }, { threshold: 0.4 }).observe(counter);
  } else { counter.textContent = counter.dataset.to; }

  // signup (front-end only: connect to your email service)
  var form = document.getElementById('signup');
  var msg = document.getElementById('msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = document.getElementById('email').value.trim();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    msg.className = 'msg' + (ok ? '' : ' err');
    msg.textContent = ok ? 'Thank you. We will be in touch.' : 'Please enter a valid email address.';
    if (ok) form.reset();
  });
})();
