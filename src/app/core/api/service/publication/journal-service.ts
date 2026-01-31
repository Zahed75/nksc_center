// core/api/service/publication/journal-service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../../enviornments/enviornment';

export interface Journal {
  id: number;
  title: string;
  volume: string;
  year: number;
  issue: string;
  editor: string;
  issn: string;
  doi_url: string;
  description: string;
  pages: number;
  file_size_mb: string;
  pdf_file: string;
  preview_image: string | null;
  is_published: boolean;
  created_at: string;
}

export interface FilterParams {
  search?: string;
  year_from?: number;
  year_to?: number;
  years?: string;
  volumes?: string;
  stats?: boolean;
  categories?: boolean;
  all?: boolean;
  created_after?: string;
  created_before?: string;
  page?: number;
  page_size?: number;
  sort_by?: string;
  order?: 'asc' | 'desc';
}

export interface FilterResponse {
  code: number;
  message: string;
  data: Journal[];
  pagination?: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_next: boolean;
    has_previous: boolean;
    page_size: number;
    start_index: number;
    end_index: number;
  };
  filters_applied?: Record<string, any>;
  sorting?: {
    field: string;
    order: string;
  };
  summary?: {
    total_found: number;
    query_time: string;
    search_performed: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl; // Use environment variable

  constructor(private http: HttpClient) {
    console.log('ApiService initialized with baseUrl:', this.baseUrl);
  }

  // Get all journals
  getAllJournals(): Observable<{message: string, code: number, data: Journal[]}> {
    const url = `${this.baseUrl}/api/journals/get-all-journals`;
    console.log('Fetching journals from:', url);
    return this.http.get<{message: string, code: number, data: Journal[]}>(url);
  }

  // Filter journals with parameters
  filterJournals(params: FilterParams): Observable<FilterResponse> {
    let httpParams = new HttpParams();

    // Add all parameters to the request
    Object.keys(params).forEach(key => {
      const value = params[key as keyof FilterParams];
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    const url = `${this.baseUrl}/api/journals/filter/`;
    console.log('Filtering journals from:', url, 'with params:', params);

    return this.http.get<FilterResponse>(url, { params: httpParams });
  }

  // Search journals by keyword
  searchJournals(query: string): Observable<FilterResponse> {
    const url = `${this.baseUrl}/api/journals/filter/`;
    console.log('Searching journals from:', url, 'with query:', query);
    return this.http.get<FilterResponse>(url, { params: { search: query } });
  }
}
