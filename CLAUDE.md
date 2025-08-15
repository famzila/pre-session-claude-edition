# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

# Deep Work Preparation App
A beautiful, calming application that guides users through a 6-step ritual for optimal deep work preparation.

## Current Implementation Status:
**✅ FULLY IMPLEMENTED - Production Ready**

The app is a complete, fully-functional deep work preparation application with all features implemented and working:

### 🎯 Complete User Flow:
1. **Welcome** (`/welcome`) - Feature overview with start button
2. **Preparation Checklist** (`/checklist`) - Customizable task list with persistence
3. **Ambient Sounds** (`/sounds`) - 6 built-in sound options with real Web Audio API
4. **Breathing Exercise** (`/breathing`) - Guided 4-7-8 breathing with visual feedback
5. **Pomodoro Timer** (`/timer`) - Full-featured timer with sound integration
6. **Session Reflection** (`/reflection`) - Post-session analytics and rating

### 🎨 Design System:
- **Tailwind CSS 4.1.11** - Complete utility-first styling
- Warm, calming color palette (amber/sage gradients, slate backgrounds)
- Smooth animations and transitions throughout
- Fully responsive design for all devices
- Visual progress indicators and step navigation

### 🎵 Real Audio Implementation:
- **Web Audio API** - Real sound generation and playback
- 6 procedurally generated ambient sounds:
  - Rain (filtered white noise)
  - Ocean Waves (low-frequency sine waves)
  - Forest (ambient with bird chirps)
  - Coffee Shop (murmur with occasional machine sounds)
  - Brown Noise (red noise with deep frequencies)
  - Pink Noise (balanced frequency spectrum)
- Sound preview functionality
- Volume control and looping

### ⚡ Interactive Features:
- Step-by-step progress tracking with visual stepper
- Real-time breathing exercise with animated visual cues
- Pomodoro timer with circular progress display and phases
- Sound selection with live preview
- Session persistence and continuation

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

## Architecture & Implementation

**Modern Angular Stack (v20.1.0):**
- **Standalone Components**: All components are standalone, no NgModules
- **Signal-based Reactivity**: Extensive use of Angular signals throughout
- **New Control Flow**: Templates use `@for` syntax instead of `*ngFor`
- **TypeScript Strict Mode**: Full strict mode with advanced type checking enabled
- **Lazy Loading**: All routes use lazy loading with `loadComponent()`

**Current Application Structure:**
```
src/app/
├── app.ts                    # Root component (signal-based)
├── app.config.ts            # Application providers
├── app.routes.ts            # Complete route configuration with lazy loading
├── features/                # Feature modules (all implemented)
│   ├── welcome/             # Welcome screen component
│   ├── checklist/           # Preparation checklist component  
│   ├── sounds/              # Sound selection component
│   ├── breathing/           # Breathing exercise component
│   ├── timer/               # Pomodoro timer component
│   └── reflection/          # Session reflection component
└── shared/                  # Shared components and services
    ├── layout/              # Main layout component with stepper
    ├── stepper/             # Progress stepper component
    ├── quote/               # Inspirational quotes component
    └── services/            # Core services
        ├── sound.service.ts # Web Audio API implementation
        └── quote.service.ts # Quote management service
```

**Key Technical Implementations:**
- **Real Web Audio API**: `SoundService` generates 6 procedural ambient sounds
- **Advanced Timer Logic**: Multi-phase Pomodoro with work/break cycles
- **Breathing Pattern Engine**: 4-7-8 breathing with visual animations
- **Router-based Navigation**: Complete flow navigation between all steps
- **Signal-driven State**: All components use Angular signals for reactivity

**Styling & UI:**
- **Tailwind CSS 4.1.11**: Complete utility-first styling system
- **Component-scoped SCSS**: Each component has its own stylesheet
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animation System**: CSS transitions and transforms for smooth UX

**Build System:**
- Uses `@angular/build:application` builder (Angular 17+)
- Static assets served from `public/` directory
- Strict TypeScript configuration with ES2022 target

**Testing Setup:**
- Karma + Jasmine configured for all components
- Unit tests available for all feature components
- Coverage reporting enabled