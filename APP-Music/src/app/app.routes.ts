import { Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: SearchComponent },
      { path: 'search', component: SearchComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];