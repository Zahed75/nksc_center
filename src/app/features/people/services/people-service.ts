import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviornments/enviornment';

export interface Department {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  display_order: number;
  staff_count: number;
}

export interface StaffMember {
  id: number;
  name: string;
  slug: string;
  designation: string;
  designation_display: string;
  department: number;
  department_detail: Department;
  email: string;
  phone: string;
  profile_image: string;
  is_active: boolean;
  display_order: number;
}

export interface StaffResponse {
  success: boolean;
  count: number;
  page?: number;
  page_size?: number;
  total_pages?: number;
  has_next?: boolean;
  has_previous?: boolean;
  next_page?: number | null;
  previous_page?: number | null;
  filters_applied?: Record<string, any>;
  data: StaffMember[];
}

export interface FilterParams {
  department?: string;
  designation?: string;
  is_active?: boolean;
  search?: string;
  page?: number;
  page_size?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all staff members
  getAllStaff(params?: FilterParams): Observable<StaffResponse> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof FilterParams];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }

    return this.http.get<StaffResponse>(`${this.apiUrl}/api/staff/`, { params: httpParams });
  }

  // Get staff by department
  getStaffByDepartment(departmentSlug: string): Observable<StaffResponse> {
    return this.http.get<StaffResponse>(`${this.apiUrl}/api/staff/?department=${departmentSlug}`);
  }

  // Get staff by designation
  getStaffByDesignation(designation: string): Observable<StaffResponse> {
    return this.http.get<StaffResponse>(`${this.apiUrl}/api/staff/?designation=${designation}`);
  }

  // Search staff
  searchStaff(query: string): Observable<StaffResponse> {
    return this.http.get<StaffResponse>(`${this.apiUrl}/api/staff/?search=${query}`);
  }

  // Get active staff only
  getActiveStaff(): Observable<StaffResponse> {
    return this.http.get<StaffResponse>(`${this.apiUrl}/api/staff/?is_active=true`);
  }

  // Get staff statistics
  getStaffStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/staff/stats/`);
  }
}
