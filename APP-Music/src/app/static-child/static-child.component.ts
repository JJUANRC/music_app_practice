import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../shared/services/player.service';
import { Track } from '../shared/interfaces/player.interface';

@Component({
  selector: 'app-static-child',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="playlist-container">
      <h2 class="playlist-title">Playlist Actual</h2>
      <div
        *ngFor="let track of playlist"
        (click)="selectTrack(track)"
        [class]="getTrackClass(track)"
      >
        <div class="track-content">
          <img [src]="track.image" [alt]="track.name" class="track-thumb" />
          <div class="track-info">
            <h3 class="track-info-name">{{ track.name }}</h3>
            <p class="track-info-artist">{{ track.artist }}</p>
            <p class="track-info-album">{{ track.album }}</p>
          </div>
        </div>
      </div>
      <p *ngIf="playlist.length === 0" class="empty-playlist">
        La playlist está vacía
      </p>
    </div>
  `,
  styles: [`
    .playlist-container {
      width: 320px;
      background-color: rgba(10, 25, 41, 0.5);
      border-left: 1px solid var(--blue-800);
      overflow-y: auto;
      padding: 16px;
    }

    .playlist-title {
      font-size: 20px;
      font-weight: bold;
      color: var(--blue-100);
      margin-bottom: 16px;
    }

    .track-item {
      padding: 12px;
      margin-bottom: 8px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .track-item-normal {
      background-color: rgba(26, 58, 82, 0.3);
      border: 1px solid var(--blue-800);
    }

    .track-item-normal:hover {
      background-color: rgba(26, 58, 82, 0.5);
    }

    .track-item-active {
      background-color: rgba(78, 157, 217, 0.5);
      border: 1px solid var(--blue-500);
    }

    .track-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .track-thumb {
      width: 48px;
      height: 48px;
      border-radius: 4px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .track-info {
      flex: 1;
      min-width: 0;
    }

    .track-info-name {
      color: var(--blue-100);
      font-weight: 500;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .track-info-artist {
      color: var(--blue-300);
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 1px;
    }

    .track-info-album {
      color: var(--blue-400);
      font-size: 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .empty-playlist {
      color: var(--blue-400);
      font-size: 14px;
      text-align: center;
      margin-top: 16px;
    }
  `]
})
export class StaticChildComponent implements OnInit {
  playlist: Track[] = [];
  currentTrack: Track | null = null;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.playerState$.subscribe(state => {
      this.playlist = state.playlist;
      this.currentTrack = state.currentTrack;
    });
  }

  selectTrack(track: Track): void {
    this.playerService.setCurrentTrack(track);
  }

  getTrackClass(track: Track): string {
    const baseClass = 'track-item ';
    return this.currentTrack?.id === track.id
      ? baseClass + 'track-item-active'
      : baseClass + 'track-item-normal';
  }
}