import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SpotifyAuthService } from '../services/spotify-auth.service';
import { ViewComponentComponent } from '../view-component/view-component.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ViewComponentComponent],
  template: `<app-view-component></app-view-component>`,
  styles: []
})
export class MainComponent implements OnInit {
  constructor(private authService: SpotifyAuthService) {}

  ngOnInit(): void {
    if (!this.authService.getAccessToken()) {
      this.authService.getClientCredentialsToken().subscribe();
    }
  }
}