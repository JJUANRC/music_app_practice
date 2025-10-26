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
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
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