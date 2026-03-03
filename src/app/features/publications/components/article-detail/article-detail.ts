import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, JournalArticle } from '../../../../core/api/service/publication/journal-service';
import { environment } from '../../../../../enviornments/enviornment';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.css'
})
export class ArticleDetail implements OnInit {
  articleId: number | null = null;
  article: JournalArticle | null = null;
  journal: any = null;
  isLoading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.articleId = +id;
        this.loadArticle();
      } else {
        this.error = 'Invalid article ID';
        this.isLoading = false;
      }
    });
  }

  loadArticle(): void {
    this.isLoading = true;
    this.apiService.getArticleDetail(this.articleId!).subscribe({
      next: (res) => {
        this.article = res.data;
        this.journal = res.journal;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load article details. Please try again later.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  getArticleLanguageLabel(langcode: string): string {
    if (langcode === 'en') return 'English';
    if (langcode === 'bn') return 'Bengali';
    if (langcode === 'both') return 'English & Bengali';
    return langcode;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return dateString;
    }
  }

  openPdfAtPage(): void {
    if (!this.articleId) return;
    const url = `${environment.apiUrl}/api/journals/articles/${this.articleId}/pdf/`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
