import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-elibrary-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './elibrary-component.html',
  styleUrls: ['./elibrary-component.css']
})
export class ElibraryComponent {
  // Combined data: Original eLibrary items + Publications
  elibraryItems: any[] = [];

  // Search and filter states
  searchTerm = '';
  selectedCategory = '';
  selectedYear = '';
  selectedType = '';

  // PDF Preview State
  selectedPdf: any = null;
  isPdfViewerOpen = false;
  currentPdfPage = 1;
  totalPdfPages = 1;
  zoomLevel = 1.0;
  pdfSrc: SafeResourceUrl = '';
  isBrowser: boolean;

  // Available categories, years, and types (now including all categories)
  categories = [
    { value: 'sociology', label: 'Sociology' },
    { value: 'research', label: 'Research' },
    { value: 'theory', label: 'Theory' },
    { value: 'methodology', label: 'Methodology' },
    { value: 'development', label: 'Development' },
    { value: 'gender', label: 'Gender Studies' },
    { value: 'education', label: 'Education' },
    { value: 'politics', label: 'Politics' },
    { value: 'biography', label: 'Biography' },
    { value: 'journal', label: 'Journal' },
    { value: 'article', label: 'Article' }
  ];

  years = ['2024', '2023', '2022', '2021', '2020', '2019'];
  types = [
    { value: 'book', label: 'Book' },
    { value: 'journal', label: 'Journal' },
    { value: 'thesis', label: 'Thesis' },
    { value: 'article', label: 'Article' },
    { value: 'report', label: 'Report' },
    { value: 'research-paper', label: 'Research Paper' },
    { value: 'biography', label: 'Biography' }
  ];

  // Filtered items for display
  filteredItems = [...this.elibraryItems];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private sanitizer: DomSanitizer
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Apply filters
  applyFilters() {
    this.filteredItems = this.elibraryItems.filter(item => {
      const matchesSearch = !this.searchTerm ||
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = !this.selectedCategory || item.category === this.selectedCategory;
      const matchesYear = !this.selectedYear || item.year === this.selectedYear;
      const matchesType = !this.selectedType || item.type === this.selectedType;

      return matchesSearch && matchesCategory && matchesYear && matchesType;
    });
  }

  // Clear all filters
  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedYear = '';
    this.selectedType = '';
    this.filteredItems = [...this.elibraryItems];
  }

  // Get category color
  getCategoryColor(category: string): string {
    const colors = {
      'sociology': 'bg-blue-100 text-blue-800 border border-blue-200',
      'research': 'bg-green-100 text-green-800 border border-green-200',
      'theory': 'bg-purple-100 text-purple-800 border border-purple-200',
      'methodology': 'bg-orange-100 text-orange-800 border border-orange-200',
      'development': 'bg-teal-100 text-teal-800 border border-teal-200',
      'gender': 'bg-pink-100 text-pink-800 border border-pink-200',
      'education': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      'politics': 'bg-red-100 text-red-800 border border-red-200',
      'biography': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'journal': 'bg-cyan-100 text-cyan-800 border border-cyan-200',
      'article': 'bg-lime-100 text-lime-800 border border-lime-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Get type color
  getTypeColor(type: string): string {
    const colors = {
      'book': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      'journal': 'bg-red-100 text-red-800 border border-red-200',
      'thesis': 'bg-amber-100 text-amber-800 border border-amber-200',
      'article': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      'report': 'bg-cyan-100 text-cyan-800 border border-cyan-200',
      'research-paper': 'bg-violet-100 text-violet-800 border border-violet-200',
      'biography': 'bg-rose-100 text-rose-800 border border-rose-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Get category text
  getCategoryText(category: string): string {
    const texts = {
      'sociology': 'Sociology',
      'research': 'Research',
      'theory': 'Theory',
      'methodology': 'Methodology',
      'development': 'Development',
      'gender': 'Gender Studies',
      'education': 'Education',
      'politics': 'Politics',
      'biography': 'Biography',
      'journal': 'Journal',
      'article': 'Article'
    };
    return texts[category as keyof typeof texts] || category;
  }

  // Get type text
  getTypeText(type: string): string {
    const texts = {
      'book': 'Book',
      'journal': 'Journal',
      'thesis': 'Thesis',
      'article': 'Article',
      'report': 'Report',
      'research-paper': 'Research Paper',
      'biography': 'Biography'
    };
    return texts[type as keyof typeof texts] || type;
  }

  // PDF Preview Methods
  previewItem(item: any) {
    if (!this.isBrowser) {
      window.open(item.pdfUrl, '_blank');
      return;
    }

    this.selectedPdf = item;
    this.isPdfViewerOpen = true;
    this.currentPdfPage = 1;
    this.zoomLevel = 1.0;
    if (item.pdfUrl) {
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.pdfUrl);
    }
  }

  closePdfViewer() {
    this.isPdfViewerOpen = false;
    this.selectedPdf = null;
    this.pdfSrc = '';
  }

  downloadItem(item: any) {
    if (item.pdfUrl) {
      const link = document.createElement('a');
      link.href = item.pdfUrl;
      link.download = item.title + '.pdf';
      link.click();
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

  onPdfTotalPages(total: number) {
    this.totalPdfPages = total;
  }

  // Get total downloads
  getTotalDownloads(): number {
    return this.elibraryItems.reduce((total, item) => total + item.downloads, 0);
  }

  // Get count by type
  getCountByType(type: string): number {
    return this.elibraryItems.filter(item => item.type === type).length;
  }

  // Get featured items
  getFeaturedItems() {
    return this.elibraryItems.filter(item => item.isFeatured);
  }

  // Get migrated items count
  getMigratedItemsCount(): number {
    return this.elibraryItems.filter(item => item.migratedFrom === 'Publications').length;
  }
}