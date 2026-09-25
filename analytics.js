(() => {
  const cfg = window.CWP_POSTHOG || {};
  const queue = [];
  window.cwpTrack = (name, props = {}) => queue.push([name, props]);
  if (!cfg.key || !cfg.host) return;

  // Official PostHog web snippet loader pattern.
  (function(t,e){
    var o,n,p,r;
    e.__SV || (
      window.posthog=e,
      e._i=[],
      e.init=function(i,s,a){
        function g(t,e){
          var o=e.split(".");
          if(o.length===2){t=t[o[0]];e=o[1]}
          t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}
        }
        (p=t.createElement("script")).type="text/javascript";
        p.crossOrigin="anonymous";
        p.async=true;
        p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js";
        (r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);
        var u=e;
        if(a!==undefined){u=e[a]=[]}
        else{a="posthog"}
        u.people=u.people||[];
        u.toString=function(t){var e="posthog";return a!=="posthog"&&(e+="."+a),t||(e+=" (stub)"),e};
        u.people.toString=function(){return u.toString(1)+".people (stub)"};
        o="init capture register register_once unregister identify set_config get_property reset opt_out_capturing opt_in_capturing has_opted_out_capturing has_opted_in_capturing".split(" ");
        for(n=0;n<o.length;n++)g(u,o[n]);
        e._i.push([i,s,a])
      },
      e.__SV=1
    )
  })(document, window.posthog || []);

  window.posthog.init(cfg.key, {
    api_host: cfg.host,
    defaults: '2026-05-30',
    person_profiles: 'identified_only',
    persistence: 'memory',
    disable_session_recording: true,
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    respect_dnt: true,
    loaded: function(ph) {
      window.cwpTrack = (name, props = {}) => ph.capture(name, props);
      queue.splice(0).forEach(([name, props]) => ph.capture(name, props));
    }
  });
})();
