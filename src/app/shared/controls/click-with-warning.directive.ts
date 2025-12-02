import { Directive, input, output } from '@angular/core';

@Directive({
  selector: '[appClickWithWarning]',
  host: {
    class: 'btn btn-danger',
    '(click)': 'handleClick($event.shiftKey)'
  }
})
export class ClickWithWarningDirective {
  // add Input and Output
  readonly warning = input('Are you sure?');
  readonly appClickWithWarning = output<void>();

  // The logic inside the method remains exactly the same
  handleClick(shiftKey: boolean): void {
    if (shiftKey || confirm(this.warning())) {
      this.appClickWithWarning.emit();
    }
  }
}
