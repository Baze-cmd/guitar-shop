# Guitar Shop

A Next.js app styled with Tailwind CSS and shadcn/ui components. Hosted locally on [guitar-shop.bazhe.dev](https://guitar-shop.bazhe.dev) (if running)

## Features
- Next.js
- Tailwind CSS
- shadcn/ui components
- Apollo Client (GraphQL)
- Docker-ready

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Styling
- Tailwind CSS is configured in `postcss.config.mjs` and `globals.css`.
- shadcn/ui components are used in `src/components/ui/`.

## Docker

To run the app in a container, simply use Docker Compose:

```bash
docker compose up --build
```

This will build the image and start the app on port **5678** as configured in `compose.yaml`.

Visit [http://localhost:5678](http://localhost:5678) in your browser.

### Notes
- You can set environment variables in `compose.yaml` or with a `.env.local` file.
- For custom domains, configure your reverse proxy to forward traffic to port 5678.

## Environment Variables
Create a `.env.local` file for secrets and API keys as needed.

## Project Structure
- `src/app/` - App Router pages and layouts
- `src/components/` - UI and feature components
- `src/lib/` - Apollo client and utilities
- `src/types/` - TypeScript types
- `public/` - Static assets
