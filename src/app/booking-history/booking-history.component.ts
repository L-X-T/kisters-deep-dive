import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

// import { FlightSearchComponent } from '../flight-booking/flight-search/flight-search.component';

import { Flight } from '../flight-booking/flight';

@Component({
  selector: 'app-booking-history',
  imports: [CommonModule, SharedModule],
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {
  @ViewChild('pageTitle', { read: ViewContainerRef, static: true }) pageTitle?: ViewContainerRef;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flightSearchComponent: any;

  flights: Flight[] = [
    { id: 1, from: 'Hamburg', to: 'Berlin', date: '2025-02-01T17:00+01:00' },
    { id: 2, from: 'Hamburg', to: 'Frankfurt', date: '2025-02-01T17:30+01:00' },
    { id: 3, from: 'Hamburg', to: 'Mallorca', date: '2025-02-01T17:45+01:00' }
  ];

  async ngOnInit() {
    await this.createComponentBelowPageTitle();
  }

  delete(): void {
    console.debug('delete ...');
  }

  async createComponentBelowPageTitle() {
    console.log(this.pageTitle);

    if (this.pageTitle) {
      // load component dynamically
      const esm = await import('../flight-booking/flight-search/flight-search.component');

      // use via view container ref
      const componentRef = this.pageTitle.createComponent(esm.FlightSearchComponent);
      const flightSearchComponent = componentRef.instance;
      flightSearchComponent.from = 'Bern';
      flightSearchComponent.to = 'Graz';
      flightSearchComponent.search();
      // flightSearchComponent.delay(); // not working because flights are loaded async

      // use via ng component outlet
      this.flightSearchComponent = esm.FlightSearchComponent;
    }
  }
}
