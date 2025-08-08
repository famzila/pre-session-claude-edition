import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadComponent: () => import('./features/welcome/welcome').then(c => c.Welcome),
    title: 'Welcome - Deep Work Prep'
  },
  {
    path: 'checklist',
    loadComponent: () => import('./features/checklist/checklist').then(c => c.Checklist),
    title: 'Preparation Checklist - Deep Work Prep'
  },
  {
    path: 'sounds',
    loadComponent: () => import('./features/sounds/sounds').then(c => c.Sounds),
    title: 'Ambient Sounds - Deep Work Prep'
  },
  {
    path: 'breathing',
    loadComponent: () => import('./features/breathing/breathing').then(c => c.Breathing),
    title: 'Breathing Exercise - Deep Work Prep'
  },
  {
    path: 'timer',
    loadComponent: () => import('./features/timer/timer').then(c => c.Timer),
    title: 'Pomodoro Timer - Deep Work Prep'
  },
  {
    path: 'reflection',
    loadComponent: () => import('./features/reflection/reflection').then(c => c.Reflection),
    title: 'Session Reflection - Deep Work Prep'
  },
  {
    path: '**',
    redirectTo: '/welcome'
  }
];
