# VPN Manager

VPN Manager is designed to manage and track usage statistics for Outline VPN users.

- The app retrieves usage statistics from Outline VPN and stores them in a local database for efficient querying and analysis.
- Users can access a user-friendly UI to query and analyze their VPN usage data over specific time periods.
- VPN Manager automatically generates VPN keys for new hires and sends them an email with detailed setup instructions for configuring their VPN access.

## Development

### Configuring Google Provider for Authentication

1. Visit the Google Cloud Console.
2. Select or create a new project.
3. In the navigation menu, go to APIs & Services > Credentials.
4. Click on Create Credentials and choose OAuth 2.0 Client IDs.
5. Set the Application type to Web Application.
6. In the Authorized redirect URIs, add the following URIs:

- `http://localhost:3000/login` (for local development)
- Any other production URLs such as `https://vpnmanager.dev.codeforafrica.org/login`

Google requires certain scopes to retrieve the necessary user information for authentication. You must explicitly set the following scopes:

- `openid`: To obtain information about the authenticated user's identity.
- `email`: To retrieve the user's email address.
- `profile`: To get basic profile information, such as the user's name and profile picture.

After the app is created, take note of the Client ID and Client Secret. These will be used in your environment variables(.env.local).

```bash
  NEXT_APP_GOOGLE_CLIENT_ID=
  GOOGLE_CLIENT_SECRET=
```

### Getting Started

First create `.env.local` file in the root directory of the project.

```bash
cp env.template .env.local
```

and modify the `.env.local` file according to your needs.

#### Note

The default `.env` file is for the 'Publicly' visible environment variables.

## Run the development server

- Install dependancies

```bash
pnpm install
```

- if you are in the `apps/vpnmanager` directory

```bash
pnpm dev
```

or

```bash
pnpm dev --filter=vpnmanager
```

if you are executing from ui directory.

### Deployment

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
