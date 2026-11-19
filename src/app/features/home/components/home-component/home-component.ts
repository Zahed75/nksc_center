// features/home/components/home-component/home-component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AboutService, Director } from '../../../about/services/about-service';
import { NewsService } from '../../../../core/api/service/news/news-service';
import { ApiService, Journal } from '../../../../core/api/service/publication/journal-service';

export interface Profile {
  name: string;
  role: string;
  subtitle: string;
  image: string;
  bio: string;
  period?: string;
  email?: string;
  profileUrl?: string;
}

interface HomeStat {
  value: string;
  label: string;
  icon: string;
}

interface HomeEvent {
  date: string | null;
  title: string;
  description: string;
  location?: string;
  upcoming: boolean;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  /** Chairman of the NKSC council is the sitting Vice Chancellor (source: du.ac.bd/leadership/vc). */
  readonly vcProfile: Profile = {
    name: 'Professor Dr. A. B. M. Obaidul Islam',
    role: 'Chairman, NKSC Council',
    subtitle: 'Vice Chancellor, University of Dhaka',
    image: '/assets/images/vc/vc_abm_obaidul_islam.jpg',
    bio: 'Professor of Physics and former Vice-Chancellor of Bangladesh Open University, with research in materials science and photovoltaic solar cells.',
    email: 'vcoffice@du.ac.bd',
    profileUrl: 'https://www.du.ac.bd/leadership/vc',
  };

  /** Shown until (and if) the about API answers, so the section is never empty. */
  currentDirector: Profile = {
    name: 'Kazi Mohammad Mahbobor Rahman',
    role: 'Director',
    subtitle: 'Professor, Department of Political Science, University of Dhaka',
    image: '/assets/images/directors/kazi_mohammad_mahbobor_rahman.jpg',
    bio: 'Research on international organizations, regional and global governance, and international public policy.',
    period: 'Present',
    email: 'kazipoliticalscience@gmail.com',
    profileUrl: 'https://www.du.ac.bd/faculty/faculty_details/PSC/731',
  };

  formerDirector: Profile = {
    name: 'Dr. Salma Begum',
    role: 'Former Director',
    subtitle: 'Professor, Department of Sociology, University of Dhaka',
    image: '/assets/images/directors/dr_salma_begum.jpg',
    bio: 'Research on gender and development, medical sociology, women’s empowerment and sustainable development.',
    email: 'sociodu2013@gmail.com',
    profileUrl: 'https://du.ac.bd/faculty/faculty_details/HFN/1096',
  };

  stats: HomeStat[] = [
    { value: '2000', label: 'Established', icon: 'pi pi-building' },
    { value: '15', label: 'Journal volumes', icon: 'pi pi-book' },
    { value: '500+', label: 'Research papers', icon: 'pi pi-file' },
    { value: '25+', label: 'Years of activity', icon: 'pi pi-calendar' },
  ];

  aboutText =
    'Established on 10 May 2000, the Nazmul Karim Study Center honours Professor Dr. A.K. Nazmul Karim, a pioneer of sociology in Bangladesh and the first Bengali professor of the Department of Sociology, University of Dhaka. The center continues his intellectual legacy through critical social inquiry and interdisciplinary research.';

  objectives: string[] = [
    'Preserve and promote the work and philosophy of Professor Dr. A.K. Nazmul Karim',
    'Conduct advanced research in sociology and related fields',
    'Publish the Journal of Sociology and organise memorial lectures',
    'Provide a platform for academic discourse and knowledge exchange',
  ];

  activities = [
    { icon: 'pi pi-microphone', title: 'Memorial Lectures', description: 'Annual A.K. Nazmul Karim memorial lectures by distinguished scholars.', link: '/events' },
    { icon: 'pi pi-book', title: 'Journal of Sociology', description: 'A bilingual, peer-reviewed journal published since 2005 (ISSN 1813-2871).', link: '/publications' },
    { icon: 'pi pi-search', title: 'Research & Fellowship', description: 'Research fellowships and training for young researchers.', link: '/about' },
    { icon: 'pi pi-comments', title: 'Seminars & Workshops', description: 'National and international seminars and knowledge-exchange forums.', link: '/events' },
    { icon: 'pi pi-desktop', title: 'Digital Library', description: 'Open access to digitised journals and research resources.', link: '/elibrary' },
    { icon: 'pi pi-images', title: 'Gallery & Media', description: 'Photos and videos from lectures, seminars and center events.', link: '/gallery' },
  ];

