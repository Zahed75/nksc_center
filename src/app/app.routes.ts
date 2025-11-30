// app.routes.ts
import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/components/home-component/home-component';
import { AboutComponent } from './features/about/components/about-component/about-component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'home' }
];