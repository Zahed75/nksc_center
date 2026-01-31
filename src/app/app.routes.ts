import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/components/home-component/home-component';
import { AboutComponent } from './features/about/components/about-component/about-component';
import { PublicationComponent } from './features/publications/components/publication-component/publication-component';
import { ElibraryComponent } from './features/elibrary/elibrary-component/elibrary-component';
import { GalleryComponent } from './features/gallery/components/gallery-component/gallery-component';
import { NewsComponent } from './features/news/components/news-component/news-component';
import { PeopleComponent } from './features/people/components/people/people';
import { EventDetailComponent } from './features/event-details/event-detail/event-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'publications', component: PublicationComponent },
  { path: 'elibrary', component: ElibraryComponent },

  // SIMPLE AND CLEAR ROUTES
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:slug', component: EventDetailComponent },

  { path: 'news', component: NewsComponent },
  { path: 'people', component: PeopleComponent },
  { path: '**', redirectTo: 'home' }
];
