import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';

// Import the API service
import { ApiService, Journal, FilterParams } from '../../../../core/api/service/publication/journal-service';

@Component({
  selector: 'app-publication-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publication-component.html',
  styleUrls: ['./publication-component.css']
})
export class PublicationComponent implements OnInit, OnDestroy {
  // Publications data from API
  publications: Journal[] = [];
  filteredPublications: Journal[] = [];

  // Search and filter states
  searchTerm = '';
  selectedCategory = '';
  selectedYear: string = '';

  // Loading state
  isLoading = false;

  // Available years for filter dropdown
  availableYears: number[] = [];

  // PDF Preview State
  selectedPdf: Journal | null = null;
  isPdfViewerOpen = false;
  currentPdfPage = 1;
  totalPdfPages = 1;
  zoomLevel = 1.0;
  pdfSrc: SafeResourceUrl = '';
  isBrowser: boolean;
  isFullscreen = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private sanitizer: DomSanitizer,
    private apiService: ApiService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.loadAllJournals();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // Load all journals from API
  loadAllJournals() {
    this.isLoading = true;

    const sub = this.apiService.getAllJournals().subscribe({
      next: (response) => {
        if (response.code === 200) {
          this.publications = response.data;
          this.filteredPublications = response.data;

          // Extract unique years for filter dropdown
          this.availableYears = this.extractUniqueYears(response.data);

          this.isLoading = false;
        } else {
          console.error('Failed to load journals:', response.message);
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading journals:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  // Filter journals using API
  filterJournals() {
    this.isLoading = true;

    const params: FilterParams = {};

    // Add search parameter
    if (this.searchTerm.trim()) {
      params.search = this.searchTerm;
    }

    // Add year filter
    if (this.selectedYear) {
      const year = parseInt(this.selectedYear, 10);
      params.year_from = year;
      params.year_to = year;
    }

    // Get all results
    params.all = true;

    const sub = this.apiService.filterJournals(params).subscribe({
      next: (response) => {
        if (response.code === 200) {
          this.filteredPublications = response.data;
          this.isLoading = false;
        } else {
          console.error('Failed to filter journals:', response.message);
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error filtering journals:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  // Extract unique years from journals
  private extractUniqueYears(journals: Journal[]): number[] {
    const years = journals.map(journal => journal.year);
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a); // Sort descending
    return uniqueYears;
  }

  // Search functionality
  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  // Filter by category (Note: Your API doesn't have categories, but keeping for UI consistency)
  onCategoryFilter(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // Filter by year
  onYearFilter(year: string) {
    this.selectedYear = year;
    this.applyFilters();
  }

  // Apply all filters
  applyFilters() {
    if (this.searchTerm || this.selectedYear) {
      // Use API filtering
      this.filterJournals();
    } else {
      // Reset to all publications
      this.filteredPublications = [...this.publications];
    }
  }

  // Clear all filters
  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedYear = '';
    this.filteredPublications = [...this.publications];
  }

  // PDF Preview Methods
  openPdfViewer(publication: Journal) {
    if (!this.isBrowser) {
      window.open(publication.pdf_file, '_blank');
      return;
    }

    this.selectedPdf = publication;
    this.isPdfViewerOpen = true;
    this.currentPdfPage = 1;
    this.zoomLevel = 1.0;
    this.isFullscreen = false;

    // Sanitize the PDF URL for iframe
    const pdfUrl = publication.pdf_file;
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl + '#toolbar=0&navpanes=0');

    // Prevent body scroll when PDF viewer is open
    document.body.style.overflow = 'hidden';
  }

  closePdfViewer() {
    this.isPdfViewerOpen = false;
    this.selectedPdf = null;
    this.pdfSrc = '';
    this.isFullscreen = false;

    // Restore body scroll
    document.body.style.overflow = '';
  }

  // Fullscreen functionality
  openFullscreen() {
    const elem = document.documentElement;
    if (!this.isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      }
      this.isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      this.isFullscreen = false;
    }
  }

  nextPage() {
    if (this.currentPdfPage < this.totalPdfPages) {
      this.currentPdfPage++;
    }
  }

  previousPage() {
    if (this.currentPdfPage > 1) {
      this.currentPdfPage--;
    }
  }

  zoomIn() {
    if (this.zoomLevel < 2.0) {
      this.zoomLevel += 0.1;
    }
  }

  zoomOut() {
    if (this.zoomLevel > 0.5) {
      this.zoomLevel -= 0.1;
    }
  }

  resetZoom() {
    this.zoomLevel = 1.0;
  }

  downloadPdf(publication: Journal) {
    if (!this.isBrowser) return;

    const link = document.createElement('a');
    link.href = publication.pdf_file;
    link.download = publication.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
    link.click();
  }

  // Helper methods for template
  getCategoryColor(category: string): string {
    const colors = {
      'journal': 'bg-blue-100 text-blue-800 border border-blue-200',
      'research': 'bg-green-100 text-green-800 border border-green-200',
      'article': 'bg-orange-100 text-orange-800 border border-orange-200',
      'biography': 'bg-purple-100 text-purple-800 border border-purple-200'
    };
    return colors[category as keyof typeof colors] || 'bg-blue-100 text-blue-800 border border-blue-200';
  }

  getCategoryText(category: string): string {
    const texts = {
      'journal': 'Journal',
      'research': 'Research Paper',
      'article': 'Article',
      'biography': 'Biography'
    };
    return texts[category as keyof typeof texts] || 'Journal';
  }

  // Get journal badge based on volume
  getJournalBadge(volume: string): string {
    if (volume === '14') return 'bg-red-100 text-red-800 border border-red-200';
    if (volume === '13') return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
    return 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Get journal badge text
  getJournalBadgeText(volume: string): string {
    return `Volume ${volume}`;
  }

  // Get count of publications by year
  getPublicationsCountByYear(year: string): number {
    return this.publications.filter(p => p.year.toString() === year).length;
  }

  // Get latest year publications count
  getLatestPublicationsCount(): number {
    if (this.availableYears.length === 0) return 0;
    const latestYear = this.availableYears[0];
    return this.getPublicationsCountByYear(latestYear.toString());
  }

  // Format file size
  formatFileSize(mb: string): string {
    return `${mb} MB`;
  }

  // Get editor name (extract from editor string)
  getEditorName(editor: string): string {
    // Remove "Professor Dr." prefix for cleaner display
    return editor.replace('Professor Dr. ', '');
  }

  // Get short description
  getShortDescription(description: string): string {
    return description.length > 150 ? description.substring(0, 150) + '...' : description;
  }
}
