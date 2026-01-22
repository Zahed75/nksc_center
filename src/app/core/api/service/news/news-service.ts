import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private baseUrl = 'https://api.nkscdu.com';

  constructor(private http: HttpClient) {}

  // Get all categories
  getAllCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/api/news/categories/`);
  }

  // Get all news
  getAllNews(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.baseUrl}/api/news/admin/all/`);
  }

  // Filter news
  filterNews(params: FilterParams): Observable<NewsResponse> {
    let httpParams = new HttpParams();

    // Add all parameters to the request
    Object.keys(params).forEach(key => {
      const value = params[key as keyof FilterParams];
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this.http.get<NewsResponse>(
      `${this.baseUrl}/api/news/all/`,
      { params: httpParams }
    );
  }

  // Get urgent news
  getUrgentNews(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.baseUrl}/api/news/urgent/`);
  }

  // Get research news
  getResearchNews(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.baseUrl}/api/news/research/`);
  }

  // Get news by ID
  getNewsById(id: number): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.baseUrl}/api/news/${id}/`);
  }
}
