(() => {
  const cfg = window.CWP_POSTHOG || {};
  window.cwpTrack = () => {};
  if (!cfg.key) return;
  const s = document.createElement('script');
  s.async = true; s.src = cfg.host.replace(/\/$/, '') + '/static/array.js';
  s.onload = () => {
    if (!window.posthog) return;
    window.posthog.init(cfg.key, {
      api_host: cfg.host,
      person_profiles: 'identified_only',
      persistence: 'memory',
      disable_session_recording: true,
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: true,
      respect_dnt: true
    });
    window.cwpTrack = (name, props={}) => window.posthog.capture(name, props);
  };
  document.head.appendChild(s);
})();
