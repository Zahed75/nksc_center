import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviornments/enviornment'; // Add this import

export interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  name_display: string;
  event_count: number;
}

export interface GalleryEvent {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  event_date: string;
  location: string;
  participants: number;
  year: number;
  category: number;
  category_detail: GalleryCategory;
  is_featured: boolean;
  total_images: number;
  cover_image: string;
  views_count: number;
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
  value: number;
  label: string;
}

export interface YearsResponse {
  success: boolean;
  count: number;
  data: YearOption[];
}

export interface StatsResponse {
  success: boolean;
  stats: {
    total_events: number;
    total_images: number;
    total_views: number;
    seminar_count: number;
    workshop_count: number;
    conference_count: number;
    cultural_count: number;
    other_count: number;
    last_updated: string;
  };
}

export interface FilterParams {
  category?: string;
  year?: number;
  featured?: boolean;
  search?: string;
  limit?: number;
}

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = environment.apiUrl; // Use environment configuration

  constructor(private http: HttpClient) {}

  // Get all gallery events
  getAllGallery(): Observable<GalleryResponse> {
    return this.http.get<GalleryResponse>(`${this.apiUrl}/api/gallery/all/`);
  }

  // Filter gallery events
  filterGallery(params: FilterParams): Observable<GalleryResponse> {
    let httpParams = new HttpParams();

    // Add all parameters to the request
    Object.keys(params).forEach(key => {
      const value = params[key as keyof FilterParams];
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this.http.get<GalleryResponse>(
      `${this.apiUrl}/api/gallery/all/`,
      { params: httpParams }
    );
  }

  // Get featured gallery events
  getFeaturedGallery(): Observable<GalleryResponse> {
    return this.http.get<GalleryResponse>(`${this.apiUrl}/api/gallery/featured/`);
  }

  // Get latest gallery events
  getLatestGallery(): Observable<GalleryResponse> {
    return this.http.get<GalleryResponse>(`${this.apiUrl}/api/gallery/latest/`);
  }

  // Get gallery statistics
  getGalleryStats(): Observable<StatsResponse> {
    return this.http.get<StatsResponse>(`${this.apiUrl}/api/gallery/stats/`);
  }

  // Search gallery events
  searchGallery(query: string, filters: any = {}): Observable<GalleryResponse> {
    let httpParams = new HttpParams();

    if (query) {
      httpParams = httpParams.set('search', query);
    }

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        httpParams = httpParams.set(key, filters[key].toString());
      }
    });

    return this.http.get<GalleryResponse>(
      `${this.apiUrl}/api/gallery/search/`,
      { params: httpParams }
    );
  }

  // Get all categories
  getGalleryCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/api/gallery/categories/`);
  }

  // Get gallery by category slug
  getGalleryByCategory(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/gallery/category/${slug}/`);
  }

  // Get available years
  getGalleryYears(): Observable<YearsResponse> {
    return this.http.get<YearsResponse>(`${this.apiUrl}/api/gallery/years/`);
  }

  // Get event images (you might need to implement this endpoint in your backend)
  getEventImages(eventId: number): Observable<any> {
    // This endpoint would need to be implemented in your backend
    return this.http.get<any>(`${this.apiUrl}/api/gallery/event/${eventId}/images/`);
  }

  // Get event by slug for detailed view
  getEventBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/gallery/event/${slug}/`);
  }
}
