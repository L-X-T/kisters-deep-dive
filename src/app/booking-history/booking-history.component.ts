import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-booking-history',
  imports: [CommonModule, SharedModule],
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent {}
