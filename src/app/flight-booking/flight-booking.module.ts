// src/app/flight-booking/flight-booking.module.ts

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { RouterLink, RouterModule } from '@angular/router';
import { FLIGHT_BOOKING_ROUTES } from './flight-booking.routes';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FormsModule } from '@angular/forms';
import { StatusColorPipe } from '../shared/pipes/status-color.pipe';
import { DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { CityPipe } from '../shared/pipes/city.pipe';

@NgModule({
  imports: [
    RouterModule.forChild(FLIGHT_BOOKING_ROUTES),
    FormsModule,
    DatePipe,
    JsonPipe,
    NgFor,
    NgIf,
    CityPipe,
    RouterLink,
    StatusColorPipe,
    SharedModule
  ],
  declarations: [FlightSearchComponent, FlightCardComponent, PassengerSearchComponent, FlightBookingComponent, FlightEditComponent],
  exports: [FlightSearchComponent]
})
export class FlightBookingModule {}
