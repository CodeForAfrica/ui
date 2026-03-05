# COMMONS UI

## Applications

| Name                                                    | Description                                                                  |
| ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [**charterAFRICA**](./apps/charterafrica/)              | The largest digital database for communities                                 |
| [**ClimateMapped.AFRICA**](./apps/climatemappedafrica/) | Empowering action through climate data                                       |
| [**Code for Africa**](./apps/codeforafrica/)            | Africa's largest network of civic tech and open data labs                    |
| [**PesaYetu**](./apps/pesayetu/)                        | Data to hold your government accountable                                     |
| [**RoboShield**](./apps/roboshield/)                    | Guard your website against AI Bots                                           |
| [**TrustLab**](./apps/trustlab/)                        | Empowering CSOs and CBOs to tackle digital threats facing their communities. |
| [**TwoopsTracker**](./apps/twoopstracker/)              | Track the trolls & sock-puppets poisoning our democracies                    |

## Blogs

| Name                                                | Description                                           |
| --------------------------------------------------- | ----------------------------------------------------- |
| [**CivicSignal Research**](./apps/civicsignalblog/) | View the latest analysis from CivicSignal team        |
| [**TechLab**](./apps/techlabblog/)                  | View the latest stories from the CFA engineering team |

## Get started

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

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

### Testing

Before we can run tests, we need to make sure `Playwright` has downloaded the browsers needed to run e2e test.

```
npx playwright install
```

To test all apps and packages, run the following command:

```
pnpm test
```

### Docker

Use `pnpm dev` for day-to-day development. Docker is for deployment image builds only.

Using `techlabblog` app as an example, to build and test the image locally, run:

```bash
make techlabblog
```

This command uses [`bake-up.sh`](./scripts/bake-up.sh) script to:

1. build and tag `codeforafrica/techlabblog:local` image using `docker buildx bake techlabblog`, and then
2. uses the built image to run `docker compose up techlabblog`.

See [docker/README.md](./docker/README.md) for full details including CI commands and
the pattern for migrating additional apps.

### Adding changesets

To add changeset, run the following command. This will let you choose what package you want to publish

```
pnpm changeset
```

### Releasing and publishing to npm

To publish you packages, run

```
pnpm publish
```

Make sure you are logged in to npm before publishing your package
