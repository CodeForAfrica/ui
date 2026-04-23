import React from "react";

function useEmbedPreload({ enabled, open, preloadRef }) {
  const [shouldLoad, setShouldLoad] = React.useState(Boolean(open));

  React.useEffect(() => {
    if (open) {
      setShouldLoad(true);
    }
  }, [open]);

  React.useEffect(() => {
    if (!enabled || shouldLoad || typeof window === "undefined") {
      return undefined;
    }

    let idleCallbackId = null;
    let timeoutId = null;
    let observer = null;

    const triggerLoad = () => {
      setShouldLoad(true);
    };

    const scheduleLoad = () => {
      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(triggerLoad, {
          timeout: 1500,
        });
        return;
      }

      timeoutId = window.setTimeout(triggerLoad, 250);
    };

    const node = preloadRef?.current;
    if (node && "IntersectionObserver" in window) {
      observer = new window.IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) {
            return;
          }

          observer?.disconnect();
          scheduleLoad();
        },
        { rootMargin: "240px 0px" },
      );
      observer.observe(node);
    } else {
      scheduleLoad();
    }

    return () => {
      observer?.disconnect();

      if (
        idleCallbackId !== null &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [enabled, preloadRef, shouldLoad]);

  return shouldLoad;
}

export default useEmbedPreload;
