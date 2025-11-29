// shared/components/ui/card/card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() variant: 'default' | 'glass' | 'glass-light' = 'default';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() hover: boolean = true;

  get cardClasses(): string {
    const baseClasses = 'rounded-xl border transition-all duration-200 smooth-transition';
    
    const variantClasses = {
      default: 'bg-white border-neutral-200 card-shadow',
      glass: 'glass border-white/80',
      'glass-light': 'glass-light border-white/60'
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const hoverClass = this.hover ? 'hover:card-shadow-hover hover-lift' : '';

    return `${baseClasses} ${variantClasses[this.variant]} ${paddingClasses[this.padding]} ${hoverClass}`;
  }
}