import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-elibrary-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './elibrary-component.html',
  styleUrls: ['./elibrary-component.css']
})
export class ElibraryComponent {
  // Search and filter states
  searchTerm = '';
  selectedCategory = '';
  selectedYear = '';
  selectedType = '';

  // Available categories, years, and types
  categories = [
    { value: 'sociology', label: 'সমাজবিজ্ঞান' },
    { value: 'research', label: 'গবেষণা' },
    { value: 'theory', label: 'তত্ত্ব' },
    { value: 'methodology', label: 'পদ্ধতিবিদ্যা' },
    { value: 'development', label: 'উন্নয়ন' },
    { value: 'gender', label: 'লিঙ্গ অধ্যয়ন' },
    { value: 'education', label: 'শিক্ষা' },
    { value: 'politics', label: 'রাজনীতি' }
  ];

  years = ['২০২৪', '২০২৩', '২০২২', '২০২১', '২০২০', '২০১৯'];
  types = [
    { value: 'book', label: 'বই' },
    { value: 'journal', label: 'জার্নাল' },
    { value: 'thesis', label: 'থিসিস' },
    { value: 'article', label: 'নিবন্ধ' },
    { value: 'report', label: 'রিপোর্ট' },
    { value: 'research-paper', label: 'গবেষণাপত্র' }
  ];

