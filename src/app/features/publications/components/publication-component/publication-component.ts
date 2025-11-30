import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-publication-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './publication-component.html',
  styleUrls: ['./publication-component.css']
})
export class PublicationComponent {
  // All publications from your assets/journals folder
  publications = [
    {
      id: 1,
      title: 'রঙ্গলাল সেন: জীবন ও কর্ম',
      category: 'biography',
      year: '২০২৪',
      description: 'বিখ্যাত সমাজবিজ্ঞানী রঙ্গলাল সেনের জীবনী ও তাঁর গবেষণা কর্মের উপর একটি বিশদ আলোচনা।',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-1.jpg',
      pdfUrl: '/assets/journals/rongo-lal-sen.pdf',
      pages: 45,
      author: 'সমাজবিজ্ঞান বিভাগ'
    },
    {
      id: 2,
      title: 'জার্নাল ফাইনাল ২০২৪',
      category: 'journal',
      year: '২০২৪',
      description: 'নাজমুল করিম স্টাডি সেন্টারের সর্বশেষ গবেষণা জার্নাল। সমকালীন সামাজিক বিষয়গুলোর উপর গবেষণাপত্র সংকলন।',
      fileSize: '3.8 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-2.jpg',
      pdfUrl: '/assets/journals/Journal-Final-24-11-24.pdf',
      pages: 120,
      author: 'এন কে এস সি রিসার্চ টিম'
    },
    {
      id: 3,
      title: 'গ্লোবাল সাউথে সমাজবিজ্ঞান তত্ত্ব গঠন',
      category: 'research',
      year: '২০২৪',
      description: 'বৈশ্বিক দক্ষিণে সমাজবিজ্ঞান তত্ত্ব গঠনের চ্যালেঞ্জ ও সম্ভাবনা নিয়ে গভীর বিশ্লেষণ।',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-3.jpg',
      pdfUrl: '/assets/journals/Building Sociological Theory in the Global South.pdf',
      pages: 28,
      author: 'ড. মোহাম্মদ আলী'
    },
    {
      id: 4,
      title: 'সালমা: নগর সমাজবিজ্ঞান গবেষণা',
      category: 'research',
      year: '২০২৪',
      description: 'নগরায়ণ ও নগর সমাজের গতিশীলতা নিয়ে একটি মৌলিক গবেষণা।',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-4.jpg',
      pdfUrl: '/assets/journals/13.-Salma-Final-1.pdf',
      pages: 35,
      author: 'ড. সালমা আক্তার'
    },
    {
      id: 5,
      title: 'ড. কালিদাশ ভক্ত: গবেষণা প্রবন্ধ',
      category: 'article',
      year: '২০২৪',
      description: 'সমাজবিজ্ঞানের বিভিন্ন দিক নিয়ে ড. কালিদাশ ভক্তের গবেষণামূলক প্রবন্ধ।',
      fileSize: '1.7 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-5.jpg',
      pdfUrl: '/assets/journals/12B.-ড.-কালিদাশ-ভক্ত-1.pdf',
      pages: 22,
      author: 'ড. কালিদাশ ভক্ত'
    },
    {
      id: 6,
      title: 'কাজী মিজানুর রহমান: সমাজ বিশ্লেষণ',
      category: 'research',
      year: '২০২৪',
      description: 'সমসাময়িক সমাজের বিভিন্ন স্তরের বিশ্লেষণধর্মী গবেষণা।',
      fileSize: '2.0 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-6.jpg',
      pdfUrl: '/assets/journals/11B-কাজী-মিজানুর-রহমান-1-1.pdf',
      pages: 30,
      author: 'কাজী মিজানুর রহমান'
    },
    {
      id: 7,
      title: 'ড. শামীমা নাছরিন: নারীবাদী সমাজবিজ্ঞান',
      category: 'research',
      year: '২০২৪',
      description: 'নারীবাদী দৃষ্টিকোণ থেকে সমাজবিজ্ঞানের বিভিন্ন বিষয়ের উপর গবেষণা।',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-7.jpg',
      pdfUrl: '/assets/journals/10B-ড.-শামীমা-নাছরিন-1-1.pdf',
      pages: 25,
      author: 'ড. শামীমা নাছরিন'
    },
    {
      id: 8,
      title: 'ড. শান্টু বড়ুয়া: সাংস্কৃতিক সমাজবিজ্ঞান',
      category: 'research',
      year: '২০২৪',
      description: 'সংস্কৃতি ও সমাজের আন্তঃসম্পর্ক নিয়ে গভীর গবেষণা।',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-8.jpg',
      pdfUrl: '/assets/journals/09B-ড.-শান্টু-বড়ুয়া-1-1.pdf',
      pages: 27,
      author: 'ড. শান্টু বড়ুয়া'
    },
    {
      id: 9,
      title: 'তিতাস কুমার শীল: গ্রামীণ উন্নয়ন',
      category: 'research',
      year: '২০২৪',
      description: 'গ্রামীণ বাংলাদেশের উন্নয়ন চ্যালেঞ্জ ও সম্ভাবনা নিয়ে গবেষণা।',
      fileSize: '2.2 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-9.jpg',
      pdfUrl: '/assets/journals/08B-তিতাস-কুমার-শীল-10-2-1.pdf',
      pages: 32,
      author: 'তিতাস কুমার শীল'
    },
    {
      id: 10,
      title: 'শাহানা আফরিন ও দীন দিলাফরোজ: যৌথ গবেষণা',
      category: 'research',
      year: '২০২৪',
      description: 'শিক্ষা ও সামাজিক পরিবর্তন নিয়ে একটি যৌথ গবেষণা প্রকল্প।',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-10.jpg',
      pdfUrl: '/assets/journals/07-Shahana-Afrin-Dina-Dilafroze-Khanam-Mohammad-Mufajjal-Sarwar-1.pdf',
      pages: 38,
      author: 'শাহানা আফরিন, দীন দিলাফরোজ খানম'
    },
    {
      id: 11,
      title: 'গবেষণা সংকলন ২০২৪',
      category: 'journal',
      year: '২০২৪',
      description: 'বিভিন্ন গবেষকের গবেষণাপত্রের সংকলন। সামাজিক বিষয়গুলোর বহুমাত্রিক বিশ্লেষণ।',
      fileSize: '2.8 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-11.jpg',
      pdfUrl: '/assets/journals/06.-DOC-20241022-WA0000_6-1.pdf',
      pages: 65,
      author: 'বহু গবেষক'
    },
    {
      id: 12,
      title: 'নিওলিবারেলিজম ও গ্রামীণ বাংলাদেশ',
      category: 'research',
      year: '২০২৪',
      description: 'নিওলিবারেল নীতি ও গ্রামীণ বাংলাদেশের অর্থনৈতিক রূপান্তর নিয়ে গবেষণা।',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-12.jpg',
      pdfUrl: '/assets/journals/05.-Neoliberalism and Economic Transformation in Rural Bangladesh A Study on Palsa Village.pdf',
      pages: 40,
      author: 'গবেষণা দল'
    },
    {
      id: 13,
      title: 'দেবাশীষ কুমার কুন্ডু: সমাজতাত্ত্বিক বিশ্লেষণ',
      category: 'research',
      year: '২০২৪',
      description: 'সমসাময়িক সামাজিক সমস্যাগুলোর উপর গভীর সমাজতাত্ত্বিক বিশ্লেষণ।',
      fileSize: '1.6 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-13.jpg',
      pdfUrl: '/assets/journals/04B-দেবাশীষ-কুমার-কুন্ডু-Edited-1-1.pdf',
      pages: 24,
      author: 'দেবাশীষ কুমার কুন্ডু'
    },
    {
      id: 14,
      title: 'লিপন মন্ডল: সংশোধিত সংস্করণ',
      category: 'research',
      year: '২০২৪',
      description: 'সামাজিক পরিবর্তন ও উন্নয়ন নিয়ে সংশোধিত ও পরিমার্জিত গবেষণাপত্র।',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      thumbnail: '/assets/images/pdf-thumbnail-14.jpg',
      pdfUrl: '/assets/journals/03__Lipon Mondal (corrected version) (1) (1).pdf',
      pages: 29,
      author: 'লিপন মন্ডল'
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
  years = ['২০২৪', '২০২৩', '২০২২', '২০২১'];
  categories = [
    { value: 'journal', label: 'জার্নাল' },
    { value: 'research', label: 'গবেষণাপত্র' },
    { value: 'article', label: 'নিবন্ধ' },
    { value: 'biography', label: 'জীবনী' }
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
      'journal': 'জার্নাল',
      'research': 'গবেষণাপত্র',
      'article': 'নিবন্ধ',
      'biography': 'জীবনী'
    };
    return texts[category as keyof typeof texts] || category;
  }
}