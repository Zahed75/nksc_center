// src/app/simple-home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-simple-home',
  standalone: true,
  imports: [],
  template: `
    <div style="padding: 20px;">
      <h1>Simple Home Page</h1>
      <p>No redirects here!</p>
      <div style="margin-top: 20px;">
        <button (click)="goTo('home')" style="margin-right: 10px;">Home</button>
        <button (click)="goTo('about')" style="margin-right: 10px;">About</button>
        <button (click)="goTo('elibrary')" style="margin-right: 10px;">E-Library</button>
      </div>
      @if (currentRoute) {
        <p style="margin-top: 20px; color: red;">
          Current route: {{ currentRoute }}
        </p>
      }
    </div>
    `
})
export class SimpleHomeComponent {
  currentRoute = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
