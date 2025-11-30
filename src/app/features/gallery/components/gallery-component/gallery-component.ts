import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery-component.html',
  styleUrls: ['./gallery-component.css']
})
export class GalleryComponent {
  // Filter states
  selectedCategory = 'all';
  selectedYear = 'all';
  searchTerm = '';

  // Available categories and years
  categories = [
    { value: 'all', label: 'সব ইভেন্ট' },
    { value: 'seminar', label: 'সেমিনার' },
    { value: 'workshop', label: 'ওয়ার্কশপ' },
    { value: 'conference', label: 'কনফারেন্স' },
    { value: 'research', label: 'গবেষণা' },
    { value: 'cultural', label: 'সাংস্কৃতিক' }
  ];

  years = [
    { value: 'all', label: 'সব বছর' },
    { value: '2024', label: '২০২৪' },
    { value: '2023', label: '২০২৩' },
    { value: '2022', label: '২০২২' },
    { value: '2021', label: '২০২১' }
  ];

  // Gallery items data
  galleryItems = [
    {
      id: 1,
      title: 'বার্ষিক গবেষণা সেমিনার ২০২৪',
      category: 'seminar',
      year: '2024',
      date: '১৫ মার্চ, ২০২৪',
      description: 'নাজমুল করিম স্টাডি সেন্টারের বার্ষিক গবেষণা সেমিনারে বিভিন্ন বিশ্ববিদ্যালয়ের গবেষকবৃন্দ তাদের গবেষণাপত্র উপস্থাপন করেন।',
      images: [
        '/assets/images/gallery/seminar-2024-1.jpg',
        '/assets/images/gallery/seminar-2024-2.jpg',
        '/assets/images/gallery/seminar-2024-3.jpg'
      ],
      featuredImage: '/assets/images/gallery/seminar-2024-1.jpg',
      totalImages: 45,
      location: 'নাজমুল করিম স্টাডি সেন্টার, ঢাকা',
      participants: 120,
      isFeatured: true
    },
    {
      id: 2,
      title: 'সামাজিক গবেষণা পদ্ধতি ওয়ার্কশপ',
      category: 'workshop',
      year: '2024',
      date: '২৮ ফেব্রুয়ারি, ২০২৪',
      description: 'সামাজিক গবেষণার বিভিন্ন পদ্ধতি ও কৌশল নিয়ে দুই দিনব্যাপী বিশেষ ওয়ার্কশপ। অংশগ্রহণকারীদের হাতে-কলমে প্রশিক্ষণ প্রদান।',
      images: [
        '/assets/images/gallery/workshop-2024-1.jpg',
        '/assets/images/gallery/workshop-2024-2.jpg'
      ],
      featuredImage: '/assets/images/gallery/workshop-2024-1.jpg',
      totalImages: 32,
      location: 'সমাজবিজ্ঞান বিভাগ, ঢাকা বিশ্ববিদ্যালয়',
      participants: 45,
      isFeatured: true
    },
    {
      id: 3,
      title: 'জাতীয় সমাজবিজ্ঞান কনফারেন্স',
      category: 'conference',
      year: '2023',
      date: '১০-১২ ডিসেম্বর, ২০২৩',
      description: 'ত্রি-দিনব্যাপী জাতীয় সমাজবিজ্ঞান কনফারেন্সে দেশের বিভিন্ন প্রান্তের সমাজবিজ্ঞানী ও গবেষকবৃন্দ অংশগ্রহণ করেন।',
      images: [
        '/assets/images/gallery/conference-2023-1.jpg',
        '/assets/images/gallery/conference-2023-2.jpg',
        '/assets/images/gallery/conference-2023-3.jpg',
        '/assets/images/gallery/conference-2023-4.jpg'
      ],
      featuredImage: '/assets/images/gallery/conference-2023-1.jpg',
      totalImages: 78,
      location: 'বাংলাদেশ অ্যাকাডেমি ফর রুরাল ডেভেলপমেন্ট',
      participants: 250,
      isFeatured: true
    },
    {
      id: 4,
      title: 'গ্রামীণ উন্নয়ন গবেষণা সেমিনার',
      category: 'research',
      year: '2023',
      date: '২০ নভেম্বর, ২০২৩',
      description: 'গ্রামীণ বাংলাদেশের উন্নয়ন চ্যালেঞ্জ ও সম্ভাবনা নিয়ে বিশেষ গবেষণা সেমিনার।',
      images: [
        '/assets/images/gallery/research-2023-1.jpg',
        '/assets/images/gallery/research-2023-2.jpg'
      ],
      featuredImage: '/assets/images/gallery/research-2023-1.jpg',
      totalImages: 28,
      location: 'নাজমুল করিম স্টাডি সেন্টার',
      participants: 65,
      isFeatured: false
    },
    {
      id: 5,
      title: 'ডেটা অ্যানালাইসিস ওয়ার্কশপ',
      category: 'workshop',
      year: '2023',
      date: '১৫ অক্টোবর, ২০২৩',
      description: 'সামাজিক গবেষণার জন্য ডেটা অ্যানালাইসিসের বিভিন্ন সফটওয়্যার ও কৌশল নিয়ে বিশেষ ওয়ার্কশপ।',
      images: [
        '/assets/images/gallery/workshop-2023-1.jpg',
        '/assets/images/gallery/workshop-2023-2.jpg',
        '/assets/images/gallery/workshop-2023-3.jpg'
      ],
      featuredImage: '/assets/images/gallery/workshop-2023-1.jpg',
      totalImages: 36,
      location: 'কম্পিউটার ল্যাব, সমাজবিজ্ঞান বিভাগ',
      participants: 30,
      isFeatured: false
    },
    {
      id: 6,
      title: 'আন্তর্জাতিক সেমিনার: সামাজিক পরিবর্তন',
      category: 'seminar',
      year: '2022',
      date: '৫ সেপ্টেম্বর, ২০২২',
      description: 'সামাজিক পরিবর্তনের বিভিন্ন দিক নিয়ে আন্তর্জাতিক বিশেষজ্ঞদের অংশগ্রহণে বিশেষ সেমিনার।',
      images: [
        '/assets/images/gallery/seminar-2022-1.jpg',
        '/assets/images/gallery/seminar-2022-2.jpg'
      ],
      featuredImage: '/assets/images/gallery/seminar-2022-1.jpg',
      totalImages: 42,
      location: 'ইন্টারন্যাশনাল কনফারেন্স রুম',
      participants: 85,
      isFeatured: false
    },
    {
      id: 7,
      title: 'সাংস্কৃতিক অনুষ্ঠান ও পুরস্কার বিতরণী',
      category: 'cultural',
      year: '2024',
      date: '২৬ মার্চ, ২০২৪',
      description: 'স্বাধীনতা দিবস উপলক্ষে আয়োজিত সাংস্কৃতিক অনুষ্ঠান ও গবেষণায় অবদানের জন্য পুরস্কার বিতরণী ceremony।',
      images: [
        '/assets/images/gallery/cultural-2024-1.jpg',
        '/assets/images/gallery/cultural-2024-2.jpg',
        '/assets/images/gallery/cultural-2024-3.jpg'
      ],
      featuredImage: '/assets/images/gallery/cultural-2024-1.jpg',
      totalImages: 55,
      location: 'স্টাডি সেন্টার অডিটোরিয়াম',
      participants: 200,
      isFeatured: true
    },
    {
      id: 8,
      title: 'গবেষণা উপাত্ত সংগ্রহ প্রশিক্ষণ',
      category: 'workshop',
      year: '2022',
      date: '১৮ আগস্ট, ২০২২',
      description: 'গবেষণা উপাত্ত সংগ্রহের বিভিন্ন পদ্ধতি ও নৈতিক দিক নিয়ে বিশেষ প্রশিক্ষণ কর্মশালা।',
      images: [
        '/assets/images/gallery/workshop-2022-1.jpg',
        '/assets/images/gallery/workshop-2022-2.jpg'
      ],
      featuredImage: '/assets/images/gallery/workshop-2022-1.jpg',
      totalImages: 25,
      location: 'ট্রেনিং রুম, স্টাডি সেন্টার',
      participants: 40,
      isFeatured: false
    }
  ];

