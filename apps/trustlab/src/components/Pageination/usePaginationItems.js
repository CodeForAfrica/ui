import { useMemo } from "react";

function usePaginationItems({
  page,
  count,
  siblingCount = 1,
  boundaryCount = 1,
}) {
  return useMemo(() => {
    const startPages = Array.from(
      { length: Math.min(boundaryCount, count) },
      (_, i) => i + 1,
    );
    const endPages = Array.from(
      { length: Math.min(boundaryCount, count) },
      (_, i) => count - i,
    ).reverse();

    const siblingsStart = Math.max(
      Math.min(
        page - siblingCount,
        count - boundaryCount - siblingCount * 2 - 1,
      ),
      boundaryCount + 2,
    );
    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length ? endPages[0] - 2 : count - 1,
    );

    const middleRange =
      siblingsEnd >= siblingsStart
        ? Array.from(
            { length: siblingsEnd - siblingsStart + 1 },
            (_, i) => siblingsStart + i,
          )
        : [];

    const maybeStart = (() => {
      if (siblingsStart > boundaryCount + 2) {
        return ["start-ellipsis"];
      }
      if (boundaryCount + 1 < count - boundaryCount) {
        return [boundaryCount + 1];
      }
      return [];
    })();

    const maybeEnd = (() => {
      if (siblingsEnd < count - boundaryCount - 1) {
        return ["end-ellipsis"];
      }
      if (count - boundaryCount > boundaryCount) {
        return [count - boundaryCount];
      }
      return [];
    })();

    const prelim = [
      ...startPages,
      ...maybeStart,
      ...middleRange,
      ...maybeEnd,
      ...endPages,
    ];
    return prelim.filter((v, i, arr) => arr.indexOf(v) === i);
  }, [page, count, siblingCount, boundaryCount]);
}

export default usePaginationItems;
