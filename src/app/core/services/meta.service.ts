// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../enviornments/enviornment';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    this.setDefaultMetaTags();
  }

  private setDefaultMetaTags() {
    const isProduction = environment.production;
    const baseUrl = isProduction ? 'https://nksc-center.edu' : 'http://localhost:4200';
    
    // Set title
    this.title.setTitle('Nazmul Karim Study Center - Sociology Research Publications');
    
    // Set meta tags with dynamic URLs
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Research publications and studies from the Sociology Department\'s Nazmul Karim Study Center' 
    });
    
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'Nazmul Karim Study Center - Sociology Research Publications' 
    });
    
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Research publications and studies from the Sociology Department\'s Nazmul Karim Study Center' 
    });
    
    this.meta.updateTag({ 
      property: 'og:image', 
      content: `${baseUrl}/assets/images/og-image.png` 
    });
    
    this.meta.updateTag({ 
      property: 'og:url', 
      content: baseUrl 
    });
    
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    
    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Nazmul Karim Study Center - Sociology Research Publications' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Research publications and studies from the Sociology Department\'s Nazmul Karim Study Center' });
    this.meta.updateTag({ name: 'twitter:image', content: `${baseUrl}/assets/images/og-image.png` });
  }
}