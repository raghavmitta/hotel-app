# Richa Foam Agency - Hotel Mattress B2B Platform

## Overview

This is a B2B lead generation website for Richa Foam Agency, a premium hotel mattress distributor targeting India's hospitality industry. The application captures hotel buyer inquiries through multiple lead forms and stores them in a PostgreSQL database. The platform emphasizes luxury branding with a navy blue and beige color scheme, featuring product showcases, client testimonials, and promotional forms designed to convert hotel procurement managers into qualified leads.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for page transitions and scroll effects
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api` prefix
- **Build Tool**: Vite for frontend, esbuild for server bundling

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Tables**: 
  - `users` - Basic user authentication (id, username, password)
  - `leads` - Lead capture (name, hotelName, email, phone, quantity, message, source, createdAt)
- **Migrations**: Drizzle Kit with `db:push` command

### Key Design Patterns
- **Monorepo Structure**: Client code in `/client`, server in `/server`, shared types in `/shared`
- **Type Safety**: Drizzle-Zod for automatic schema validation types
- **Path Aliases**: `@/` for client, `@shared/` for shared, `@assets/` for static assets
- **Development Mode**: Vite dev server with HMR proxied through Express
- **Production Mode**: Static file serving from built `/dist/public`

## External Dependencies

### Database
- PostgreSQL via `DATABASE_URL` environment variable
- Connection pooling with `pg` package
- Session storage with `connect-pg-simple`

### Third-Party Integrations
- **Meta Conversions API**: Optional integration for Facebook/Instagram lead tracking
  - Requires `META_ACCESS_TOKEN` and `META_PIXEL_ID` environment variables
  - Sends lead events to Meta for advertising attribution

### External Services
- **Google Fonts**: Playfair Display (serif) and Lato (sans-serif)
- **Replit-specific plugins**: Dev banner, cartographer, runtime error overlay (development only)

### Key NPM Dependencies
- `drizzle-orm` / `drizzle-zod` - Database ORM and validation
- `@tanstack/react-query` - Data fetching and caching
- `framer-motion` - Animations
- `wouter` - Client-side routing
- Full shadcn/ui Radix component suite