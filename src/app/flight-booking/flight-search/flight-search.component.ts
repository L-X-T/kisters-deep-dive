// src/app/flight-search/flight-search.component.ts

import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Flight } from '../flight';
import { FlightService } from '../flight.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightSearchComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly flightService = inject(FlightService);

  protected from = 'Hamburg';
  protected to = 'Graz';
  protected selectedFlight: Flight | null = null;
  protected delayFilter = false;

  private toggle = signal(false);

  protected readonly basket: { [key: number]: boolean } = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    3: true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    5: true
  };

  protected readonly flightsSubject = new BehaviorSubject<Flight[]>([]);
  protected readonly flights = signal<Flight[]>([]);

  protected readonly flightsLength = computed(() => this.flights().length);
  protected readonly hasFlights = computed(() => this.flightsLength() > 0);

  constructor() {
    effect(() => {
      console.log('Flights length: ', this.flightsLength());
      console.log('Has flights: ', this.hasFlights());
    });
  }

  protected search(): void {
    // this.flightService.load(this.from, this.to);

    this.flightService
      .find(this.from, this.to)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((flights) => {
        this.flightsSubject.next(flights);
        this.flights.set(flights);
      });
  }

  protected select(f: Flight): void {
    this.selectedFlight = f;
  }

  protected delay(): void {
    if (this.flights().length > 0) {
      this.flights.update((flights) => {
        const ONE_MINUTE = 1000 * 60;
        const oldDate = new Date(flights[0].date);
        const newDate = new Date(oldDate.getTime() + 15 * ONE_MINUTE);
        flights[0].date = newDate.toISOString();
        return flights;
      });

      const flights = this.flights();
      const ONE_MINUTE = 1000 * 60;
      const oldDate = new Date(flights[0].date);
      const newDate = new Date(oldDate.getTime() + 15 * ONE_MINUTE);
      flights[0].date = newDate.toISOString();
      this.flights.set(flights);
    }
  }

  protected updateToggle(): void {
    this.toggle.set(!this.toggle());
  }
}
