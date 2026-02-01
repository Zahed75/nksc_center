// news.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewsService, NewsItem, NewsCategory, FilterParams, NewsResponse, CategoryResponse } from '../../../../core/api/service/news/news-service';
import { environment } from '../../../../../enviornments/enviornment';

@Component({
  selector: 'app-news-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news-component.html',
  styleUrls: ['./news-component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  // News data from API
  newsItems: NewsItem[] = [];
  filteredNews: NewsItem[] = [];
  paginatedNews: NewsItem[] = [];

  // Categories from API
  categories: NewsCategory[] = [];

  // Search and filter states
  searchTerm = '';
  selectedCategory = 'all';
  selectedLanguage = 'all';
  selectedUrgency = 'all';
  sortBy: 'latest' | 'popular' | 'oldest' = 'latest';

  // Loading and error states
  isLoading = false;
  isLoadingMore = false;
  error: string | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;
  totalItems = 0;
  showLoadMore = false;

  // Selected news for detail view
  selectedNews: NewsItem | null = null;
  isNewsDetailOpen = false;

  // View mode
  viewMode: 'grid' | 'list' | 'featured' = 'grid';

  // Featured news
  featuredNews: NewsItem[] = [];

  // Mobile menu state
  isMobileFilterOpen = false;

  // Bookmarked news
  bookmarkedNewsIds: number[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(private newsService: NewsService) {
    console.log('NewsComponent initialized. Environment API URL:', environment.apiUrl);
    // Load bookmarks from localStorage
    this.loadBookmarks();
  }

  ngOnInit() {
    this.loadNewsAndCategories();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    // Clean up body style
    document.body.style.overflow = 'auto';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isNewsDetailOpen) {
      this.closeNewsDetail();
    }
    if (this.isMobileFilterOpen) {
      this.toggleMobileFilters();
    }
  }

  // Load bookmarks from localStorage
  private loadBookmarks(): void {
    const saved = localStorage.getItem('news_bookmarks');
    if (saved) {
      this.bookmarkedNewsIds = JSON.parse(saved);
    }
  }

  // Save bookmarks to localStorage
  private saveBookmarks(): void {
    localStorage.setItem('news_bookmarks', JSON.stringify(this.bookmarkedNewsIds));
  }

  // Toggle bookmark
  toggleBookmark(newsId: number): void {
    const index = this.bookmarkedNewsIds.indexOf(newsId);
    if (index > -1) {
      this.bookmarkedNewsIds.splice(index, 1);
    } else {
      this.bookmarkedNewsIds.push(newsId);
    }
    this.saveBookmarks();
  }

  // Check if news is bookmarked
  isBookmarked(newsId: number): boolean {
    return this.bookmarkedNewsIds.includes(newsId);
  }

  // Load news and categories from API
  loadNewsAndCategories(): void {
    this.isLoading = true;
    this.error = null;

    console.log('Loading news and categories...');

    // Load categories first
    const categoriesSub = this.newsService.getAllCategories().subscribe({
      next: (response: CategoryResponse) => {
        console.log('Categories response:', response);
        if (response.success) {
          this.categories = response.data;
          console.log(`Loaded ${this.categories.length} categories`);
        } else {
          console.warn('Categories API returned success: false');
          this.loadMockCategories();
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.loadMockCategories();
      }
    });

    // Load all news
    const newsSub = this.newsService.getAllNews().subscribe({
      next: (response: NewsResponse) => {
        console.log('News response:', response);
        if (response.success) {
          this.newsItems = response.data;
          this.applySorting();
          this.filteredNews = [...this.newsItems];
          this.updateFeaturedNews();
          this.totalItems = this.filteredNews.length;
          this.calculatePagination();
          this.updatePaginatedNews();
          console.log(`Loaded ${this.newsItems.length} news items`);
          this.isLoading = false;
        } else {
          console.warn('News API returned success: false');
          this.loadMockNewsData();
        }
      },
      error: (error) => {
        console.error('Error loading news:', error);
        if (!environment.production) {
          this.loadMockNewsData();
        } else {
          this.error = 'খবর লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পরে চেষ্টা করুন।';
          this.isLoading = false;
        }
      }
    });

    this.subscriptions.add(categoriesSub);
    this.subscriptions.add(newsSub);
  }

  // Apply sorting
  applySorting(): void {
    switch (this.sortBy) {
      case 'latest':
        this.newsItems.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());
        break;
      case 'oldest':
        this.newsItems.sort((a, b) => new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime());
        break;
      case 'popular':
        this.newsItems.sort((a, b) => b.views_count - a.views_count);
        break;
    }
  }

  // Update featured news (first 3 items)
  updateFeaturedNews(): void {
    this.featuredNews = this.newsItems.slice(0, 3);
  }

  // Load mock categories for development
  loadMockCategories(): void {
    this.categories = [
      { id: 1, name: 'গবেষণা প্রকাশনা', slug: 'research-publications', description: 'গবেষণা প্রকাশনা' },
      { id: 2, name: 'জার্নাল', slug: 'journal', description: 'জার্নাল প্রকাশনা' },
      { id: 3, name: 'সেমিনার', slug: 'seminar', description: 'সেমিনার ও কর্মশালা' },
      { id: 4, name: 'কর্মশালা', slug: 'workshop', description: 'কর্মশালা' },
      { id: 5, name: 'সম্মেলন', slug: 'conference', description: 'কনফারেন্স' },
      { id: 6, name: 'ঘোষণা', slug: 'announcement', description: 'ঘোষণা' },
      { id: 7, name: 'ইভেন্ট', slug: 'event', description: 'বিশেষ ইভেন্ট' },
      { id: 8, name: 'নোটিশ', slug: 'notice', description: 'সাধারণ নোটিশ' }
    ];
  }

  // Load mock news data for development
  loadMockNewsData(): void {
    console.log('Loading mock news data...');
    this.newsItems = [
      {
        id: 1,
        title: 'নাজমুল করিম স্টাডি সেন্টারের নতুন গবেষণা প্রকাশনা - সামাজিক পরিবর্তনের প্রেক্ষাপট',
        slug: 'nazmul-karim-study-center-new-research-publication',
        short_description: 'সমাজবিজ্ঞান গবেষণার নতুন দিগন্ত উন্মোচন করেছে নাজমুল করিম স্টাডি সেন্টার। আমাদের সাম্প্রতিক গবেষণা বাংলাদেশের সামাজিক উন্নয়নে গুরুত্বপূর্ণ ভূমিকা রাখবে।',
        content: '<p>সমাজবিজ্ঞান গবেষণার নতুন দিগন্ত উন্মোচন করেছে নাজমুল করিম স্টাডি সেন্টার। আমাদের সাম্প্রতিক গবেষণা বাংলাদেশের সামাজিক উন্নয়নে গুরুত্বপূর্ণ ভূমিকা রাখবে। এই গবেষণায় সমাজের বিভিন্ন স্তরের মানুষের জীবনযাত্রার মান উন্নয়নের উপায় নিয়ে আলোচনা করা হয়েছে।</p>',
        category: 1,
        category_detail: { id: 1, name: 'গবেষণা প্রকাশনা', slug: 'research-publications', description: 'গবেষণা প্রকাশনা' },
        tags: 'গবেষণা,সমাজবিজ্ঞান,প্রকাশনা,সামাজিক পরিবর্তন',
        tags_list: ['গবেষণা', 'সমাজবিজ্ঞান', 'প্রকাশনা', 'সামাজিক পরিবর্তন'],
        urgency: 'urgent',
        language: 'bn',
        is_event: false,
        event_date: null,
        event_location: '',
        event_speakers: '',
        is_research: true,
        research_topic: 'সামাজিক পরিবর্তনের প্রেক্ষাপট',
        research_department: 'সমাজবিজ্ঞান বিভাগ',
        thumbnail_image: '/assets/images/news/research.jpg',
        banner_image: '/assets/images/news/banner-1.jpg',
        attachment_file: '',
        author: 'ড. রহিমা আক্তার',
        is_published: true,
        publish_date: new Date().toISOString(),
        views_count: 1254,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        days_ago: 1
      },
      {
        id: 2,
        title: 'সেমিনার: ডিজিটাল বাংলাদেশ ও সমাজ পরিবর্তন - বিশেষ আলোচনা সভা',
        slug: 'seminar-digital-bangladesh-social-change',
        short_description: 'ডিজিটাল বাংলাদেশের প্রেক্ষাপটে সমাজ পরিবর্তনের উপর বিশেষ সেমিনার আয়োজন করেছে নাজমুল করিম স্টাডি সেন্টার।',
        content: '<p>ডিজিটাল বাংলাদেশের প্রেক্ষাপটে সমাজ পরিবর্তনের উপর বিশেষ সেমিনার আয়োজন করেছে নাজমুল করিম স্টাডি সেন্টার। এই সেমিনারে দেশের খ্যাতনামা গবেষক ও শিক্ষাবিদরা অংশগ্রহণ করবেন।</p>',
        category: 3,
        category_detail: { id: 3, name: 'সেমিনার', slug: 'seminar', description: 'সেমিনার ও কর্মশালা' },
        tags: 'সেমিনার,ডিজিটাল বাংলাদেশ,সমাজ পরিবর্তন,আলোচনা সভা',
        tags_list: ['সেমিনার', 'ডিজিটাল বাংলাদেশ', 'সমাজ পরিবর্তন', 'আলোচনা সভা'],
        urgency: 'important',
        language: 'bn',
        is_event: true,
        event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        event_location: 'কার্জন হল, ঢাকা বিশ্ববিদ্যালয়',
        event_speakers: 'ড. জামাল উদ্দিন, ড. শারমিন আহমেদ, প্রফেসর ড. রফিকুল ইসলাম',
        is_research: false,
        research_topic: '',
        research_department: '',
        thumbnail_image: '/assets/images/news/seminar.jpg',
        banner_image: '/assets/images/news/banner-2.jpg',
        attachment_file: '',
        author: 'প্রফেসর ড. জামাল উদ্দিন',
        is_published: true,
        publish_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        views_count: 987,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        days_ago: 2
      },
      {
        id: 3,
        title: 'সমাজবিজ্ঞান জার্নালের নতুন সংস্করণ প্রকাশ - বিশেষ গবেষণামূলক প্রবন্ধ',
        slug: 'sociology-journal-new-edition-published',
        short_description: 'সমাজবিজ্ঞান জার্নালের নতুন সংস্করণ প্রকাশিত হয়েছে যাতে বিভিন্ন গবেষণামূলক প্রবন্ধ রয়েছে।',
        content: '<p>সমাজবিজ্ঞান জার্নালের নতুন সংস্করণ প্রকাশিত হয়েছে যাতে বিভিন্ন গবেষণামূলক প্রবন্ধ রয়েছে। এই সংখ্যায় সমাজের বিভিন্ন সমস্যা ও তাদের সমাধান নিয়ে আলোচনা করা হয়েছে।</p>',
        category: 2,
        category_detail: { id: 2, name: 'জার্নাল', slug: 'journal', description: 'জার্নাল প্রকাশনা' },
        tags: 'জার্নাল,প্রকাশনা,গবেষণা,সামাজিক বিজ্ঞান',
        tags_list: ['জার্নাল', 'প্রকাশনা', 'গবেষণা', 'সামাজিক বিজ্ঞান'],
        urgency: 'normal',
        language: 'bn',
        is_event: false,
        event_date: null,
        event_location: '',
        event_speakers: '',
        is_research: false,
        research_topic: '',
        research_department: '',
        thumbnail_image: '/assets/images/news/journal.jpg',
        banner_image: '/assets/images/news/banner-3.jpg',
        attachment_file: '',
        author: 'সম্পাদনা পর্ষদ',
        is_published: true,
        publish_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        views_count: 2342,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        days_ago: 5
      }
    ];

    this.applySorting();
    this.filteredNews = [...this.newsItems];
    this.updateFeaturedNews();
    this.totalItems = this.filteredNews.length;
    this.calculatePagination();
    this.updatePaginatedNews();
    this.isLoading = false;
    console.log('Mock data loaded successfully');
  }

  // Apply filters
  applyFilters(): void {
    this.isLoading = true;
    this.currentPage = 1;

    const params: FilterParams = {};

    if (this.searchTerm.trim()) {
      params.search = this.searchTerm;
    }

    if (this.selectedCategory !== 'all') {
      params.category = this.selectedCategory;
    }

    if (this.selectedLanguage !== 'all') {
      params.language = this.selectedLanguage;
    }

    if (this.selectedUrgency !== 'all') {
      params.urgency = this.selectedUrgency;
    }

    console.log('Applying filters with params:', params);

    const sub = this.newsService.filterNews(params).subscribe({
      next: (response) => {
        console.log('Filter response:', response);
        if (response.success) {
          this.filteredNews = response.data;
          this.applySorting();
          this.totalItems = this.filteredNews.length;
          this.calculatePagination();
          this.updatePaginatedNews();
          this.isLoading = false;
        } else {
          console.warn('Filter API returned success: false');
          this.applyClientSideFilters();
        }
      },
      error: (error) => {
        console.error('Error filtering news:', error);
        this.applyClientSideFilters();
      }
    });

    this.subscriptions.add(sub);
  }

  // Client-side filtering fallback
  applyClientSideFilters(): void {
    console.log('Applying client-side filters');
    let filtered = [...this.newsItems];

    if (this.searchTerm.trim()) {
      const query = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(query) ||
        news.short_description.toLowerCase().includes(query) ||
        news.tags.toLowerCase().includes(query)
      );
    }

    if (this.selectedCategory !== 'all') {
      const category = this.categories.find(cat => cat.slug === this.selectedCategory);
      if (category) {
        filtered = filtered.filter(news => news.category === category.id);
      }
    }

    if (this.selectedLanguage !== 'all') {
      filtered = filtered.filter(news => news.language === this.selectedLanguage);
    }

    if (this.selectedUrgency !== 'all') {
      filtered = filtered.filter(news => news.urgency === this.selectedUrgency);
    }

    this.filteredNews = filtered;
    this.applySorting();
    this.totalItems = this.filteredNews.length;
    this.calculatePagination();
    this.updatePaginatedNews();
    this.isLoading = false;
  }

  // Sort news
  sortNews(sortType: 'latest' | 'popular' | 'oldest'): void {
    this.sortBy = sortType;
    this.applySorting();
    this.filteredNews = [...this.newsItems];
    this.totalItems = this.filteredNews.length;
    this.calculatePagination();
    this.updatePaginatedNews();
  }

  // Calculate pagination
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
    this.showLoadMore = this.currentPage < this.totalPages;
    console.log(`Pagination: totalItems=${this.totalItems}, totalPages=${this.totalPages}, currentPage=${this.currentPage}`);
  }

  // Update paginated news
  updatePaginatedNews(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedNews = this.filteredNews.slice(startIndex, endIndex);
    console.log(`Paginated news: ${this.paginatedNews.length} items (${startIndex} to ${endIndex})`);
  }

  // Load more news
  loadMoreNews(): void {
    if (this.currentPage < this.totalPages) {
      this.isLoadingMore = true;
      this.currentPage++;

      setTimeout(() => {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const moreNews = this.filteredNews.slice(startIndex, endIndex);
        this.paginatedNews = [...this.paginatedNews, ...moreNews];
        this.isLoadingMore = false;
        this.showLoadMore = this.currentPage < this.totalPages;
      }, 500);
    }
  }

  // Go to page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedNews();
      this.scrollToTop();
    }
  }

  // Next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedNews();
      this.scrollToTop();
    }
  }

  // Previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedNews();
      this.scrollToTop();
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Get page numbers for pagination
  getPageNumbers(): number[] {
    const pages = [];
    const maxVisible = 5;

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(this.totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = end - maxVisible + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  // Clear all filters
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedLanguage = 'all';
    this.selectedUrgency = 'all';
    this.sortBy = 'latest';
    this.currentPage = 1;
    this.applySorting();
    this.filteredNews = [...this.newsItems];
    this.totalItems = this.filteredNews.length;
    this.calculatePagination();
    this.updatePaginatedNews();
    this.error = null;
    this.isMobileFilterOpen = false;
  }

  // Change view mode
  changeViewMode(mode: 'grid' | 'list' | 'featured'): void {
    this.viewMode = mode;
    if (mode === 'featured') {
      this.itemsPerPage = 6;
    } else {
      this.itemsPerPage = 9;
    }
    this.calculatePagination();
    this.updatePaginatedNews();
  }

  // Toggle mobile filters
  toggleMobileFilters(): void {
    this.isMobileFilterOpen = !this.isMobileFilterOpen;
    if (this.isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  // Open news detail
  openNewsDetail(news: NewsItem): void {
    console.log('Opening news detail:', news.id, news.title);
    this.selectedNews = news;
    this.isNewsDetailOpen = true;
    document.body.style.overflow = 'hidden';
  }

  // Close news detail
  closeNewsDetail(): void {
    this.isNewsDetailOpen = false;
    this.selectedNews = null;
    document.body.style.overflow = 'auto';
  }

  // Get category name from ID
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'অন্যান্য';
  }

  // Get category color
  getCategoryColor(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    const slug = category?.slug || '';

    const colors: Record<string, string> = {
      'research-publications': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      'journal': 'bg-gradient-to-r from-green-500 to-emerald-500',
      'seminar': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'workshop': 'bg-gradient-to-r from-orange-500 to-amber-500',
      'conference': 'bg-gradient-to-r from-red-500 to-rose-500',
      'announcement': 'bg-gradient-to-r from-indigo-500 to-violet-500',
      'event': 'bg-gradient-to-r from-teal-500 to-emerald-500',
      'notice': 'bg-gradient-to-r from-gray-500 to-slate-500'
    };

    return colors[slug] || 'bg-gradient-to-r from-gray-500 to-slate-500';
  }

  // Get urgency color
  getUrgencyColor(urgency: string): string {
    const colors: Record<string, string> = {
      'urgent': 'bg-gradient-to-r from-red-500 to-pink-500',
      'important': 'bg-gradient-to-r from-orange-500 to-amber-500',
      'normal': 'bg-gradient-to-r from-green-500 to-emerald-500'
    };
    return colors[urgency] || 'bg-gradient-to-r from-gray-500 to-slate-500';
  }

  // Get urgency text
  getUrgencyText(urgency: string): string {
    const texts: Record<string, string> = {
      'urgent': 'জরুরি',
      'important': 'গুরুত্বপূর্ণ',
      'normal': 'সাধারণ'
    };
    return texts[urgency] || 'সাধারণ';
  }

  // Share news
  shareNews(news: NewsItem): void {
    const shareData = {
      title: news.title,
      text: news.short_description,
      url: window.location.origin + '/news/' + news.slug
    };

    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${news.title}\n\n${news.short_description}\n\n${shareData.url}`);
      alert('খবরটি ক্লিপবোর্ডে কপি করা হয়েছে!');
    }
  }

  // Get total news count
  getTotalNews(): number {
    return this.newsItems.length;
  }

  // Get breaking news (urgent news)
  getBreakingNews(): NewsItem[] {
    return this.filteredNews.filter(news => news.urgency === 'urgent').slice(0, 3);
  }

  // Get research news
  getResearchNews(): NewsItem[] {
    return this.filteredNews.filter(news => news.is_research).slice(0, 4);
  }

  // Handle image error
  handleImageError(event: any): void {
    const imgElement = event.target;
    imgElement.style.display = 'none';

    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200';
    fallbackDiv.innerHTML = `
      <div class="text-center text-gray-500">
        <i class="pi pi-image text-3xl mb-2"></i>
        <p class="text-sm bangla-font">ছবি লোড হয়নি</p>
      </div>
    `;

    imgElement.parentNode.insertBefore(fallbackDiv, imgElement.nextSibling);
  }

  // Format date
  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  // Get relative time (e.g., "2 দিন আগে")
  getRelativeTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInDays === 0) return 'আজ';
      if (diffInDays === 1) return 'গতকাল';
      if (diffInDays < 7) return `${diffInDays} দিন আগে`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} সপ্তাহ আগে`;
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} মাস আগে`;
      return `${Math.floor(diffInDays / 365)} বছর আগে`;
    } catch {
      return '';
    }
  }

  // Get read time estimate
  getReadTime(content: string): string {
    const words = this.stripHtml(content).split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} মিনিট পড়া`;
  }

  // Strip HTML tags
  stripHtml(html: string): string {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }

  // Get display range text
  getDisplayRange(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${start}-${end}`;
  }

  // Format number with commas
  formatNumber(num: number): string {
    return num.toLocaleString('bn-BD');
  }
}
