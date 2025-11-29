// shared/components/ui/loading-spinner/loading-spinner.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'primary' | 'white' = 'primary';

  get spinnerClasses(): string {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8'
    };

    const variantClasses = {
      primary: 'text-primary',
      white: 'text-white'
    };

    return `pi pi-spinner pi-spin ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
  }
}