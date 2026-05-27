// Portal — micro-JS para UI plana
// - mostrar nombre del archivo en .file-input
// - toggle sidebar mobile
// - no-op submit en formularios (preview)

(function () {
  // file inputs
  document.querySelectorAll('.file-input').forEach(function (root) {
    var input = root.querySelector('input[type=file]');
    var name  = root.querySelector('.name');
    if (!input || !name) return;
    var initial = name.textContent;
    input.addEventListener('change', function () {
      if (input.files && input.files.length) {
        name.textContent = input.files[0].name;
        name.style.color = 'var(--lcu-navy)';
      } else {
        name.textContent = initial;
        name.style.color = '';
      }
    });
  });

  // sidebar toggle (mobile)
  var toggle = document.getElementById('navToggle');
  var sidebar = document.getElementById('sidebar');
  var backdrop = document.getElementById('sidebarBackdrop');
  function close() {
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  }
  function open() {
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
  }
  if (toggle && sidebar) toggle.addEventListener('click', open);
  if (backdrop) backdrop.addEventListener('click', close);

  // prevent form submit (this is a mockup)
  document.querySelectorAll('form[data-mock]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var alertEl = f.parentElement && f.parentElement.querySelector('.alert-target');
      if (alertEl) {
        alertEl.style.display = 'flex';
        alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        // try sibling above
        var prev = f.previousElementSibling;
        while (prev && !prev.classList?.contains('alert-target')) prev = prev.previousElementSibling;
        if (prev) prev.style.display = 'flex';
      }
    });
  });

  // login submit goes to inicio.html
  var lf = document.getElementById('loginForm');
  if (lf) lf.addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.href = 'inicio.html';
  });

  // password toggle
  document.querySelectorAll('[data-pw-toggle]').forEach(function (el) {
    el.addEventListener('click', function () {
      var input = el.parentElement.querySelector('input');
      if (!input) return;
      if (input.type === 'password') { input.type = 'text'; el.textContent = 'Ocultar'; }
      else { input.type = 'password'; el.textContent = 'Mostrar'; }
    });
  });
})();
