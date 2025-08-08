import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

interface Sound {
  id: number;
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-sounds',
  imports: [],
  templateUrl: './sounds.html',
  styleUrl: './sounds.scss'
})
export class Sounds {
  private router = inject(Router);
  
  sounds = signal<Sound[]>([
    {
      id: 1,
      name: 'Rain',
      description: 'Gentle rainfall',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>`
    },
    {
      id: 2,
      name: 'Ocean Waves',
      description: 'Peaceful waves',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9.275 7.5M14 10h-4m0 0h-4m4 0v6"></path>
            </svg>`
    },
    {
      id: 3,
      name: 'Forest',
      description: 'Birds and leaves',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>`
    },
    {
      id: 4,
      name: 'Coffee Shop',
      description: 'Ambient chatter',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
            </svg>`
    },
    {
      id: 5,
      name: 'Brown Noise',
      description: 'Deep frequency',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.04 6.464A7 7 0 1019.46 20L5.04 6.464z"></path>
            </svg>`
    },
    {
      id: 6,
      name: 'Pink Noise',
      description: 'Balanced frequency',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>`
    }
  ]);
  
  selectedSoundId = signal<number | null>(null);
  isPlaying = signal<number | null>(null);
  
  selectSound(id: number) {
    this.selectedSoundId.set(id);
  }
  
  togglePreview(id: number, event: Event) {
    event.stopPropagation();
    
    if (this.isPlaying() === id) {
      // Stop playing
      this.isPlaying.set(null);
    } else {
      // Start playing
      this.isPlaying.set(id);
      // Simulate stopping after 3 seconds (in real app, this would be tied to actual audio)
      setTimeout(() => {
        if (this.isPlaying() === id) {
          this.isPlaying.set(null);
        }
      }, 3000);
    }
  }
  
  goBack() {
    this.router.navigate(['/checklist']);
  }
  
  continue() {
    if (this.selectedSoundId()) {
      this.router.navigate(['/breathing']);
    }
  }
}
