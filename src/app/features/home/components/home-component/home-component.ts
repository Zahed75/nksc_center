// features/home/pages/home-page/home-page.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home-service';
import { AboutService } from '../../../about/services/about-service';
import { NewsService } from '../../../../core/api/service/news/news-service';

export interface Profile {
  name: string;
  designation: string;
  image: string;
  bio?: string;
  link?: string;
  email?: string;
  phone?: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'],
  providers: [HomeService]
})
export class HomePageComponent implements OnInit, OnDestroy {
  // Profiles for Home Page
  vcProfile: Profile = {
    name: 'Professor Dr. Niaz Ahmed Khan, PhD',
    designation: 'Vice Chancellor, University of Dhaka',
    image: '/assets/images/vc/vc_profile.jpg', // Updated path
    bio: 'Professor Dr. Niaz Ahmed Khan is the current Vice Chancellor of the University of Dhaka. He is a renowned academic and researcher in the field of Development Studies.',
    email: 'vcoffice@du.ac.bd'
  };

  taiaburProfile: Profile | null = null;

  isLoading = false;
  error: string | null = null;

  // Home page content
  features: any[] = [
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

  stats: any[] = [];
  aboutNKSC: any = {
    title: 'About Nazmul Karim Study Center',
    description: '',
    highlights: [
      'Preserving and promoting the work and philosophy of Professor Dr. A.K. Nazmul Karim',
      'Conducting advanced research projects in sociology and related fields',
      'Publishing research journals and organizing memorial lectures',
      'Applying research-based knowledge to address contemporary social challenges',
      'Providing a platform for academic discourse and knowledge exchange'
    ]
  };

  upcomingEvents: any[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private homeService: HomeService,
    private aboutService: AboutService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    // 1. Fetch About Data (Sections, Stats, Directors)
    this.subscriptions.add(
      this.aboutService.getAllAboutData().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            // Stats
            this.stats = response.data.statistics.map(s => ({
              number: s.value + (s.suffix || ''),
              label: s.label,
              icon: s.icon || 'pi pi-chart-line'
            }));

            // About Section (History)
            const history = response.data.sections.find(s => s.section_type === 'history');
            if (history) {
              this.aboutNKSC.title = history.title;
              this.aboutNKSC.description = this.stripHtml(history.content).substring(0, 300) + '...';
            }

            // Taiabur Profile (Look for him in previous directors)
            const taiabur = response.data.directors.previous.find(d =>
              d.name.toLowerCase().includes('taiabur')
            );

            if (taiabur) {
              this.taiaburProfile = {
                name: taiabur.name,
                designation: taiabur.position + (taiabur.period ? `, ${taiabur.period}` : ''),
                image: taiabur.image || '/assets/images/dr.png',
                bio: this.stripHtml(taiabur.bio || ''),
                email: taiabur.email
              };
            }
          }
        },
        error: (err) => console.error('Failed to load about data', err)
      })
    );

    // 2. Fetch Upcoming Events
    this.subscriptions.add(
      this.newsService.getUpcomingEvents().subscribe({
        next: (response) => {
          if (response.success) {
            this.upcomingEvents = response.data.slice(0, 3).map(e => ({
              date: e.event_date || e.publish_date,
              title: e.title,
              description: e.short_description,
              status: e.event_date && new Date(e.event_date) > new Date() ? 'upcoming' : 'completed'
            }));
          }
        },
        error: (err) => console.error('Failed to load events', err)
      })
    );

    this.isLoading = false;
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleImageError(event: any): void {
    const imgElement = event.target;
    imgElement.style.display = 'none';

    const fallbackDiv = imgElement.nextElementSibling;
    if (fallbackDiv) {
      fallbackDiv.style.display = 'flex';
    }
  }

  sendEmail(email: string | undefined): void {
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  }

  callPhone(phone: string | undefined): void {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  }
}
