import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  DestroyRef,
  effect,
  inject,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TabComponent } from '../tab/tab.component';
import { TabNavigatorComponent } from '../tab-navigator/tab-navigator.component';
import { TabbedPaneService } from './tabbed-pane.service';

@Component({
  selector: 'app-tabbed-pane',
  imports: [TabNavigatorComponent],
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbedPaneComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly tabbedPaneService = inject(TabbedPaneService);

  protected readonly tabs = contentChildren(TabComponent);
  protected readonly navigator = viewChild<TabNavigatorComponent>('navigator');

  private readonly hasTabs = computed(() => this.tabs().length > 0);

  protected activeTab?: TabComponent;
  private currentPage = 1;

  constructor() {
    effect(() => {
      if (this.hasTabs()) {
        this.activate(this.tabs()[0]);
      }
    });

    afterNextRender(() => {
      this.tabbedPaneService.pageCount.next(this.tabs().length);
      this.tabbedPaneService.currentPage.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((page) => {
        // Prevent cycle:
        if (page === this.currentPage) {
          return;
        }
        this.pageChange(page);
      });
    });
  }

  protected activate(active: TabComponent): void {
    for (const tab of this.tabs()) {
      tab.visible.set(tab === active);
    }
    this.activeTab = active;
    // Update:
    this.currentPage = this.tabs().indexOf(active) + 1;
    this.tabbedPaneService.currentPage.next(this.currentPage);
  }

  private pageChange(page: number): void {
    this.activate(this.tabs()[page - 1]);
  }
}
