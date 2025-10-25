import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpotifyAuthService } from '../services/spotify-auth.service';

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(SpotifyAuthService);
  const token = authService.getAccessToken();

  if (token && req.url.includes('api.spotify.com')) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};