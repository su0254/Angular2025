import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonStyle]'
})
export class ButtonStyleDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setStyle();
  }

  private setStyle() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#007BFF');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.el.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px 20px');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '5px');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#0056b3');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#007BFF');
  }

}
