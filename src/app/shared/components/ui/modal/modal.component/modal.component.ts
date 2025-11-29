// shared/components/ui/modal/modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() closable: boolean = true;
  @Output() closed = new EventEmitter<void>();

  get modalSizeClasses(): string {
    return {
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl'
    }[this.size];
  }

  closeModal() {
    if (this.closable) {
      this.closed.emit();
    }
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget && this.closable) {
      this.closeModal();
    }
  }
}