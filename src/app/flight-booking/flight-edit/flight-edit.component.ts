// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Observable, Observer, Subscription } from 'rxjs';
import { CanComponentDeactivate } from '../../shared/deactivation/can-deactivate.guard';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss'],
  standalone: false
})
export class FlightEditComponent implements OnInit, CanComponentDeactivate {
  isLoading = true;
  isLoaded = false;

  id = 0;
  showDetails = false;

  sender: Observer<boolean> | undefined;
  showWarning = false;

  flight: Flight | undefined;
  flightSubscription?: Subscription;

  constructor(private flightService: FlightService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url);
    console.log(this.route.snapshot);
    this.id = this.route.snapshot.params.id;
    this.showDetails = this.route.snapshot.params.showDetails;

    this.route.paramMap.pipe(delay(2000)).subscribe((p) => {
      console.log('route params received:', p);

      this.showDetails = p.get('showDetails') === 'true';
      console.log('showDetails set to:', this.showDetails);

      this.id = Number(p.get('id'));
      const idAsString = '' + this.id;
      console.log('number:', this.id);
      console.log('string:', idAsString);
    });

    // no resolver!
    /*this.route.data.subscribe((data) => {
      this.flight = data.flight;
    });*/

    // instead we load this here and use a loading spinner!
    this.flightSubscription = this.flightService
      .findById(this.route.snapshot.params.id)
      .pipe(delay(2_000))
      .subscribe({
        next: (flight) => {
          this.isLoading = false;
          this.flight = flight;
          this.isLoaded = true;
        },
        error: (flight) => {
          this.isLoading = false;
          this.isLoaded = false;
        }
      });
  }

  onRoute(): void {
    const showDetails = !this.showDetails;
    this.router
      .navigate(['flight-booking', 'flight-edit', this.id, { showDetails }])
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
}
