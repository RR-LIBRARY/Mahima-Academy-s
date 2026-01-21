# Mahima Academy

## Overview
Mahima Academy is an educational platform for children in grades 1-5 featuring interactive courses, expert teachers, and joyful learning experiences.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM v6
- **State Management**: TanStack Query v5

## Project Structure
```
src/
├── components/     # React components including ui/ for shadcn
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── data/           # Static data files
├── assets/         # Static assets
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` to build for production
- Run `npm run test` to run tests

## Deployment
Configured as a static site deployment. The build output goes to the `dist` directory.

## Recent Changes
- January 21, 2026: Initial import from Lovable to Replit environment
  - Updated Vite config to use port 5000 and allow all hosts
  - Configured workflow for development server
  - Set up static deployment configuration
