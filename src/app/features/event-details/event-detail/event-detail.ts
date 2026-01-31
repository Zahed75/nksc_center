// event-detail.component.ts
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GalleryService, GalleryEvent, GalleryImage, GalleryVideo } from '../../../core/api/service/gallery/gallery-service';
import { SafeUrlPipe } from '../../../safe-url-pipe';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe],
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  // Component state
  event: GalleryEvent | null = null;
  images: GalleryImage[] = [];
  videos: GalleryVideo[] = [];
  activeTab: 'images' | 'videos' = 'images';
  isLoading = true;
  error: string | null = null;
  currentImageIndex = 0;
  showImageModal = false;

  // Platform detection
  private isBrowser: boolean;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private galleryService: GalleryService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    console.log('🎬 EventDetailComponent initialized');
    const slug = this.route.snapshot.paramMap.get('slug');
    console.log('📌 Slug from route:', slug);

    if (slug) {
      console.log('🔄 Loading event with slug:', slug);
      this.loadEvent(slug);
    } else {
      console.error('❌ No slug found in route');
      this.error = 'Event not found';
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.restoreBodyScroll();
    console.log('♻️ EventDetailComponent destroyed');
  }

  loadEvent(slug: string) {
    this.isLoading = true;
    this.error = null;

    console.log('📡 Calling API for slug:', slug);
    console.log('🔗 API URL should be:', `/api/gallery/event/${slug}/`);

    const eventSub = this.galleryService.getEventBySlug(slug).pipe(
      catchError(error => {
        console.error('❌ Error loading event:', error);
        console.error('🔧 Error details:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message
        });
        this.handleError(`Failed to load event. Status: ${error.status} - ${error.statusText}`);
        return of({ success: false, data: null });
      })
    ).subscribe({
      next: (response) => {
        console.log('✅ Event API Response:', response);

        if (response.success && response.data) {
          this.event = response.data;
          console.log('📋 Event loaded successfully:', {
            title: this.event.title,
            id: this.event.id,
            imagesCount: this.event.total_images,
            videosCount: this.event.total_videos
          });
          this.loadEventMedia(slug);
        } else {
          console.error('❌ Event not found or invalid response:', response);
          this.handleError('Event not found or invalid response from server');
        }
      },
      error: (error) => {
        console.error('❌ Subscription error:', error);
        this.handleError('Failed to load event details. Please try again.');
      }
    });

    this.subscriptions.add(eventSub);
  }

  private loadEventMedia(slug: string) {
    console.log('🖼️ Loading media for slug:', slug);

    let imagesLoaded = false;
    let videosLoaded = false;

    // Load images
    const imagesSub = this.galleryService.getEventImages(slug).pipe(
      catchError(error => {
        console.error('❌ Error loading images:', error);
        console.error('🔧 Images error details:', {
          status: error.status,
          url: error.url
        });
        return of({ success: false, data: [] });
      })
    ).subscribe({
      next: (imgResponse) => {
        console.log('✅ Images API Response:', {
          success: imgResponse.success,
          count: imgResponse.data?.length || 0
        });

        if (imgResponse.success) {
          this.images = imgResponse.data || [];
          console.log(`🖼️ Loaded ${this.images.length} images`);
          if (this.images.length > 0) {
            console.log('📸 First image URL:', this.images[0].image_url);
          }
        } else {
          console.warn('⚠️ Images API returned success: false');
        }
        imagesLoaded = true;
        this.checkLoadingComplete(imagesLoaded, videosLoaded);
      },
      error: (error) => {
        console.error('❌ Images subscription error:', error);
        imagesLoaded = true;
        this.checkLoadingComplete(imagesLoaded, videosLoaded);
      }
    });

    // Load videos
    const videosSub = this.galleryService.getEventVideos(slug).pipe(
      catchError(error => {
        console.error('❌ Error loading videos:', error);
        console.error('🔧 Videos error details:', {
          status: error.status,
          url: error.url
        });
        return of({ success: false, data: [] });
      })
    ).subscribe({
      next: (vidResponse) => {
        console.log('✅ Videos API Response:', {
          success: vidResponse.success,
          count: vidResponse.data?.length || 0
        });

        if (vidResponse.success && vidResponse.data) {
          this.videos = this.processVideos(vidResponse.data);
          console.log(`🎬 Loaded ${this.videos.length} videos`);
          if (this.videos.length > 0) {
            console.log('📹 First video:', {
              title: this.videos[0].title,
              url: this.videos[0].video_url,
              embed: this.videos[0].embed_url
            });
          }
        } else {
          console.warn('⚠️ Videos API returned success: false or no data');
        }
        videosLoaded = true;
        this.checkLoadingComplete(imagesLoaded, videosLoaded);
      },
      error: (error) => {
        console.error('❌ Videos subscription error:', error);
        videosLoaded = true;
        this.checkLoadingComplete(imagesLoaded, videosLoaded);
      }
    });

    this.subscriptions.add(imagesSub);
    this.subscriptions.add(videosSub);
  }

  /**
   * Process videos - Convert YouTube URLs to embed URLs
   */
  private processVideos(videos: GalleryVideo[]): GalleryVideo[] {
    if (!videos || !Array.isArray(videos)) {
      console.warn('⚠️ No videos to process or invalid videos array');
      return [];
    }

    console.log(`🔄 Processing ${videos.length} videos`);

    return videos.map((video, index) => {
      const processedVideo = { ...video };
      console.log(`📹 Processing video ${index + 1}:`, {
        title: video.title,
        video_url: video.video_url,
        embed_url: video.embed_url
      });

      // Set platform to YouTube if not set
      if (!processedVideo.platform) {
        processedVideo.platform = 'youtube';
        console.log(`   ➕ Set platform to: ${processedVideo.platform}`);
      }

      // Generate embed URL from video URL
      if (processedVideo.video_url && !processedVideo.embed_url) {
        console.log(`   🔄 Converting video URL to embed URL: ${processedVideo.video_url}`);
        processedVideo.embed_url = this.convertToEmbedUrl(processedVideo.video_url);
        console.log(`   ✅ New embed URL: ${processedVideo.embed_url}`);
      }

      // If no embed_url was generated, use the video_url
      if (!processedVideo.embed_url && processedVideo.video_url) {
        console.log(`   ⚠️ Using video URL as fallback embed URL`);
        processedVideo.embed_url = processedVideo.video_url;
      }

      return processedVideo;
    });
  }

  /**
   * Convert YouTube URL to embed URL
   * Handles:
   * - https://www.youtube.com/watch?v=xhhz0Vr_N3w&list=...
   * - https://youtu.be/xhhz0Vr_N3w
   * - https://www.youtube.com/embed/xhhz0Vr_N3w
   */
  private convertToEmbedUrl(url: string): string {
    if (!url) {
      console.warn('⚠️ No URL provided for conversion');
      return '';
    }

    console.log('🔄 Converting YouTube URL:', url);

    // If it's already an embed URL, clean it up
    if (url.includes('youtube.com/embed/')) {
      console.log('✅ URL is already an embed URL, cleaning...');
      return this.cleanEmbedUrl(url);
    }

    // Extract video ID from various YouTube URL formats
    const videoId = this.extractYouTubeVideoId(url);

    if (videoId) {
      console.log('✅ Extracted video ID:', videoId);
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
      console.log('✅ Generated embed URL:', embedUrl);
      return embedUrl;
    }

    console.log('❌ Could not extract video ID from URL:', url);
    return url; // Return original if we can't convert
  }

  /**
   * Extract YouTube video ID from various URL formats
   */
  private extractYouTubeVideoId(url: string): string {
    if (!url) {
      console.warn('⚠️ No URL provided for video ID extraction');
      return '';
    }

    console.log('🔍 Extracting video ID from:', url);
    let videoId = '';

    // Format 1: https://www.youtube.com/watch?v=xhhz0Vr_N3w&list=...
    if (url.includes('youtube.com/watch?v=')) {
      console.log('📋 Detected format: youtube.com/watch?v=');
      try {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get('v') || '';
        console.log('✅ Extracted from search params:', videoId);
      } catch (error) {
        console.error('❌ Error parsing URL:', error);
      }
    }
    // Format 2: https://youtu.be/xhhz0Vr_N3w
    else if (url.includes('youtu.be/')) {
      console.log('📋 Detected format: youtu.be/');
      const pathParts = url.split('youtu.be/')[1]?.split('/');
      videoId = pathParts ? pathParts[0]?.split('?')[0] : '';
      console.log('✅ Extracted from path:', videoId);
    }
    // Format 3: https://www.youtube.com/embed/xhhz0Vr_N3w
    else if (url.includes('youtube.com/embed/')) {
      console.log('📋 Detected format: youtube.com/embed/');
      const pathParts = url.split('embed/')[1]?.split('/');
      videoId = pathParts ? pathParts[0]?.split('?')[0] : '';
      console.log('✅ Extracted from embed path:', videoId);
    }
    // Format 4: https://www.youtube.com/v/xhhz0Vr_N3w
    else if (url.includes('youtube.com/v/')) {
      console.log('📋 Detected format: youtube.com/v/');
      const pathParts = url.split('v/')[1]?.split('/');
      videoId = pathParts ? pathParts[0]?.split('?')[0] : '';
      console.log('✅ Extracted from v path:', videoId);
    }
    else {
      console.log('❌ Unrecognized YouTube URL format');
    }

    // Clean up video ID (remove any & characters that might have been included)
    if (videoId.includes('&')) {
      const original = videoId;
      videoId = videoId.split('&')[0];
      console.log(`🧹 Cleaned video ID: "${original}" -> "${videoId}"`);
    }

    console.log('🎯 Final video ID:', videoId);
    return videoId;
  }

  /**
   * Clean embed URL - remove unnecessary parameters
   */
  private cleanEmbedUrl(url: string): string {
    console.log('🧹 Cleaning embed URL:', url);
    // Remove everything after ? to add our own parameters
    const baseUrl = url.split('?')[0];
    const cleanUrl = `${baseUrl}?rel=0&modestbranding=1&playsinline=1`;
    console.log('✅ Cleaned URL:', cleanUrl);
    return cleanUrl;
  }

  /**
   * Check if video has a valid YouTube embed URL
   */
  hasValidYouTubeEmbed(video: GalleryVideo): boolean {
    if (!video) {
      console.log('❌ No video provided');
      return false;
    }

    if (!video.embed_url) {
      console.log(`❌ Video "${video.title}" has no embed URL`);
      return false;
    }

    const embedUrl = video.embed_url.toLowerCase();
    console.log(`🔍 Checking embed URL for "${video.title}":`, embedUrl);

    // Check if it's a YouTube embed URL
    const isYouTubeEmbed = embedUrl.includes('youtube.com/embed/') ||
      embedUrl.includes('youtu.be/embed/');

    if (isYouTubeEmbed) {
      console.log(`✅ Valid YouTube embed URL for "${video.title}"`);
      return true;
    }

    console.log(`❌ Invalid YouTube embed URL for "${video.title}"`);
    return false;
  }

  /**
   * Get YouTube video ID from embed URL (for debugging)
   */
  getYouTubeVideoId(video: GalleryVideo): string {
    if (!video || !video.embed_url) return '';
    return this.extractYouTubeVideoId(video.embed_url);
  }

  /**
   * Get safe URL for iframe
   */
  getSafeUrl(url: string): SafeResourceUrl {
    console.log('🛡️ Getting safe URL for:', url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * Tab switching
   */
  setTab(tab: 'images' | 'videos') {
    console.log(`📑 Switching to tab: ${tab}`);
    this.activeTab = tab;
  }

  /**
   * Image gallery navigation
   */
  openImageModal(index: number) {
    console.log(`🖼️ Opening image modal at index: ${index}`);
    this.currentImageIndex = index;
    this.showImageModal = true;
    this.disableBodyScroll();
  }

  closeImageModal() {
    console.log('❌ Closing image modal');
    this.showImageModal = false;
    this.restoreBodyScroll();
  }

  nextImage() {
    if (this.currentImageIndex < this.images.length - 1) {
      console.log(`➡️ Next image: ${this.currentImageIndex} → ${this.currentImageIndex + 1}`);
      this.currentImageIndex++;
    }
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      console.log(`⬅️ Previous image: ${this.currentImageIndex} → ${this.currentImageIndex - 1}`);
      this.currentImageIndex--;
    }
  }

  /**
   * Body scroll management
   */
  private disableBodyScroll() {
    if (this.isBrowser && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      console.log('🚫 Disabled body scroll');
    }
  }

  private restoreBodyScroll() {
    if (this.isBrowser && typeof document !== 'undefined') {
      document.body.style.overflow = '';
      console.log('🔄 Restored body scroll');
    }
  }

  /**
   * Navigation
   */
  goBackToGallery() {
    console.log('↩️ Going back to gallery');
    this.router.navigate(['/gallery']);
  }

  /**
   * Formatting helpers
   */
  formatDate(dateString: string): string {
    if (!dateString) return 'Date not available';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  formatDateShort(dateString: string): string {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  /**
   * Check loading complete
   */
  private checkLoadingComplete(imagesLoaded: boolean, videosLoaded: boolean) {
    console.log('⏳ Loading status:', {
      imagesLoaded,
      videosLoaded,
      isLoading: this.isLoading
    });

    if (imagesLoaded && videosLoaded) {
      console.log('✅ All media loaded, setting isLoading to false');
      setTimeout(() => {
        this.isLoading = false;
        console.log('🎉 Component fully loaded!');
        console.log('📊 Final stats:', {
          event: this.event?.title || 'No event',
          images: this.images.length,
          videos: this.videos.length
        });
      }, 100);
    }
  }

  /**
   * Handle errors
   */
  private handleError(message: string) {
    console.error('❌ Error occurred:', message);
    this.error = message;
    this.isLoading = false;
  }

  /**
   * Debug function to log video details
   */
  logVideoDetails() {
    console.log('🔍 Video Details Log:');
    console.log('📊 Total videos:', this.videos.length);

    if (this.videos.length === 0) {
      console.log('ℹ️ No videos available');
      return;
    }

    this.videos.forEach((video, index) => {
      console.log(`\n🎬 Video ${index + 1}:`);
      console.log('   Title:', video.title);
      console.log('   Video URL:', video.video_url);
      console.log('   Embed URL:', video.embed_url);
      console.log('   Platform:', video.platform);
      console.log('   Has Valid Embed:', this.hasValidYouTubeEmbed(video));
      console.log('   Video ID:', this.getYouTubeVideoId(video));

      // Test the embed URL
      if (video.embed_url) {
        console.log('   Embed URL Test:', {
          isYouTube: video.embed_url.includes('youtube'),
          isEmbed: video.embed_url.includes('/embed/'),
          canPlay: this.hasValidYouTubeEmbed(video)
        });
      }
    });
  }

  /**
   * Test API endpoints manually
   */
  testAllEndpoints(slug: string) {
    console.log('🧪 Testing all API endpoints for slug:', slug);

    const endpoints = [
      `event/${slug}/`,
      `event/${slug}/images/`,
      `event/${slug}/videos/`
    ];

    endpoints.forEach(endpoint => {
      console.log(`\n🔗 Testing: ${endpoint}`);
      fetch(`${this.galleryService['apiUrl']}/api/gallery/${endpoint}`)
        .then(response => {
          console.log(`✅ ${endpoint}: Status ${response.status}`);
          return response.json();
        })
        .then(data => {
          console.log(`📦 ${endpoint} Data:`, data);
        })
        .catch(error => {
          console.error(`❌ ${endpoint} Error:`, error);
        });
    });
  }
}
