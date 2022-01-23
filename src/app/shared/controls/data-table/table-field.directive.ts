import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableField]'
})
export class TableFieldDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input() appTableFieldAs = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public templateRef: TemplateRef<any>) {}
}
