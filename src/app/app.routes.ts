// app.routes.ts
import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/components/home-component/home-component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  // Add other routes later
  { path: '**', redirectTo: 'home' }
];