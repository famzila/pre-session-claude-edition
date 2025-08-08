# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

# Deep Work Preparation App
A beautiful, calming application that guides users through a 6-step ritual for optimal deep work preparation.

## Key Features:
Complete User Flow:
- Welcome screen with feature overview
- Customizable preparation checklist
- Ambient sound selection library
- Guided breathing exercises
- Pomodoro timer with visual feedback
- Post-session reflection and analytics

## Design System:
- Warm, calming color palette (sage greens, soft blues, warm grays)
- Smooth animations and transitions
- Responsive design for all devices
- Semantic design tokens throughout

## ✨ Interactive Elements:
- Progress indicators with smooth animations
- Satisfying checkbox completions
- Audio preview controls
- Breathing exercise with visual cues
- Timer with circular progress display
- Star rating system for reflection

## Technical Features:
- Local storage for user preferences
- Session data persistence
- Audio controls (simulated for demo)
- Timer with background operation
- Analytics tracking over time

The app creates a mindful, ritualistic approach to deep work preparation, helping users establish consistent habits for maximum focus and productivity. Each step flows naturally into the next with encouraging micro-interactions and beautiful visual feedback.

## Commands

**Development and Build Commands:**
```bash
ng serve                 # Start development server at http://localhost:4200/
ng build                 # Production build (outputs to dist/)
ng test                  # Run unit tests with Karma/Jasmine
ng generate component name  # Generate new components
```

**Package Management:**
- Uses **pnpm** as the package manager (configured in angular.json)
- Run `pnpm install` to install dependencies
- Run `pnpm run [script]` for npm scripts

## Architecture

**Modern Angular Stack (v20.1.0):**
- **Standalone Components**: No NgModules, uses `bootstrapApplication()` approach
- **Zoneless Change Detection**: Uses `provideZonelessChangeDetection()` for better performance
- **Signal-based Reactivity**: Main component uses Angular signals
- **New Control Flow**: Templates use `@for` syntax instead of `*ngFor`
- **TypeScript Strict Mode**: Full strict mode with advanced type checking enabled

**Application Configuration:**
- Bootstrap configuration in `src/main.ts`
- App-wide providers configured in `src/app/app.config.ts`
- Router setup ready in `src/app/app.routes.ts` (currently empty)

**Build System:**
- Uses new `@angular/build:application` builder (Angular 17+)
- SCSS configured for styling
- Static assets served from `public/` directory
- Strict TypeScript configuration with ES2022 target

**Testing Setup:**
- Karma test runner with Jasmine framework
- Unit tests configured for standalone components
- Coverage reporting enabled
- Test files use `.spec.ts` extension

**Code Quality:**
- EditorConfig with 2-space indentation
- Prettier formatting with Angular HTML parser
- Strict TypeScript compiler options including `noImplicitReturns`, `noFallthroughCasesInSwitch`

## Key Implementation Notes

**Component Generation:**
- Components are standalone by default - no need to import in NgModules
- Use `imports` array in component decorator for dependencies

**Routing:**
- Router configured with `provideRouter()` in app config
- Routes array in `app.routes.ts` ready for route definitions

**Styling:**
- Global styles in `src/styles.scss`
- Component-specific SCSS files generated automatically
- CSS-in-JS not configured - uses traditional SCSS approach