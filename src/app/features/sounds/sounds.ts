import { Component, inject, signal, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SoundService } from '../../shared/services/sound.service';

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
export class Sounds implements OnDestroy {
  private router = inject(Router);
  private soundService = inject(SoundService);
  
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2 0h1M4 21V9a4 4 0 014-4h8a4 4 0 014 4v12"></path>
            </svg>`
    },
    {
      id: 3,
      name: 'Forest',
      description: 'Birds and leaves',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z M7 13h10M12 16v5M8 20h8"></path>
            </svg>`
    },
    {
      id: 4,
      name: 'Coffee Shop',
      description: 'Ambient chatter',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z M17 11h2a2 2 0 012 2v1a2 2 0 01-2 2h-2"></path>
            </svg>`
    },
    {
      id: 5,
      name: 'Brown Noise',
      description: 'Deep frequency',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 10v4M10 8v8M14 6v12M18 4v16"></path>
            </svg>`
    },
    {
      id: 6,
      name: 'Pink Noise',
      description: 'Balanced frequency',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z M21 16c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>
            </svg>`
    }
  ]);
  
  selectedSoundId = this.soundService.selectedSoundId;
  isPlaying = signal<number | null>(null);
  
  selectSound(id: number) {
    this.soundService.setSelectedSound(id);
  }
  
  async togglePreview(id: number, event: Event) {
    event.stopPropagation();
    
    if (this.isPlaying() === id) {
      // Stop playing
      this.soundService.stopPreview();
      this.isPlaying.set(null);
    } else {
      // Start playing
      this.isPlaying.set(id);
      try {
        await this.soundService.playPreview(id);
        // Audio will auto-stop after 2 seconds as configured in service
        setTimeout(() => {
          if (this.isPlaying() === id) {
            this.isPlaying.set(null);
          }
        }, 2000);
      } catch (error) {
        console.warn('Failed to play preview:', error);
        this.isPlaying.set(null);
      }
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
  
  ngOnDestroy() {
    // Stop any playing preview when component is destroyed
    this.soundService.stopPreview();
  }
}
