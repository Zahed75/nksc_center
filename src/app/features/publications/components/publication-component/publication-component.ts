// publication-component.ts
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService, Journal, JournalArticle, FilterParams } from '../../../../core/api/service/publication/journal-service';

@Component({
  selector: 'app-publication-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './publication-component.html',
  styleUrls: ['./publication-component.css']
})
export class PublicationComponent implements OnInit, OnDestroy {
  // Publications data
  publications: Journal[] = [];
  filteredPublications: Journal[] = [];

  // Search/filter
  searchTerm = '';
  selectedYear: string = '';
  availableYears: number[] = [];

  // Loading states
  isLoading = false;
  isLoadingDetail = false;

  // ─── VIEW STATE ───
  // INLINE journal detail view (replaces the grid when a new journal is clicked)
  selectedJournal: Journal | null = null;

  // Step 1: article abstract preview (inline sidebar / right panel)
  selectedArticle: JournalArticle | null = null;
  isAbstractPreviewOpen = false;

  // Step 2: full article detail modal
  isFullDetailOpen = false;

  // Legacy PDF modal (old journals without articles)
  selectedPdfJournal: Journal | null = null;
  isPdfModalOpen = false;

  isBrowser: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private apiService: ApiService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.loadAllJournals();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // ─── DATA LOADING ───

  loadAllJournals() {
    this.isLoading = true;
    const sub = this.apiService.getAllJournals().subscribe({
      next: (response) => {
        if (response.code === 200) {
          this.publications = response.data;
          this.filteredPublications = response.data;
          this.availableYears = this.extractUniqueYears(response.data);
        }
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
    this.subscriptions.add(sub);
  }

  filterJournals() {
    this.isLoading = true;
    const params: FilterParams = { all: true };
    if (this.searchTerm.trim()) params.search = this.searchTerm;
    if (this.selectedYear) {
      params.year_from = parseInt(this.selectedYear, 10);
      params.year_to = parseInt(this.selectedYear, 10);
    }

    const sub = this.apiService.filterJournals(params).subscribe({
      next: (response) => {
        if (response.code === 200) this.filteredPublications = response.data;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
    this.subscriptions.add(sub);
  }

  private extractUniqueYears(journals: Journal[]): number[] {
    return [...new Set(journals.map(j => j.year))].sort((a, b) => b - a);
  }

  // ─── SEARCH & FILTER ───

  onSearch(searchTerm: string) { this.searchTerm = searchTerm; this.applyFilters(); }
  onYearFilter(year: string) { this.selectedYear = year; this.applyFilters(); }

  applyFilters() {
    if (this.searchTerm || this.selectedYear) {
      this.filterJournals();
    } else {
      this.filteredPublications = [...this.publications];
    }
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedYear = '';
    this.filteredPublications = [...this.publications];
  }

  // ─── OPEN JOURNAL: new journals show inline detail, old journals show PDF modal ───

  openJournal(journal: Journal) {
    if (journal.article_count > 0) {
      this.showJournalDetail(journal);
    } else {
      this.openPdfModal(journal);
    }
  }

  showJournalDetail(journal: Journal) {
    this.isLoadingDetail = true;
    this.isAbstractPreviewOpen = false;
    this.isFullDetailOpen = false;
    this.selectedArticle = null;
    this.selectedJournal = journal;

    if (!journal.articles || journal.articles.length === 0) {
      const sub = this.apiService.getJournalDetail(journal.id).subscribe({
        next: (response) => {
          if (response.code === 200) {
            const idx = this.publications.findIndex(j => j.id === journal.id);
            if (idx !== -1) this.publications[idx] = response.data;
            const fidx = this.filteredPublications.findIndex(j => j.id === journal.id);
            if (fidx !== -1) this.filteredPublications[fidx] = response.data;
            this.selectedJournal = response.data;
          }
          this.isLoadingDetail = false;
        },
        error: () => { this.isLoadingDetail = false; }
      });
      this.subscriptions.add(sub);
    } else {
      this.isLoadingDetail = false;
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeJournalDetail() {
    this.selectedJournal = null;
    this.isAbstractPreviewOpen = false;
    this.isFullDetailOpen = false;
    this.selectedArticle = null;
  }

  // ─── ARTICLE STEPS ───

  // Step 1: click article in list → show abstract preview
  openAbstractPreview(article: JournalArticle) {
    this.selectedArticle = article;
    this.isAbstractPreviewOpen = true;
    this.isFullDetailOpen = false;
  }

  closeAbstractPreview() {
    this.isAbstractPreviewOpen = false;
    this.selectedArticle = null;
    this.isFullDetailOpen = false;
  }

  // Step 2: click "View Full Article" → show full detail modal
  openFullDetail() {
    this.isFullDetailOpen = true;
  }

  closeFullDetail() {
    this.isFullDetailOpen = false;
  }

  // Keep backward-compat alias
  openArticleDetail(article: JournalArticle) {
    this.openAbstractPreview(article);
  }

  closeArticleDetail() {
    this.closeAbstractPreview();
  }

  // ─── LEGACY PDF MODAL ───

  openPdfModal(journal: Journal) {
    this.selectedPdfJournal = journal;
    this.isPdfModalOpen = true;
  }

  closePdfModal() {
    this.isPdfModalOpen = false;
    this.selectedPdfJournal = null;
  }

  openPdfInNewTab(journal: Journal) {
    if (this.isBrowser) {
      this.closePdfModal();
      window.open(journal.pdf_file, '_blank', 'noopener,noreferrer');
    }
  }

  // Open PDF at a specific page number using #page=N anchor
  openPdfAtPage(journal: Journal | null, pageNum?: number) {
    if (!this.isBrowser || !journal) return;
    const url = pageNum ? `${journal.pdf_file}#page=${pageNum}` : journal.pdf_file;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  downloadPdf(journal: Journal, event?: Event) {
    if (event) event.stopPropagation();
    if (!this.isBrowser) return;
    const link = document.createElement('a');
    link.href = journal.pdf_file;
    link.download = `${journal.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_').toLowerCase()}_vol${journal.volume}_${journal.year}.pdf`;
    link.click();
  }

  // ─── HELPERS ───

  formatFileSize(mb: string): string {
    const size = parseFloat(mb);
    if (size < 1) return `${(size * 1024).toFixed(0)} KB`;
    return `${size.toFixed(1)} MB`;
  }

  getEditorName(editor: string): string {
    return editor.replace('Professor Dr. ', 'Dr. ');
  }

  getShortDescription(description: string): string {
    if (!description) return 'No description available';
    return description.length > 120 ? description.substring(0, 120) + '...' : description;
  }

  getJournalBadgeClass(volume: string): string {
    const vol = parseInt(volume, 10);
    if (vol >= 15) return 'badge-emerald';
    if (vol >= 13) return 'badge-indigo';
    if (vol >= 10) return 'badge-amber';
    return 'badge-blue';
  }

  handleImageError(event: Event, publication: Journal): void {
    const img = event.target as HTMLImageElement;
    if (img) img.style.display = 'none';
  }

  getArticleLanguageLabel(lang: string): string {
    const map: Record<string, string> = { en: 'English', bn: 'Bengali', both: 'Bilingual' };
    return map[lang] || lang;
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  truncateAbstract(text: string, len = 200): string {
    if (!text) return '';
    return text.length > len ? text.substring(0, len) + '…' : text;
  }
}
