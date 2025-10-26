import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../shared/services/player.service';
import { Track } from '../shared/interfaces/player.interface';

@Component({
  selector: 'app-audio-controller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-controller.component.html',
  styleUrls: ['./audio-controller.component.css']
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