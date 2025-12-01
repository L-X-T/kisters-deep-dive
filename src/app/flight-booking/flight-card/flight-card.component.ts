// src/app/flight-card/flight-card.component.ts

import { Component, ElementRef, NgZone, OnChanges, OnInit, SimpleChanges, inject, input, model, output } from '@angular/core';
import { Flight } from '../flight';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
  standalone: false
})
export class FlightCardComponent implements OnInit, OnChanges {
  private readonly element = inject(ElementRef);
  private readonly zone = inject(NgZone);

  readonly item = input.required<Flight>();
  readonly selected = model(false);

  ngOnInit(): void {
    console.debug('ngOnInit', this.item());
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.debug('ngOnChanges', this.item());

    if (changes.item) {
      console.debug('ngOnChanges: item');
    }
    if (changes.selected) {
      console.debug('ngOnChanges: selected');
    }
  }

  blink(): void {
    // Dirty Hack used to visualize the change detector
    // let originalColor = this.element.nativeElement.firstChild.style.backgroundColor;
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';
    //              ^----- DOM-Element

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });
  }
}
