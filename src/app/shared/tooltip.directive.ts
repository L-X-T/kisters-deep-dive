import { Directive, EmbeddedViewRef, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input('appTooltip') template?: TemplateRef<unknown>;

  private viewRef?: EmbeddedViewRef<unknown>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  @HostListener('mouseover')
  show(): void {
    this.setHidden(false);
  }

  @HostListener('mouseout')
  hide(): void {
    this.setHidden(true);
  }

  ngOnInit(): void {
    if (!this.template) {
      return;
    }

    this.viewRef = this.viewContainerRef.createEmbeddedView(this.template);

    this.setHidden(true);
  }

  private setHidden(hidden: boolean): void {
    this.viewRef?.rootNodes.forEach((nativeElement) => {
      nativeElement.hidden = hidden;
    });
  }
}
