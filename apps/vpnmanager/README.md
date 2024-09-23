# VPN Manager

This is the cfa Outline VPN Manager

### Development

## Getting Started

First create `.env.local` file in the root directory of the project.

```bash
cp env.template .env.local
```

and modify the `.env.local` file according to your needs.

#### Note

The default `.env` file is for the 'Publicly' visible environment variables.

## Script

```bash
pnpm process-new-hires
```

## Web

Run the development server:

```bash
pnpm dev
```

### Deployment.

```bash
docker-compose up --build vpnmanager
```

or

```bash
make vpnmanager
```

### Deployment to Dokku

1. Install and setup new application on dokku. [Here is the documentation of how to install and create an app on dokku](https://dokku.com/docs~v0.6.5/deployment/application-deployment/).

2. Persist storage database.
   Docker in their [best practices](https://docs.docker.com/build/building/best-practices/#containers-should-be-ephemeral) opine that containers be treated as ephemeral. In order to manage persistent storage for database, a directory outside the container should be mounted. Vpnmanager uses sqlite to locally store data as obtained from Outline VPN API. To persist this data, run the command below

```bash
dokku storage:mount vpnmanager /var/lib/dokku/data/storage/vpnmanager/data:/workspace/apps/vpnmanager/data
```

3. Build docker image and tag.

```bash
docker build --target vpnmanager-runner \
  --build-arg SENTRY_ORG=$SENTRY_ORG \
  --build-arg SENTRY_PROJECT=$SENTRY_PROJECT \
  --build-arg SENTRY_DSN=$SENTRY_DSN \
  --build-arg API_SECRET_KEY=$API_SECRET_KEY \
  -t codeforafrica/vpnmanager:latest .
```

4. Deploy to dokku.

```bash
dokku git:from-image vpnmanager codeforafrica/vpnmanager:latest
```
