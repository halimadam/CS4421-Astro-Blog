# A Little Life Between the Shots

A personal blog about pool, with practical tips, stories, and small observations from around the table. The posts cover 8-ball breaks, stance and bridge basics, cue-ball position, safety play, and pool-table etiquette.

The site also includes two interactive pool features:

- **Break & run the table** — an 8-ball practice game embedded in the break tutorial. Place the cue ball, aim, set shot power, and practice running a group.
- **8-Ball Run** — a pool-themed mini-game on the About page. Jump over obstacles, track your score, and save a high score in the browser.

## Built with

- [Astro](https://astro.build/) with the Node.js standalone adapter
- Markdown content collections for blog posts
- TypeScript utilities and Vitest unit tests
- Docker for containerized production builds

## Getting started

Use Node.js `>=22.22.3` and npm.

```sh
npm install
npm run dev
```

Astro prints the local development URL in the terminal (by default, `http://localhost:4321`).

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Astro development server |
| `npm run check` | Run Astro and TypeScript checks |
| `npm run lint` | Lint the project with ESLint |
| `npm run test:unit` | Run unit tests with Vitest |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
src/
├── assets/       # Images and local fonts
├── components/   # Shared UI and interactive pool games
├── content/
│   ├── authors/  # Author profiles
│   └── blog/     # Markdown and MDX posts
├── layouts/      # Blog post layout
├── pages/        # Home, About, blog, RSS, and health-check routes
├── styles/       # Global styles
└── utils/        # Blog, date, and game logic
cdk/              # AWS infrastructure defined with AWS CDK
```

Blog posts live in `src/content/blog/` and use the schema in `src/content.config.ts` for their frontmatter. The CI workflow runs linting, checks, unit tests, and production builds; pushes to `main` trigger the AWS container deployment workflow.
