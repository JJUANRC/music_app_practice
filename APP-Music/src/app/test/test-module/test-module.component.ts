import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-module',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-module.component.html',
  styleUrls: ['./test-module.component.css']
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