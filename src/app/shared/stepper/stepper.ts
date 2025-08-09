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
    const baseClass = 'w-12 h-12 rounded-full flex items-center justify-center';
    
    if (this.isStepCompleted(stepId) || this.isCurrentStep(stepId)) {
      return `${baseClass} bg-emerald-600`;
    }
    
    return `${baseClass} bg-gray-300`;
  }
  
  getStepLabelClass(stepId: StepId): string {
    const baseClass = 'ml-2 text-sm font-medium';
    
    if (this.isStepCompleted(stepId) || this.isCurrentStep(stepId)) {
      return `${baseClass} text-gray-900`;
    }
    
    return `${baseClass} text-gray-500`;
  }
  
  getProgressLineClass(stepId: StepId): string {
    const baseClass = 'w-16 h-1';
    
    if (this.isStepCompleted(stepId)) {
      return `${baseClass} bg-emerald-600`;
    }
    
    return `${baseClass} bg-gray-300`;
  }
}
