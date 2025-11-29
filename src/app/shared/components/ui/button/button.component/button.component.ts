// shared/components/ui/button/button.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'glass-light' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';

  get buttonClasses(): string {
    const baseClasses = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 smooth-transition';
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    const variantClasses = {
      primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:scale-105',
      secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-sm hover:scale-105',
      glass: 'glass text-neutral-700 hover:text-primary hover:scale-105',
      'glass-light': 'glass-light text-neutral-700 hover:text-primary hover:scale-105',
      outline: 'border border-neutral-300 text-neutral-700 hover:border-primary hover:text-primary bg-transparent hover:scale-105'
    };

    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : '';

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]} ${disabledClasses}`;
  }
}