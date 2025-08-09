import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

type StepId = 'welcome' | 'prepare' | 'sounds' | 'breathing' | 'timer' | 'reflection';

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss'
})
export class Stepper {
  private router = inject(Router);
  
  private stepOrder: StepId[] = ['welcome', 'prepare', 'sounds', 'breathing', 'timer', 'reflection'];
  private routeToStep: Record<string, StepId> = {
    '/welcome': 'welcome',
    '/checklist': 'prepare', 
    '/sounds': 'sounds',
    '/breathing': 'breathing',
    '/timer': 'timer',
    '/reflection': 'reflection'
  };
  
  currentStepId: StepId = 'welcome';
  
  constructor() {
    // Listen to route changes to update current step
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => (event as NavigationEnd).url)
      )
      .subscribe(url => {
        const stepId = this.routeToStep[url];
        if (stepId) {
          this.currentStepId = stepId;
        }
      });
    
    // Set initial step based on current URL
    const currentUrl = this.router.url;
    const initialStep = this.routeToStep[currentUrl];
    if (initialStep) {
      this.currentStepId = initialStep;
    }
  }
  
  isCurrentStep(stepId: StepId): boolean {
    return this.currentStepId === stepId;
  }
  
  isStepCompleted(stepId: StepId): boolean {
    const currentIndex = this.stepOrder.indexOf(this.currentStepId);
    const stepIndex = this.stepOrder.indexOf(stepId);
    return stepIndex < currentIndex;
  }
  
  getStepClass(stepId: StepId): string {
    const baseClass = 'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2';
    
    if (this.isStepCompleted(stepId)) {
      return `${baseClass} bg-gradient-to-br from-amber-400 to-orange-500 border-amber-400/50 shadow-lg shadow-amber-500/25`;
    } else if (this.isCurrentStep(stepId)) {
      return `${baseClass} bg-gradient-to-br from-amber-400 to-orange-500 border-amber-400/50 shadow-lg shadow-amber-500/25`;
    }
    
    return `${baseClass} bg-slate-700/50 border-slate-600/50 backdrop-blur-sm`;
  }
  
  getStepLabelClass(stepId: StepId): string {
    const baseClass = 'ml-2 text-xs md:text-sm font-medium transition-colors duration-300';
    
    if (this.isStepCompleted(stepId)) {
      return `${baseClass} text-amber-300`;
    } else if (this.isCurrentStep(stepId)) {
      return `${baseClass} text-amber-300`;
    }
    
    return `${baseClass} text-slate-400`;
  }
  
  getProgressLineClass(stepId: StepId): string {
    const baseClass = 'w-8 md:w-12 h-1 transition-all duration-500 rounded-full';
    
    if (this.isStepCompleted(stepId)) {
      return `${baseClass} bg-gradient-to-r from-amber-400 to-orange-500 shadow-sm shadow-amber-500/25`;
    }
    
    return `${baseClass} bg-slate-700/50`;
  }
}
