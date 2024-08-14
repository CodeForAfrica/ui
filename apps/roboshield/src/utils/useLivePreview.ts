import { subscribe, unsubscribe, ready } from "@payloadcms/live-preview";
import { useCallback, useEffect, useState, useRef } from "react";

export const useLivePreview = <T extends any>(props: {
  depth?: number;
  initialData: T;
  serverURL: string;
}): {
  data: T;
  isLoading: boolean;
} => {
  const { depth = 0, initialData, serverURL } = props;
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasSentReadyMessage = useRef<boolean>(false);

  const onChange = useCallback(
    (mergedData: T) => {
      setData(mergedData);
      setIsLoading(false);
    },
    [initialData],
  );

  useEffect(() => {
    const subscription = subscribe({
      callback: onChange,
      depth,
      initialData,
      serverURL,
    });

    if (!hasSentReadyMessage.current) {
      hasSentReadyMessage.current = true;

      ready({
        serverURL,
      });
    }

    return () => {
      unsubscribe(subscription);
    };
  }, [serverURL, onChange, depth, initialData]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return {
    data,
    isLoading,
  };
};

export default useLivePreview;
