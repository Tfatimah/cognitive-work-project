(() => {
  const reveals = document.querySelectorAll('.reveal, .idea-cloud');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        const section = entry.target.closest('[data-section]');
        if (section && window.cwpTrack) window.cwpTrack('study_section_reached', { section: section.dataset.section });
      }
    });
  }, { threshold: 0.18 });
  reveals.forEach(el => observer.observe(el));

  const bar = document.getElementById('progressBar');
  const updateProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true }); updateProgress();

  document.querySelectorAll('[data-track]').forEach(el => el.addEventListener('click', () => window.cwpTrack?.(el.dataset.track)));

  const dialog = document.getElementById('lightbox');
  const image = document.getElementById('lightboxImage');
  document.querySelectorAll('.paper').forEach((paper, idx) => paper.addEventListener('click', () => {
    image.src = paper.dataset.image; dialog.showModal(); window.cwpTrack?.('evidence_viewed', { sheet: idx + 1 });
  }));
  document.getElementById('closeLightbox').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
})();