  // Sample eLibrary data matching NKSC theme
  elibraryItems = [
    {
      id: 1,
      title: 'সমাজবিজ্ঞানের মৌলিক তত্ত্ব',
      author: 'ড. নাজমুল করিম',
      category: 'sociology',
      type: 'book',
      year: '২০২৪',
      description: 'সমাজবিজ্ঞানের বিভিন্ন মৌলিক তত্ত্ব ও ধারণার উপর বিস্তারিত আলোচনা এবং বিশ্লেষণধর্মী আলোচনা সংকলন।',
      thumbnail: '/assets/images/elibrary/book-1.jpg',
      fileSize: '15.2 MB',
      pages: 320,
      language: 'বাংলা',
      rating: 4.8,
      downloads: 1250,
      isFeatured: true
    },
    {
      id: 2,
      title: 'গবেষণা পদ্ধতিবিদ্যা: একটি সমন্বিত দৃষ্টিভঙ্গি',
      author: 'প্রফেসর আব্দুল হাই',
      category: 'methodology',
      type: 'book',
      year: '২০২৩',
      description: 'সামাজিক বিজ্ঞান গবেষণার বিভিন্ন পদ্ধতি ও কৌশল সম্পর্কে বিস্তারিত নির্দেশিকা এবং ব্যবহারিক উদাহরণ।',
      thumbnail: '/assets/images/elibrary/book-2.jpg',
      fileSize: '12.8 MB',
      pages: 280,
      language: 'বাংলা',
      rating: 4.6,
      downloads: 980,
      isFeatured: false
    },
    {
      id: 3,
      title: 'বাংলাদেশের গ্রামীণ সমাজ কাঠামো: পরিবর্তন ও উন্নয়ন',
      author: 'ড. সালমা আক্তার',
      category: 'development',
      type: 'research-paper',
      year: '২০২৪',
      description: 'বাংলাদেশের গ্রামীণ সমাজের কাঠামোগত পরিবর্তন ও উন্নয়ন প্রক্রিয়া বিষয়ক গভীর গবেষণা ও বিশ্লেষণ।',
      thumbnail: '/assets/images/elibrary/research-1.jpg',
      fileSize: '8.5 MB',
      pages: 150,
      language: 'বাংলা',
      rating: 4.7,
      downloads: 750,
      isFeatured: true
    },
    {
      id: 4,
      title: 'Journal of Sociological Studies 2024',
      author: 'সমাজবিজ্ঞান বিভাগ',
      category: 'sociology',
      type: 'journal',
      year: '২০২৪',
      description: 'সাম্প্রতিক সমাজবিজ্ঞান গবেষণার উপর প্রকাশিত ত্রৈমাসিক জার্নাল। বিভিন্ন গবেষকের মৌলিক গবেষণাপত্র সংকলন।',
      thumbnail: '/assets/images/elibrary/journal-1.jpg',
      fileSize: '25.3 MB',
      pages: 180,
      language: 'ইংরেজি',
      rating: 4.9,
      downloads: 2100,
      isFeatured: true
    },
    {
      id: 5,
      title: 'নগরায়ণ ও সামাজিক পরিবর্তন: ঢাকা মহানগরীর প্রেক্ষাপট',
      author: 'ড. রহমত আলী',
      category: 'development',
      type: 'thesis',
      year: '২০২৩',
      description: 'নগরায়ণ প্রক্রিয়া ও সামাজিক পরিবর্তনের আন্তঃসম্পর্ক নিয়ে পিএইচডি থিসিস। ঢাকা মহানগরীর বিশেষ প্রেক্ষাপটে গবেষণা।',
      thumbnail: '/assets/images/elibrary/thesis-1.jpg',
      fileSize: '18.6 MB',
      pages: 420,
      language: 'বাংলা',
      rating: 4.5,
      downloads: 520,
      isFeatured: false
    },
    {
      id: 6,
      title: 'লিঙ্গ সমতা ও সামাজিক ন্যায়বিচার: বাংলাদেশের প্রেক্ষিত',
      author: 'ড. ফারহানা ইসলাম',
      category: 'gender',
      type: 'article',
      year: '২০২৪',
      description: 'লিঙ্গ সমতা প্রতিষ্ঠায় সামাজিক ন্যায়বিচারের ভূমিকা ও চ্যালেঞ্জ বিষয়ক গবেষণাধর্মী নিবন্ধ ও বিশ্লেষণ।',
      thumbnail: '/assets/images/elibrary/article-1.jpg',
      fileSize: '3.2 MB',
      pages: 45,
      language: 'বাংলা',
      rating: 4.8,
      downloads: 890,
      isFeatured: false
    },
    {
      id: 7,
      title: 'সামাজিক স্তরবিন্যাস তত্ত্ব: ক্লাসিক্যাল থেকে সমকালীন',
      author: 'ড. কামাল হোসেন',
      category: 'theory',
      type: 'book',
      year: '২০২২',
      description: 'সমাজের স্তরবিন্যাস সম্পর্কিত ক্লাসিক্যাল ও আধুনিক তত্ত্বগুলোর সমন্বিত বিশ্লেষণ এবং তুলনামূলক আলোচনা।',
      thumbnail: '/assets/images/elibrary/book-3.jpg',
      fileSize: '14.7 MB',
      pages: 310,
      language: 'বাংলা',
      rating: 4.4,
      downloads: 680,
      isFeatured: false
    },
    {
      id: 8,
      title: 'শিক্ষা ও সামাজিক গতিশীলতা: বাংলাদেশের অভিজ্ঞতা',
      author: 'ড. মোঃ আলমগীর',
      category: 'education',
      type: 'report',
      year: '২০২৪',
      description: 'শিক্ষার মাধ্যমে সামাজিক গতিশীলতা অর্জনের সম্ভাবনা ও সীমাবদ্ধতা বিষয়ক গবেষণা রিপোর্ট এবং সুপারিশমালা।',
      thumbnail: '/assets/images/elibrary/report-1.jpg',
      fileSize: '6.8 MB',
      pages: 120,
      language: 'বাংলা',
      rating: 4.6,
      downloads: 430,
      isFeatured: true
    },
    {
      id: 9,
      title: 'রাজনৈতিক সমাজবিজ্ঞান: তত্ত্ব ও প্রয়োগ',
      author: 'ড. সাজেদুর রহমান',
      category: 'politics',
      type: 'book',
      year: '২০২৩',
      description: 'রাজনৈতিক সমাজবিজ্ঞানের বিভিন্ন তত্ত্ব ও তার ব্যবহারিক প্রয়োগ সম্পর্কে সমন্বিত আলোচনা এবং বিশ্লেষণ।',
      thumbnail: '/assets/images/elibrary/book-4.jpg',
      fileSize: '16.3 MB',
      pages: 350,
      language: 'বাংলা',
      rating: 4.7,
      downloads: 920,
      isFeatured: false
    },
    {
      id: 10,
      title: 'সামাজিক গবেষণায় গুণগত পদ্ধতি',
      author: 'ড. নুসরাত জাহান',
      category: 'methodology',
      type: 'research-paper',
      year: '২০২৪',
      description: 'সামাজিক গবেষণায় গুণগত পদ্ধতির ব্যবহার, কৌশল এবং বিশ্লেষণ পদ্ধতি সম্পর্কে বিস্তারিত নির্দেশিকা।',
      thumbnail: '/assets/images/elibrary/research-2.jpg',
      fileSize: '7.2 MB',
      pages: 95,
      language: 'বাংলা',
      rating: 4.9,
      downloads: 610,
      isFeatured: true
    }
  ];

