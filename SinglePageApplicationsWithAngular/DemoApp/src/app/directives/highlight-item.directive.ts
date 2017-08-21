import { element } from 'protractor';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

const HIGHLIGHTED_CLASS_NAME = 'highlighted';
const DEFAULT_HIGHLIGHT_COLOR = 'blue';
const DEFAULT_FONT_COLOR = 'red';

@Directive({
  selector: '[appHighlightItem]'
})

export class HighlightItemDirective {
  private _bgColor;
  private _fontColor;

  @Input('highlight-color') set bgColor(bgColor: string) {
    this._bgColor = bgColor;
  }

  get bgColor(): string {
    return this._bgColor || DEFAULT_HIGHLIGHT_COLOR;
  }

  @Input('font-color') set fontColor(fontColor: string) {
    this._fontColor = fontColor;
  }

  get fontColor() {
    return this._fontColor || DEFAULT_FONT_COLOR;
  }

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('click') onItemClick() {
    if (this.elementRef.nativeElement.classList.contains(HIGHLIGHTED_CLASS_NAME)) {
      this.elementRef.nativeElement.style.background = '';
      this.elementRef.nativeElement.style.color = '';
      this.elementRef.nativeElement.classList.remove(HIGHLIGHTED_CLASS_NAME);
    } else {
      this.elementRef.nativeElement.style.background = this.bgColor;
      this.elementRef.nativeElement.style.color = this.fontColor;
      this.elementRef.nativeElement.classList.add(HIGHLIGHTED_CLASS_NAME);
    }
  }
}
