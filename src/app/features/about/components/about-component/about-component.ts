// features/about/components/about-component/about-component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {
  AboutService,
  AboutSection,
  TimelineEvent,
  Director,
  Facility,
  Statistic,
  ContactInfo
} from '../../services/about-service';

@Component({
  selector: 'app-about-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-component.html',
  styleUrls: ['./about-component.css'],
  providers: [AboutService]
})
export class AboutComponent implements OnInit, OnDestroy {
  // Data
  aboutSections: AboutSection[] = [];
  timelineEvents: TimelineEvent[] = [];
  currentDirectors: Director[] = [];
  previousDirectors: Director[] = [];
  facilities: Facility[] = [];
  statistics: Statistic[] = [];
  contactInfo: ContactInfo[] = [];

  isLoading = false;
  error: string | null = null;

  missionSection: AboutSection | null = null;
  visionSection: AboutSection | null = null;
  historySection: AboutSection | null = null;

  activeDirectorTab: 'current' | 'previous' = 'current';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private aboutService: AboutService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.loadAllAboutData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadAllAboutData(): void {
    this.isLoading = true;
    this.error = null;

    const sub = this.aboutService.getAllAboutData().subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.data;

          this.aboutSections = data.sections.sort((a, b) => a.display_order - b.display_order);
          this.facilities = data.facilities.sort((a, b) => a.display_order - b.display_order);
          this.statistics = data.statistics.sort((a, b) => a.display_order - b.display_order);
          this.contactInfo = data.contact_info.sort((a, b) => a.display_order - b.display_order);

          this.missionSection = data.sections.find(s => s.section_type === 'mission') || null;
          this.visionSection = data.sections.find(s => s.section_type === 'vision') || null;
          this.historySection = data.sections.find(s => s.section_type === 'history') || null;

          // OVERRIDE Timeline and Directors with corrected data
          this.setCorrectedData();

          this.isLoading = false;
        } else {
          this.error = 'Failed to load data. Please try again.';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading about data:', error);
        // Even if API fails, load our corrected static data
        this.setCorrectedData();
        this.isLoading = false;
        // Don't show error if we have static data
      }
    });

    this.subscriptions.add(sub);
  }

  setCorrectedData(): void {
    // Corrected Timeline Data
    this.timelineEvents = [
      {
        id: 1, year: '2025', title: 'Fifth Director', description: 'Professor Dr. Taiabur Rahman joined on 17 May 2025.', icon: 'pi pi-user', display_order: 1, image: '/assets/images/directors/director_5.jpg'
      },
      {
        id: 2, year: '2020', title: 'Fourth Director', description: 'Professor Dr. A. K. M. Jamal Uddin joined on 13 February 2020.', icon: 'pi pi-user', display_order: 2, image: null
      },
      {
        id: 3, year: '2013', title: 'Third Director', description: 'Professor Dr. Nehal Karim joined on 21 November 2013.', icon: 'pi pi-user', display_order: 3, image: '/assets/images/directors/director_3.jpg'
      },
      {
        id: 4, year: '2009', title: 'Second Director', description: 'Professor Kamrul Ahsan Chowdhury joined in 2009.', icon: 'pi pi-user', display_order: 4, image: '/assets/images/directors/director_2.jpg'
      },
      {
        id: 5, year: '2000', title: 'First Director', description: 'Professor Syed Ahmed Khan assumed responsibility on 10 June 2000.', icon: 'pi pi-user', display_order: 5, image: '/assets/images/directors/director_1.jpg'
      },
      {
        id: 6, year: '2000', title: 'Formal Recognition', description: 'Academic Council approved the establishment of the center on 29 May 2000.', icon: 'pi pi-check-circle', display_order: 6, image: null
      },
      {
        id: 7, year: '2000', title: 'Inception & Journey', description: 'Nazmul Karim Study Center officially started its journey on 10 May 2000 at the Arts Building.', icon: 'pi pi-flag', display_order: 7, image: null
      },
      {
        id: 8, year: '1999', title: 'Concept & Proposal', description: 'The Academic Committee of the Sociology Department approved the proposal to establish the research center.', icon: 'pi pi-lightbulb', display_order: 8, image: null
      }
    ];

    // Directors List
    this.currentDirectors = []; // No current director specified

    this.previousDirectors = [
      {
        id: 101,
        name: 'Professor Dr. Taiabur Rahman',
        position: 'Former Director',
        director_type: 'previous',
        period: '17 May 2025 - 2026',
        bio: 'Professor Dr. Taiabur Rahman served as the Director of Nazmul Karim Study Center.',
        qualifications: 'Ph.D. in Public Policy and Governance',
        email: 'taiaburrahman.dvs@du.ac.bd',
        phone: '',
        image: '/assets/images/dr.png',
        website: '',
        linkedin: '',
        is_current: false,
        display_order: 1,
        created_at: '',
        updated_at: ''
      },
      {
        id: 102,
        name: 'Professor Dr. A. K. M. Jamal Uddin',
        position: 'Former Director',
        director_type: 'previous',
        period: '13 Feb 2020 - 2025',
        bio: '',
        qualifications: '',
        email: '',
        phone: '',
        image: '/assets/images/directors/director_4.jpg',
        website: '',
        linkedin: '',
        is_current: false,
        display_order: 1,
        created_at: '',
        updated_at: ''
      },
      {
        id: 103,
        name: 'Professor Dr. Nehal Karim',
        position: 'Former Director',
        director_type: 'previous',
        period: '21 Nov 2013 - 2020',
        bio: '',
        qualifications: '',
        email: '',
        phone: '',
        image: '/assets/images/directors/director_3.jpg',
        website: '',
        linkedin: '',
        is_current: false,
        display_order: 2,
        created_at: '',
        updated_at: ''
      },
      {
        id: 104,
        name: 'Professor Kamrul Ahsan Chowdhury',
        position: 'Former Director',
        director_type: 'previous',
        period: '2009 - 2013',
        bio: '',
        qualifications: '',
        email: '',
        phone: '',
        image: '/assets/images/directors/director_2.jpg',
        website: '',
        linkedin: '',
        is_current: false,
        display_order: 3,
        created_at: '',
        updated_at: ''
      },
      {
        id: 105,
        name: 'Professor Syed Ahmed Khan',
        position: 'First Director',
        director_type: 'previous',
        period: '10 June 2000 - 2009',
        bio: '',
        qualifications: '',
        email: '',
        phone: '',
        image: '/assets/images/directors/director_1.jpg',
        website: '',
        linkedin: '',
        is_current: false,
        display_order: 4,
        created_at: '',
        updated_at: ''
      }
    ];
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  getCurrentDirectorImage(): string {
    if (this.currentDirectors.length > 0 && this.currentDirectors[0].image) {
      return this.currentDirectors[0].image;
    }
    return '/assets/images/director-placeholder.jpg';
  }

  handleImageError(event: any): void {
    const imgElement = event.target;
    imgElement.style.display = 'none';
    const fallbackDiv = imgElement.nextElementSibling;
    if (fallbackDiv) {
      fallbackDiv.style.display = 'flex';
    }
  }

  sendEmail(email: string): void {
    if (email) {
      window.location.href = `mailto:${email}?subject=Inquiry%20about%20Nazmul%20Karim%20Study%20Center`;
    }
  }

  callPhone(phone: string): void {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  }

  switchDirectorTab(tab: 'current' | 'previous'): void {
    this.activeDirectorTab = tab;
  }

  refreshData(): void {
    this.loadAllAboutData();
  }
}
