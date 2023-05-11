import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useRouterLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRouteChangeStart = () => {
    setLoading(true);
  };

  const handleRouteChangeComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);
  return {
    loading,
    router,
  };
};

export default useRouterLoading;
