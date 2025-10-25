import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  uri: string;
}

@Injectable({
  providedIn: 'root'
})
export class SongInfoService {
  private apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  searchTracks(query: string): Observable<Track[]> {
    const params = new HttpParams()
      .set('q', query)
      .set('type', 'track')
      .set('limit', '20');

    return this.http.get<any>(`${this.apiUrl}/search`, { params })
      .pipe(
        map(response => this.mapTracksFromResponse(response.tracks.items))
      );
  }

  getTrack(id: string): Observable<Track> {
    return this.http.get<any>(`${this.apiUrl}/tracks/${id}`)
      .pipe(
        map(track => this.mapTrack(track))
      );
  }

  private mapTracksFromResponse(items: any[]): Track[] {
    return items.map(item => this.mapTrack(item));
  }

  private mapTrack(item: any): Track {
    return {
      id: item.id,
      name: item.name,
      artist: item.artists.map((a: any) => a.name).join(', '),
      album: item.album.name,
      image: item.album.images[0]?.url || '',
      uri: item.uri
    };
  }
}