// shared/components/ui/search-box/search-box.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @Input() placeholder: string = 'Search...';
  @Input() value: string = '';
  @Input() variant: 'default' | 'glass' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Output() valueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  get inputClasses(): string {
    const baseClasses = 'w-full bg-transparent border-none outline-none placeholder-neutral-400 smooth-transition';
    
    const sizeClasses = {
      sm: 'text-sm py-2',
      md: 'text-sm py-2.5',
      lg: 'text-base py-3'
    };

    return `${baseClasses} ${sizeClasses[this.size]}`;
  }

  get containerClasses(): string {
    const baseClasses = 'rounded-lg transition-all duration-200 flex items-center space-x-3 smooth-transition';
    
    const variantClasses = {
      default: 'bg-white border border-neutral-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
      glass: 'glass border border-white/60 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20'
    };

    const sizeClasses = {
      sm: 'px-3',
      md: 'px-4',
      lg: 'px-4'
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} hover-lift`;
  }

  onInputChange(value: string) {
    this.valueChange.emit(value);
  }

  onSearch() {
    this.search.emit(this.value);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}