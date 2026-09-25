(() => {
  const reachedSections = new Set();
  const reveals = document.querySelectorAll('.reveal, .idea-cloud');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      const section = entry.target.closest('[data-section]');
      if (!section) return;
      const name = section.dataset.section;
      if (!reachedSections.has(name)) {
        reachedSections.add(name);
        window.cwpTrack?.('study_section_reached', { section: name });
        if (name === 'next') window.cwpTrack?.('next_research_viewed');
      }
    });
  }, { threshold: 0.18 });
  reveals.forEach(el => observer.observe(el));

  const bar = document.getElementById('progressBar');
  const updateProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  document.querySelectorAll('[data-track]').forEach(el => {
    el.addEventListener('click', () => window.cwpTrack?.(el.dataset.track));
  });

  const dialog = document.getElementById('lightbox');
  const image = document.getElementById('lightboxImage');
  const close = document.getElementById('closeLightbox');
  if (dialog && image) {
    document.querySelectorAll('.paper').forEach((paper, idx) => paper.addEventListener('click', () => {
      image.src = paper.dataset.image;
      dialog.showModal();
      window.cwpTrack?.('evidence_viewed', { sheet: idx + 1 });
    }));
    close?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }
})();
