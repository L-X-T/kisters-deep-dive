// src/app/flight-search/flight-search.component.ts

import { Component, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  standalone: false
})
export class FlightSearchComponent implements OnDestroy {
  from = 'Hamburg';
  to = 'Graz';
  selectedFlight: Flight | null = null;
  delayFilter = false;

  basket: { [key: number]: boolean } = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    3: true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    5: true
  };

  flightsSignal = signal<Flight[]>([]);
  private subscription?: Subscription;

  constructor(private flightService: FlightService) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get flights() {
    // We will refactor this to an observable in a later exercise!
    return this.flightService.flights;
  }

  search(): void {
    // this.flightService.load(this.from, this.to);

    this.subscription?.unsubscribe();
    this.subscription = this.flightService.find(this.from, this.to).subscribe((flights) => this.flightsSignal.set(flights));
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  delay(): void {
    // this.flightService.delay();

    if (this.flightsSignal().length > 0) {
      this.flightsSignal.mutate((flights) => {
        const ONE_MINUTE = 1000 * 60;
        const oldDate = new Date(flights[0].date);
        const newDate = new Date(oldDate.getTime() + 15 * ONE_MINUTE);
        flights[0].date = newDate.toISOString();
      });
    }
  }
}
