import { Component, OnInit, signal } from '@angular/core';
import { SpotifyLoginService } from './services/spotify-api/spotify-login-service';
import { SpotifyPlaylistService } from './services/spotify-api/spotify-playlist-service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('EXAMPLE_APP');

  constructor(
    private _spotifyLoginService: SpotifyLoginService,
    private _sporifyPlaylistService: SpotifyPlaylistService
  ) {}


  ngOnInit(): void {
  this._spotifyLoginService.getToken().subscribe({
    next: (tokenResponse) => {
      console.log("ESTE ES UN LOG DE CONTROL");
      const token = tokenResponse.access_token;
      this._sporifyPlaylistService.getPlaylist(token).subscribe({
        next: (response) => {
          console.log(response);
        }
      });
    }
  });
  }

}
