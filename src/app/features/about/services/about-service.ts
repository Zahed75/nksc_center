import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviornments/enviornment';

export interface AboutSection {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  section_type: string;
  icon: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
  image: string | null;
}

export interface Director {
  id: number;
  name: string;
  position: string;
  director_type: 'current' | 'previous';
  period: string;
  bio: string;
  qualifications: string;
  email: string;
  phone: string;
  image: string | null;
  website: string;
  linkedin: string;
  is_current: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Facility {
  id: number;
  title: string;
  description: string;
  icon: string;
  location: string;
  room_number: string;
  capacity: string;
  display_order: number;
  image: string | null;
}

export interface Statistic {
  id: number;
  label: string;
  value: string;
  prefix: string;
  suffix: string;
  icon: string;
  display_order: number;
}

export interface ContactInfo {
  id: number;
  contact_type: string;
  label: string;
  value: string;
  icon: string;
  display_order: number;
}

export interface AboutResponse {
  success: boolean;
  data: {
    sections: AboutSection[];
    timeline_events: TimelineEvent[];
    directors: {
      current: Director[];
      previous: Director[];
    };
    facilities: Facility[];
    statistics: Statistic[];
    contact_info: ContactInfo[];
  };
}

export interface SectionsResponse {
  success: boolean;
  count: number;
  data: AboutSection[];
}

export interface TimelineResponse {
  success: boolean;
  count: number;
  data: TimelineEvent[];
}

export interface DirectorsResponse {
  success: boolean;
  count: number;
  data: Director[];
}

export interface FacilitiesResponse {
  success: boolean;
  count: number;
  data: Facility[];
}

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all about data (combined)
  getAllAboutData(): Observable<AboutResponse> {
    return this.http.get<AboutResponse>(`${this.apiUrl}/api/about/`);
  }

  // Get all about sections
  getAboutSections(type?: string): Observable<SectionsResponse> {
    let params = new HttpParams();
    if (type) {
      params = params.set('type', type);
    }
    return this.http.get<SectionsResponse>(`${this.apiUrl}/api/about/sections/`, { params });
  }

  // Get all timeline events
  getTimelineEvents(): Observable<TimelineResponse> {
    return this.http.get<TimelineResponse>(`${this.apiUrl}/api/about/timeline/`);
  }

  // Get all directors
  getAllDirectors(type?: string): Observable<DirectorsResponse> {
    let params = new HttpParams();
    if (type) {
      params = params.set('type', type);
    }
    return this.http.get<DirectorsResponse>(`${this.apiUrl}/api/about/directors/`, { params });
  }

  // Get current director
  getCurrentDirector(): Observable<{ success: boolean; data: Director }> {
    return this.http.get<{ success: boolean; data: Director }>(`${this.apiUrl}/api/about/directors/current/`);
  }

  // Get all facilities
  getFacilities(): Observable<FacilitiesResponse> {
    return this.http.get<FacilitiesResponse>(`${this.apiUrl}/api/about/facilities/`);
  }

  // Get about sections by type
  getHistorySection(): Observable<SectionsResponse> {
    return this.getAboutSections('history');
  }

  getMissionSection(): Observable<SectionsResponse> {
    return this.getAboutSections('mission');
  }

  getVisionSection(): Observable<SectionsResponse> {
    return this.getAboutSections('vision');
  }
}
