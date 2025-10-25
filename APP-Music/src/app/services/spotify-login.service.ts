import { Injectable } from '@angular/core';
import { SpotifyAuthService } from '../core/services/spotify-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyLoginService {
  constructor(private authService: SpotifyAuthService) {}

  login(): void {
    this.authService.authenticate();
  }

  logout(): void {
    localStorage.removeItem('spotify_token');
    window.location.reload();
  }

  isAuthenticated(): boolean {
    return !!this.authService.getAccessToken();
  }
}