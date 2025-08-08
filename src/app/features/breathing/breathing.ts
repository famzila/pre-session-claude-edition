import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

enum BreathingPhase {
  INHALE = 'INHALE',
  HOLD = 'HOLD', 
  EXHALE = 'EXHALE',
  REST = 'REST'
}

@Component({
  selector: 'app-breathing',
  imports: [],
  templateUrl: './breathing.html',
  styleUrl: './breathing.scss'
})
export class Breathing implements OnDestroy {
  private router = inject(Router);
  
  // Breathing pattern: 4-7-8 (inhale-hold-exhale)
  private readonly INHALE_DURATION = 4;
  private readonly HOLD_DURATION = 7;
  private readonly EXHALE_DURATION = 8;
  private readonly REST_DURATION = 2;
  
  totalCycles = 3;
  
  isActive = signal(false);
  currentPhaseEnum = signal<BreathingPhase>(BreathingPhase.REST);
  currentCount = signal(0);
  completedCycles = signal(0);
  
  private intervalId?: number;
  private phaseTimeLeft = 0;
  
  currentPhase = computed(() => {
    switch (this.currentPhaseEnum()) {
      case BreathingPhase.INHALE:
        return 'Breathe In';
      case BreathingPhase.HOLD:
        return 'Hold';
      case BreathingPhase.EXHALE:
        return 'Breathe Out';
      case BreathingPhase.REST:
        return 'Ready to Begin';
      default:
        return 'Rest';
    }
  });
  
  instruction = computed(() => {
    switch (this.currentPhaseEnum()) {
      case BreathingPhase.INHALE:
        return 'Slowly breathe in through your nose';
      case BreathingPhase.HOLD:
        return 'Hold your breath gently';
      case BreathingPhase.EXHALE:
        return 'Slowly exhale through your mouth';
      case BreathingPhase.REST:
        return 'Click start when you are ready to begin';
      default:
        return 'Relax and prepare for the next breath';
    }
  });
  
  outerScale = computed(() => {
    const phase = this.currentPhaseEnum();
    if (phase === BreathingPhase.INHALE) return 1.1;
    if (phase === BreathingPhase.HOLD) return 1.1;
    if (phase === BreathingPhase.EXHALE) return 0.9;
    return 1.0;
  });
  
  innerScale = computed(() => {
    const phase = this.currentPhaseEnum();
    if (phase === BreathingPhase.INHALE) return 1.2;
    if (phase === BreathingPhase.HOLD) return 1.2;
    if (phase === BreathingPhase.EXHALE) return 0.8;
    return 1.0;
  });
  
  circumference = computed(() => 2 * Math.PI * 45);
  
  strokeDashoffset = computed(() => {
    const phase = this.currentPhaseEnum();
    const count = this.currentCount();
    let progress = 0;
    
    switch (phase) {
      case BreathingPhase.INHALE:
        progress = (this.INHALE_DURATION - count) / this.INHALE_DURATION;
        break;
      case BreathingPhase.HOLD:
        progress = (this.HOLD_DURATION - count) / this.HOLD_DURATION;
        break;
      case BreathingPhase.EXHALE:
        progress = (this.EXHALE_DURATION - count) / this.EXHALE_DURATION;
        break;
      case BreathingPhase.REST:
        progress = 1;
        break;
    }
    
    return this.circumference() * progress;
  });
  
  startBreathing() {
    this.isActive.set(true);
    this.startPhase(BreathingPhase.INHALE, this.INHALE_DURATION);
  }
  
  pauseBreathing() {
    this.isActive.set(false);
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
  
  resetBreathing() {
    this.pauseBreathing();
    this.currentPhaseEnum.set(BreathingPhase.REST);
    this.currentCount.set(0);
    this.completedCycles.set(0);
  }
  
  private startPhase(phase: BreathingPhase, duration: number) {
    this.currentPhaseEnum.set(phase);
    this.currentCount.set(duration);
    this.phaseTimeLeft = duration;
    
    this.intervalId = setInterval(() => {
      this.phaseTimeLeft--;
      this.currentCount.set(this.phaseTimeLeft);
      
      if (this.phaseTimeLeft <= 0) {
        this.nextPhase();
      }
    }, 1000) as unknown as number;
  }
  
  private nextPhase() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    
    const currentPhase = this.currentPhaseEnum();
    
    switch (currentPhase) {
      case BreathingPhase.INHALE:
        this.startPhase(BreathingPhase.HOLD, this.HOLD_DURATION);
        break;
      case BreathingPhase.HOLD:
        this.startPhase(BreathingPhase.EXHALE, this.EXHALE_DURATION);
        break;
      case BreathingPhase.EXHALE:
        this.completedCycles.update(count => count + 1);
        if (this.completedCycles() < this.totalCycles) {
          this.startPhase(BreathingPhase.REST, this.REST_DURATION);
        } else {
          // All cycles completed
          this.isActive.set(false);
          this.currentPhaseEnum.set(BreathingPhase.REST);
          this.currentCount.set(0);
        }
        break;
      case BreathingPhase.REST:
        this.startPhase(BreathingPhase.INHALE, this.INHALE_DURATION);
        break;
    }
  }
  
  goBack() {
    this.pauseBreathing();
    this.router.navigate(['/sounds']);
  }
  
  continue() {
    if (this.completedCycles() >= 1) {
      this.pauseBreathing();
      this.router.navigate(['/timer']);
    }
  }
  
  ngOnDestroy() {
    this.pauseBreathing();
  }
}
