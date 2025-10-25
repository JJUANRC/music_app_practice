import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SongInfoService, Track } from '../../services/song-info.service';
import { PlayerService } from '../../shared/services/player.service';
import { StaticChildComponent } from '../../static-child/static-child.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, StaticChildComponent],
  template: `
    <div class="search-container">
      <div class="main-content">
        <div *ngIf="isSearching; else currentTrackView">
          <h2 class="search-title">Resultados de búsqueda</h2>
          <div class="results-grid">
            <div
              *ngFor="let track of searchResults"
              (click)="selectTrack(track)"
              class="track-card"
            >
              <img [src]="track.image" [alt]="track.name" class="track-image" />
              <h3 class="track-name">{{ track.name }}</h3>
              <p class="track-artist">{{ track.artist }}</p>
              <p class="track-album">{{ track.album }}</p>
            </div>
          </div>
          <p *ngIf="searchResults.length === 0 && searchQuery" class="no-results">
            No se encontraron resultados
          </p>
        </div>

        <ng-template #currentTrackView>
          <div class="current-track-container">
            <div *ngIf="currentTrack; else noTrack" class="current-track">
              <img 
                [src]="currentTrack.image" 
                [alt]="currentTrack.name"
                class="current-track-image"
              />
              <h1 class="current-track-name">{{ currentTrack.name }}</h1>
              <p class="current-track-artist">{{ currentTrack.artist }}</p>
              <p class="current-track-album">{{ currentTrack.album }}</p>
            </div>
            <ng-template #noTrack>
              <div class="no-track">
                <svg class="no-track-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                <p>Selecciona una canción para comenzar</p>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>

      <app-static-child></app-static-child>
    </div>
  `,
  styles: [`
    .search-container {
      display: flex;
      height: 100%;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: 0 16px 16px 16px;
    }

    .search-title {
      font-size: 24px;
      font-weight: bold;
      color: var(--blue-100);
      margin-bottom: 16px;
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }

    .track-card {
      background-color: rgba(26, 58, 82, 0.5);
      padding: 16px;
      border-radius: 12px;
      border: 1px solid var(--blue-700);
      cursor: pointer;
      transition: all 0.3s;
    }

    .track-card:hover {
      background-color: rgba(26, 58, 82, 0.7);
      transform: translateY(-2px);
    }

    .track-image {
      width: 100%;
      height: 192px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .track-name {
      color: var(--blue-100);
      font-weight: 600;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 4px;
    }

    .track-artist {
      color: var(--blue-300);
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 2px;
    }

    .track-album {
      color: var(--blue-400);
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .no-results {
      color: var(--blue-300);
      text-align: center;
      margin-top: 32px;
      font-size: 16px;
    }

    .current-track-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 32px;
    }

    .current-track {
      text-align: center;
      max-width: 500px;
    }

    .current-track-image {
      width: 320px;
      height: 320px;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
      margin: 0 auto 24px;
    }

    .current-track-name {
      font-size: 36px;
      font-weight: bold;
      color: var(--blue-100);
      margin-bottom: 8px;
    }

    .current-track-artist {
      font-size: 24px;
      color: var(--blue-300);
      margin-bottom: 4px;
    }

    .current-track-album {
      font-size: 20px;
      color: var(--blue-400);
    }

    .no-track {
      text-align: center;
      color: var(--blue-300);
    }

    .no-track-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 16px;
      opacity: 0.5;
    }

    .no-track p {
      font-size: 20px;
    }
  `]
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Track[] = [];
  isSearching: boolean = false;
  currentTrack: Track | null = null;

  constructor(
    private route: ActivatedRoute,
    private songInfoService: SongInfoService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      if (this.searchQuery) {
        this.performSearch();
      } else {
        this.isSearching = false;
        this.searchResults = [];
      }
    });

    this.playerService.playerState$.subscribe(state => {
      this.currentTrack = state.currentTrack;
    });
  }

  performSearch(): void {
    this.isSearching = true;
    this.songInfoService.searchTracks(this.searchQuery).subscribe({
      next: (tracks) => {
        this.searchResults = tracks;
      },
      error: (error) => {
        console.error('Error searching tracks:', error);
        this.searchResults = [];
      }
    });
  }

  selectTrack(track: Track): void {
    this.playerService.setCurrentTrack(track);
    this.isSearching = false;
  }
}