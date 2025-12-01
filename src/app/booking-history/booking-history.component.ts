import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabbedPaneComponent } from '../shared/controls/tabbed-pane/tabbed-pane.component';
import { TabComponent } from '../shared/controls/tab/tab.component';

@Component({
  selector: 'app-booking-history',
  imports: [CommonModule, TabbedPaneComponent, TabComponent],
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent {}