  // Filtered items for display
  filteredItems = [...this.elibraryItems];

  // Apply filters
  applyFilters() {
    this.filteredItems = this.elibraryItems.filter(item => {
      const matchesSearch = !this.searchTerm || 
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || item.category === this.selectedCategory;
      const matchesYear = !this.selectedYear || item.year === this.selectedYear;
      const matchesType = !this.selectedType || item.type === this.selectedType;
      
      return matchesSearch && matchesCategory && matchesYear && matchesType;
    });
  }

  // Clear all filters
  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedYear = '';
    this.selectedType = '';
    this.filteredItems = [...this.elibraryItems];
  }

  // Get category color - matching your publication component
  getCategoryColor(category: string): string {
    const colors = {
      'sociology': 'bg-blue-100 text-blue-800 border border-blue-200',
      'research': 'bg-green-100 text-green-800 border border-green-200',
      'theory': 'bg-purple-100 text-purple-800 border border-purple-200',
      'methodology': 'bg-orange-100 text-orange-800 border border-orange-200',
      'development': 'bg-teal-100 text-teal-800 border border-teal-200',
      'gender': 'bg-pink-100 text-pink-800 border border-pink-200',
      'education': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      'politics': 'bg-red-100 text-red-800 border border-red-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Get type color
  getTypeColor(type: string): string {
    const colors = {
      'book': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      'journal': 'bg-red-100 text-red-800 border border-red-200',
      'thesis': 'bg-amber-100 text-amber-800 border border-amber-200',
      'article': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      'report': 'bg-cyan-100 text-cyan-800 border border-cyan-200',
      'research-paper': 'bg-violet-100 text-violet-800 border border-violet-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  // Get category text
  getCategoryText(category: string): string {
    const texts = {
      'sociology': 'সমাজবিজ্ঞান',
      'research': 'গবেষণা',
      'theory': 'তত্ত্ব',
      'methodology': 'পদ্ধতিবিদ্যা',
      'development': 'উন্নয়ন',
      'gender': 'লিঙ্গ অধ্যয়ন',
      'education': 'শিক্ষা',
      'politics': 'রাজনীতি'
    };
    return texts[category as keyof typeof texts] || category;
  }

  // Get type text
  getTypeText(type: string): string {
    const texts = {
      'book': 'বই',
      'journal': 'জার্নাল',
      'thesis': 'থিসিস',
      'article': 'নিবন্ধ',
      'report': 'রিপোর্ট',
      'research-paper': 'গবেষণাপত্র'
    };
    return texts[type as keyof typeof texts] || type;
  }

  // Download item
  downloadItem(item: any) {
    // Implement download logic here
    console.log('Downloading:', item.title);
    // You can integrate with your download service
  }

  // Preview item
  previewItem(item: any) {
    // Implement preview logic here
    console.log('Previewing:', item.title);
    // You can integrate with your preview service
  }

  // Get total downloads
  getTotalDownloads(): number {
    return this.elibraryItems.reduce((total, item) => total + item.downloads, 0);
  }

  // Get count by type
  getCountByType(type: string): number {
    return this.elibraryItems.filter(item => item.type === type).length;
  }

  // Get featured items
  getFeaturedItems() {
    return this.elibraryItems.filter(item => item.isFeatured);
  }
}