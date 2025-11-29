// shared/components/ui/pagination/pagination.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;
  @Input() showPageNumbers: boolean = true;
  @Input() variant: 'default' | 'glass' = 'default';
  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  get containerClasses(): string {
    const baseClasses = 'flex items-center justify-between space-x-2';
    return baseClasses;
  }

  get buttonClasses(): string {
    const baseClasses = 'flex items-center justify-center rounded-lg transition-all duration-200 font-medium smooth-transition';
    
    const variantClasses = {
      default: 'glass-light text-neutral-700 hover:text-primary',
      glass: 'glass text-neutral-700 hover:text-primary'
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  get activeButtonClasses(): string {
    const baseClasses = 'flex items-center justify-center rounded-lg transition-all duration-200 font-medium smooth-transition bg-primary text-white';
    return baseClasses;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }
}