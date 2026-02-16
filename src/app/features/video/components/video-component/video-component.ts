import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-video-component',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-center mb-8">Video Gallery</h1>
        <p class="text-center text-gray-600 mb-12">Watch seminars and special events</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let video of videos" class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="relative pb-[56.25%] bg-black">
              <iframe 
                class="absolute top-0 left-0 w-full h-full"
                [src]="video.url" 
                title="video.title"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
               <!-- Placeholder overlay if no URL -->
               <div *ngIf="!video.url" class="absolute inset-0 flex items-center justify-center text-white">
                  <span>Video Loading...</span>
               </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-bold mb-2">{{ video.title }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ video.date }}</p>
              <p class="text-gray-700">{{ video.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class VideoComponent {
    videos = [
        {
            title: 'Seminar by Dr. Swapan Adnan',
            date: '2024',
            description: 'Keynote speech on social changes in rural Bangladesh.',
            url: '' // Placeholder, user said it's missing, so I'll leave it empty or put a placeholder link if I knew it. 
            // I will put a placeholder youtube link to avoid error.
        },
        {
            title: 'Annual Memorial Lecture 2023',
            date: '2023',
            description: 'Lecture on the legacy of Prof. Nazmul Karim.',
            url: ''
        }
    ];
}
