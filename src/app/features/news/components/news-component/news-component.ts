import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NewsService, NewsItem, NewsCategory, FilterParams } from '../../../../core/api/service/news/news-service';

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

  // Categories from API
  categories: NewsCategory[] = [];

  // Search and filter states
  searchTerm = '';
  selectedCategory = 'all';
  selectedYear = 'all';

  // Loading and error states
  isLoading = false;
  error: string | null = null;

  // Selected news for detail view
  selectedNews: NewsItem | null = null;
  isNewsDetailOpen = false;

  private subscriptions: Subscription = new Subscription();

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadNewsAndCategories();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // Load news and categories from API
  loadNewsAndCategories(): void {
    this.isLoading = true;
    this.error = null;

    // Load categories
    const categoriesSub = this.newsService.getAllCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.error = 'ক্যাটেগরি লোড করতে সমস্যা হয়েছে';
      }
    });

    // Load all news
    const newsSub = this.newsService.getAllNews().subscribe({
      next: (response) => {
        if (response.success) {
          this.newsItems = response.data;
          this.filteredNews = response.data;
          this.isLoading = false;
        } else {
          this.error = 'খবর লোড করতে সমস্যা হয়েছে';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading news:', error);
        this.error = 'খবর লোড করতে সমস্যা হয়েছে';
        this.isLoading = false;
      }
    });

    this.subscriptions.add(categoriesSub);
    this.subscriptions.add(newsSub);
  }

  // Apply filters using API
  applyFilters(): void {
    this.isLoading = true;

    const params: FilterParams = {};

    // Add search parameter
    if (this.searchTerm.trim()) {
      params.search = this.searchTerm;
    }

    // Add category filter
    if (this.selectedCategory !== 'all') {
      params.category = this.selectedCategory;
    }

    // Add language filter (default to Bengali)
    params.language = 'bn';

    const sub = this.newsService.filterNews(params).subscribe({
      next: (response) => {
        if (response.success) {
          this.filteredNews = response.data;
          this.isLoading = false;
        } else {
          this.error = 'ফিল্টার প্রয়োগ করতে সমস্যা হয়েছে';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error filtering news:', error);
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
    this.selectedYear = 'all';
    this.filteredNews = [...this.newsItems];
  }

  // Get featured news (filter by urgency)
  getFeaturedNews(): NewsItem[] {
    return this.newsItems.filter(news => news.urgency === 'urgent');
  }

  // Get breaking news (urgent news)
  getBreakingNews(): NewsItem[] {
    return this.newsItems.filter(news => news.urgency === 'urgent');
  }

  // Get urgent news from API
  loadUrgentNews(): void {
    const sub = this.newsService.getUrgentNews().subscribe({
      next: (response) => {
        if (response.success) {
          // You can use this data separately if needed
        }
      },
      error: (error) => {
        console.error('Error loading urgent news:', error);
      }
    });

    this.subscriptions.add(sub);
  }

  // Get research news from API
  loadResearchNews(): void {
    const sub = this.newsService.getResearchNews().subscribe({
      next: (response) => {
        if (response.success) {
          // You can use this data separately if needed
        }
      },
      error: (error) => {
        console.error('Error loading research news:', error);
      }
    });

    this.subscriptions.add(sub);
  }

  // Handle image error
  handleImageError(event: any): void {
    const imgElement = event.target;
    imgElement.style.display = 'none';

    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-gray-200';
    fallbackDiv.innerHTML = `
      <div class="text-center text-gray-500">
        <i class="pi pi-image text-3xl mb-2"></i>
        <p class="text-sm bangla-font">ছবি লোড হয়নি</p>
      </div>
    `;

    imgElement.parentNode.insertBefore(fallbackDiv, imgElement.nextSibling);
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
      'research-publications': 'bg-blue-100 text-blue-800 border border-blue-200',
      'journal': 'bg-green-100 text-green-800 border border-green-200',
      'seminar': 'bg-purple-100 text-purple-800 border border-purple-200',
      'workshop': 'bg-orange-100 text-orange-800 border border-orange-200',
      'conference': 'bg-pink-100 text-pink-800 border border-pink-200',
      'publication': 'bg-teal-100 text-teal-800 border border-teal-200',
      'announcement': 'bg-red-100 text-red-800 border border-red-200',
    };

    return colors[slug] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Get category text
  getCategoryText(categoryId: number): string {
    return this.getCategoryName(categoryId);
  }

  // Open news detail
  openNewsDetail(news: NewsItem): void {
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

  // Share news
  shareNews(news: NewsItem): void {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.short_description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = window.location.href;
      navigator.clipboard.writeText(`${news.title}\n\n${news.short_description}\n\n${url}`);
      alert('খবরটি ক্লিপবোর্ডে কপি করা হয়েছে!');
    }
  }

  // Get total news count
  getTotalNews(): number {
    return this.newsItems.length;
  }

  // Get news count by category
  getNewsCountByCategory(categorySlug: string): number {
    if (categorySlug === 'all') return this.newsItems.length;

    const category = this.categories.find(cat => cat.slug === categorySlug);
    if (!category) return 0;

    return this.newsItems.filter(news => news.category === category.id).length;
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

  // Format HTML content to plain text
  stripHtml(html: string): string {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }

  // Get short description (remove HTML tags)
  getShortDescription(description: string): string {
    const plainText = this.stripHtml(description);
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  }

  // Get read time estimate
  getReadTime(content: string): string {
    const words = this.stripHtml(content).split(' ').length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} মিনিট`;
  }

  // Get year from publish date
  getYearFromDate(dateString: string): string {
    return new Date(dateString).getFullYear().toString();
  }
}
