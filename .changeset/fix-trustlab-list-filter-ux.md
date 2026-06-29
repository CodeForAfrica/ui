---
"trustlab": patch
---

Improve the filterable list views (opportunities, reports, toolkits, playbooks):

- Keep the current results in place while a filter/search/page change is fetching (no flash back to the unfiltered list), and show a progress indicator for user-driven fetches only — not on first load, tab focus, or reconnect.
- Restore the filter controls (dropdowns/chips, sort, search) from bookmarked/shared URLs, and stop dropping other active filters on the first interaction.
- Centralise list data-fetching in a shared `useListData` hook.
