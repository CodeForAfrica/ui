---
"trustlab": patch
---

Speed up Airtable form embeds so dialogs open instantly:

- Preload embeds in the background once the browser is idle after page load, instead of waiting for the button click.
- Show a loading skeleton in the embed dialog until the form is ready, instead of a blank area.
- Add `preconnect`/`dns-prefetch` hints for Airtable domains.
- Keep dialogs mounted after closing so reopening a form is instant.
- Render embeds as a controlled iframe (shared `AirtableEmbed` component) instead of injecting raw HTML, decoding HTML entities in the extracted `src`.
