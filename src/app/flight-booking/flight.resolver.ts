import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Flight } from './flight';
import { FlightService } from './flight.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlightResolver {
  constructor(private flightService: FlightService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Flight> {
    const id = route.params.id;
    return this.flightService.findById(id);
  }
}
