import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';

import { Observable, Observer, Subject, takeUntil } from 'rxjs';
import { delay, share, startWith } from 'rxjs/operators';
import { AirportService } from './airport.service';

@Component({
  selector: 'app-airport',
  imports: [CommonModule],
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AirportComponent implements OnDestroy {
  protected isLoading = true;
  protected airports: string[] = [];

  private readonly cdr = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);

  protected readonly airports$: Observable<string[]> = inject(AirportService).findAll().pipe(
    // map((airports) => []),
    delay(200),
    share()
  );

  private readonly airportsObserver: Observer<string[]> = {
    next: (airports) => {
      console.log('next:', airports);
      this.airports = airports;
      this.isLoading = false;
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.error('error:', err);
      this.isLoading = false;
      this.cdr.markForCheck();
    },
    complete: () => {
      console.warn('complete!');
    }
  };

  // var 1 subscription (deprecated)
  private readonly airportsSubscription = this.airports$.subscribe(this.airportsObserver);

  // var 2 takeUntil (deprecated)
  private readonly onDestroySubject = new Subject<void>();
  protected readonly terminator$ = this.onDestroySubject.asObservable();

  // var 3b super lean with injector
  protected readonly airportsSuperLean$: Observable<string[]> = inject(AirportService).findAll().pipe(
    // map((airports) => []),
    delay(2000),
    share(),
    takeUntilDestroyed()
  );

  // var 4 toSignal
  protected readonly airportsToSignal = toSignal(this.airports$, {
    initialValue: []
  });

  // var 5 going crazy
  protected readonly airportsBack$ = toObservable(this.airportsToSignal);

  // what is the difference between airport$ and airportsBack$

  constructor() {
    // var 2 takeUntil (deprecated)
    this.airports$.pipe(takeUntil(this.terminator$)).subscribe(this.airportsObserver); // same Observer as in var 1

    // var 3a takeUntilDestroyed
    this.airports$.pipe(takeUntilDestroyed()).subscribe(this.airportsObserver); // same Observer as in var 1

    this.airports$.pipe(startWith([]), takeUntilDestroyed()).subscribe((airports) => {
      console.log('airports$:', airports);
    });

    this.airportsBack$.pipe(takeUntilDestroyed()).subscribe((airports) => {
      console.log('airportsBack$:', airports);
    });
  }

  ngOnDestroy(): void {
    // var 1 subscription (deprecated)
    this.airportsSubscription?.unsubscribe();

    // var 2 takeUntil (deprecated)
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }
}
