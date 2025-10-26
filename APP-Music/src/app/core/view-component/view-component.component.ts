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
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.css']
})
export class ViewComponentComponent {}