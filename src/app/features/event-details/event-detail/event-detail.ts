// event-detail.component.ts - FIXED VERSION
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
  imports: [CommonModule, RouterModule],
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

  // Safe URLs for videos
  safeVideoUrls: SafeResourceUrl[] = [];

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

          // Create safe URLs for all videos
          this.createSafeVideoUrls();
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
   * Create safe URLs for all videos
   */
  private createSafeVideoUrls() {
    console.log('🛡️ Creating safe URLs for videos...');

    this.safeVideoUrls = this.videos.map((video, index) => {
      // Try embed_url first, then video_url as fallback
      const sourceUrl = video.embed_url || video.video_url;

      if (!sourceUrl) {
        console.warn(`⚠️ Video ${index} has no URL:`, video.title);
        return this.sanitizer.bypassSecurityTrustResourceUrl('');
      }

      // Extract video ID
      const videoId = this.extractYouTubeVideoId(sourceUrl);

      if (videoId) {
        // Use YouTube embed URL with proper parameters
        let embedUrl: string;

        if (this.isBrowser) {
          embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=0&enablejsapi=1&origin=${window.location.origin}`;
        } else {
          embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=0&enablejsapi=1`;
        }

        console.log(`✅ Created embed URL for "${video.title}":`, embedUrl);
        return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      }

      // If we can't extract video ID, use the original URL
      console.warn(`⚠️ Could not extract video ID for "${video.title}", using original URL:`, sourceUrl);
      return this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);
    });

    console.log('✅ Created safe URLs for all videos:', this.safeVideoUrls.length);
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

      // Generate embed URL from video URL if needed
      if (processedVideo.video_url && !processedVideo.embed_url) {
        console.log(`   🔄 Converting video URL to embed URL: ${processedVideo.video_url}`);
        const videoId = this.extractYouTubeVideoId(processedVideo.video_url);
        if (videoId) {
          processedVideo.embed_url = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
          console.log(`   ✅ New embed URL: ${processedVideo.embed_url}`);
        } else {
          console.log(`   ⚠️ Could not convert video URL`);
        }
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
   * Extract YouTube video ID from various URL formats
   */
  private extractYouTubeVideoId(url: string): string {
    if (!url) return '';

    console.log('🔍 Extracting video ID from:', url);

    let videoId = '';

    // Remove any tracking parameters
    const cleanUrl = url.split('&')[0];

    // Format 1: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = cleanUrl.match(/youtube\.com\/watch\?v=([^&?/#]+)/i);
    if (watchMatch) {
      videoId = watchMatch[1];
      console.log('✅ Extracted from watch URL:', videoId);
      return videoId;
    }

    // Format 2: https://youtu.be/VIDEO_ID
    const shortMatch = cleanUrl.match(/youtu\.be\/([^&?/#]+)/i);
    if (shortMatch) {
      videoId = shortMatch[1];
      console.log('✅ Extracted from short URL:', videoId);
      return videoId;
    }

    // Format 3: https://www.youtube.com/embed/VIDEO_ID
    const embedMatch = cleanUrl.match(/youtube\.com\/embed\/([^&?/#]+)/i);
    if (embedMatch) {
      videoId = embedMatch[1];
      console.log('✅ Extracted from embed URL:', videoId);
      return videoId;
    }

    // Format 4: https://www.youtube.com/v/VIDEO_ID
    const vMatch = cleanUrl.match(/youtube\.com\/v\/([^&?/#]+)/i);
    if (vMatch) {
      videoId = vMatch[1];
      console.log('✅ Extracted from v URL:', videoId);
      return videoId;
    }

    console.log('❌ Could not extract video ID from URL');
    return '';
  }

  /**
   * Check if video has a valid YouTube embed URL
   */
  hasValidYouTubeEmbed(video: GalleryVideo): boolean {
    if (!video) return false;

    // Check if we have a valid video ID
    const sourceUrl = video.embed_url || video.video_url;
    const videoId = this.extractYouTubeVideoId(sourceUrl || '');

    return !!videoId;
  }

  /**
   * Get safe URL for a specific video index
   */
  getSafeVideoUrl(index: number): SafeResourceUrl {
    if (index >= 0 && index < this.safeVideoUrls.length) {
      return this.safeVideoUrls[index];
    }
    console.warn(`⚠️ Requested invalid video index: ${index}`);
    return this.sanitizer.bypassSecurityTrustResourceUrl('');
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
    }
  }

  private restoreBodyScroll() {
    if (this.isBrowser && typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  /**
   * Navigation
   */
  goBackToGallery() {
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
    if (imagesLoaded && videosLoaded) {
      setTimeout(() => {
        this.isLoading = false;
        console.log('🎉 Component fully loaded!');
        console.log('📊 Final state:', {
          event: this.event?.title,
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
    console.log('🔍 ========== VIDEO DETAILS LOG ==========');
    console.log('📊 Total videos:', this.videos.length);
    console.log('📊 Safe URLs created:', this.safeVideoUrls.length);

    this.videos.forEach((video, index) => {
      console.log(`\n🎬 VIDEO ${index + 1}/${this.videos.length}:`);
      console.log('   Title:', video.title);
      console.log('   Video URL:', video.video_url);
      console.log('   Embed URL:', video.embed_url);
      console.log('   Platform:', video.platform);
      console.log('   Has Valid Embed:', this.hasValidYouTubeEmbed(video));
      console.log('   Extracted Video ID:', this.extractYouTubeVideoId(video.embed_url || video.video_url || ''));
      console.log('   Safe URL Object:', this.getSafeVideoUrl(index));

      // Get the actual URL from the safe object
      const safeUrl = this.getSafeVideoUrl(index);
      if (safeUrl && typeof safeUrl === 'object' && 'changingThisBreaksApplicationSecurity' in safeUrl) {
        console.log('   Safe URL String:', safeUrl.changingThisBreaksApplicationSecurity);
      }
    });

    console.log('\n🔍 ========== END VIDEO LOG ==========');
  }

  /**
   * Handle iframe errors
   */
  handleIframeError(event: Event, index: number) {
    console.error('❌ Iframe error for video at index:', index);
    console.error('Event:', event);

    const video = this.videos[index];
    if (video) {
      console.error('Video details:', {
        title: video.title,
        video_url: video.video_url,
        embed_url: video.embed_url
      });
    }
  }
}
