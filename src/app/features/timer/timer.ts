import { Component, inject, signal, computed, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SoundService } from '../../shared/services/sound.service';

enum TimerPhase {
  WORK = 'WORK',
  BREAK = 'BREAK',
  READY = 'READY',
  COMPLETED = 'COMPLETED'
}

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.html',
  styleUrl: './timer.scss'
})
export class Timer implements OnDestroy {
  private router = inject(Router);
  private soundService = inject(SoundService);
  
  // Timer settings (in minutes)
  workDuration = signal(25);
  breakDuration = signal(5);
  totalCycles = 4;
  
  // Timer state
  isActive = signal(false);
  currentPhase = signal<TimerPhase>(TimerPhase.READY);
  timeRemaining = signal(0); // in seconds
  totalTime = signal(0); // in seconds
  completedCycles = signal(0);
  
  private intervalId?: number;
  
  // Computed properties
  formattedTime = computed(() => {
    const minutes = Math.floor(this.timeRemaining() / 60);
    const seconds = this.timeRemaining() % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });
  
  currentStatus = computed(() => {
    switch (this.currentPhase()) {
      case TimerPhase.WORK:
        return 'Focus Time';
      case TimerPhase.BREAK:
        return 'Break Time';
      case TimerPhase.READY:
        return this.completedCycles() === 0 ? 'Ready to Start' : 'Ready for Next Cycle';
      case TimerPhase.COMPLETED:
        return 'Session Complete!';
      default:
        return 'Ready';
    }
  });
  
  isBreakTime = computed(() => this.currentPhase() === TimerPhase.BREAK);
  
  circumference = computed(() => 2 * Math.PI * 45);
  
  // Sound status for display
  selectedSoundName = computed(() => this.soundService.getSelectedSoundName());
  isSoundPlaying = this.soundService.isPlaying;
  
  strokeDashoffset = computed(() => {
    if (this.totalTime() === 0) return this.circumference();
    const progress = (this.totalTime() - this.timeRemaining()) / this.totalTime();
    return this.circumference() * (1 - progress);
  });
  
  updateWorkDuration(event: Event) {
    if (!this.isActive()) {
      const target = event.target as HTMLInputElement;
      const value = parseInt(target.value);
      if (value >= 1 && value <= 60) {
        this.workDuration.set(value);
        if (this.currentPhase() === TimerPhase.READY) {
          this.timeRemaining.set(value * 60);
          this.totalTime.set(value * 60);
        }
      }
    }
  }
  
  updateBreakDuration(event: Event) {
    if (!this.isActive()) {
      const target = event.target as HTMLInputElement;
      const value = parseInt(target.value);
      if (value >= 1 && value <= 30) {
        this.breakDuration.set(value);
      }
    }
  }
  
  startTimer() {
    if (this.currentPhase() === TimerPhase.READY) {
      // Start work phase
      this.startWorkPhase();
    } else {
      // Resume timer
      this.resumeTimer();
    }
  }
  
  private startWorkPhase() {
    const workSeconds = this.workDuration() * 60;
    this.currentPhase.set(TimerPhase.WORK);
    this.timeRemaining.set(workSeconds);
    this.totalTime.set(workSeconds);
    this.isActive.set(true);
    
    // Start sound when work phase begins
    this.soundService.startSound();
    
    this.startCountdown();
  }
  
  private startBreakPhase() {
    const breakSeconds = this.breakDuration() * 60;
    this.currentPhase.set(TimerPhase.BREAK);
    this.timeRemaining.set(breakSeconds);
    this.totalTime.set(breakSeconds);
    
    // Stop sound during break time
    this.soundService.stopSound();
    
    this.startCountdown();
  }
  
  private startCountdown() {
    this.intervalId = setInterval(() => {
      const remaining = this.timeRemaining();
      if (remaining > 0) {
        this.timeRemaining.set(remaining - 1);
      } else {
        this.onPhaseComplete();
      }
    }, 1000) as unknown as number;
  }
  
  private onPhaseComplete() {
    this.stopCountdown();
    
    if (this.currentPhase() === TimerPhase.WORK) {
      // Work phase completed
      this.completedCycles.update(count => count + 1);
      
      if (this.completedCycles() < this.totalCycles) {
        // Start break phase
        this.startBreakPhase();
      } else {
        // All cycles completed
        this.currentPhase.set(TimerPhase.COMPLETED);
        this.isActive.set(false);
        this.timeRemaining.set(0);
        
        // Stop sound when all cycles are completed
        this.soundService.stopSound();
      }
    } else if (this.currentPhase() === TimerPhase.BREAK) {
      // Break phase completed, ready for next work cycle
      this.currentPhase.set(TimerPhase.READY);
      this.isActive.set(false);
      this.timeRemaining.set(this.workDuration() * 60);
      this.totalTime.set(this.workDuration() * 60);
    }
  }
  
  private resumeTimer() {
    this.isActive.set(true);
    
    // Resume sound if in work phase
    if (this.currentPhase() === TimerPhase.WORK) {
      this.soundService.startSound();
    }
    
    this.startCountdown();
  }
  
  pauseTimer() {
    this.isActive.set(false);
    this.stopCountdown();
    
    // Pause sound when timer is paused
    this.soundService.stopSound();
  }
  
  resetTimer() {
    this.stopCountdown();
    this.isActive.set(false);
    this.currentPhase.set(TimerPhase.READY);
    this.completedCycles.set(0);
    this.timeRemaining.set(this.workDuration() * 60);
    this.totalTime.set(this.workDuration() * 60);
    
    // Stop sound when timer is reset
    this.soundService.stopSound();
  }
  
  private stopCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
  
  goBack() {
    this.pauseTimer();
    this.router.navigate(['/breathing']);
  }
  
  continue() {
    if (this.completedCycles() >= 1) {
      this.pauseTimer();
      this.router.navigate(['/reflection']);
    }
  }
  
  ngOnDestroy() {
    this.stopCountdown();
  }
  
  constructor() {
    // Initialize timer display
    this.timeRemaining.set(this.workDuration() * 60);
    this.totalTime.set(this.workDuration() * 60);
  }
}
