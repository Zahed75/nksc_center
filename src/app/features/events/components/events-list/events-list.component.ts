import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsService, NewsItem } from '../../../../core/api/service/news/news-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="min-h-screen bg-gray-50 py-16 md:py-24">
      <div class="container mx-auto px-4">
        
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 animate-fade-in-up">
             <i class="pi pi-calendar"></i>
             <span>Seminars & Workshops</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display animate-fade-in-up delay-100">
            Upcoming & Past <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Events</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Explore the academic seminars, workshops, and discussions organized by Nazmul Karim Study Center since 2014.
          </p>
        </div>
        
        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex flex-col items-center justify-center py-24 animate-pulse">
           <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
           <p class="text-gray-500 font-medium">Loading Events...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="max-w-md mx-auto bg-red-50 text-red-600 p-6 rounded-2xl text-center mb-12 border border-red-100 shadow-sm">
          <i class="pi pi-exclamation-circle text-2xl mb-2"></i>
          <p>{{ error }}</p>
          <button (click)="loadEvents()" class="mt-4 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
             Try Again
          </button>
        </div>

        <!-- Events Grid -->
        <div *ngIf="!isLoading && events.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let event of events" class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-1">
            
            <!-- Event Image/Placeholder -->
            <div class="relative h-56 overflow-hidden bg-gray-100">
                <img [src]="event.thumbnail_image || '/assets/images/event-placeholder.jpg'" [alt]="event.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" (error)="handleImageError($event)">
                
                <!-- Date Badge -->
                <div class="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg text-center min-w-[3.5rem]">
                    <span class="block text-xs font-bold text-gray-400 uppercase tracking-wider">{{ (event.event_date || event.publish_date) | date:'MMM' }}</span>
                    <span class="block text-2xl font-bold text-gray-900">{{ (event.event_date || event.publish_date) | date:'dd' }}</span>
                    <span class="block text-xs font-medium text-gray-400">{{ (event.event_date || event.publish_date) | date:'yyyy' }}</span>
                </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
                <div class="mb-4">
                    <span *ngIf="event.category_detail" class="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                        {{ event.category_detail.name }}
                    </span>
                    <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2" title="{{ event.title }}">
                        {{ event.title }}
                    </h3>
                    <p class="text-gray-600 text-sm line-clamp-3 mb-4">
                        {{ event.short_description }}
                    </p>
                </div>

                <div class="mt-auto pt-4 border-t border-gray-100 space-y-3">
                    <div class="flex items-start text-sm text-gray-500">
                        <i class="pi pi-user mr-2 mt-1 text-primary"></i>
                        <span class="line-clamp-1">{{ event.event_speakers || event.author || 'Speaker TBA' }}</span>
                    </div>
                    <div class="flex items-start text-sm text-gray-500">
                        <i class="pi pi-map-marker mr-2 mt-1 text-primary"></i>
                        <span class="line-clamp-1">{{ event.event_location || 'Location TBA' }}</span>
                    </div>
                </div>
            </div>
            
          </div>
        </div>

        <!-- No Events -->
        <div *ngIf="!isLoading && events.length === 0" class="text-center py-24">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <i class="pi pi-calendar-times text-4xl text-gray-400"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Events Found</h3>
          <p class="text-gray-500 max-w-md mx-auto">We couldn't find any seminars or events at this time.</p>
        </div>
      </div>
    </div>
  `,
  providers: [DatePipe]
})
export class EventsListComponent implements OnInit, OnDestroy {
  events: NewsItem[] = [];
  isLoading = false;
  error: string | null = null;
  private sub: Subscription = new Subscription();

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.loadEvents();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadEvents() {
    this.isLoading = true;
    this.error = null;

    this.sub = this.newsService.filterNews({ is_event: true }).subscribe({
      next: (response) => {
        if (response.success) {
          // API returns filtered list, just sort
          this.events = response.data.sort((a, b) => {
            const dateA = new Date(a.event_date || a.publish_date).getTime();
            const dateB = new Date(b.event_date || b.publish_date).getTime();
            return dateB - dateA;
          });
          this.isLoading = false;
        } else {
          this.error = 'Failed to load events. Please try again.';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Unable to connect to the events server.';
        this.isLoading = false;
      }
    });
  }

  handleImageError(event: any) {
    event.target.src = '/assets/images/og-image.png';
  }
}
