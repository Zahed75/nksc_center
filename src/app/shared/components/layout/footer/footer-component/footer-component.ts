import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer-component.html',
  styleUrls: ['./footer-component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Only include Publication, Gallery, Staff links
  quickLinks = [
    { name: 'Publications', path: '/publications' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Staff', path: '/people' }
  ];

  importantLinks = [
    { name: 'University Library', url: 'http://www.library.du.ac.bd/', icon: '📚' },
    { name: 'Alumni Association', url: 'https://www.duaa-bd.org/', icon: '🎓' },
    { name: 'DU Notices', url: 'https://www.du.ac.bd/notice', icon: '📢' },
    { name: 'DU Website', url: 'https://www.du.ac.bd/', icon: '🌐' }
  ];

  contactInfo = {
    address: 'Dhaka University Campus, Dhaka-1000, Bangladesh',
    email: 'nksc@du.ac.bd',
    phone: '+88-09666911463'
  };

  socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: '#', color: 'bg-blue-600' },
    { name: 'Twitter', icon: 'twitter', url: '#', color: 'bg-sky-500' },
    { name: 'LinkedIn', icon: 'linkedin', url: '#', color: 'bg-blue-700' },
    { name: 'YouTube', icon: 'youtube', url: '#', color: 'bg-red-600' }
  ];

  developerInfo = {
    name: 'Zahed Hasan',
    website: 'http://thezhasan.com/',
    text: 'Design & Development by'
  };
}
