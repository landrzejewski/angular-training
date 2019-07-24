import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input()
  color: string;
  private readonly originalColor: string;

  constructor(private element: ElementRef) {
    this.originalColor = element.nativeElement.style.color;
  }

  @HostListener('mouseenter')
  mouseEnter() {
    this.highlight(this.color || 'yellow');
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.highlight(this.originalColor);
  }

  private highlight(color: string) {
    this.element.nativeElement.style.color = color;
  }

}
