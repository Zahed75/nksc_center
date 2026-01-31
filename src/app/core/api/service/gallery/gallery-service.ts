import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../../enviornments/enviornment';

export interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  name_display: string;
  total_events: number;
  display_order: number;
}

export interface GalleryImage {
  id: number;
  image_url: string;
  caption: string;
  display_order: number;
  is_cover: boolean;
  created_at: string;
}

export interface GalleryVideo {
  id: number;
  title: string;
  description: string;
  video_url: string;
  embed_url: string;
  thumbnail_url: string;
  platform: string;
  display_order: number;
  created_at: string;
}

export interface GalleryEvent {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  event_date: string;
  location: string;
  year: number;
  category: number;
  category_detail: GalleryCategory;
  status: string;
  is_featured: boolean;
  total_images: number;
  total_videos: number;
  cover_image: string;
  views_count: number;
  created_at: string;
  updated_at: string;
  images: GalleryImage[];
  videos: GalleryVideo[];
}

export interface GalleryResponse {
  success: boolean;
  count: number;
  data: GalleryEvent[];
}

export interface CategoryResponse {
  success: boolean;
  count: number;
  data: GalleryCategory[];
}

export interface YearOption {
  year: number;
  count: number;
}

export interface YearsResponse {
  success: boolean;
  data: YearOption[];
}

export interface StatsResponse {
  success: boolean;
  stats: {
    total_events: number;
    total_images: number;
    total_videos: number;
    total_views: number;
    featured_events: number;
    by_category: { [key: string]: number };
  };
}

export interface FilterParams {
  category?: number;
  year?: number;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = environment.apiUrl;
  private baseUrl = `${this.apiUrl}/api/gallery/`;

  constructor(private http: HttpClient) {
    console.log('GalleryService initialized with base URL:', this.baseUrl);
  }

  // Get all gallery events - CORRECTED to match Django
  getAllGallery(params?: FilterParams): Observable<GalleryResponse> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof FilterParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    const url = `${this.baseUrl}all/`;
    console.log('Fetching gallery events from:', url);
    return this.http.get<GalleryResponse>(url, { params: httpParams });
  }

  // Get gallery event by slug - CORRECTED to match Django
  getEventBySlug(slug: string): Observable<{ success: boolean; data: GalleryEvent }> {
    const url = `${this.baseUrl}event/${slug}/`;
    console.log('Fetching event by slug from:', url);
    return this.http.get<{ success: boolean; data: GalleryEvent }>(url);
  }

  // Get event images - CORRECTED to match Django
  getEventImages(slug: string): Observable<{ success: boolean; data: GalleryImage[] }> {
    const url = `${this.baseUrl}event/${slug}/images/`;
    console.log('Fetching event images from:', url);
    return this.http.get<{ success: boolean; data: GalleryImage[] }>(url);
  }

  // Get event videos - CORRECTED to match Django
  getEventVideos(slug: string): Observable<{ success: boolean; data: GalleryVideo[] }> {
    const url = `${this.baseUrl}event/${slug}/videos/`;
    console.log('Fetching event videos from:', url);
    return this.http.get<{ success: boolean; data: GalleryVideo[] }>(url);
  }

  // Get all categories
  getGalleryCategories(): Observable<CategoryResponse> {
    const url = `${this.baseUrl}categories/`;
    console.log('Fetching categories from:', url);
    return this.http.get<CategoryResponse>(url);
  }

  // Get available years
  getGalleryYears(): Observable<YearsResponse> {
    const url = `${this.baseUrl}years/`;
    console.log('Fetching years from:', url);
    return this.http.get<YearsResponse>(url);
  }

  // Get gallery statistics
  getGalleryStats(): Observable<StatsResponse> {
    const url = `${this.baseUrl}stats/`;
    console.log('Fetching stats from:', url);
    return this.http.get<StatsResponse>(url);
  }

  // Search gallery events
  searchGallery(query: string): Observable<GalleryResponse> {
    const url = `${this.baseUrl}search/`;
    console.log('Searching gallery from:', url, 'query:', query);
    return this.http.get<GalleryResponse>(url, {
      params: { search: query }
    });
  }

  // Get photo galleries (events with images)
  getPhotoGalleries(): Observable<GalleryResponse> {
    const url = `${this.baseUrl}photos/`;
    console.log('Fetching photo galleries from:', url);
    return this.http.get<GalleryResponse>(url);
  }

  // Get video galleries (events with videos)
  getVideoGalleries(): Observable<GalleryResponse> {
    const url = `${this.baseUrl}videos/`;
    console.log('Fetching video galleries from:', url);
    return this.http.get<GalleryResponse>(url);
  }
}
