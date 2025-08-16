# Deep Work Preparation App (PreSession)

A beautiful, calming application that guides users through a 6‑step ritual for optimal deep work preparation.

### Demo

![Short preSession Demo](./public/demo.gif)

### [Behind the Scenes](https://www.youtube.com/watch?v=CHMt4m2Y6Gk&ab_channel=WebStories)

## Highlights
- **Complete 6‑Step Flow**: welcome → checklist → sounds → breathing → timer → reflection
- **Real Audio**: procedurally generated ambient sounds via the Web Audio API with preview and session playback
- **Pomodoro Engine**: multi‑cycle work/break phases with progress ring, pause/resume, and sound integration
- **Guided Breathing**: animated 4‑7‑8 sequence with visual scales and progress
- **Persistent Checklist**: editable list with auto‑save (localStorage) and progress tracking
- **Session Reflection**: quick ratings, mood selection, insights, and local history

## Tech Stack
- **Angular 20**: standalone components, signals, and modern control flow (`@for`, `@if`)
- **Routing**: lazy‑loaded `loadComponent()` routes with titles
- **State**: Angular Signals (`signal`, `computed`, `effect`) for reactive UI
- **Styling**: Tailwind CSS 4 + component‑scoped SCSS

## Architecture
- **Standalone components** (no NgModules)
- **Lazy‑loaded routes** in `src/app/app.routes.ts`:
  - `/welcome` – Welcome overview
  - `/checklist` – Preparation checklist
  - `/sounds` – Ambient sound selection and preview
  - `/breathing` – Guided 4‑7‑8 breathing
  - `/timer` – Pomodoro timer (sound during work, silence on breaks)
  - `/reflection` – Post‑session reflection

Core services/components:
- `shared/services/sound.service.ts` – Web Audio API sound generation (Rain, Ocean, Forest, Coffee Shop, Brown Noise, Pink Noise)
- `features/*` – Feature screens (checklist, sounds, breathing, timer, reflection)
- `shared/layout` – App layout with `Stepper` and inspirational `Quote`

## Getting Started
Prerequisites: Node 18+, pnpm

```bash
pnpm install
pnpm start
# then open http://localhost:4200/
```

## Scripts
```bash
pnpm start   # ng serve (dev server)
pnpm build   # production build → dist/
pnpm test    # unit tests (Karma/Jasmine)
```

## Development Notes
- Signals are used for all interactive state (timer, breathing, checklist, sounds, reflection)
- Audio context is resumed on interaction to meet browser autoplay policies
- Timer automatically stops/starts ambient audio between phases

## Testing
```bash
pnpm test
```

## CLI Reference
For full Angular CLI commands, see the Angular CLI Overview and Command Reference: `https://angular.dev/tools/cli`.
