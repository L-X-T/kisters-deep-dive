import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFieldDirective } from './table-field.directive';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @ContentChildren(TableFieldDirective)
  fields: QueryList<TableFieldDirective> | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() data: any[] = [];

  get fieldList() {
    return this.fields?.toArray();
  }
}
