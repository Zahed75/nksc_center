// shared/components/layout/header/header-component/header-component.ts
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  isResearchDropdownOpen = false;
  isMoreDropdownOpen = false;
  isMobile = false;
  private dropdownCloseTimer: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  // Core navigation items with PrimeNG icons
  navItems = [
    { name: 'Home', path: '/home', icon: 'pi pi-home' },
    { name: 'About', path: '/about', icon: 'pi pi-info-circle' },
    { name: 'Research', path: '/research', icon: 'pi pi-search', hasDropdown: true },
    { name: 'E-Library', path: '/elibrary', icon: 'pi pi-book' },
    { name: 'Gallery', path: '/gallery', icon: 'pi pi-images' }
  ];

  // Secondary items for "More" dropdown with PrimeNG icons
  moreNavItems = [
    { name: 'News', path: '/news', icon: 'pi pi-newspaper' },
    { name: 'Events', path: '/events', icon: 'pi pi-calendar' },
    { name: 'Collaboration', path: '/collaboration', icon: 'pi pi-users' },
    { name: 'Blogs', path: '/blogs', icon: 'pi pi-pencil' },
    { name: 'People', path: '/people', icon: 'pi pi-user' },
    { name: 'Publications', path: '/publications', icon: 'pi pi-file' },
    { name: 'Projects', path: '/projects', icon: 'pi pi-briefcase' }
  ];

  // Research sub-items with PrimeNG icons
  researchSubItems = [
    { name: 'Publications', path: '/research/publications', icon: 'pi pi-file' },
    { name: 'Research Projects', path: '/research/projects', icon: 'pi pi-briefcase' },
    { name: 'Methodologies', path: '/research/methodologies', icon: 'pi pi-cog' },
    { name: 'Case Studies', path: '/research/case-studies', icon: 'pi pi-chart-bar' }
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 1024;
    } else {
      this.isMobile = true;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.closeAllDropdowns();
    }
  }

  openResearchDropdown() {
    if (this.isMobile) return;
    
    if (this.dropdownCloseTimer) {
      clearTimeout(this.dropdownCloseTimer);
      this.dropdownCloseTimer = null;
    }
    
    this.isResearchDropdownOpen = true;
    this.isMoreDropdownOpen = false;
  }

  openMoreDropdown() {
    if (this.isMobile) return;
    
    if (this.dropdownCloseTimer) {
      clearTimeout(this.dropdownCloseTimer);
      this.dropdownCloseTimer = null;
    }
    
    this.isMoreDropdownOpen = true;
    this.isResearchDropdownOpen = false;
  }

  closeResearchDropdown() {
    if (this.isMobile) return;
    
    this.dropdownCloseTimer = setTimeout(() => {
      this.isResearchDropdownOpen = false;
      this.dropdownCloseTimer = null;
    }, 150);
  }

  closeMoreDropdown() {
    if (this.isMobile) return;
    
    this.dropdownCloseTimer = setTimeout(() => {
      this.isMoreDropdownOpen = false;
      this.dropdownCloseTimer = null;
    }, 150);
  }

  cancelClose() {
    if (this.dropdownCloseTimer) {
      clearTimeout(this.dropdownCloseTimer);
      this.dropdownCloseTimer = null;
    }
  }

  closeAllDropdowns() {
    if (this.dropdownCloseTimer) {
      clearTimeout(this.dropdownCloseTimer);
      this.dropdownCloseTimer = null;
    }
    this.isResearchDropdownOpen = false;
    this.isMoreDropdownOpen = false;
  }

  onNavItemClick() {
    this.isMenuOpen = false;
    this.closeAllDropdowns();
  }
}