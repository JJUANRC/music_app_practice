import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyLoginService } from './services/spotify-api/spotify-login-service';
import { CookiesStorageService } from './services/general/cookies-storage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  constructor(
    private _spotifyLogin: SpotifyLoginService,
    private _cookieStorage: CookiesStorageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (!this._cookieStorage.exists('access_token') || !this._cookieStorage.isCookieValid('access_token')) {
      this._spotifyLogin.getAccessToken().subscribe();
    }
  }

  isSearchRoute(): boolean {
    return this.router.url.includes('/search');
  }
}