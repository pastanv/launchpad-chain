## Sample template for creating Launchpad services

This repository is available as a template when creating new repositories.

Use this repository as a starting point for developing Launchpad services to maintain consistency across all services.

### Getting started

```bash
npm install              # Install dependencies
npm run build            # Build the server
npm start                # For production: build and start the server
npm run start:dev        # For development: build and start the server, and watch for changes
npm run lint             # Format and lint files with prettier and eslint respectively
npm run test             # To run tests
npm run test:dev         # To run tests in watch mode
```

Sample `.env` file saved as `.env.template`

## Directory structure

See `[dir]/index.ts` files for more detailed descriptions.

```bash
src/
├─ configs/              # Project configuration files, including vendor configurations
│  ├─ constants.ts
├─ handlers/             # Request handler functions
├─ middlewares/          # Shared and/or organized by resource middlewares
│  ├─ errorHandler.ts
│  ├─ morgan.ts
├─ monitoring/          # Logging/monitoring setup
│  ├─ datadog.ts
│  ├─ logger.ts
├─ models/               # OPTIONAL - Resource or entity models, such as for ORM/ODMs
├─ routes/               # Resource routes
├─ services/             # Resource related functions, such as CRUD operations
├─ app.ts                # Express app configuration
└─ index.ts              # Server start and entry point

```
