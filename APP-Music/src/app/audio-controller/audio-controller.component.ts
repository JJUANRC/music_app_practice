import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../shared/services/player.service';
import { Track } from '../shared/interfaces/player.interface';

@Component({
  selector: 'app-audio-controller',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="controller-container">
      <div class="controller-content">
        <button
          (click)="previous()"
          [disabled]="!currentTrack"
          class="control-btn control-btn-secondary"
        >
          <svg class="control-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>
        
        <button
          (click)="togglePlayPause()"
          [disabled]="!currentTrack"
          class="control-btn control-btn-primary"
        >
          <svg *ngIf="!isPlaying" class="control-icon control-icon-large" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg *ngIf="isPlaying" class="control-icon control-icon-large" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
        
        <button
          (click)="next()"
          [disabled]="!currentTrack"
          class="control-btn control-btn-secondary"
        >
          <svg class="control-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .controller-container {
      background-color: var(--blue-950);
      border-top: 1px solid var(--blue-800);
      padding: 16px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 50;
    }

    .controller-content {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
    }

    .control-btn {
      border-radius: 50%;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .control-btn-secondary {
      padding: 12px;
      background-color: var(--blue-800);
    }

    .control-btn-secondary:hover:not(:disabled) {
      background-color: var(--blue-700);
    }

    .control-btn-primary {
      padding: 16px;
      background-color: var(--blue-600);
    }

    .control-btn-primary:hover:not(:disabled) {
      background-color: var(--blue-500);
    }

    .control-icon {
      color: var(--blue-100);
      width: 24px;
      height: 24px;
    }

    .control-icon-large {
      width: 32px;
      height: 32px;
    }
  `]
})
export class AudioControllerComponent implements OnInit {
  currentTrack: Track | null = null;
  isPlaying: boolean = false;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.playerState$.subscribe(state => {
      this.currentTrack = state.currentTrack;
      this.isPlaying = state.isPlaying;
    });
  }

  togglePlayPause(): void {
    this.playerService.togglePlayPause();
  }

  next(): void {
    this.playerService.nextTrack();
  }

  previous(): void {
    this.playerService.previousTrack();
  }
}