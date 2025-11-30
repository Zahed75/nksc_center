import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './news-component.html',
  styleUrls: ['./news-component.css']
})
export class NewsComponent {
// Add this method to your component class
handleImageError(event: any) {
  const imgElement = event.target;
  imgElement.style.display = 'none';
  
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
  // Search and filter states
  searchTerm = '';
  selectedCategory = 'all';
  selectedYear = 'all';

  // Available categories and years
  categories = [
    { value: 'all', label: 'সব খবর' },
    { value: 'research', label: 'গবেষণা' },
    { value: 'seminar', label: 'সেমিনার' },
    { value: 'workshop', label: 'ওয়ার্কশপ' },
    { value: 'conference', label: 'কনফারেন্স' },
    { value: 'publication', label: 'প্রকাশনা' },
    { value: 'achievement', label: 'অর্জন' },
    { value: 'event', label: 'ইভেন্ট' },
    { value: 'announcement', label: 'ঘোষণা' }
  ];

  years = [
    { value: 'all', label: 'সব বছর' },
    { value: '2024', label: '২০২৪' },
    { value: '2023', label: '২০২৩' },
    { value: '2022', label: '২০২২' }
  ];

  // News data
  newsItems = [
    {
      id: 1,
      title: 'বার্ষিক গবেষণা সেমিনার ২০২৪ এর আয়োজন',
      category: 'seminar',
      year: '2024',
      date: '১৫ মার্চ, ২০২৪',
      summary: 'নাজমুল করিম স্টাডি সেন্টারের বার্ষিক গবেষণা সেমিনার ২০২৪ সফলভাবে সম্পন্ন হয়েছে। বিভিন্ন বিশ্ববিদ্যালয়ের গবেষকবৃন্দ তাদের গবেষণাপত্র উপস্থাপন করেন।',
      content: `নাজমুল করিম স্টাডি সেন্টারের বার্ষিক গবেষণা সেমিনার ২০২৪ গত ১৫ মার্চ সেন্টার প্রাঙ্গণে সফলভাবে সম্পন্ন হয়েছে। 
      এই সেমিনারে দেশের বিভিন্ন বিশ্ববিদ্যালয়ের ৫০ জন গবেষক তাদের গবেষণাপত্র উপস্থাপন করেন। 
      সমাজবিজ্ঞানের বিভিন্ন শাখায় মৌলিক গবেষণা প্রবন্ধ উপস্থাপন করা হয়।`,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'ড. নাজমুল করিম',
      readTime: '৩ মিনিট',
      isFeatured: true,
      isBreaking: false,
      tags: ['গবেষণা', 'সেমিনার', '২০২৪']
    },
    {
      id: 2,
      title: 'নতুন গবেষণা প্রকল্প: গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন',
      category: 'research',
      year: '2024',
      date: '১০ মার্চ, ২০২৪',
      summary: 'গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন বিষয়ক নতুন গবেষণা প্রকল্প চালু হয়েছে। এই গবেষণায় অংশ নিতে আগ্রহী গবেষকদের জন্য আবেদন খোলা আছে।',
      content: `গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন বিষয়ক একটি নতুন গবেষণা প্রকল্প নাজমুল করিম স্টাডি সেন্টারে চালু হয়েছে। 
      এই গবেষণা প্রকল্পে গ্রামীণ সমাজের অর্থনৈতিক, সাংস্কৃতিক ও রাজনৈতিক পরিবর্তন বিষয়ে গভীর গবেষণা করা হবে। 
      আগ্রহী গবেষকরা ৩০ মার্চের মধ্যে আবেদন করতে পারবেন।`,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'গবেষণা বিভাগ',
      readTime: '৪ মিনিট',
      isFeatured: true,
      isBreaking: true,
      tags: ['গবেষণা', 'প্রকল্প', 'গ্রামীণ উন্নয়ন']
    },
    {
      id: 3,
      title: 'জাতীয় সমাজবিজ্ঞান কনফারেন্স ২০২৪ এর প্রস্তুতি',
      category: 'conference',
      year: '2024',
      date: '৫ মার্চ, ২০২৪',
      summary: 'আগামী ডিসেম্বরে আয়োজিত জাতীয় সমাজবিজ্ঞান কনফারেন্স ২০২৪ এর প্রস্তুতি শুরু হয়েছে। গবেষণাপত্র জমা দেওয়ার শেষ তারিখ ৩০ সেপ্টেম্বর।',
      content: `আগামী ডিসেম্বর মাসে আয়োজিত হতে যাচ্ছে জাতীয় সমাজবিজ্ঞান কনফারেন্স ২০২৪। 
      এই কনফারেন্সে দেশ-বিদেশের খ্যাতনামা সমাজবিজ্ঞানী ও গবেষকবৃন্দ অংশগ্রহণ করবেন। 
      গবেষণাপত্র জমা দেওয়ার শেষ তারিখ ৩০ সেপ্টেম্বর, ২০২৪।`,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'কনফারেন্স কমিটি',
      readTime: '২ মিনিট',
      isFeatured: false,
      isBreaking: false,
      tags: ['কনফারেন্স', 'গবেষণাপত্র', 'জাতীয়']
    },
    {
      id: 4,
      title: 'সামাজিক গবেষণা পদ্ধতি বিষয়ক ওয়ার্কশপ',
      category: 'workshop',
      year: '2024',
      date: '২৮ ফেব্রুয়ারি, ২০২৪',
      summary: 'সামাজিক গবেষণার বিভিন্ন পদ্ধতি ও কৌশল নিয়ে বিশেষ ওয়ার্কশপের আয়োজন করা হয়েছে। অংশগ্রহণকারীদের জন্য সীমিত সংখ্যক আসন available।',
      content: `সামাজিক গবেষণার বিভিন্ন পদ্ধতি ও কৌশল নিয়ে দুই দিনব্যাপী বিশেষ ওয়ার্কশপের আয়োজন করা হয়েছে। 
      এই ওয়ার্কশপে অংশগ্রহণকারীদের হাতে-কলমে প্রশিক্ষণ প্রদান করা হবে। 
      সীমিত সংখ্যক আসন available থাকায় দ্রুত রেজিস্ট্রেশন করার অনুরোধ করা হলো।`,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'প্রশিক্ষণ বিভাগ',
      readTime: '৩ মিনিট',
      isFeatured: false,
      isBreaking: false,
      tags: ['ওয়ার্কশপ', 'প্রশিক্ষণ', 'গবেষণা পদ্ধতি']
    },
    {
      id: 5,
      title: 'নতুন গবেষণা জার্নাল প্রকাশিত',
      category: 'publication',
      year: '2024',
      date: '২০ ফেব্রুয়ারি, ২০২৪',
      summary: 'নাজমুল করিম স্টাডি সেন্টারের ত্রৈমাসিক গবেষণা জার্নালের নতুন সংখ্যা প্রকাশিত হয়েছে। এই সংখ্যায় ১৫টি গবেষণাপত্র সংকলন করা হয়েছে।',
      content: `নাজমুল করিম স্টাডি সেন্টারের ত্রৈমাসিক গবেষণা জার্নাল 'সমাজবিজ্ঞান গবেষণা'-এর নতুন সংখ্যা প্রকাশিত হয়েছে। 
      এই সংখ্যায় দেশের বিভিন্ন বিশ্ববিদ্যালয়ের গবেষকদের ১৫টি মৌলিক গবেষণাপত্র সংকলন করা হয়েছে। 
      জার্নালটি সেন্টার থেকে সংগ্রহ করা যাবে।`,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'প্রকাশনা বিভাগ',
      readTime: '২ মিনিট',
      isFeatured: false,
      isBreaking: false,
      tags: ['জার্নাল', 'প্রকাশনা', 'গবেষণাপত্র']
    },
    {
      id: 6,
      title: 'গবেষণা ফেলোশিপের জন্য আবেদন আহ্বান',
      category: 'announcement',
      year: '2024',
      date: '১৫ ফেব্রুয়ারি, ২০২৪',
      summary: 'এমফিল ও পিএইচডি গবেষকদের জন্য গবেষণা ফেলোশিপের আবেদন আহ্বান করা হয়েছে। আবেদনের শেষ তারিখ ৩১ মার্চ, ২০২৪।',
      content: `এমফিল ও পিএইচডি গবেষকদের জন্য গবেষণা ফেলোশিপের আবেদন আহ্বান করা হয়েছে। 
      এই ফেলোশিপের আওতায় গবেষকরা মাসিক ভাতা ও গবেষণা খরচ পাবেন। 
      আগ্রহী গবেষকরা ৩১ মার্চ, ২০২৪ তারিখের মধ্যে আবেদন করতে পারবেন।`,
      image: 'https://images.unsplash.com/photo-1582573618381-c9d34e162e08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'ফেলোশিপ কমিটি',
      readTime: '৩ মিনিট',
      isFeatured: false,
      isBreaking: true,
      tags: ['ফেলোশিপ', 'আবেদন', 'গবেষণা']
    },
    {
      id: 7,
      title: 'আন্তর্জাতিক গবেষণা সহযোগিতা চুক্তি',
      category: 'achievement',
      year: '2024',
      date: '১০ ফেব্রুয়ারি, ২০২৪',
      summary: 'যুক্তরাজ্যের অক্সফোর্ড বিশ্ববিদ্যালয়ের সাথে গবেষণা সহযোগিতা চুক্তি স্বাক্ষরিত হয়েছে। এই চুক্তির মাধ্যমে যৌথ গবেষণা প্রকল্প বাস্তবায়ন করা হবে।',
      content: `যুক্তরাজ্যের অক্সফোর্ড বিশ্ববিদ্যালয়ের সাথে গবেষণা সহযোগিতা চুক্তি স্বাক্ষরিত হয়েছে। 
      এই চুক্তির মাধ্যমে উভয় প্রতিষ্ঠানের গবেষকরা যৌথ গবেষণা প্রকল্প বাস্তবায়ন করবেন। 
      বিশেষ করে সামাজিক উন্নয়ন ও নগরায়ণ বিষয়ে গবেষণা করা হবে।`,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'আন্তর্জাতিক সম্পর্ক বিভাগ',
      readTime: '৪ মিনিট',
      isFeatured: true,
      isBreaking: false,
      tags: ['আন্তর্জাতিক', 'সহযোগিতা', 'চুক্তি']
    },
    {
      id: 8,
      title: 'বর্ষবরণ ও সাংস্কৃতিক অনুষ্ঠান',
      category: 'event',
      year: '2024',
      date: '১ জানুয়ারি, ২০২৪',
      summary: 'নতুন বছর ২০২৪ উপলক্ষে বর্ষবরণ ও সাংস্কৃতিক অনুষ্ঠানের আয়োজন করা হয়েছে। সেন্টারের সকল সদস্য ও শিক্ষার্থীদের আমন্ত্রণ।',
      content: `নতুন বছর ২০২৪ উপলক্ষে বর্ষবরণ ও সাংস্কৃতিক অনুষ্ঠানের আয়োজন করা হয়েছে। 
      এই অনুষ্ঠানে সেন্টারের সকল সদস্য, শিক্ষার্থী ও কর্মকর্তাদের আমন্ত্রণ জানানো হলো। 
      অনুষ্ঠানে সাংস্কৃতিক পরিবেশনা ও বিশেষ আপ্যায়নের ব্যবস্থা থাকবে।`,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'সাংস্কৃতিক কমিটি',
      readTime: '২ মিনিট',
      isFeatured: false,
      isBreaking: false,
      tags: ['বর্ষবরণ', 'সাংস্কৃতিক', 'অনুষ্ঠান']
    },
    {
      id: 9,
      title: 'গবেষণা ডেটা বিশ্লেষণ প্রশিক্ষণ',
      category: 'workshop',
      year: '2023',
      date: '১৫ ডিসেম্বর, ২০২৩',
      summary: 'গবেষণা ডেটা বিশ্লেষণের জন্য স্পেশালাইজড সফটওয়্যার প্রশিক্ষণের আয়োজন করা হয়েছে। অংশগ্রহণকারীদের জন্য সার্টিফিকেট প্রদান করা হবে।',
      content: `গবেষণা ডেটা বিশ্লেষণের জন্য স্পেশালাইজড সফটওয়্যার প্রশিক্ষণের আয়োজন করা হয়েছে। 
      এই প্রশিক্ষণে SPSS, NVivo, এবং R programming-এর উপর হাতে-কলমে শিক্ষা দেওয়া হবে। 
      অংশগ্রহণকারীদের জন্য সার্টিফিকেট প্রদান করা হবে।`,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'প্রশিক্ষণ বিভাগ',
      readTime: '৩ মিনিট',
      isFeatured: false,
      isBreaking: false,
      tags: ['প্রশিক্ষণ', 'ডেটা বিশ্লেষণ', 'সফটওয়্যার']
    },
    {
      id: 10,
      title: 'বার্ষিক প্রতিবেদন ২০২৩ প্রকাশ',
      category: 'publication',
      year: '2023',
      date: '৩১ ডিসেম্বর, ২০২৩',
      summary: 'নাজমুল করিম স্টাডি সেন্টারের বার্ষিক প্রতিবেদন ২০২৩ প্রকাশিত হয়েছে। এই প্রতিবেদনে সেন্টারের বছরের সকল কার্যক্রমের বিস্তারিত বিবরণ রয়েছে।',
      content: `নাজমুল করিম স্টাডি সেন্টারের বার্ষিক প্রতিবেদন ২০২৩ প্রকাশিত হয়েছে। 
      এই প্রতিবেদনে সেন্টারের বছরের সকল কার্যক্রম, গবেষণা প্রকল্প, প্রকাশনা ও অর্জনের বিস্তারিত বিবরণ রয়েছে। 
      প্রতিবেদনটি সেন্টারের ওয়েবসাইট থেকে ডাউনলোড করা যাবে।`,
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'প্রশাসনিক বিভাগ',
      readTime: '২ মিনিট',
      isFeatured: false,
      isBreaking: false,
      tags: ['প্রতিবেদন', 'বার্ষিক', '২০২৩']
    }
  ];

  // Filtered news for display
  filteredNews = [...this.newsItems];

  // Selected news for detail view
  selectedNews: any = null;
  isNewsDetailOpen = false;

  // Apply filters
  applyFilters() {
    this.filteredNews = this.newsItems.filter(news => {
      const matchesSearch = !this.searchTerm || 
        news.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        news.summary.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        news.content.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || news.category === this.selectedCategory;
      const matchesYear = this.selectedYear === 'all' || news.year === this.selectedYear;
      
      return matchesSearch && matchesCategory && matchesYear;
    });
  }

  // Clear all filters
  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedYear = 'all';
    this.filteredNews = [...this.newsItems];
  }

