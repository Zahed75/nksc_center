import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-publication-component',
  imports: [CommonModule, FormsModule], // Removed RouterLink
  templateUrl: './publication-component.html',
  styleUrls: ['./publication-component.css']
})
export class PublicationComponent {
  // Publications data
  publications = [
    {
      id: 1,
      title: 'Journal of Sociology - Volume 14 Issue 1&2, 2023',
      category: 'journal',
      year: '2023',
      description: 'Nazmul Karim Study Center\'s official sociology journal covering contemporary social issues and research. Includes articles from leading sociologists and researchers.',
      fileSize: '3.8 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-journal-14.jpg',
      pdfUrl: '/assets/publications/Journal-Final-24-11-24.pdf',
      pages: 120,
      author: 'Professor Dr. A K M Jamal Uddin (Editor)',
      issn: '1813-2871',
      doi: 'https://www.doi.org/10.62272/JS.V14',
      editor: 'Professor Dr. A K M Jamal Uddin',
      editorialBoard: [
        'Professor Dr. Zeenat Huda',
        'Professor Dr. A.S.M. Amanullah',
        'Professor Dr. Fatema Rezina Iqbal',
        'Professor Salma Akhter'
      ],
      subscription: 'Tk. 500.00 per issue (US$ 30 including postage)',
      contact: 'nksc1511@gmail.com',
      volume: '14',
      issue: '1&2'
    },
    {
      id: 2,
      title: 'Journal of Sociology - Volume 13 Issue 1, January - June, 2022',
      category: 'journal',
      year: '2022',
      description: 'First issue of 2022 covering sociological research and analysis. Features articles on contemporary social issues in Bangladesh and South Asia.',
      fileSize: '2.5 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-journal-13-1.jpg',
      pdfUrl: '/assets/publications/Volume 13 Issue 1, January - June, 2022.pdf',
      pages: 85,
      author: 'Professor Dr. A K M Jamal Uddin (Editor)',
      issn: '1813-2871',
      doi: 'https://www.doi.org/10.62272/JS.V13',
      editor: 'Professor Dr. A K M Jamal Uddin',
      editorialBoard: [
        'Professor Dr. Zeenat Huda',
        'Professor Dr. Amanullah',
        'Professor Salma Akhter',
        'Professor Dr. Fatema Rezina Iqbal'
      ],
      editorialAssociate: [
        'Armina Akter, Ahsanullah University of Science and Technology',
        'Sadia Binta Zaman, Green University of Bangladesh'
      ],
      subscription: 'Tk. 200.00 per issue (US$ 30 including postage)',
      contact: 'nksc1511@gmail.com',
      volume: '13',
      issue: '1'
    },
    {
      id: 3,
      title: 'Journal of Sociology - Volume 13 Issue 2, July-December, 2022',
      category: 'journal',
      year: '2022',
      description: 'Second issue of 2022 featuring sociological studies, research papers, and critical analysis on social dynamics, development, and cultural studies.',
      fileSize: '2.8 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-journal-13-2.jpg',
      pdfUrl: '/assets/publications/Volume 13 Issue 2, July- December, 2022.pdf',
      pages: 92,
      author: 'Professor Dr. A K M Jamal Uddin (Editor)',
      issn: '1813-2871',
      doi: 'https://www.doi.org/10.62272/JS.V13',
      editor: 'Professor Dr. A K M Jamal Uddin',
      editorialBoard: [
        'Professor Dr. Zeenat Huda',
        'Professor Dr. Amanullah',
        'Professor Salma Akhter',
        'Professor Dr. Fatema Rezina Iqbal'
      ],
      editorialAssociate: [
        'Armina Akhter, Ahsanullah University of Science and Technology',
        'Sadia Binta Zaman, Green University of Bangladesh'
      ],
      subscription: 'Tk. 200.00 per issue (US$ 30 including postage)',
      contact: 'nksc1511@gmail.com',
      volume: '13',
      issue: '2'
    }
  ];

  // Filtered publications for display
  filteredPublications = [...this.publications];
  
  // Search and filter states
  searchTerm = '';
  selectedCategory = '';
  selectedYear = '';

  // PDF Preview State
  selectedPdf: any = null;
  isPdfViewerOpen = false;
  currentPdfPage = 1;
  totalPdfPages = 1;
  zoomLevel = 1.0;
  pdfSrc: SafeResourceUrl = '';
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private sanitizer: DomSanitizer
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Available years and categories for filters
  years = ['2023', '2022', '2021', '2020'];
  categories = [
    { value: 'journal', label: 'Journal' },
    { value: 'research', label: 'Research Paper' },
    { value: 'article', label: 'Article' },
    { value: 'biography', label: 'Biography' }
  ];

  // Search functionality
  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  // Filter by category
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
    this.filteredPublications = this.publications.filter(publication => {
      const matchesSearch = !this.searchTerm || 
        publication.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        publication.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        publication.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || publication.category === this.selectedCategory;
      const matchesYear = !this.selectedYear || publication.year === this.selectedYear;
      
      return matchesSearch && matchesCategory && matchesYear;
    });
  }

  // Clear all filters
  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedYear = '';
    this.filteredPublications = [...this.publications];
  }

  // PDF Preview Methods with Native Browser Viewer
  openPdfViewer(publication: any) {
    if (!this.isBrowser) {
      window.open(publication.pdfUrl, '_blank');
      return;
    }
    
    this.selectedPdf = publication;
    this.isPdfViewerOpen = true;
    this.currentPdfPage = 1;
    this.zoomLevel = 1.0;
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(publication.pdfUrl);
  }

  closePdfViewer() {
    this.isPdfViewerOpen = false;
    this.selectedPdf = null;
    this.pdfSrc = '';
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

  // Handle PDF total pages from wrapper
  onPdfTotalPages(total: number) {
    this.totalPdfPages = total;
  }

  downloadPdf(publication: any) {
    const link = document.createElement('a');
    link.href = publication.pdfUrl;
    link.download = publication.title + '.pdf';
    link.click();
  }

  getCategoryColor(category: string): string {
    const colors = {
      'journal': 'bg-blue-100 text-blue-800 border border-blue-200',
      'research': 'bg-green-100 text-green-800 border border-green-200',
      'article': 'bg-orange-100 text-orange-800 border border-orange-200',
      'biography': 'bg-purple-100 text-purple-800 border border-purple-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  getCategoryText(category: string): string {
    const texts = {
      'journal': 'Journal',
      'research': 'Research Paper',
      'article': 'Article',
      'biography': 'Biography'
    };
    return texts[category as keyof typeof texts] || category;
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

  // Get count of publications by year (for the template)
  getPublicationsCountByYear(year: string): number {
    return this.publications.filter(p => p.year === year).length;
  }

  // Get latest year publications count
  getLatestPublicationsCount(): number {
    return this.getPublicationsCountByYear('2023');
  }
}