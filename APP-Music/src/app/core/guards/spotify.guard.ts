import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyAuthService } from '../services/spotify-auth.service';

export const spotifyGuard = () => {
  const authService = inject(SpotifyAuthService);
  const router = inject(Router);

  if (authService.getAccessToken()) {
    return true;
  }

  authService.authenticate();
  return false;
};