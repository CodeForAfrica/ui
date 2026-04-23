# PromiseTracker Repository Review Issues

## Critical

### 1. `jsonQL` status catalogue stores entire promise objects

- **Location:** `src/lib/jsonql/promises.js:27`
- **Impact:** Downstream consumers receive promise-shaped objects when requesting status metadata. Helpers such as `jsonSource` expect fields like `status.title` and `status.color`; because the catalogue entry is the full promise, comparisons silently fail and status fallbacks never resolve. This cascades into broken status labelling and incorrect promise data in SSG/ISR responses.
- **Root Cause:** When reducing the promise list into a status map, the code spreads `curr` (the promise) instead of `curr.status`. As a result each "status" entry retains all promise fields.
- **Recommendation:** Replace `{ ...curr, slug }` with `{ ...status, slug }` (or another minimal status shape) while retaining a stable slug generator.

### 2. Missing null guard when resolving a single promise

- **Location:** `src/lib/jsonql/promises.js:49`
- **Impact:** If `getPromise` cannot find a matching item (e.g., invalid id, filters applied, or empty dataset), the follow-up access `promise.categories` throws. In SSG/ISR this surfaces as a 500 error before the `notFound` branch in the page can trigger.
- **Root Cause:** The function assumes the filter result exists before populating related articles.
- **Recommendation:** Guard after the lookup (`if (!promise) { return null; }`) before dereferencing fields or mutating the object.

### 3. `formatSiteAsProjectMeta` can throw `RangeError: Invalid time value`

- **Location:** `src/lib/gsheets/index.js:215`
- **Impact:** When the `lastUpdated` column is empty in Sheets, the helper calls `formatDate(Date.now)`—passing the function reference instead of executing it. `new Date(Date.now)` fails, crashing metadata generation for the entire build.
- **Root Cause:** Missing parentheses when defaulting to the current timestamp.
- **Recommendation:** Use `formatDate(site.lastUpdated ?? Date.now())` or check for falsy values before formatting.

### 4. Refresh flow discards the only refresh token

- **Location:** `src/lib/actnow/index.js:84`
- **Impact:** Some OAuth providers (including Django OAuth Toolkit) omit a new refresh token on refresh. The current implementation overwrites the stored token with `undefined`, so every subsequent refresh or authenticated call fails.
- **Root Cause:** The refreshed payload destructures `refresh_token` and reassigns it without retaining the previous value when absent.
- **Recommendation:** Preserve the existing `currentRefreshToken` when the response does not contain a replacement.

## Major

### 5. Navigation order from Sheets is unstable

- **Location:** `src/lib/gsheets/index.js:187`
- **Impact:** The comparator passed to `.sort()` returns a boolean (`a.order > b.order`), which coerces to `0` or `1`. Because the negative branch never fires, entries with lower `order` can drift, producing inconsistent menus between builds.
- **Recommendation:** Replace with a numeric comparator (`(a, b) => a.order - b.order`).

### 6. Credentials logins omit token expiry metadata

- **Location:** `src/lib/actnow/index.js:63`
- **Impact:** `NextAuth`’s JWT callback receives tokens without `exp`, so the guard `Date.now() < token.exp * 1000` fails, triggering the refresh branch on every request. It adds unnecessary network calls and breaks altogether if the refresh endpoint ever returns `null`.
- **Recommendation:** Decode the issued access token (using `jwtDecode`) and populate the `exp` claim the same way the refresh path does.

## Moderate

### 7. Promise sorting mutates React state in place

- **Location:** `src/components/Promises/index.js:90`
- **Impact:** `items.sort(...)` modifies the array referenced in component state. React sees no reference change, so the UI does not rerender when the user selects a new sort option.
- **Recommendation:** Clone before sorting (`const sortedItems = [...items].sort(...)`) and pass the new array into `setItems`.

## Follow-up / Testing

- There are no automated tests covering the promise JSONQL helpers or ActNow auth flows. After fixes land, add unit coverage around status cataloguing, `getPromise`, and the login/refresh helpers to prevent regressions.
