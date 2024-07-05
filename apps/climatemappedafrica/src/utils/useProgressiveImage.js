import { useEffect, useState } from "react";

const useProgressiveImage = (src) => {
  const [sourceLoaded, setSourceLoaded] = useState(null);

  useEffect(() => {
    /* eslint-env browser */
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};
export default useProgressiveImage;
