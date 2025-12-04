# Memap Frontend

Frontend React application for Memap, built with TanStack Router, Mapbox GL, and modern React patterns.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Routing**: [TanStack Router](https://tanstack.com/router) - File-based routing
- **State Management**:
  - [TanStack Query](https://tanstack.com/query) - Server state
  - [Zustand](https://zustand-demo.pmnd.rs/) - Client state
- **Maps**: [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/) - Interactive maps
- **Forms**: [TanStack Form](https://tanstack.com/form) - Form management
- **UI Components**:
  - [Shadcn UI](https://ui.shadcn.com/) - Component library
  - [Tailwind CSS](https://tailwindcss.com/) - Styling
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)

## Project Structure

```
front/
├── src/
│   ├── api/              # API client functions
│   │   ├── images/       # Image API calls
│   │   ├── trip/         # Trip API calls and hooks
│   │   └── upload/       # Upload API calls
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── forms/        # Form components
│   │   ├── image/        # Image display components
│   │   ├── landing-page/ # Landing page sections
│   │   ├── map/          # Map components
│   │   ├── new-trip/     # Trip creation UI
│   │   ├── trip-details/ # Trip detail views
│   │   └── ui/           # Shadcn and global UI components
│   ├── guards/           # Route guards
│   ├── hooks/            # Custom React hooks
│   ├── integrations/    # Third-party integrations
│   ├── lib/             # Utilities and helpers
│   ├── routes/          # TanStack Router routes
│   ├── state/           # Global state (Zustand stores)
│   └── types/           # TypeScript type definitions
└── dist/                # Production build output
```

## Getting Started

### Prerequisites

- Node.js v22+
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

For network access (e.g., testing on mobile devices):

```bash
npm run dev-host
```

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

Preview the production build:

```bash
npm run serve
```

## Key Features

### Routing

This project uses TanStack Router with file-based routing. Routes are defined in `src/routes/`:

- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/app/map` - Main map interface

### State Management

- **Server State**: TanStack Query for API data fetching and caching
- **Client State**: Zustand stores in `src/state/` for UI state
- **Form State**: TanStack Form for complex form handling

### Maps

Mapbox GL is used for interactive maps. Components are in `src/components/map/`:

- `map.tsx` - Main map component
- `geocoder.tsx` - Location search
- `hooks/` - Map-related hooks

### Image Upload

The app supports drag-and-drop image uploads with presigned URLs:

- Upload flow: `src/hooks/use-presigned-upload-handler.ts`
- Image components: `src/components/image/`

## Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run dev-host` - Start dev server with network access (adjust API address in network)
- `npm run build` - Build for production
- `npm run serve` - Preview production build
- `npm run test` - Run tests with Vitest
- `npm run lint` - Lint code with Biome
- `npm run format` - Format code with Biome
- `npm run check` - Run both lint and format checks

## Adding Components

### Shadcn UI Components

Add new Shadcn components:

```bash
npx shadcn@latest add [component-name]
```

Components are added to `src/components/ui/`.

### Creating Routes

Add new route files in `src/routes/`. TanStack Router will automatically generate route definitions.

Example route file:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/your-route")({
  component: YourComponent,
});
```

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Tailwind Config**: Configured via `tailwind.config.js`
- **CSS Variables**: Theme customization via CSS variables
- **Dark Mode**: Built-in dark mode support

## Testing

Tests use Vitest and React Testing Library:

```bash
npm run test
```

## Linting & Formatting

This project uses Biome for linting and formatting:

- `npm run lint` - Check for linting errors
- `npm run format` - Format code
- `npm run check` - Run both lint and format

Configuration: `biome.json`

## Environment Variables

Create a `.env` file in the `front` directory:

```env
VITE_API_URL=http://localhost:4000
VITE_MAPBOX_TOKEN=your-mapbox-token
```

## Authentication

Authentication is handled by Better Auth. The auth client is configured in `src/lib/auth-client.ts` and used via context in `src/lib/auth-context.tsx`.

## Data Fetching

API calls are organized in `src/api/` with custom hooks using TanStack Query.

## Learn More

- [TanStack Router Docs](https://tanstack.com/router)
- [TanStack Query Docs](https://tanstack.com/query)
- [Mapbox GL Docs](https://docs.mapbox.com/mapbox-gl-js/)
- [Shadcn UI Docs](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
