// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { CanComponentDeactivate } from '../../shared/deactivation/can-deactivate.guard';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';
import { FormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-flight-edit',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightEditComponent implements CanComponentDeactivate {
  private readonly flightService = inject(FlightService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  protected isLoading = true;
  protected isLoaded = false;

  readonly id = input(0);
  readonly showDetails = input(false);

  protected sender?: Observer<boolean>;
  protected showWarning = false;

  protected flight?: Flight;

  protected readonly editForm = this.fb.group({
    id: [1],
    from: [''],
    to: [''],
    date: ['']
  });

  constructor() {
    this.editForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((v) => {
      console.debug('valueChanges', v);
    });

    // instead we load this here and use a loading spinner!
    effect(() => {
      const flightId = this.id();
      console.log(flightId, this.id());

      this.flightService
        .findById('' + flightId)
        .pipe(delay(20), takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (flight) => {
            this.isLoading = false;
            this.flight = flight;
            this.editForm.patchValue(flight);
            this.isLoaded = true;
          },
          error: () => {
            this.isLoading = false;
            this.isLoaded = false;
          }
        });
    });
  }

  onRoute(): void {
    const showDetails = !this.showDetails;
    this.router
      .navigate(['flight-booking', 'flight-edit', this.id(), { showDetails }])
      .then(() => console.log('navigated to showDetails:', showDetails));
  }

  decide(decision: boolean): void {
    this.showWarning = false;
    if (this.sender) {
      this.sender.next(decision);
      this.sender.complete();
    }
  }

  canDeactivate(): Observable<boolean> {
    return new Observable((sender: Observer<boolean>) => {
      this.sender = sender;
      this.showWarning = true;
    });
  }

  save(): void {
    console.log(this.editForm?.value);
  }
}
