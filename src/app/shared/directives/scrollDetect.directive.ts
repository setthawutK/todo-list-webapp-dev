import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[scrollDetect]',
  standalone: true,
})
export class ScrollDetectDirective implements AfterViewInit {
  @Output() endOfScroll = new EventEmitter<void>();
  @Output() hasScrolling = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.checkForScroll();
  }

  @HostListener('scroll', ['$event'])
  onScroll(): void {
    const container = this.el.nativeElement;

    if (Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight) {
      this.endOfScroll.emit();
    }
  }

  private checkForScroll(): void {
    const container = this.el.nativeElement;

    if (container.scrollHeight > container.clientHeight) {
      this.hasScrolling.emit(true);
    } else {
      this.endOfScroll.emit();
    }
  }
}
