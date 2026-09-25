# The Cognitive Work Project — Study 01

A mobile-first scrollytelling research microsite for Tasneem Fatima's exploratory study, **When AI Thinks With Us: An Exploratory Probe into AI-Assisted Learning and Cognitive Delegation**.

## Preview locally
Keep the folder intact and open `index.html`. The site uses relative asset paths, so the research PDF and evidence images work locally.

The typeface is DM Sans from Google Fonts. If you open the site offline, the system sans-serif fallback will be used.

## PostHog — configure before launch
1. Create/select the PostHog project.
2. Copy the project token and ingestion host.
3. Edit `posthog-config.js`:
   `window.CWP_POSTHOG = { key: 'phc_...', host: 'https://eu.i.posthog.com' };`
4. Deploy and verify events in PostHog.

Privacy-conscious defaults are already configured: memory-only persistence, session recording off, autocapture off, Do Not Track respected, and no visitor form or personal-data collection.

Tracked events:
- `research_pdf_opened`
- `linkedin_clicked`
- `evidence_viewed`
- `study_section_reached`
- pageview / pageleave

## Deployment
Designed for GitHub + Netlify. `netlify.toml` and `robots.txt` are included.

Before publishing, verify:
- PostHog token/host
- Evidence images contain no identifying information
- PDF opens correctly
- LinkedIn link works
- Mobile QA on iPhone/Android widths
- Social share card on the final Netlify domain

## Design system
Deep teal `#073B3A`, aqua `#2FB7A8`, pale mineral `#DDF1ED`, porcelain `#F7F8F5`, charcoal `#202625`.

Motion follows meaning: ideas emerge, reorganise, merge, get questioned, then resolve into the next research design. Reduced-motion preferences are respected.
