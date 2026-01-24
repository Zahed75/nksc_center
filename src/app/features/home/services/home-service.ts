import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviornments/enviornment';

export interface CurrentChairman {
  id: number;
  name_bangla: string;
  name_english: string;
  designation_bangla: string;
  designation_english: string;
  bio_bangla: string;
  bio_english: string;
  qualifications: string;
  qualifications_list: string[];
  current_positions: string;
  current_positions_list: string[];
  previous_positions: string;
  previous_positions_list: string[];
  email: string;
  phone: string;
  profile_image: string | null;
  signature_image: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ChairmanResponse {
  code: number;
  message: string;
  data: CurrentChairman;
}

export interface HomeStats {
  publications: number;
  research_papers: number;
  library_resources: number;
  years_active: number;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get current chairman/director
  getCurrentChairman(): Observable<ChairmanResponse> {
    return this.http.get<ChairmanResponse>(`${this.apiUrl}/api/user-management/chairman/current/`);
  }

  // Get home statistics (you might need to implement this endpoint)
  getHomeStats(): Observable<{ success: boolean; data: HomeStats }> {
    return this.http.get<{ success: boolean; data: HomeStats }>(`${this.apiUrl}/api/home/stats/`);
  }

  // Get features (you might need to implement this endpoint)
  getFeatures(): Observable<{ success: boolean; data: Feature[] }> {
    return this.http.get<{ success: boolean; data: Feature[] }>(`${this.apiUrl}/api/home/features/`);
  }
}
