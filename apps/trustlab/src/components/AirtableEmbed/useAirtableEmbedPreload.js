import { useEffect, useState } from "react";

// Preload the embed once the browser is idle after mount so the form is
// already (mostly) loaded by the time the user opens the dialog, without
// competing with the page's own initial load.
function useAirtableEmbedPreload(enabled) {
  const [preload, setPreload] = useState(false);

  useEffect(() => {
    if (!enabled || preload) {
      return undefined;
    }
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setPreload(true), {
        timeout: 2000,
      });
      return () => window.cancelIdleCallback(id);
    }
    // Safari has no requestIdleCallback
    const id = window.setTimeout(() => setPreload(true), 500);
    return () => window.clearTimeout(id);
  }, [enabled, preload]);

  return preload;
}

export default useAirtableEmbedPreload;
