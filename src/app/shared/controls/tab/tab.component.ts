import { ChangeDetectionStrategy, Component, inject, Input, input, signal } from '@angular/core';
import { TabbedPaneComponent } from '../tabbed-pane/tabbed-pane.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
  @Input({ required: true }) title!: string;
  visible = true;

  constructor(public tabbedPaneComponent: TabbedPaneComponent) {
    this.tabbedPaneComponent.register(this);
  }
}
