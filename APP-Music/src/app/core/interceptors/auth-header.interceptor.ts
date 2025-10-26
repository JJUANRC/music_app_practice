import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
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
    
    return next(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Token inválido, refrescando...');
          authService.refreshToken();
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};