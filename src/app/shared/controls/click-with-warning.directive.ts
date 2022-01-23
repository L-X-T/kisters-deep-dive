import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appClickWithWarning]'
})
export class ClickWithWarningDirective {
  private readonly elementRef = inject(ElementRef);

  constructor() {
    this.elementRef.nativeElement.setAttribute('class', 'btn btn-danger');
  }
}
