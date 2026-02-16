// news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviornments/enviornment';


export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  category: number;
  category_detail: NewsCategory;
  tags: string;
  tags_list: string[];
  urgency: string;
  language: string;
  is_event: boolean;
  event_date: string | null;
  event_location: string;
  event_speakers: string;
  is_research: boolean;
  research_topic: string;
  research_department: string;
  thumbnail_image: string;
  banner_image: string;
  attachment_file: string;
  author: string;
  is_published: boolean;
  publish_date: string;
  views_count: number;
  created_at: string;
  updated_at: string;
  days_ago: number;
}

export interface NewsResponse {
  success: boolean;
  count: number;
  data: NewsItem[];
}

export interface CategoryResponse {
  success: boolean;
  data: NewsCategory[];
}

export interface FilterParams {
  search?: string;
  category?: string;
  language?: string;
  urgency?: string;
  is_event?: boolean;
  is_research?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = environment.apiUrl; // Use environment variable

  constructor(private http: HttpClient) {
    console.log('NewsService initialized with baseUrl:', this.baseUrl);
  }

  // Get all categories
  getAllCategories(): Observable<CategoryResponse> {
    const url = `${this.baseUrl}/api/news/categories/`;
    console.log('Fetching categories from:', url);
    return this.http.get<CategoryResponse>(url);
  }

  // Get all news
  getAllNews(): Observable<NewsResponse> {
    const url = `${this.baseUrl}/api/news/admin/all/`;
    console.log('Fetching all news from:', url);
    return this.http.get<NewsResponse>(url);
  }

  // Get upcoming events
  getUpcomingEvents(): Observable<NewsResponse> {
    const url = `${this.baseUrl}/api/news/upcoming-events/`;
    console.log('Fetching upcoming events from:', url);
    return this.http.get<NewsResponse>(url);
  }

  // Get filtered news
  filterNews(params: FilterParams): Observable<NewsResponse> {
    let httpParams = new HttpParams();

    // Add all parameters to the request
    Object.keys(params).forEach(key => {
      const value = params[key as keyof FilterParams];
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    const url = `${this.baseUrl}/api/news/all/`;
    console.log('Filtering news from:', url, 'with params:', params);

    return this.http.get<NewsResponse>(url, { params: httpParams });
  }

  // Get urgent news
  getUrgentNews(): Observable<NewsResponse> {
    const url = `${this.baseUrl}/api/news/urgent/`;
    console.log('Fetching urgent news from:', url);
    return this.http.get<NewsResponse>(url);
  }

  // Get research news
  getResearchNews(): Observable<NewsResponse> {
    const url = `${this.baseUrl}/api/news/research/`;
    console.log('Fetching research news from:', url);
    return this.http.get<NewsResponse>(url);
  }

  // Get news by ID
  getNewsById(id: number): Observable<NewsResponse> {
    const url = `${this.baseUrl}/api/news/${id}/`;
    console.log('Fetching news by ID from:', url);
    return this.http.get<NewsResponse>(url);
  }
}
