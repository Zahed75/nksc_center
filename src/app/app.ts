// app.ts
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/layout/header/header-component/header-component';
import { FooterComponent } from './shared/components/layout/footer/footer-component/footer-component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('nksc_center');

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.setDefaultMetaTags();
  }

  private setDefaultMetaTags() {
    const baseUrl = 'https://nkscdu.com';
    const imageUrl = `${baseUrl}/assets/images/og-image.png`;

    console.log('Setting meta tags for:', imageUrl);

    // Set title
    this.titleService.setTitle('Nazmul Karim Study Center - Sociology Research Publications');

    // Remove existing meta tags
    this.removeExistingMetaTags();

    // Add new meta tags - FIXED: Each tag must have either 'name' OR 'property', not both/undefined
    this.meta.updateTag({ name: 'description', content: 'Research publications from Nazmul Karim Study Center, Sociology Department, University of Dhaka' });

    // Open Graph tags (use 'property')
    this.meta.updateTag({ property: 'og:title', content: 'Nazmul Karim Study Center - Sociology Research Publications' });
    this.meta.updateTag({ property: 'og:description', content: 'Research publications from Nazmul Karim Study Center, Sociology Department, University of Dhaka' });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:url', content: baseUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Nazmul Karim Study Center' });

    // Twitter tags (use 'name')
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Nazmul Karim Study Center - Sociology Research Publications' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Research publications from Nazmul Karim Study Center, Sociology Department, University of Dhaka' });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  private removeExistingMetaTags() {
    // Remove by selector
    const selectors = [
      'name="description"',
      'property="og:title"',
      'property="og:description"',
      'property="og:image"',
      'property="og:image:width"',
      'property="og:image:height"',
      'property="og:url"',
      'property="og:type"',
      'property="og:site_name"',
      'name="twitter:card"',
      'name="twitter:title"',
      'name="twitter:description"',
      'name="twitter:image"'
    ];

    selectors.forEach(selector => {
      const tag = this.meta.getTag(selector);
      if (tag) {
        this.meta.removeTagElement(tag);
      }
    });
  }
}
