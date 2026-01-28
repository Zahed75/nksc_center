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
  // Data from API
  aboutSections: AboutSection[] = [];
  timelineEvents: TimelineEvent[] = [];
  currentDirectors: Director[] = [];
  previousDirectors: Director[] = [];
  facilities: Facility[] = [];
  statistics: Statistic[] = [];
  contactInfo: ContactInfo[] = [];

  // Loading and error states
  isLoading = false;
  error: string | null = null;

  // Filtered data for specific sections
  missionSection: AboutSection | null = null;
  visionSection: AboutSection | null = null;
  historySection: AboutSection | null = null;

  // Active tab for directors
  activeDirectorTab: 'current' | 'previous' = 'current';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private aboutService: AboutService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadAllAboutData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // Load all about data
  loadAllAboutData(): void {
    this.isLoading = true;
    this.error = null;

    const sub = this.aboutService.getAllAboutData().subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.data;

          // Assign data
          this.aboutSections = data.sections.sort((a, b) => a.display_order - b.display_order);
          this.timelineEvents = this.sortTimelineEvents(data.timeline_events);
          this.currentDirectors = data.directors.current.sort((a, b) => a.display_order - b.display_order);
          this.previousDirectors = this.sortDirectors(data.directors.previous);
          this.facilities = data.facilities.sort((a, b) => a.display_order - b.display_order);
          this.statistics = data.statistics.sort((a, b) => a.display_order - b.display_order);
          this.contactInfo = data.contact_info.sort((a, b) => a.display_order - b.display_order);

          // Extract specific sections
          this.missionSection = data.sections.find(s => s.section_type === 'mission') || null;
          this.visionSection = data.sections.find(s => s.section_type === 'vision') || null;
          this.historySection = data.sections.find(s => s.section_type === 'history') || null;

          this.isLoading = false;
        } else {
          this.error = 'Failed to load data. Please try again.';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading about data:', error);
        this.error = 'Failed to load data. Please check your connection and try again.';
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  // Sort timeline events by display order (ascending)
  private sortTimelineEvents(events: TimelineEvent[]): TimelineEvent[] {
    return [...events].sort((a, b) => a.display_order - b.display_order);
  }

  // Sort previous directors by display order (ascending)
  private sortDirectors(directors: Director[]): Director[] {
    return [...directors].sort((a, b) => a.display_order - b.display_order);
  }

  // Sanitize HTML content
  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  // Get current director image or fallback
  getCurrentDirectorImage(): string {
    if (this.currentDirectors.length > 0 && this.currentDirectors[0].image) {
      return this.currentDirectors[0].image;
    }
    return '/assets/images/director-placeholder.jpg'; // Fallback image
  }

  // Handle image error
  handleImageError(event: any): void {
    const imgElement = event.target;
    imgElement.style.display = 'none';

    const fallbackDiv = imgElement.nextElementSibling;
    if (fallbackDiv) {
      fallbackDiv.style.display = 'flex';
    }
  }

  // Send email
  sendEmail(email: string): void {
    if (email) {
      window.location.href = `mailto:${email}?subject=Inquiry%20about%20Nazmul%20Karim%20Study%20Center`;
    }
  }

  // Call phone
  callPhone(phone: string): void {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  }

  // Switch director tab
  switchDirectorTab(tab: 'current' | 'previous'): void {
    this.activeDirectorTab = tab;
  }

  // Refresh data
  refreshData(): void {
    this.loadAllAboutData();
  }

  // Scroll to section
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
