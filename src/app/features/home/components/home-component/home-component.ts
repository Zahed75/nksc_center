// features/home/pages/home-page/home-page.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-component.html'
})
export class HomePageComponent {
  features = [
    {
      icon: '📚',
      title: 'Research Publications',
      description: 'Access cutting-edge sociological research papers and publications from renowned academics.'
    },
    {
      icon: '💻',
      title: 'Digital E-Library',
      description: 'Comprehensive collection of books, journals, research materials and digital resources.'
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Faculty',
      description: 'Learn from renowned sociologists, researchers and academic experts in the field.'
    },
    {
      icon: '🔬',
      title: 'Research Labs',
      description: 'State-of-the-art research facilities for sociological studies and data analysis.'
    }
  ];

  stats = [
    { number: '50+', label: 'Research Papers', icon: '📄' },
    { number: '1000+', label: 'Library Resources', icon: '📖' },
    { number: '25+', label: 'Faculty Members', icon: '👨‍🏫' },
    { number: '15+', label: 'Years of Excellence', icon: '⭐' }
  ];
}