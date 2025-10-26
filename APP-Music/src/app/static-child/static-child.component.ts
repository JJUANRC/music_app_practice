import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../shared/services/player.service';
import { Track } from '../shared/interfaces/player.interface';

@Component({
  selector: 'app-static-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './static-child.component.html',
  styleUrls: ['./static-child.component.css']
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