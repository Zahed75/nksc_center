// shared/components/layout/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Add this import

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Add RouterModule here
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  
  navItems = [
    { name: 'Home', path: '/home', icon: '🏠' },
    { name: 'Publications', path: '/publications', icon: '📚' },
    { name: 'E-Library', path: '/elibrary', icon: '💻' },
    { name: 'Staff', path: '/staff', icon: '👨‍🏫' },
    { name: 'Gallery', path: '/gallery', icon: '🖼️' },
    { name: 'About', path: '/about', icon: '🏛️' }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}