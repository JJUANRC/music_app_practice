import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAlbumService {
  private apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  getAlbum(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/albums/${id}`);
  }

  getAlbumTracks(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/albums/${id}/tracks`);
  }
}