import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PeopleService, StaffMember, Department, Education, Experience} from '../../services/people-service';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './people.html',
  styleUrls: ['./people.css'],
  providers: [PeopleService]
})
export class PeopleComponent implements OnInit, OnDestroy {
  // Staff data from API
  staffMembers: StaffMember[] = [];
  filteredStaff: StaffMember[] = [];

  // Filter states
  searchTerm = '';
  selectedDepartment = 'all';
  selectedDesignation = 'all';
  viewMode: 'grid' | 'list' = 'grid';

  // Departments extracted from staff data
  departments: Department[] = [];
  designations: string[] = [];

  // Loading and error states
  isLoading = false;
  isLoadingDetail = false;
  error: string | null = null;
  detailError: string | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;
  totalItems = 0;

  // Selected staff for detail view
  selectedStaff: StaffMember | null = null;
  isDetailOpen = false;

  private subscriptions: Subscription = new Subscription();

  constructor(private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.loadStaff();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // Load all staff data
  loadStaff(): void {
    this.isLoading = true;
    this.error = null;

    const sub = this.peopleService.getAllStaff({
      page: this.currentPage,
      page_size: this.itemsPerPage
    }).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.staffMembers = response.data;
          this.filteredStaff = [...this.staffMembers];
          this.totalItems = response.count;
          this.totalPages = response.total_pages || 1;

          // Extract unique departments and designations
          this.extractDepartmentsAndDesignations();

          this.isLoading = false;
        } else {
          this.error = 'স্টাফ লোড করতে সমস্যা হয়েছে';
          this.isLoading = false;
        }
      },
      error: (error: any) => {
        console.error('Error loading staff:', error);
        this.error = 'স্টাফ লোড করতে সমস্যা হয়েছে';
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  // Extract unique departments and designations
  extractDepartmentsAndDesignations(): void {
    const departmentsMap = new Map<number, Department>();
    const designationsSet = new Set<string>();

    this.staffMembers.forEach(staff => {
      if (staff.department_detail) {
        departmentsMap.set(staff.department_detail.id, staff.department_detail);
      }
      if (staff.designation_display) {
        designationsSet.add(staff.designation_display);
      }
    });

    this.departments = Array.from(departmentsMap.values());
    this.designations = Array.from(designationsSet);
  }

  // Apply filters
  applyFilters(): void {
    this.isLoading = true;
    this.currentPage = 1;

    const params: any = {};

    // Add search parameter
    if (this.searchTerm.trim()) {
      params.search = this.searchTerm;
    }

    // Add department filter
    if (this.selectedDepartment !== 'all') {
      params.department = this.selectedDepartment;
    }

    // Add designation filter
    if (this.selectedDesignation !== 'all') {
      params.designation = this.selectedDesignation;
    }

    params.page = this.currentPage;
    params.page_size = this.itemsPerPage;
    params.is_active = true;

    const sub = this.peopleService.getAllStaff(params).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.filteredStaff = response.data;
          this.totalItems = response.count;
          this.totalPages = response.total_pages || 1;
          this.isLoading = false;
        } else {
          this.error = 'ফিল্টার প্রয়োগ করতে সমস্যা হয়েছে';
          this.isLoading = false;
        }
      },
      error: (error: any) => {
        console.error('Error filtering staff:', error);
        this.error = 'ফিল্টার প্রয়োগ করতে সমস্যা হয়েছে';
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  // Clear all filters
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedDepartment = 'all';
    this.selectedDesignation = 'all';
    this.currentPage = 1;
    this.loadStaff();
  }

  // Change page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadStaff();
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  // Open staff detail with full data
  openStaffDetail(staff: StaffMember): void {
    this.isLoadingDetail = true;
    this.detailError = null;

    // First, use the basic data we already have
    this.selectedStaff = staff;
    this.isDetailOpen = true;
    document.body.style.overflow = 'hidden';

    // Then fetch detailed information
    const sub = this.peopleService.getStaffDetail(staff.id).subscribe({
      next: (response: any) => {
        if (response.success) {
          // Merge the detailed data with our existing staff object
          this.selectedStaff = {...staff, ...response.data};
        } else {
          this.detailError = 'বিস্তারিত তথ্য লোড করতে সমস্যা হয়েছে';
        }
        this.isLoadingDetail = false;
      },
      error: (error: any) => {
        console.error('Error loading staff detail:', error);
        this.detailError = 'বিস্তারিত তথ্য লোড করতে সমস্যা হয়েছে';
        this.isLoadingDetail = false;
      }
    });

    this.subscriptions.add(sub);
  }

  // Close staff detail
  closeStaffDetail(): void {
    this.isDetailOpen = false;
    this.selectedStaff = null;
    this.detailError = null;
    document.body.style.overflow = 'auto';
  }

  // Get department color
  getDepartmentColor(department?: Department | null): string {
    if (!department?.color) {
      return 'bg-gray-100 text-gray-800 border border-gray-200';
    }

    // Extract color class if it's already a Tailwind class
    if (department.color.includes('bg-')) {
      return department.color;
    }

    const colorMap: Record<string, string> = {
      'blue': 'bg-blue-100 text-blue-800 border border-blue-200',
      'green': 'bg-green-100 text-green-800 border border-green-200',
      'purple': 'bg-purple-100 text-purple-800 border border-purple-200',
      'orange': 'bg-orange-100 text-orange-800 border border-orange-200',
      'red': 'bg-red-100 text-red-800 border border-red-200',
      'pink': 'bg-pink-100 text-pink-800 border border-pink-200',
      'teal': 'bg-teal-100 text-teal-800 border border-teal-200',
      'indigo': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
    };

    return colorMap[department.color] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Get department icon
  getDepartmentIcon(department?: Department | null): string {
    return department?.icon || 'pi-users';
  }

  // Handle image error
  handleImageError(event: any): void {
    const imgElement = event.target;
    imgElement.style.display = 'none';

    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-gray-100';
    fallbackDiv.innerHTML = `
      <div class="text-center text-gray-400">
        <i class="pi pi-user text-3xl mb-2"></i>
        <p class="text-sm bangla-font">ছবি নেই</p>
      </div>
    `;

    imgElement.parentNode.insertBefore(fallbackDiv, imgElement.nextSibling);
  }

  // Get designation badge color
  getDesignationColor(designation?: string): string {
    if (!designation) {
      return 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200';
    }

    const colorMap: Record<string, string> = {
      'অধ্যাপক': 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200',
      'প্রফেসর': 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200',
      'লেকচারার': 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200',
      'সহকারী অধ্যাপক': 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200',
      'গবেষণা সহযোগী': 'bg-gradient-to-r from-teal-100 to-teal-50 text-teal-800 border border-teal-200',
      'গবেষণা ফেলো': 'bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-800 border border-indigo-200',
      'সহকারী': 'bg-gradient-to-r from-pink-100 to-pink-50 text-pink-800 border border-pink-200',
      'হিসাবরক্ষক (Accountant)': 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200',
    };

    return colorMap[designation] || 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200';
  }

  // Format phone number
  formatPhoneNumber(phone?: string): string {
    if (!phone) return '';

    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Format based on length
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    } else if (cleaned.length > 6) {
      // Try to format as best as possible
      return cleaned.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3');
    }

    return phone;
  }

  // Get total staff count
  getTotalStaff(): number {
    return this.totalItems || 0;
  }

  // Get active staff count
  getActiveStaffCount(): number {
    return this.staffMembers.filter(staff => staff.is_active).length;
  }

  // Send email
  sendEmail(email?: string): void {
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  }

  // Call phone
  callPhone(phone?: string): void {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  }

  // Format date
  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
