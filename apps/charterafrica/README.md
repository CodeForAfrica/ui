# Charter Africa

This is the official code for <https://charter.africa> site

## Getting Started

First create `.env.local` file in the root directory of the project.

```bash
cp env.template .env.local
```

and modify the `.env.local` file according to your needs.

### Note

The default `.env` file is for the publicly visible environment variables.
**DO NOT** include any secrets in it. All secrets should go into `env.local`.
For more, see NextJS env var docs [here](https://nextjs.org/docs/basic-features/environment-variables).

## Database setup

Generate a new MongoDB keyfile by running the following command:
NB: Run this command on the root directory

```bash
make mongodb-keyfile
```

Start the database server:
NB: Run this command on the root directory

```bash
make mongodb
```

Then run the development server:

```bash
pnpm dev
```

## Debugging

Chrome DevTools debugging is enabled by default for both client-side and server-side code. See Next.js [docs](https://nextjs.org/docs/advanced-features/debugging#debugging-with-chrome-devtools) for more information.
