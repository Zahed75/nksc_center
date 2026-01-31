// safe-url.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    if (!url) {
      return '';
    }

    // Clean YouTube URLs
    const cleanUrl = this.cleanYouTubeUrl(url);

    // Sanitize the URL
    return this.sanitizer.bypassSecurityTrustResourceUrl(cleanUrl);
  }

  private cleanYouTubeUrl(url: string): string {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return url;
    }

    // Extract video ID and create clean embed URL
    const videoId = this.extractYouTubeVideoId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=0`;
    }

    return url;
  }

  private extractYouTubeVideoId(url: string): string {
    let videoId = '';

    // Format 1: https://www.youtube.com/watch?v=xhhz0Vr_N3w&list=...
    if (url.includes('youtube.com/watch?v=')) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v') || '';
    }
    // Format 2: https://youtu.be/xhhz0Vr_N3w
    else if (url.includes('youtu.be/')) {
      const pathParts = url.split('youtu.be/')[1]?.split('/');
      videoId = pathParts ? pathParts[0]?.split('?')[0] : '';
    }
    // Format 3: https://www.youtube.com/embed/xhhz0Vr_N3w
    else if (url.includes('youtube.com/embed/')) {
      const pathParts = url.split('embed/')[1]?.split('/');
      videoId = pathParts ? pathParts[0]?.split('?')[0] : '';
    }

    // Clean up video ID
    if (videoId.includes('&')) {
      videoId = videoId.split('&')[0];
    }

    return videoId;
  }
}
