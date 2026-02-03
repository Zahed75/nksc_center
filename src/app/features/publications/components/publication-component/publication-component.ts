// publication-component.ts
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';

// Import the API service
import { ApiService, Journal, FilterParams } from '../../../../core/api/service/publication/journal-service';

@Component({
  selector: 'app-publication-component',
  standalone: true,
  imports: [FormsModule],
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

  // PDF State
  selectedPdf: Journal | null = null;
  isPdfModalOpen = false;
  isBrowser: boolean;

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

  // PDF View Methods - Simple and direct
  viewPdf(publication: Journal) {
    this.selectedPdf = publication;
    this.isPdfModalOpen = true;
  }

  closePdfModal() {
    this.isPdfModalOpen = false;
    this.selectedPdf = null;
  }

  // Open PDF in new tab (no iframe issues)
  openPdfInNewTab(publication: Journal) {
    if (this.isBrowser) {
      // Close modal first
      this.closePdfModal();

      // Open PDF in new tab
      window.open(publication.pdf_file, '_blank', 'noopener,noreferrer');
    }
  }

  // Download PDF
  downloadPdf(publication: Journal) {
    if (!this.isBrowser) return;

    const link = document.createElement('a');
    link.href = publication.pdf_file;
    link.download = this.generateFilename(publication);
    link.click();
  }

  // Generate a clean filename for download
  private generateFilename(publication: Journal): string {
    const title = publication.title
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .toLowerCase();

    return `${title}_volume_${publication.volume}_${publication.year}.pdf`;
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
    if (volume === '14') return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
    if (volume === '13') return 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white';
    if (volume === '12') return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';
    if (volume === '11') return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
    return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
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
    const size = parseFloat(mb);
    if (size < 1) {
      return `${(size * 1024).toFixed(0)} KB`;
    }
    return `${size.toFixed(1)} MB`;
  }

  // Get editor name (extract from editor string)
  getEditorName(editor: string): string {
    // Remove "Professor Dr." prefix for cleaner display
    return editor.replace('Professor Dr. ', 'Dr. ');
  }

  // Get short description
  getShortDescription(description: string): string {
    if (!description) return 'No description available';
    return description.length > 120 ? description.substring(0, 120) + '...' : description;
  }

  // Get truncated title
  getShortTitle(title: string): string {
    return title.length > 60 ? title.substring(0, 60) + '...' : title;
  }

  // Get publication year range
  getYearRange(): string {
    if (this.availableYears.length === 0) return '';
    if (this.availableYears.length === 1) return this.availableYears[0].toString();

    const oldest = this.availableYears[this.availableYears.length - 1];
    const newest = this.availableYears[0];
    return `${oldest} - ${newest}`;
  }

  // Add this method to your PublicationComponent class
handleImageError(event: any, publication: Journal): void {
  const imgElement = event.target;
  imgElement.style.display = 'none';

  // Create fallback preview
  const parent = imgElement.parentElement;
  if (parent) {
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full flex flex-col items-center justify-center p-6 text-center';
    fallbackDiv.innerHTML = `
      <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
        <i class="pi pi-book text-3xl text-white"></i>
      </div>
      <h4 class="text-xl font-bold text-gray-800 mb-2">Journal Preview</h4>
      <p class="text-sm text-gray-600 mb-1">Volume ${publication.volume}, Issue ${publication.issue}</p>
      <p class="text-xs text-gray-500">${publication.year}</p>
      <div class="mt-4 px-4 py-2 bg-white/90 backdrop-blur-sm text-blue-800 rounded-full text-xs font-medium border border-blue-200">
        ISSN: ${publication.issn}
      </div>
    `;

    // Add badges
    const volumeBadge = document.createElement('div');
    volumeBadge.className = 'absolute top-4 right-4';
    volumeBadge.innerHTML = `<span class="${this.getJournalBadge(publication.volume)} px-4 py-2 rounded-full text-sm font-bold shadow-lg">Vol. ${publication.volume}</span>`;

    const yearBadge = document.createElement('div');
    yearBadge.className = 'absolute top-4 left-4';
    yearBadge.innerHTML = `<span class="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-800 shadow-lg">${publication.year}</span>`;

    fallbackDiv.appendChild(volumeBadge);
    fallbackDiv.appendChild(yearBadge);
    parent.appendChild(fallbackDiv);
  }
}
}
