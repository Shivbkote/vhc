/* VHC product page interactions — all custom identifiers use an- */
(() => {
  const root = document.querySelector('.an-products-page');
  if (!root) return;

  // Reveal elements as they enter the viewport; gracefully show everything if unsupported.
  const revealItems = root.querySelectorAll('.an-reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('an-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('an-visible'));
  }

  // Accessible category filters.
  const filters = [...root.querySelectorAll('.an-filter')];
  const cards = [...root.querySelectorAll('.an-product-card')];
  const empty = root.querySelector('.an-filter-empty');
  filters.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filters.forEach(filter => {
        const active = filter === button;
        filter.classList.toggle('is-active', active);
        filter.setAttribute('aria-pressed', String(active));
      });
      let visible = 0;
      cards.forEach(card => {
        const show = selected === 'all' || card.dataset.category === selected;
        card.hidden = !show;
        if (show) {
          visible += 1;
          card.classList.remove('an-visible');
          requestAnimationFrame(() => card.classList.add('an-visible'));
        }
      });
      if (empty) empty.hidden = visible > 0;
    });
  });

  // Update the footer year on this page.
  root.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = new Date().getFullYear();
  });
})();
