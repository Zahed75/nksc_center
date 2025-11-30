import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer-wrapper',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  template: `
    <div class="flex-1 overflow-auto p-4">
      @if (isBrowser) {
        <pdf-viewer 
          [src]="pdfSrc"
          [page]="currentPage"
          [zoom]="zoomLevel"
          [style]="{'width': '100%', 'height': '100%'}"
          (after-load-complete)="onPdfLoad($event)"
          class="w-full h-full">
        </pdf-viewer>
      } @else {
        <div class="flex items-center justify-center h-full">
          <div class="text-center">
            <i class="pi pi-file-pdf text-4xl text-primary mb-4"></i>
            <p class="text-gray-600 bangla-font">PDF ভিউয়ার শুধুমাত্র ব্রাউজারে উপলব্ধ</p>
          </div>
        </div>
      }
    </div>
  `
})
export class PdfViewerWrapperComponent {
  @Input() pdfSrc: string = '';
  @Input() currentPage: number = 1;
  @Input() zoomLevel: number = 1.0;
  @Output() totalPages = new EventEmitter<number>();
  
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onPdfLoad(pdf: any) {
    this.totalPages.emit(pdf.numPages);
  }
}