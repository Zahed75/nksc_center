// services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../enviornments/enviornment';

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
  private baseUrl = environment.apiUrl || 'https://api.nkscdu.com';

  constructor(private http: HttpClient) {}

  // Get all journals
  getAllJournals(): Observable<{message: string, code: number, data: Journal[]}> {
    return this.http.get<{message: string, code: number, data: Journal[]}>(
      `${this.baseUrl}/api/journals/get-all-journals`
    );
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

    return this.http.get<FilterResponse>(
      `${this.baseUrl}/api/journals/filter/`,
      { params: httpParams }
    );
  }

  // Search journals by keyword
  searchJournals(query: string): Observable<FilterResponse> {
    return this.http.get<FilterResponse>(
      `${this.baseUrl}/api/journals/filter/`,
      { params: { search: query } }
    );
  }

  // Get unique years for filter dropdown
  getUniqueYears(): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.baseUrl}/api/journals/unique-years/`
    );
  }

  // Get journal statistics
  getJournalStats(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/api/journals/stats/`
    );
  }
}
