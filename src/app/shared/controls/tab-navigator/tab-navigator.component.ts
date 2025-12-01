import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TabbedPaneService } from '../tabbed-pane/tabbed-pane.service';

@Component({
  selector: 'app-tab-navigator',
  templateUrl: './tab-navigator.component.html',
  styleUrls: ['./tab-navigator.component.scss']
})
export class TabNavigatorComponent {
  private readonly tabbedPaneService = inject(TabbedPaneService);

  page = 0;
  pageCount = 0;

  constructor() {
    this.tabbedPaneService.pageCount.pipe(takeUntilDestroyed()).subscribe((pageCount) => {
      this.pageCount = pageCount;
    });
    this.tabbedPaneService.currentPage.pipe(takeUntilDestroyed()).subscribe((page) => {
      this.page = page;
    });
  }

  prev(): void {
    if (this.page <= 1) {
      return;
    }
    this.page--;

    // Add: Notify service:
    this.tabbedPaneService.currentPage.next(this.page);
  }

  next(): void {
    if (this.page >= this.pageCount) {
      return;
    }
    this.page++;

    // Add: Notify service:
    this.tabbedPaneService.currentPage.next(this.page);
  }
}
