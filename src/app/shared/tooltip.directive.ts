import { ComponentRef, Directive, EmbeddedViewRef, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { FlightSearchComponent } from '../flight-booking/flight-search/flight-search.component';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input({ required: true }) appTooltip!: TemplateRef<unknown>;

  private embeddedViewRef?: EmbeddedViewRef<unknown>;
  private componentRef?: ComponentRef<FlightSearchComponent>;

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
    if (!this.appTooltip) {
      return;
    }

    // create view via template
    this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.appTooltip);

    // create view via component
    this.componentRef = this.viewContainerRef.createComponent(FlightSearchComponent);
    const flightSearchComponent = this.componentRef.instance;
    flightSearchComponent.from = 'Bern';
    flightSearchComponent.to = 'Graz';
    flightSearchComponent.search();
    // flightSearchComponent.delay(); // not working because flights are loaded async

    this.setHidden(true);
  }

  private setHidden(hidden: boolean): void {
    this.embeddedViewRef?.rootNodes.forEach((nativeElement) => {
      nativeElement.hidden = hidden;
    });
  }
}
