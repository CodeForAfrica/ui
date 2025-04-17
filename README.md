# COMMONS UI

## Applications

| Name                                                    | Description                                               |
| ------------------------------------------------------- | --------------------------------------------------------- |
| [**charterAFRICA**](./apps/charterafrica/)              | The largest digital database for communities              |
| [**Code for Africa**](./apps/codeforafrica/)            | Africa's largest network of civic tech and open data labs |
| [**ClimateMapped.AFRICA**](./apps/climatemappedafrica/) | Empowering action through climate data                    |
| [**PesaYetu**](./apps/pesayetu/)                        | Data to hold your government accountable                  |
| [**RoboShield**](./apps/roboshield/)                    | Guard your website against AI Bots                        |
| 1 [**TwoopsTracker**](./apps/twooptracker/)             | Track the trolls & sock-puppets poisoning our democracies |

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
