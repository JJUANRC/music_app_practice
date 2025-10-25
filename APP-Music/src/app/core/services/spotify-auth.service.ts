import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTokenFromStorage();
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
    return this.tokenSubject.value;
  }

  setAccessToken(token: string): void {
    localStorage.setItem('spotify_token', token);
    this.tokenSubject.next(token);
  }

  private loadTokenFromStorage(): void {
    const token = localStorage.getItem('spotify_token');
    if (token) {
      this.tokenSubject.next(token);
    }
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
          this.setAccessToken(response.access_token);
        })
      );
  }
}