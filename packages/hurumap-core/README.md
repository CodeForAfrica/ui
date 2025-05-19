# @hurumap/core

### Getting started

Depends on `@commons-ui/core` and basic HURUMap components

To run `@hurumap/core` test:

```sh
pnpm test
```

### Development

#### Important

While `@mui/utils` provides a [`deepmerge`](https://github.com/mui/material-ui/blob/next/packages/mui-utils/src/deepmerge/deepmerge.ts) function, this function doesn't support merging arrays. For this reason, `@hurumap/core` opts to use [`deepmerge`](https://github.com/TehShrike/deepmerge) package since HURUmap makes have use of arrays of data to render charts (using Vega library).