  // Get featured news
  getFeaturedNews() {
    return this.newsItems.filter(news => news.isFeatured);
  }

  // Get breaking news
  getBreakingNews() {
    return this.newsItems.filter(news => news.isBreaking);
  }

  // Get category color
  getCategoryColor(category: string): string {
    const colors = {
      'research': 'bg-blue-100 text-blue-800 border border-blue-200',
      'seminar': 'bg-green-100 text-green-800 border border-green-200',
      'workshop': 'bg-purple-100 text-purple-800 border border-purple-200',
      'conference': 'bg-orange-100 text-orange-800 border border-orange-200',
      'publication': 'bg-pink-100 text-pink-800 border border-pink-200',
      'achievement': 'bg-teal-100 text-teal-800 border border-teal-200',
      'event': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      'announcement': 'bg-red-100 text-red-800 border border-red-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Get category text
  getCategoryText(category: string): string {
    const texts = {
      'research': 'গবেষণা',
      'seminar': 'সেমিনার',
      'workshop': 'ওয়ার্কশপ',
      'conference': 'কনফারেন্স',
      'publication': 'প্রকাশনা',
      'achievement': 'অর্জন',
      'event': 'ইভেন্ট',
      'announcement': 'ঘোষণা'
    };
    return texts[category as keyof typeof texts] || category;
  }

  // Open news detail
  openNewsDetail(news: any) {
    this.selectedNews = news;
    this.isNewsDetailOpen = true;
    document.body.style.overflow = 'hidden';
  }

  // Close news detail
  closeNewsDetail() {
    this.isNewsDetailOpen = false;
    this.selectedNews = null;
    document.body.style.overflow = 'auto';
  }

  // Share news
  shareNews(news: any) {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.summary,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = window.location.href;
      navigator.clipboard.writeText(`${news.title}\n\n${news.summary}\n\n${url}`);
      alert('খবরটি ক্লিপবোর্ডে কপি করা হয়েছে!');
    }
  }

  // Get total news count
  getTotalNews(): number {
    return this.newsItems.length;
  }

  // Get news count by category
  getNewsCountByCategory(category: string): number {
    if (category === 'all') return this.newsItems.length;
    return this.newsItems.filter(news => news.category === category).length;
  }
}