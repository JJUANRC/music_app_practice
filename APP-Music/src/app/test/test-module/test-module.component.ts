import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-module',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <nav class="navbar">
      <div class="navbar-content">
        <svg class="logo-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
        <div class="search-container">
          <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            class="search-input"
            placeholder="Buscar canciones, artistas o álbumes..."
            [(ngModel)]="searchQuery"
            (input)="onSearchChange()"
          />
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: var(--blue-950);
      border-bottom: 1px solid var(--blue-800);
      padding: 16px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
    }

    .navbar-content {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .logo-icon {
      color: var(--blue-400);
      width: 28px;
      height: 28px;
      flex-shrink: 0;
    }

    .search-container {
      flex: 1;
      position: relative;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--blue-400);
      width: 20px;
      height: 20px;
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      background-color: var(--blue-900);
      color: var(--blue-100);
      padding: 10px 16px 10px 40px;
      border-radius: 50px;
      border: 1px solid var(--blue-700);
      font-size: 14px;
      transition: border-color 0.2s;
    }

    .search-input::placeholder {
      color: var(--blue-400);
    }

    .search-input:focus {
      border-color: var(--blue-500);
    }
  `]
})
export class TestModuleComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  onSearchChange(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchQuery } 
      });
    } else {
      this.router.navigate(['/home']);
    }
  }
}