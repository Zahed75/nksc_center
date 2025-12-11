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
  elibraryItems = [
    // Original eLibrary items
    {
      id: 1,
      title: 'Sociology: Fundamental Theories',
      author: 'Dr. Nazmul Karim',
      category: 'sociology',
      type: 'book',
      year: '2024',
      description: 'Detailed discussion and analytical collection on various fundamental theories and concepts of sociology.',
      thumbnail: '/assets/images/elibrary/book-1.jpg',
      fileSize: '15.2 MB',
      pages: 320,
      language: 'Bengali',
      rating: 4.8,
      downloads: 1250,
      isFeatured: true,
      pdfUrl: '/assets/elibrary/sociology-fundamental-theories.pdf'
    },
    {
      id: 2,
      title: 'Research Methodology: An Integrated Approach',
      author: 'Professor Abdul Hai',
      category: 'methodology',
      type: 'book',
      year: '2023',
      description: 'Detailed guide and practical examples of various methods and techniques in social science research.',
      thumbnail: '/assets/images/elibrary/book-2.jpg',
      fileSize: '12.8 MB',
      pages: 280,
      language: 'Bengali',
      rating: 4.6,
      downloads: 980,
      isFeatured: false,
      pdfUrl: '/assets/elibrary/research-methodology.pdf'
    },
    {
      id: 3,
      title: 'Rural Social Structure of Bangladesh: Change and Development',
      author: 'Dr. Salma Akhtar',
      category: 'development',
      type: 'research-paper',
      year: '2024',
      description: 'In-depth research and analysis on structural changes and development processes in rural society of Bangladesh.',
      thumbnail: '/assets/images/elibrary/research-1.jpg',
      fileSize: '8.5 MB',
      pages: 150,
      language: 'Bengali',
      rating: 4.7,
      downloads: 750,
      isFeatured: true,
      pdfUrl: '/assets/elibrary/rural-structure-bangladesh.pdf'
    },
    {
      id: 4,
      title: 'Journal of Sociological Studies 2024',
      author: 'Sociology Department',
      category: 'sociology',
      type: 'journal',
      year: '2024',
      description: 'Quarterly journal published on recent sociological research. Collection of original research papers from various researchers.',
      thumbnail: '/assets/images/elibrary/journal-1.jpg',
      fileSize: '25.3 MB',
      pages: 180,
      language: 'English',
      rating: 4.9,
      downloads: 2100,
      isFeatured: true,
      pdfUrl: '/assets/elibrary/journal-sociological-studies.pdf'
    },
    // Migrated Publications from Publications Section
    {
      id: 5,
      title: 'Rongolal Sen: Life and Work',
      author: 'Sociology Department',
      category: 'biography',
      type: 'biography',
      year: '2024',
      description: 'A detailed discussion on the life of famous sociologist Rongolal Sen and his research work.',
      thumbnail: '/assets/images/pdf-thumbnail-1.jpg',
      fileSize: '2.1 MB',
      pages: 45,
      language: 'Bengali',
      rating: 4.5,
      downloads: 320,
      isFeatured: false,
      pdfUrl: '/assets/journals/rongo-lal-sen.pdf',
      migratedFrom: 'Publications'
    },
    {
      id: 6,
      title: 'Journal Final 2024',
      author: 'NKSC Research Team',
      category: 'sociology',
      type: 'journal',
      year: '2024',
      description: 'Latest research journal of Nazmul Karim Study Center. Collection of research papers on contemporary social issues.',
      thumbnail: '/assets/images/pdf-thumbnail-2.jpg',
      fileSize: '3.8 MB',
      pages: 120,
      language: 'Bengali',
      rating: 4.7,
      downloads: 450,
      isFeatured: true,
      pdfUrl: '/assets/journals/Journal-Final-24-11-24.pdf',
      migratedFrom: 'Publications'
    },
    {
      id: 7,
      title: 'Building Sociological Theory in the Global South',
      author: 'Dr. Mohammad Ali',
      category: 'theory',
      type: 'research-paper',
      year: '2024',
      description: 'Deep analysis on the challenges and possibilities of building sociological theory in the Global South.',
      thumbnail: '/assets/images/pdf-thumbnail-3.jpg',
      fileSize: '1.9 MB',
      pages: 28,
      language: 'English',
      rating: 4.6,
      downloads: 280,
      isFeatured: false,
      pdfUrl: '/assets/journals/Building Sociological Theory in the Global South.pdf',
      migratedFrom: 'Publications'
    },
    {
      id: 8,
      title: 'Salma: Urban Sociology Research',
      author: 'Dr. Salma Akhtar',
      category: 'research',
      type: 'research-paper',
      year: '2024',
      description: 'An original research on urbanization and dynamics of urban society.',
      thumbnail: '/assets/images/pdf-thumbnail-4.jpg',
      fileSize: '2.3 MB',
      pages: 35,
      language: 'Bengali',
      rating: 4.4,
      downloads: 210,
      isFeatured: false,
      pdfUrl: '/assets/journals/13.-Salma-Final-1.pdf',
      migratedFrom: 'Publications'
    },
    {
      id: 9,
      title: 'Dr. Kalidash Bhakta: Research Article',
      author: 'Dr. Kalidash Bhakta',
      category: 'research',
      type: 'article',
      year: '2024',
      description: 'Research articles by Dr. Kalidash Bhakta on various aspects of sociology.',
      thumbnail: '/assets/images/pdf-thumbnail-5.jpg',
      fileSize: '1.7 MB',
      pages: 22,
      language: 'Bengali',
      rating: 4.3,
      downloads: 190,
      isFeatured: false,
      pdfUrl: '/assets/journals/12B.-ড.-কালিদাশ-ভক্ত-1.pdf',
      migratedFrom: 'Publications'
    },
    {
      id: 10,
      title: 'Dr. Kazi Mizanur Rahman: Social Analysis',
      author: 'Kazi Mizanur Rahman',
      category: 'research',
      type: 'research-paper',
      year: '2024',
      description: 'Analytical research on various levels of contemporary society.',
      thumbnail: '/assets/images/pdf-thumbnail-6.jpg',
      fileSize: '2.0 MB',
      pages: 30,
      language: 'Bengali',
      rating: 4.5,
      downloads: 240,
      isFeatured: false,
      pdfUrl: '/assets/journals/11B-কাজী-মিজানুর-রহমান-1-1.pdf',
      migratedFrom: 'Publications'
    },
    // Add more migrated publications as needed...
  ];

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