  // Filtered items for display
  filteredItems = [...this.galleryItems];

  // Lightbox state
  selectedAlbum: any = null;
  isLightboxOpen = false;
  currentImageIndex = 0;
  isLightboxFullscreen = false;

  // Apply filters
  applyFilters() {
    this.filteredItems = this.galleryItems.filter(item => {
      const matchesSearch = !this.searchTerm || 
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
      const matchesYear = this.selectedYear === 'all' || item.year === this.selectedYear;
      
      return matchesSearch && matchesCategory && matchesYear;
    });
  }

  // Clear all filters
  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedYear = 'all';
    this.filteredItems = [...this.galleryItems];
  }

  // Get category color
  getCategoryColor(category: string): string {
    const colors = {
      'seminar': 'bg-blue-100 text-blue-800 border border-blue-200',
      'workshop': 'bg-green-100 text-green-800 border border-green-200',
      'conference': 'bg-purple-100 text-purple-800 border border-purple-200',
      'research': 'bg-orange-100 text-orange-800 border border-orange-200',
      'cultural': 'bg-pink-100 text-pink-800 border border-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Get category text
  getCategoryText(category: string): string {
    const texts = {
      'seminar': 'সেমিনার',
      'workshop': 'ওয়ার্কশপ',
      'conference': 'কনফারেন্স',
      'research': 'গবেষণা',
      'cultural': 'সাংস্কৃতিক'
    };
    return texts[category as keyof typeof texts] || category;
  }

  // Open lightbox with album
  openLightbox(album: any, imageIndex: number = 0) {
    this.selectedAlbum = album;
    this.currentImageIndex = imageIndex;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  closeLightbox() {
    this.isLightboxOpen = false;
    this.selectedAlbum = null;
    this.currentImageIndex = 0;
    this.isLightboxFullscreen = false;
    document.body.style.overflow = 'auto';
  }

  // Navigate to next image
  nextImage() {
    if (this.selectedAlbum && this.currentImageIndex < this.selectedAlbum.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  // Navigate to previous image
  previousImage() {
    if (this.selectedAlbum && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  // Toggle fullscreen
  toggleFullscreen() {
    this.isLightboxFullscreen = !this.isLightboxFullscreen;
  }

  // Get featured items
  getFeaturedItems() {
    return this.galleryItems.filter(item => item.isFeatured);
  }

  // Get total images count
  getTotalImages(): number {
    return this.galleryItems.reduce((total, item) => total + item.totalImages, 0);
  }

  // Get events count by category
  getEventsCountByCategory(category: string): number {
    if (category === 'all') return this.galleryItems.length;
    return this.galleryItems.filter(item => item.category === category).length;
  }

  // Handle image loading errors
  handleImageError(event: any) {
    const imgElement = event.target;
    imgElement.style.display = 'none';
    
    // Create a fallback element
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-gray-200';
    fallbackDiv.innerHTML = `
      <div class="text-center text-gray-500">
        <i class="pi pi-image text-3xl mb-2"></i>
        <p class="text-sm bangla-font">ছবি লোড হয়নি</p>
      </div>
    `;
    
    imgElement.parentNode.insertBefore(fallbackDiv, imgElement.nextSibling);
  }
}