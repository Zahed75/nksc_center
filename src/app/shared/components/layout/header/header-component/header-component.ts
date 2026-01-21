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
  isMoreDropdownOpen = false;
  isMoreMobileOpen = false; // Add this for mobile More toggle
  isMobile = false;
  private dropdownCloseTimer: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  // Core navigation items with PrimeNG icons
  navItems = [
    { name: 'Home', path: '/home', icon: 'pi pi-home' },
    { name: 'About', path: '/about', icon: 'pi pi-info-circle' },
    { name: 'Publications', path: '/publications', icon: 'pi pi-file' },
    { name: 'E-Library', path: '/elibrary', icon: 'pi pi-book' },
    { name: 'Gallery', path: '/gallery', icon: 'pi pi-images' },
    { name: 'News', path: '/news', icon: 'pi pi-newspaper' }
  ];


  // Secondary items for "More" dropdown with PrimeNG icons

  // Secondary items for "More" dropdown with PrimeNG icons (Removed Blogs and Projects)

  moreNavItems = [
    { name: 'People', path: '/people', icon: 'pi pi-user' },
    { name: 'Events', path: '/events', icon: 'pi pi-calendar' },


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
      this.isMoreMobileOpen = false; // Reset mobile more toggle when menu opens
    }
  }

  openMoreDropdown() {
    if (this.isMobile) return;

    if (this.dropdownCloseTimer) {
      clearTimeout(this.dropdownCloseTimer);
      this.dropdownCloseTimer = null;
    }

    this.isMoreDropdownOpen = true;
  }

  closeMoreDropdown() {
    if (this.isMobile) return;

    this.dropdownCloseTimer = setTimeout(() => {
      this.isMoreDropdownOpen = false;
      this.dropdownCloseTimer = null;
    }, 150);
  }

  // Add toggle for mobile More section
  toggleMoreMobile() {
    this.isMoreMobileOpen = !this.isMoreMobileOpen;
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
    this.isMoreDropdownOpen = false;
  }

  onNavItemClick() {
    this.isMenuOpen = false;
    this.isMoreMobileOpen = false; // Close mobile More when any nav item is clicked
    this.closeAllDropdowns();
  }
}
