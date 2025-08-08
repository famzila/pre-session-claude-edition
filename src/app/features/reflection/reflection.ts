import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

interface Insight {
  id: string;
  text: string;
}

interface Mood {
  id: string;
  emoji: string;
  label: string;
}

@Component({
  selector: 'app-reflection',
  imports: [],
  templateUrl: './reflection.html',
  styleUrl: './reflection.scss'
})
export class Reflection {
  private router = inject(Router);
  
  // Form state
  focusRating = signal(0);
  productivityRating = signal(0);
  selectedInsights = signal<string[]>([]);
  accomplishments = signal('');
  improvements = signal('');
  selectedMood = signal<string>('');
  isSubmitted = signal(false);
  
  // Static data
  insights = signal<Insight[]>([
    { id: 'preparation', text: 'The preparation ritual helped me get focused' },
    { id: 'sounds', text: 'Background sounds enhanced my concentration' },
    { id: 'breathing', text: 'The breathing exercise calmed my mind' },
    { id: 'environment', text: 'My workspace setup was optimal' },
    { id: 'timing', text: 'The Pomodoro timing worked well for me' },
    { id: 'breaks', text: 'Regular breaks kept me refreshed' },
    { id: 'distractions', text: 'I successfully minimized distractions' },
    { id: 'energy', text: 'I maintained good energy throughout' }
  ]);
  
  moods = signal<Mood[]>([
    { id: 'energized', emoji: '⚡', label: 'Energized' },
    { id: 'accomplished', emoji: '🎯', label: 'Accomplished' },
    { id: 'calm', emoji: '😌', label: 'Calm' },
    { id: 'satisfied', emoji: '😊', label: 'Satisfied' },
    { id: 'tired', emoji: '😴', label: 'Tired' },
    { id: 'frustrated', emoji: '😤', label: 'Frustrated' },
    { id: 'motivated', emoji: '🚀', label: 'Motivated' },
    { id: 'peaceful', emoji: '🧘', label: 'Peaceful' }
  ]);
  
  // Computed properties
  canSubmit = computed(() => {
    return this.focusRating() > 0 && 
           this.productivityRating() > 0 && 
           this.selectedMood() !== '';
  });
  
  getFocusRatingText() {
    switch (this.focusRating()) {
      case 1: return 'Very distracted';
      case 2: return 'Somewhat distracted';
      case 3: return 'Moderately focused';
      case 4: return 'Highly focused';
      case 5: return 'Completely focused';
      default: return 'Rate your focus level';
    }
  }
  
  getProductivityRatingText() {
    switch (this.productivityRating()) {
      case 1: return 'Not productive';
      case 2: return 'Somewhat productive';
      case 3: return 'Moderately productive';
      case 4: return 'Highly productive';
      case 5: return 'Extremely productive';
      default: return 'Rate your productivity';
    }
  }
  
  getCurrentMoodEmoji() {
    const currentMood = this.moods().find(mood => mood.id === this.selectedMood());
    return currentMood?.emoji || '😊';
  }
  
  // Actions
  setFocusRating(rating: number) {
    this.focusRating.set(rating);
  }
  
  setProductivityRating(rating: number) {
    this.productivityRating.set(rating);
  }
  
  toggleInsight(insightId: string) {
    this.selectedInsights.update(insights => {
      if (insights.includes(insightId)) {
        return insights.filter(id => id !== insightId);
      } else {
        return [...insights, insightId];
      }
    });
  }
  
  updateAccomplishments(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.accomplishments.set(target.value);
  }
  
  updateImprovements(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.improvements.set(target.value);
  }
  
  setMood(moodId: string) {
    this.selectedMood.set(moodId);
  }
  
  submitReflection() {
    if (this.canSubmit()) {
      // Here you could save the reflection data to local storage or send to a service
      const reflectionData = {
        focusRating: this.focusRating(),
        productivityRating: this.productivityRating(),
        selectedInsights: this.selectedInsights(),
        accomplishments: this.accomplishments(),
        improvements: this.improvements(),
        mood: this.selectedMood(),
        timestamp: new Date().toISOString()
      };
      
      // Save to localStorage for demo purposes
      const existingReflections = JSON.parse(localStorage.getItem('deepWorkReflections') || '[]');
      existingReflections.push(reflectionData);
      localStorage.setItem('deepWorkReflections', JSON.stringify(existingReflections));
      
      this.isSubmitted.set(true);
    }
  }
  
  startNewSession() {
    this.router.navigate(['/welcome']);
  }
  
  finish() {
    this.router.navigate(['/welcome']);
  }
}
