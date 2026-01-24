// features/home/pages/home-page/home-page.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HomeService, CurrentChairman } from '../../services/home-service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'],
  providers: [HomeService]
})
export class HomePageComponent implements OnInit, OnDestroy {
  // Current Director/Chairman from API
  currentChairman: CurrentChairman | null = null;
  isLoading = false;
  error: string | null = null;

  // Home page content
  features = [
    {
      icon: 'pi pi-microphone',
      title: 'Nazmul Karim Memorial Lecture',
      description: 'Annual memorial lectures featuring distinguished academics and researchers'
    },
    {
      icon: 'pi pi-file-edit',
      title: 'Journal Publications',
      description: 'Peer-reviewed research articles in sociology and related fields'
    },
    {
      icon: 'pi pi-search',
      title: 'Research & Fellowship',
      description: 'Research fellowships and training programs for young researchers'
    },
    {
      icon: 'pi pi-comments',
      title: 'Seminars & Workshops',
      description: 'National and international seminars, workshops, and knowledge exchange platforms'
    },
    {
      icon: 'pi pi-book',
      title: 'Digital Library',
      description: 'Access to extensive digital resources and research publications'
    },
    {
      icon: 'pi pi-users',
      title: 'Academic Networking',
      description: 'Building connections between researchers, academics, and institutions'
    }
  ];

  bengaliWomenFeature = {
    title: 'Bengali Women in Social Research',
    tagline: 'Gender and Society through Dr. Nazmul Karim\'s Perspective',
    description: 'The Nazmul Karim Study Center is committed to highlighting the contributions of Bengali women sociologists and researchers in gender-based research and women\'s empowerment in Bangladesh. By analyzing social structures and encouraging women\'s participation in research, we aim to implement Professor Karim\'s vision for comprehensive social development.',
    keywords: ['Gender Equality', 'Women Empowerment', 'Sociology', 'Dr. Nazmul Karim']
  };

  stats = [
    { number: '20+', label: 'Years of Activity', icon: 'pi pi-calendar' },
    { number: '500+', label: 'Research Papers', icon: 'pi pi-file' },
    { number: '1000+', label: 'Library Resources', icon: 'pi pi-database' },
    { number: '5+', label: 'Successful Directors', icon: 'pi pi-user-check' },
    { number: '50+', label: 'Active Researchers', icon: 'pi pi-users' },
    { number: '10+', label: 'Journal Issues', icon: 'pi pi-book' }
  ];

  aboutNKSC = {
    title: 'About Nazmul Karim Study Center',
    description: 'The Nazmul Karim Study Center was established in honor of Professor Dr. A.K. Nazmul Karim, a pioneer in Bangladeshi sociology and the founding chairman of the Sociology Department at the University of Dhaka. Established on May 10, 2000, at the Curzon Hall, the center aims to preserve and promote Professor Karim\'s intellectual legacy while advancing sociological research and education.',
    highlights: [
      'Preserving and promoting the work and philosophy of Professor Dr. A.K. Nazmul Karim',
      'Conducting advanced research projects in sociology and related fields',
      'Publishing research journals and organizing memorial lectures',
      'Applying research-based knowledge to address contemporary social challenges',
      'Providing a platform for academic discourse and knowledge exchange'
    ]
  };

  upcomingEvents = [
    {
      date: 'Mar 15, 2025',
      title: 'Annual Memorial Lecture',
      description: 'Dr. Sarah Johnson on "Modern Sociology Trends"',
      status: 'upcoming'
    },
    {
      date: 'Feb 28, 2025',
      title: 'Research Methodology Workshop',
      description: 'Advanced qualitative research techniques',
      status: 'upcoming'
    },
    {
      date: 'Jan 20, 2025',
      title: 'Journal Publication Launch',
      description: 'Volume 12, Issue 3 of NKSC Journal',
      status: 'completed'
    }
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.loadCurrentChairman();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadCurrentChairman(): void {
    this.isLoading = true;
    this.error = null;

    const sub = this.homeService.getCurrentChairman().subscribe({
      next: (response) => {
        if (response.code === 200) {
          this.currentChairman = response.data;
        } else {
          this.error = 'Failed to load director information';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading chairman:', err);
        this.error = 'Failed to load director information';
        this.isLoading = false;

        // Fallback data in case API fails
        this.currentChairman = {
          id: 1,
          name_bangla: 'অধ্যাপক ড. তাইয়েবুর রহমান',
          name_english: 'Professor Dr. Taiabur Rahman',
          designation_bangla: 'পরিচালক, নাজমুল করিম স্টাডি সেন্টার',
          designation_english: 'Director, Nazmul Karim Study Center',
          bio_bangla: '',
          bio_english: 'Professor Dr. Taiabur Rahman is the Director of Nazmul Karim Study Center and Acting Dean of the Faculty of Social Sciences at the University of Dhaka. With extensive experience in academia and research, he has contributed significantly to development studies and public policy.',
          qualifications: 'Ph.D. in Public Policy and Governance',
          qualifications_list: [
            'Ph.D. in Public Policy and Governance, City University of Hong Kong',
            'M.Phil. in Public Administration, University of Bergen, Norway',
            'Masters in Public Administration, University of Dhaka',
            'Bachelor in Public Administration, University of Dhaka'
          ],
          current_positions: 'Director, Nazmul Karim Study Center',
          current_positions_list: ['Director, Nazmul Karim Study Center'],
          previous_positions: '',
          previous_positions_list: [],
          email: 'taiaburrahman.dvs@du.ac.bd',
          phone: '+88-01817590525',
          profile_image: '/assets/images/dr.png',
          signature_image: null,
          is_active: true,
          display_order: 0,
          created_at: '',
          updated_at: ''
        };
      }
    });

    this.subscriptions.add(sub);
  }

  getQualificationSummary(): string[] {
    if (this.currentChairman?.qualifications_list && this.currentChairman.qualifications_list.length > 0) {
      return this.currentChairman.qualifications_list.slice(0, 3);
    }
    return [
      'Ph.D. in Public Policy and Governance',
      'M.Phil. in Public Administration',
      'Professor of Development Studies'
    ];
  }

  getCurrentPositions(): string[] {
    if (this.currentChairman?.current_positions_list && this.currentChairman.current_positions_list.length > 0) {
      return this.currentChairman.current_positions_list;
    }
    return ['Director, Nazmul Karim Study Center'];
  }

  getProfileImage(): string {
    if (this.currentChairman?.profile_image) {
      return this.currentChairman.profile_image;
    }
    return '/assets/images/dr.png';
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
      window.location.href = `mailto:${email}`;
    }
  }

  callPhone(phone: string): void {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  }
}
