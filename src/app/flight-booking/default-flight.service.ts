import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from './flight';
import { FlightService } from './flight.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultFlightService implements FlightService {
  flights: Flight[] = [];
  readonly flightsSubject = new BehaviorSubject<Flight[]>([]);
  readonly flights$ = this.flightsSubject.asObservable();

  constructor(public http: HttpClient) {}

  load(from: string, to: string): void {
    const unhandledSubscription = this.find(from, to).subscribe({
      next: (flights) => {
        this.flightsSubject.next(flights);
        this.flights = flights;
      },
      error: (err) => {
        console.error('Error loading flights', err);
      }
    });
  }

  delay(): void {
    const ONE_MINUTE = 1000 * 60;
    const oldFlights = this.flights;
    const oldFlight = oldFlights[0];
    const oldDate = new Date(oldFlight.date);

    // Mutable
    // oldDate.setTime(oldDate.getTime() + 15 * ONE_MINUTE);
    // oldFlight.date = oldDate.toISOString();

    // Immutable
    const newDate = new Date(oldDate.getTime() + 15 * ONE_MINUTE);
    const newFlight: Flight = { ...oldFlight, date: newDate.toISOString() };
    const newFlights = [newFlight, ...oldFlights.slice(1)];
    this.flightsSubject.next(newFlights);
    this.flights = newFlights;

    // Alternatives
    // this.flights.splice(0, 1, newFlight);
    // this.flights = this.flights.map((f, i) => (i === 0 ? newFlight : f));
  }

  find(from: string, to: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams().set('from', from).set('to', to);

    return this.http.get<Flight[]>(url, { headers, params });
  }

  findById(id: string): Observable<Flight> {
    const url = 'http://www.angular.at/api/flight';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams().set('id', id);

    return this.http.get<Flight>(url, { headers, params });
  }
}
