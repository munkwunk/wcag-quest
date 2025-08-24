# WCAG Accessibility Learning Platform

## Overview

This is an interactive accessibility learning platform that teaches WCAG (Web Content Accessibility Guidelines) testing through gamified experiences. Users can explore a test website, identify accessibility issues, and learn proper remediation techniques through hands-on challenges. The platform combines React frontend components with Express.js backend infrastructure, designed to provide an educational experience around accessibility best practices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built with React and TypeScript, utilizing a component-based architecture with the following key patterns:
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility-first design
- **Styling**: Tailwind CSS with HSL color system optimized for high contrast and accessibility
- **State Management**: React hooks with custom game state management via `useGameState`
- **Routing**: React Router with client-side navigation between game pages
- **Data Fetching**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
The server follows a minimal Express.js REST API pattern:
- **Framework**: Express.js with TypeScript for type safety
- **Development Setup**: Vite integration for hot module replacement and development tooling
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Route Structure**: Centralized route registration with `/api` prefix convention
- **Error Handling**: Centralized error middleware with structured error responses

### Database Design
The application uses Drizzle ORM with PostgreSQL:
- **Schema Definition**: Shared schema between client and server using Drizzle and Zod
- **User Management**: Simple user table with username/password authentication structure
- **Database Provider**: Configured for Neon Database (serverless PostgreSQL)
- **Migration Strategy**: Drizzle Kit for schema migrations and database management

### Game System Architecture
The core learning experience is built around an interactive game system:
- **Issue Detection**: Predefined accessibility issues with WCAG references and difficulty levels
- **Progress Tracking**: Real-time scoring and completion tracking with visual progress indicators
- **Modal-Based Learning**: Step-by-step guided challenges for identifying and fixing issues
- **xAPI Integration**: Learning analytics tracking for educational outcomes measurement

### Component Structure
- **Accessibility Test Page**: Interactive webpage with intentional accessibility violations
- **Game Modal**: Step-by-step challenge system for WCAG identification and remediation
- **Progress Tracker**: Visual progress indicators and scoring system
- **UI Components**: Comprehensive design system with accessibility-first components

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript, React Router, React Hook Form
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **State Management**: TanStack React Query for server state caching

### Backend Services
- **Database**: Neon Database (serverless PostgreSQL) with connection pooling
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage
- **Development Tools**: TSX for TypeScript execution, ESBuild for production builds

### Development and Build Tools
- **Build System**: Vite for development server and production builds
- **TypeScript**: Full type safety across client, server, and shared code
- **Linting and Formatting**: Configured for consistent code style
- **Replit Integration**: Cartographer plugin for Replit environment integration

### Educational and Analytics
- **xAPI Tracking**: Custom xAPI implementation for learning analytics
- **WCAG Reference Data**: Structured accessibility issue database with remediation guidance
- **Date Utilities**: date-fns for consistent date/time handling
- **Icon System**: Lucide React for consistent iconography

### Production Deployment
- **Build Output**: Static frontend assets with Node.js server bundle
- **Environment Configuration**: Environment variable-based configuration
- **Asset Management**: Vite-based asset optimization and bundling