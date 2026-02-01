// shared/components/layout/footer/footer-component/footer-component.ts
import { Component } from '@angular/core';

import { RouterModule } from '@angular/router'; // ✅ Add this import

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule], // ✅ Add RouterModule here
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  quickLinks = [
    { name: 'Research Papers', path: '/publications' },
    { name: 'Digital Library', path: '/elibrary' },
    { name: 'Faculty', path: '/staff' },
    { name: 'Photo Gallery', path: '/gallery' }
  ];

  contactInfo = {
    address: 'Department of Sociology, University of Dhaka',
    email: 'contact@nksc.edu.bd',
    phone: '+880 XXXX-XXXXXX'
  };

  socialLinks = [
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' }
  ];
}