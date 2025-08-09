import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audioContext: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  
  // Selected sound from the sounds component
  private selectedSoundIdSignal = signal<number | null>(null);
  
  // Sound playback state
  private isPlayingSignal = signal<boolean>(false);
  
  // Preview sound state (separate from main playback)
  private previewSourceSignal = signal<AudioBufferSourceNode | null>(null);
  
  // Getters for reactive access
  selectedSoundId = this.selectedSoundIdSignal.asReadonly();
  isPlaying = this.isPlayingSignal.asReadonly();
  
  constructor() {
    this.initializeAudio();
  }
  
  private async initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime); // Set volume to 30%
    } catch (error) {
      console.warn('Web Audio API not supported', error);
    }
  }
  
  private async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
  
  private generateSoundBuffer(soundId: number, duration: number = 3): AudioBuffer | null {
    if (!this.audioContext) return null;
    
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(2, length, sampleRate);
    
    const leftChannel = buffer.getChannelData(0);
    const rightChannel = buffer.getChannelData(1);
    
    switch (soundId) {
      case 1: // Rain
        this.generateRainSound(leftChannel, rightChannel, sampleRate);
        break;
      case 2: // Ocean Waves
        this.generateOceanSound(leftChannel, rightChannel, sampleRate, duration);
        break;
      case 3: // Forest
        this.generateForestSound(leftChannel, rightChannel, sampleRate);
        break;
      case 4: // Coffee Shop
        this.generateCoffeeShopSound(leftChannel, rightChannel, sampleRate);
        break;
      case 5: // Brown Noise
        this.generateBrownNoise(leftChannel, rightChannel);
        break;
      case 6: // Pink Noise
        this.generatePinkNoise(leftChannel, rightChannel);
        break;
      default:
        return null;
    }
    
    return buffer;
  }
  
  private generateRainSound(left: Float32Array, right: Float32Array, _sampleRate: number) {
    // Generate rain-like sound using filtered white noise
    for (let i = 0; i < left.length; i++) {
      const white = (Math.random() - 0.5) * 2;
      // Apply simple high-pass filtering for rain effect
      const filtered = white * 0.1 * (Math.random() > 0.97 ? 3 : 1);
      left[i] = filtered;
      right[i] = filtered * (0.9 + Math.random() * 0.2); // Slight stereo variation
    }
  }
  
  private generateOceanSound(left: Float32Array, right: Float32Array, sampleRate: number, _duration: number) {
    // Generate ocean wave sound using low-frequency sine waves with noise
    const frequency = 0.3; // Very low frequency for waves
    for (let i = 0; i < left.length; i++) {
      const t = i / sampleRate;
      const wave1 = Math.sin(2 * Math.PI * frequency * t) * 0.3;
      const wave2 = Math.sin(2 * Math.PI * frequency * 1.7 * t) * 0.2;
      const noise = (Math.random() - 0.5) * 0.1;
      const sample = (wave1 + wave2 + noise) * 0.4;
      left[i] = sample;
      right[i] = sample * (0.95 + Math.random() * 0.1);
    }
  }
  
  private generateForestSound(left: Float32Array, right: Float32Array, sampleRate: number) {
    // Generate forest ambience with filtered noise and occasional bird-like sounds
    for (let i = 0; i < left.length; i++) {
      let sample = (Math.random() - 0.5) * 0.05; // Very quiet base noise
      
      // Add occasional bird-like chirps
      if (Math.random() > 0.9995) {
        const chirp = Math.sin(2 * Math.PI * (800 + Math.random() * 400) * i / sampleRate) * 0.1;
        sample += chirp;
      }
      
      left[i] = sample;
      right[i] = sample * (0.8 + Math.random() * 0.4); // More stereo variation for forest
    }
  }
  
  private generateCoffeeShopSound(left: Float32Array, right: Float32Array, sampleRate: number) {
    // Generate coffee shop ambience with low murmur and occasional sounds
    for (let i = 0; i < left.length; i++) {
      let sample = (Math.random() - 0.5) * 0.03; // Base murmur
      
      // Add low-frequency rumble for background chatter
      const rumble = Math.sin(2 * Math.PI * (50 + Math.random() * 100) * i / sampleRate) * 0.02;
      sample += rumble;
      
      // Occasional coffee machine sounds
      if (Math.random() > 0.999) {
        const machine = Math.sin(2 * Math.PI * 150 * i / sampleRate) * 0.05;
        sample += machine;
      }
      
      left[i] = sample;
      right[i] = sample * (0.9 + Math.random() * 0.2);
    }
  }
  
  private generateBrownNoise(left: Float32Array, right: Float32Array) {
    // Generate brown noise (red noise) - lower frequencies emphasized
    let lastOut = 0;
    for (let i = 0; i < left.length; i++) {
      const white = (Math.random() - 0.5) * 2;
      const brown = (lastOut + (0.02 * white)) / 1.02;
      lastOut = brown;
      left[i] = brown * 0.3;
      right[i] = brown * 0.3;
    }
  }
  
  private generatePinkNoise(left: Float32Array, right: Float32Array) {
    // Generate pink noise using a simple approximation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < left.length; i++) {
      const white = Math.random() - 0.5;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
      left[i] = pink;
      right[i] = pink;
    }
  }
  
  // Set the selected sound (called from sounds component)
  setSelectedSound(id: number | null) {
    this.selectedSoundIdSignal.set(id);
  }
  
  // Start playing the selected sound (for timer)
  async startSound() {
    const soundId = this.selectedSoundIdSignal();
    if (!soundId || !this.audioContext || !this.gainNode) return;
    
    await this.resumeAudioContext();
    
    // Stop current sound if playing
    this.stopSound();
    
    const buffer = this.generateSoundBuffer(soundId, 3);
    if (!buffer) return;
    
    this.currentSource = this.audioContext.createBufferSource();
    this.currentSource.buffer = buffer;
    this.currentSource.loop = true;
    this.currentSource.connect(this.gainNode);
    
    this.currentSource.start();
    this.isPlayingSignal.set(true);
  }
  
  // Stop playing sound
  stopSound() {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (error) {
        // Ignore errors when stopping already stopped sources
      }
      this.currentSource.disconnect();
      this.currentSource = null;
    }
    this.isPlayingSignal.set(false);
  }
  
  // Preview sound (for sounds component)
  async playPreview(soundId: number): Promise<void> {
    if (!this.audioContext || !this.gainNode) return;
    
    await this.resumeAudioContext();
    
    // Stop current preview if playing
    this.stopPreview();
    
    const buffer = this.generateSoundBuffer(soundId, 2); // Shorter preview
    if (!buffer) return;
    
    const previewSource = this.audioContext.createBufferSource();
    previewSource.buffer = buffer;
    
    // Create separate gain node for preview with lower volume
    const previewGain = this.audioContext.createGain();
    previewGain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    
    previewSource.connect(previewGain);
    previewGain.connect(this.audioContext.destination);
    
    previewSource.start();
    this.previewSourceSignal.set(previewSource);
    
    // Auto-stop preview after buffer duration
    setTimeout(() => {
      if (this.previewSourceSignal() === previewSource) {
        this.stopPreview();
      }
    }, 2000);
  }
  
  // Stop preview sound
  stopPreview(): void {
    const previewSource = this.previewSourceSignal();
    if (previewSource) {
      try {
        previewSource.stop();
      } catch (error) {
        // Ignore errors when stopping already stopped sources
      }
      previewSource.disconnect();
      this.previewSourceSignal.set(null);
    }
  }
  
  // Check if preview is playing
  isPreviewPlaying(_soundId: number): boolean {
    return this.previewSourceSignal() !== null;
  }
  
  // Get selected sound name (for display purposes)
  getSelectedSoundName(): string {
    const soundId = this.selectedSoundIdSignal();
    if (!soundId) return '';
    
    const soundNames: Record<number, string> = {
      1: 'Rain',
      2: 'Ocean Waves', 
      3: 'Forest',
      4: 'Coffee Shop',
      5: 'Brown Noise',
      6: 'Pink Noise'
    };
    
    return soundNames[soundId] || '';
  }
}