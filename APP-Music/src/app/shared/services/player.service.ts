import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track, PlayerState } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playerState: PlayerState = {
    currentTrack: null,
    isPlaying: false,
    playlist: []
  };

  private playerStateSubject = new BehaviorSubject<PlayerState>(this.playerState);
  public playerState$: Observable<PlayerState> = this.playerStateSubject.asObservable();

  setCurrentTrack(track: Track): void {
    this.playerState.currentTrack = track;
    this.playerState.isPlaying = true;
    
    if (!this.playerState.playlist.find(t => t.id === track.id)) {
      this.playerState.playlist.push(track);
    }
    
    this.playerStateSubject.next(this.playerState);
  }

  togglePlayPause(): void {
    this.playerState.isPlaying = !this.playerState.isPlaying;
    this.playerStateSubject.next(this.playerState);
  }

  nextTrack(): void {
    if (this.playerState.playlist.length > 0 && this.playerState.currentTrack) {
      const currentIndex = this.playerState.playlist.findIndex(
        t => t.id === this.playerState.currentTrack!.id
      );
      const nextIndex = (currentIndex + 1) % this.playerState.playlist.length;
      this.playerState.currentTrack = this.playerState.playlist[nextIndex];
      this.playerState.isPlaying = true;
      this.playerStateSubject.next(this.playerState);
    }
  }

  previousTrack(): void {
    if (this.playerState.playlist.length > 0 && this.playerState.currentTrack) {
      const currentIndex = this.playerState.playlist.findIndex(
        t => t.id === this.playerState.currentTrack!.id
      );
      const prevIndex = currentIndex === 0 
        ? this.playerState.playlist.length - 1 
        : currentIndex - 1;
      this.playerState.currentTrack = this.playerState.playlist[prevIndex];
      this.playerState.isPlaying = true;
      this.playerStateSubject.next(this.playerState);
    }
  }

  getPlayerState(): PlayerState {
    return this.playerState;
  }
}