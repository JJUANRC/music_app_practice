import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestModuleComponent } from '../../test/test-module/test-module.component';
import { AudioControllerComponent } from '../../audio-controller/audio-controller.component';

@Component({
  selector: 'app-view-component',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    TestModuleComponent,
    AudioControllerComponent
  ],
  template: `
    <div class="app-container">
      <app-test-module></app-test-module>
      <div class="content-area">
        <router-outlet></router-outlet>
      </div>
      <app-audio-controller></app-audio-controller>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, var(--blue-950) 0%, var(--blue-900) 50%, var(--blue-800) 100%);
    }

    .content-area {
      flex: 1;
      margin-top: 80px;
      margin-bottom: 96px;
      overflow: hidden;
    }
  `]
})
export class ViewComponentComponent {}