import { Directive, HostListener, ElementRef, OnInit, HostBinding, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appCanClick]',
})
export class CanClickDirective implements OnInit {
  @HostBinding('class.app-disabled') isDisabled = true;

  @Output() canClick = new EventEmitter();

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    if (this.isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.canClick.emit(e);
  }

  ngOnInit() {
    this.renderer.setProperty(this.element.nativeElement, 'title', 'Im Demo-Modus nicht verfügbar');
    this.isDisabled = true;
  }
}
