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