  quickLinks = [
    { icon: 'pi pi-book', label: 'Publications', hint: 'Journal of Sociology', link: '/publications' },
    { icon: 'pi pi-desktop', label: 'E-Library', hint: 'Digital resources', link: '/elibrary' },
    { icon: 'pi pi-calendar', label: 'Events', hint: 'Lectures & seminars', link: '/events' },
    { icon: 'pi pi-images', label: 'Gallery', hint: 'Photos & videos', link: '/gallery' },
  ];

  focusKeywords =['Gender equality', 'Women empowerment', 'Social structure', 'Development'];

  /** Latest issue — replaced by the newest published journal from the API. */
  latestJournal: Journal | null = null;
  recentJournals: Journal[] = [];
  journalsLoading = true;
  readonly fallbackCover = '/assets/images/journal-vol15-cover.jpg';

  events: HomeEvent[] = [];
  eventsLoading = true;

  private subscriptions = new Subscription();

  constructor(
    private aboutService: AboutService,
    private newsService: NewsService,
    private journalService: ApiService,
  ) {}

  ngOnInit(): void {
    this.loadAbout();
    this.loadJournals();
    this.loadEvents();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadAbout(): void {
    this.subscriptions.add(
      this.aboutService.getAllAboutData().subscribe({
        next: (res) => {
          if (!res?.success || !res.data) return;
          const { sections, directors, statistics } = res.data;

          const history = sections?.find((s) => s.section_type === 'history');
          if (history?.content) this.aboutText = this.stripHtml(history.content);

          const current = directors?.current?.[0];
          if (current) this.currentDirector = this.toProfile(current, this.currentDirector);

          const previous = [...(directors?.previous ?? [])].sort((a, b) => b.display_order - a.display_order)[0];
          if (previous) this.formerDirector = this.toProfile(previous, this.formerDirector);

          const paperStat = statistics?.find((s) => /paper/i.test(s.label));
          if (paperStat) this.stats[2] = { ...this.stats[2], value: `${paperStat.value}${paperStat.suffix || ''}` };
        },
        error: (err) => console.error('Failed to load about data', err),
      }),
    );
  }

  private loadJournals(): void {
    this.subscriptions.add(
      this.journalService.getAllJournals().subscribe({
        next: (res) => {
          const journals = (res?.data ?? []).filter((j) => j.is_published);
          this.latestJournal = journals[0] ?? null;
          this.recentJournals = journals.slice(0, 4);
          this.journalsLoading = false;
        },
        error: (err) => {
          console.error('Failed to load journals', err);
          this.journalsLoading = false;
        },
      }),
    );
  }

  private loadEvents(): void {
    this.subscriptions.add(
      this.newsService.getUpcomingEvents().subscribe({
        next: (res) => {
          if (res?.success) {
            const now = new Date();
            this.events = (res.data ?? []).slice(0, 3).map((e) => ({
              date: e.event_date || e.publish_date,
              title: e.title,
              description: e.short_description,
              location: e.event_location,
              upcoming: !!e.event_date && new Date(e.event_date) > now,
            }));
          }
          this.eventsLoading = false;
        },
        error: (err) => {
          console.error('Failed to load events', err);
          this.eventsLoading = false;
        },
      }),
    );
  }

  private toProfile(d: Director, fallback: Profile): Profile {
    return {
      name: d.name,
      role: d.position || fallback.role,
      subtitle: fallback.name === d.name ? fallback.subtitle : (d.qualifications?.split('\n')[0] ?? fallback.subtitle),
      image: d.image || fallback.image,
      bio: this.stripHtml(d.bio || '') || fallback.bio,
      period: d.period || undefined,
      email: d.email || fallback.email,
      profileUrl: d.website || fallback.profileUrl,
    };
  }

  /** Plain-text from CKEditor HTML without touching `document`. */
  stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&rsquo;|&#39;/g, '’')
      .replace(/\s+/g, ' ')
      .trim();
  }

  journalLabel(j: Journal): string {
    const vol = j.volume && !/^nill?$/i.test(j.volume.trim()) ? j.volume : '';
    return vol || j.title;
  }

  onImageError(event: Event, fallback: string): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.endsWith(fallback)) img.src = fallback;
  }

  initials(name: string): string {
    return name
      .replace(/^(Professor|Prof\.|Dr\.)\s*/gi, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join('');
  }
}
