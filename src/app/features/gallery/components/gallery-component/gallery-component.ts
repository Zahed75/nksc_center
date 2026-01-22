import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GalleryService, GalleryEvent, GalleryCategory, YearOption, StatsResponse } from '../../../../core/api/service/gallery/gallery-service';

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

  private subscriptions: Subscription = new Subscription();

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.loadGalleryData();
    this.checkScreenSize();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (window.innerWidth < 768) {
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
          this.calculatePagination();
          this.isLoading = false;
        } else {
          this.error = 'গ্যালারি লোড করতে সমস্যা হয়েছে';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading gallery:', error);
        this.error = 'গ্যালারি লোড করতে সমস্যা হয়েছে';
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

    // Add limit for pagination
    params.limit = this.itemsPerPage;

    const sub = this.galleryService.filterGallery(params).subscribe({
      next: (response) => {
        if (response.success) {
          this.filteredEvents = response.data;
          this.calculatePagination();
          this.isLoading = false;
        } else {
          this.error = 'ফিল্টার প্রয়োগ করতে সমস্যা হয়েছে';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error filtering gallery:', error);
        this.error = 'ফিল্টার প্রয়োগ করতে সমস্যা হয়েছে';
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
    this.filteredEvents = [...this.galleryEvents];
    this.currentPage = 1;
    this.calculatePagination();
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
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Get featured events
  getFeaturedEvents(): GalleryEvent[] {
    return this.galleryEvents.filter(event => event.is_featured);
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
    const imgElement = event.target;
    imgElement.style.display = 'none';

    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-gray-100';
    fallbackDiv.innerHTML = `
      <div class="text-center text-gray-400">
        <i class="pi pi-image text-3xl mb-2"></i>
        <p class="text-sm bangla-font">ছবি লোড হয়নি</p>
      </div>
    `;

    imgElement.parentNode.insertBefore(fallbackDiv, imgElement.nextSibling);
  }

  // Open lightbox
  openLightbox(event: GalleryEvent, imageIndex: number = 0): void {
    this.selectedEvent = event;
    this.currentImageIndex = imageIndex;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  closeLightbox(): void {
    this.isLightboxOpen = false;
    this.selectedEvent = null;
    this.currentImageIndex = 0;
    document.body.style.overflow = 'auto';
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
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Get short description
  getShortDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

  // Get total events count
  getTotalEvents(): number {
    return this.galleryEvents.length;
  }

  // Get category name
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name_display : 'অন্যান্য';
  }

  // Get events by category
  getEventsByCategory(categorySlug: string): number {
    if (categorySlug === 'all') return this.galleryEvents.length;
    return this.galleryEvents.filter(event =>
      this.categories.find(cat => cat.slug === categorySlug)?.id === event.category
    ).length;
  }

  // Generate image grid
  generateImageGrid(totalImages: number): string[] {
    // This is a placeholder for actual images
    // In a real implementation, you would fetch actual image URLs
    const placeholderImages = [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ];

    return Array(Math.min(totalImages, 4)).fill('').map((_, i) => placeholderImages[i % 4]);
  }
}
