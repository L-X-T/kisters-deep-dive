import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';

import { TabbedPaneComponent } from '../tabbed-pane/tabbed-pane.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
  private readonly tabbedPaneComponent = inject(TabbedPaneComponent);
  readonly title = input.required<string>();
  readonly visible = signal(true);
}
