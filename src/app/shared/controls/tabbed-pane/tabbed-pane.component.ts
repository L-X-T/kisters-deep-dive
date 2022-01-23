import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { TabNavigatorComponent } from '../tab-navigator/tab-navigator.component';
import { TabbedPaneService } from './tabbed-pane.service';

@Component({
  selector: 'app-tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  imports: [TabNavigatorComponent],
  styleUrls: ['./tabbed-pane.component.scss']
})
export class TabbedPaneComponent implements OnInit, AfterContentInit, AfterViewInit {
  // @ContentChild(TabComponent)
  // tabComponent?: TabComponent;

  @ContentChildren(TabComponent)
  tabQueryList?: QueryList<TabComponent>;

  @ViewChild('navigator')
  navigator?: TabNavigatorComponent;

  // @ViewChildren(TabNavigatorComponent)
  // navigators?: QueryList<TabNavigatorComponent>;

  activeTab?: TabComponent;
  currentPage = 1;

  constructor(private service: TabbedPaneService) {}

  get tabs(): TabComponent[] {
    return this.tabQueryList?.toArray() ?? [];
  }

  ngOnInit(): void {
    console.log(this.tabs);
    console.log(this.navigator);
  }

  ngAfterContentInit(): void {
    if (this.tabs.length > 0) {
      console.log(this.tabs);
      this.activate(this.tabs[0]);
    }
  }

  ngAfterViewInit(): void {
    this.service.pageCount.next(this.tabs.length);
    this.service.currentPage.subscribe((page: number) => {
      // Prevent cycle:
      if (page === this.currentPage) {
        return;
      }
      this.pageChange(page);
    });
  }

  register(tab: TabComponent): void {
    this.tabs.push(tab);
  }

  activate(active: TabComponent): void {
    for (const tab of this.tabs) {
      tab.visible = tab === active;
    }
    this.activeTab = active;
    // Update:
    this.currentPage = this.tabs.indexOf(active) + 1;
    this.service.currentPage.next(this.currentPage);
  }

  pageChange(page: number): void {
    this.activate(this.tabs[page - 1]);
  }
}
