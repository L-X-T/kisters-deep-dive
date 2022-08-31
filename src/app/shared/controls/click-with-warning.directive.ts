import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickWithWarning]',
  exportAs: 'clickWithWarning'
})
export class ClickWithWarningDirective {
 // add Input and Output
  @Input() warning = 'Are you sure?';
  @Output() appClickWithWarning = new EventEmitter<void>();

  @HostBinding('class') classBinding = 'btn btn-danger';

  // add HostListener
  @HostListener('click', ['$event.shiftKey', '$event'])
  handleClick(shiftKey: boolean, event?: PointerEvent): void {
    console.log(event);

    if (shiftKey || confirm(this.warning)) {
      this.appClickWithWarning.emit();
    }
  }
}
