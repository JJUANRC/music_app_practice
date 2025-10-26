import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private tokenExpirationTime: number = 0;
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTokenFromStorage();
    this.startTokenRefreshTimer();
  }

  authenticate(): void {
    const authUrl = 'https://accounts.spotify.com/authorize';
    const params = new HttpParams()
      .set('client_id', environment.spotify.clientId)
      .set('response_type', 'token')
      .set('redirect_uri', environment.spotify.redirectUri)
      .set('scope', 'user-read-private user-read-email');

    window.location.href = `${authUrl}?${params.toString()}`;
  }

  getAccessToken(): string | null {
    // Si el token está expirado, obtener uno nuevo
    if (this.isTokenExpired()) {
      this.refreshToken();
      return null;
    }
    return this.tokenSubject.value;
  }

  setAccessToken(token: string, expiresIn: number = 3600): void {
    localStorage.setItem('spotify_token', token);
    // Guardar tiempo de expiración (en milisegundos)
    this.tokenExpirationTime = Date.now() + (expiresIn * 1000);
    localStorage.setItem('spotify_token_expiration', this.tokenExpirationTime.toString());
    this.tokenSubject.next(token);
  }

  private loadTokenFromStorage(): void {
    const token = localStorage.getItem('spotify_token');
    const expiration = localStorage.getItem('spotify_token_expiration');
    
    if (token && expiration) {
      this.tokenExpirationTime = parseInt(expiration);
      if (!this.isTokenExpired()) {
        this.tokenSubject.next(token);
      } else {
        this.clearToken();
      }
    }
  }

  private isTokenExpired(): boolean {
    // Verificar si el token expirará en los próximos 5 minutos
    return Date.now() >= (this.tokenExpirationTime - 300000);
  }

  private clearToken(): void {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_token_expiration');
    this.tokenSubject.next(null);
  }

  getClientCredentialsToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(environment.spotify.clientId + ':' + environment.spotify.clientSecret)
    });

    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post('https://accounts.spotify.com/api/token', body.toString(), { headers })
      .pipe(
        tap((response: any) => {
          this.setAccessToken(response.access_token, response.expires_in);
        })
      );
  }

  refreshToken(): void {
    console.log('Token expirado, obteniendo nuevo token...');
    this.getClientCredentialsToken().subscribe({
      next: () => console.log('Token actualizado exitosamente'),
      error: (err) => console.error('Error al actualizar token:', err)
    });
  }

  private startTokenRefreshTimer(): void {
    timer(0, 60000).pipe(
      switchMap(() => {
        if (this.isTokenExpired() && !this.tokenSubject.value) {
          return this.getClientCredentialsToken();
        }
        return [];
      })
    ).subscribe();
  }
}