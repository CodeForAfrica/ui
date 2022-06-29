# ui

# Get started

This project is using [pnpm](https://pnpm.io/) as a package manager. To setup the monorepo run the following:

```
git clone https://github.com/CodeForAfrica/ui.git
cd ui
pnpm install

```

### Build

To build all apps and packages, run the following command:

```
pnpm  build
```

#### Note

There appears to be a [bug](https://github.com/pnpm/pnpm/issues/4663) when running `pnpm build` a second time if you have `outputStandalone` enabled in `next.config.js`. A temporary workaround for that is to delete files in the `node_modules/.pnpm` folder. A `standalone` task has been added into the turbo pipeline to handle this before a build task is run.

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

### Testing

To test all apps and packages, run the following command:

```
pnpm test
```

### Adding changesets

To add changeset, run the following command. This will let you choose what package you want to publish

```
pnpm changeset
```

### Releasing and publishng to npm

To publish you packages, run

```
pnpm publish
```

Make sure you are logged in to npm before publishing your package
