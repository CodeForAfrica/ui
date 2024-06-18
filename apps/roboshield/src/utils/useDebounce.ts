import { useRef, useEffect } from "react";

export const useDebouncedValue = (
  value: string,
  delay: number,
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void,
) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (onChange) {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        onChange(value);
      }, delay);
    }

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [value, onChange, delay]);
};
