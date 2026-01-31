import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { GalleryService, GalleryEvent, GalleryCategory, YearOption, StatsResponse, FilterParams } from '../../../../core/api/service/gallery/gallery-service';

@Component({
  selector: 'app-gallery-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gallery-component.html',
  styleUrls: ['./gallery-component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  // Gallery data
  galleryEvents: GalleryEvent[] = [];
  filteredEvents: GalleryEvent[] = [];
  categories: GalleryCategory[] = [];
  years: YearOption[] = [];
  stats: StatsResponse['stats'] | null = null;

  // Filter states
  selectedCategory: number | 'all' = 'all';
  selectedYear: number | 'all' = 'all';
  searchQuery = '';
  viewMode: 'grid' | 'list' | 'masonry' = 'grid';

  // Loading states
  isLoading = true;
  isFiltering = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 12;
  totalItems = 0;
  totalPages = 1;

  // Mobile - Initialize with safe default
  isMobile = false;
  showFilters = false;
  private isBrowser: boolean;

  // Search
  private searchSubject = new Subject<string>();

  private subscriptions: Subscription = new Subscription();

  constructor(
    private galleryService: GalleryService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeMobileCheck();
  }

  ngOnInit() {
    this.setupSearch();
    this.loadInitialData();

    this.subscriptions.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(query => {
        this.searchQuery = query;
        this.applyFilters();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initializeMobileCheck() {
    // Only check if we're in the browser
    if (this.isBrowser) {
      this.checkMobile();
    } else {
      // Default to false for SSR
      this.isMobile = false;
    }
  }

  @HostListener('window:resize')
  checkMobile() {
    // Only run in browser environment
    if (this.isBrowser && typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768;
    }
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuery = query;
      this.applyFilters();
    });
  }

  loadInitialData() {
    this.isLoading = true;

    // Load categories
    this.subscriptions.add(
      this.galleryService.getGalleryCategories().subscribe({
        next: (response) => {
          if (response.success) {
            this.categories = response.data;
          }
        },
        error: (error) => console.error('Error loading categories:', error)
      })
    );

    // Load years
    this.subscriptions.add(
      this.galleryService.getGalleryYears().subscribe({
        next: (response) => {
          if (response.success) {
            this.years = response.data;
          }
        },
        error: (error) => console.error('Error loading years:', error)
      })
    );

    // Load stats
    this.subscriptions.add(
      this.galleryService.getGalleryStats().subscribe({
        next: (response) => {
          if (response.success) {
            this.stats = response.stats;
          }
        },
        error: (error) => console.error('Error loading stats:', error)
      })
    );

    // Load gallery events
    this.subscriptions.add(
      this.galleryService.getAllGallery().subscribe({
        next: (response) => {
          if (response.success) {
            this.galleryEvents = response.data;
            this.filteredEvents = [...response.data];
            this.totalItems = response.count;
            this.calculatePagination();
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Error loading gallery:', error);
          this.isLoading = false;
        }
      })
    );
  }

  applyFilters() {
    this.isFiltering = true;

    let filtered = [...this.galleryEvents];

    // Apply category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === this.selectedCategory);
    }

    // Apply year filter
    if (this.selectedYear !== 'all') {
      filtered = filtered.filter(event => new Date(event.event_date).getFullYear() === this.selectedYear);
    }

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        (event.category_detail && event.category_detail.name_display.toLowerCase().includes(query))
      );
    }

    this.filteredEvents = filtered;
    this.totalItems = filtered.length;
    this.currentPage = 1;
    this.calculatePagination();

    setTimeout(() => this.isFiltering = false, 300);
  }

  clearFilters() {
    this.selectedCategory = 'all';
    this.selectedYear = 'all';
    this.searchQuery = '';
    this.applyFilters();
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedEvents(): GalleryEvent[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEvents.slice(start, end);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.scrollToTop();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.scrollToTop();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.scrollToTop();
    }
  }

  scrollToTop() {
    // Only scroll in browser environment
    if (this.isBrowser && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name_display : 'Other';
  }

  getCategoryColor(categoryId: number): string {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500',
      'bg-pink-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-red-500'
    ];
    return colors[categoryId % colors.length];
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  truncateText(text: string, maxLength: number = 100): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  navigateToEvent(slug: string) {
    this.router.navigate(['/gallery', slug]);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxVisible = 5;

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(this.totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = end - maxVisible + 1;
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }

    return pages;
  }
}
