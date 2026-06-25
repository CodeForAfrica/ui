---
"trustlab": patch
---

Fix list filters across opportunities, reports, toolkits and playbooks.

Multi-value filters (location, report, year/month) are now sent as repeated query params instead of comma-joined strings, which corrupted backend queries when a value contained a comma (e.g. "Nairobi, Kenya"). Date-range and query-param handling are consolidated into shared utilities, filter params are standardised to singular names (`year`, `month`, `report`) end to end, the previously broken toolkit/playbook date filtering now works, and filter results restore from bookmarked URLs.
