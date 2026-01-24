import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  GalleryService,
  GalleryEvent,
  GalleryCategory,
  YearOption,
  StatsResponse
} from '../../../../core/api/service//gallery/gallery-service';

@Component({
  selector: 'app-gallery-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery-component.html',
  styleUrls: ['./gallery-component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  // Gallery data from API
  galleryEvents: GalleryEvent[] = [];
  filteredEvents: GalleryEvent[] = [];

  // Categories and years from API
  categories: GalleryCategory[] = [];
  years: YearOption[] = [];

  // Filter states
  selectedCategory = 'all';
  selectedYear: number | null = null;
  searchTerm = '';
  viewMode: 'grid' | 'masonry' = 'grid';
  sortBy: 'latest' | 'popular' | 'featured' = 'latest';

  // Loading and error states
  isLoading = false;
  error: string | null = null;
  stats: StatsResponse['stats'] | null = null;

  // Lightbox state
  selectedEvent: GalleryEvent | null = null;
  currentImageIndex = 0;
  isLightboxOpen = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;
  totalItems = 0;

  // Event images cache
  private eventImagesCache: Map<number, string[]> = new Map();

  // SSR compatibility
  private isBrowser: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private galleryService: GalleryService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.loadGalleryData();
    if (this.isBrowser) {
      this.checkScreenSize();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.checkScreenSize();
    }
  }

  private checkScreenSize() {
    if (this.isBrowser && window.innerWidth < 768) {
      this.viewMode = 'grid';
    }
  }

  // Load all gallery data
  loadGalleryData(): void {
    this.isLoading = true;
    this.error = null;

    // Load categories
    const categoriesSub = this.galleryService.getGalleryCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });

    // Load years
    const yearsSub = this.galleryService.getGalleryYears().subscribe({
      next: (response) => {
        if (response.success) {
          this.years = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading years:', error);
      }
    });

    // Load stats
    const statsSub = this.galleryService.getGalleryStats().subscribe({
      next: (response) => {
        if (response.success) {
          this.stats = response.stats;
        }
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });

    // Load all gallery events
    const gallerySub = this.galleryService.getAllGallery().subscribe({
      next: (response) => {
        if (response.success) {
          this.galleryEvents = response.data;
          this.filteredEvents = [...this.galleryEvents];
          this.totalItems = response.count;
          this.calculatePagination();
          this.isLoading = false;
        } else {
          this.error = 'Failed to load gallery';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading gallery:', error);
        this.error = 'Failed to load gallery';
        this.isLoading = false;
      }
    });

    this.subscriptions.add(categoriesSub);
    this.subscriptions.add(yearsSub);
    this.subscriptions.add(statsSub);
    this.subscriptions.add(gallerySub);
  }

  // Apply filters using API
  applyFilters(): void {
    this.isLoading = true;
    this.currentPage = 1;

    const params: any = {};

    // Add search parameter
    if (this.searchTerm.trim()) {
      params.search = this.searchTerm;
    }

    // Add category filter
    if (this.selectedCategory !== 'all') {
      params.category = this.selectedCategory;
    }

    // Add year filter
    if (this.selectedYear) {
      params.year = this.selectedYear;
    }

    // Add featured filter if sorting by featured
    if (this.sortBy === 'featured') {
      params.featured = true;
    }

    // Add pagination parameters
    params.page = this.currentPage;
    params.limit = this.itemsPerPage;

    const sub = this.galleryService.filterGallery(params).subscribe({
      next: (response) => {
        if (response.success) {
          this.filteredEvents = response.data;
          this.totalItems = response.count;
          this.calculatePagination();
          this.isLoading = false;
        } else {
          this.error = 'Failed to apply filters';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error filtering gallery:', error);
        this.error = 'Failed to apply filters';
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  // Clear all filters
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedYear = null;
    this.sortBy = 'latest';
    this.currentPage = 1;
    this.loadGalleryData();
  }

  // Sort events
  sortEvents(): void {
    switch (this.sortBy) {
      case 'latest':
        this.filteredEvents.sort((a, b) =>
          new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
        );
        break;
      case 'popular':
        this.filteredEvents.sort((a, b) => b.views_count - a.views_count);
        break;
      case 'featured':
        this.filteredEvents = this.filteredEvents.filter(event => event.is_featured);
        break;
    }
    this.currentPage = 1;
    this.calculatePagination();
  }

  // Calculate pagination
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Get paginated events
  getPaginatedEvents(): GalleryEvent[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEvents.slice(startIndex, endIndex);
  }

  // Change page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
      if (this.isBrowser) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  // Get featured events
  getFeaturedEvents(): GalleryEvent[] {
    return this.galleryEvents.filter(event => event.is_featured).slice(0, 4);
  }

  // Get category color
  getCategoryColor(category: GalleryCategory): string {
    const colorMap: Record<string, string> = {
      'blue': 'bg-blue-100 text-blue-800 border border-blue-200',
      'green': 'bg-green-100 text-green-800 border border-green-200',
      'purple': 'bg-purple-100 text-purple-800 border border-purple-200',
      'orange': 'bg-orange-100 text-orange-800 border border-orange-200',
      'red': 'bg-red-100 text-red-800 border border-red-200',
      'pink': 'bg-pink-100 text-pink-800 border border-pink-200',
      'teal': 'bg-teal-100 text-teal-800 border border-teal-200',
      'indigo': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
    };

    return colorMap[category.color] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Get category icon
  getCategoryIcon(category: GalleryCategory): string {
    return category.icon || 'pi-images';
  }

  // Handle image error
  handleImageError(event: any): void {
    if (!this.isBrowser) return;

    const imgElement = event.target;
    imgElement.style.display = 'none';

    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-gray-100';
    fallbackDiv.innerHTML = `
      <div class="text-center text-gray-400">
        <i class="pi pi-image text-3xl mb-2"></i>
        <p class="text-sm">Image failed to load</p>
      </div>
    `;

    imgElement.parentNode.insertBefore(fallbackDiv, imgElement.nextSibling);
  }

  // Open lightbox
  openLightbox(event: GalleryEvent, imageIndex: number = 0): void {
    this.selectedEvent = event;
    this.currentImageIndex = imageIndex;
    this.isLightboxOpen = true;

    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }

    // Load event images when opening lightbox
    if (event.id && !this.eventImagesCache.has(event.id)) {
      this.loadEventImages(event.id);
    }
  }

  // Load event images
  private loadEventImages(eventId: number): void {
    this.galleryService.getEventImages(eventId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.eventImagesCache.set(eventId, response.data);
        }
      },
      error: (error) => {
        console.error('Error loading event images:', error);
      }
    });
  }

  // Get event images
  getEventImages(eventId: number): string[] {
    return this.eventImagesCache.get(eventId) || [];
  }

  // Close lightbox
  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.selectedEvent = null;
    this.currentImageIndex = 0;

    if (this.isBrowser) {
      document.body.style.overflow = 'auto';
    }
  }

  // Navigate to next image
  nextImage(): void {
    if (this.selectedEvent && this.currentImageIndex < this.selectedEvent.total_images - 1) {
      this.currentImageIndex++;
    }
  }

  // Navigate to previous image
  previousImage(): void {
    if (this.selectedEvent && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  // Format date
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  }

  // Get short description
  getShortDescription(description: string): string {
    if (!description) return '';
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

  // Get total events count
  getTotalEvents(): number {
    return this.stats?.total_events || this.galleryEvents.length;
  }

  // Get category name
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name_display : 'Other';
  }

  // Get events by category
  getEventsByCategory(categorySlug: string): number {
    if (categorySlug === 'all') return this.galleryEvents.length;
    return this.galleryEvents.filter(event =>
      this.categories.find(cat => cat.slug === categorySlug)?.id === event.category
    ).length;
  }

  // Get events by year
  getEventsByYear(year: number): number {
    return this.galleryEvents.filter(event => event.year === year).length;
  }

  // View event details
  viewEventDetails(slug: string): void {
    this.galleryService.getEventBySlug(slug).subscribe({
      next: (response) => {
        console.log('Event details:', response);
      },
      error: (error) => {
        console.error('Error loading event details:', error);
      }
    });
  }

  // Load more events
  loadMoreEvents(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  // Refresh gallery data
  refreshGallery(): void {
    this.loadGalleryData();
  }

  // Handle search
  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  // Get category statistics
  getCategoryStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    this.categories.forEach(category => {
      stats[category.slug] = this.getEventsByCategory(category.slug);
    });
    return stats;
  }

  // Get year statistics
  getYearStats(): Record<number, number> {
    const stats: Record<number, number> = {};
    this.years.forEach(year => {
      stats[year.value] = this.getEventsByYear(year.value);
    });
    return stats;
  }
}
