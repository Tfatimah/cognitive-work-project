(() => {
  const cfg = window.CWP_POSTHOG || {};
  const queue = [];
  window.cwpTrack = (name, props = {}) => queue.push([name, props]);
  if (!cfg.key || !cfg.host) return;

  const s = document.createElement('script');
  s.async = true;
  s.src = cfg.host.replace(/\/$/, '') + '/static/array.js';
  s.onload = () => {
    if (!window.posthog) return;
    window.posthog.init(cfg.key, {
      api_host: cfg.host,
      defaults: '2026-05-30',
      person_profiles: 'identified_only',
      persistence: 'memory',
      disable_session_recording: true,
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: true,
      respect_dnt: true
    });
    window.cwpTrack = (name, props = {}) => window.posthog.capture(name, props);
    queue.splice(0).forEach(([name, props]) => window.cwpTrack(name, props));
  };
  document.head.appendChild(s);
})();
