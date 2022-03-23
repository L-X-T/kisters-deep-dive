// src/app/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DateComponent } from './date/date.component';
import { CityPipe } from './pipes/city.pipe';
import { StatusColorPipe } from './pipes/status-color.pipe';
import { StatusFilterPipe } from './pipes/status-filter.pipe';

import { TabbedPaneComponent } from './controls/tabbed-pane/tabbed-pane.component';
import { TabComponent } from './controls/tab/tab.component';
import { TabNavigatorComponent } from './controls/tab-navigator/tab-navigator.component';

import { ClickWithWarningDirective } from './controls/click-with-warning.directive';
import { TooltipDirective } from './tooltip.directive';
import { TableFieldDirective } from './controls/data-table/table-field.directive';
import { DataTableComponent } from './controls/data-table/data-table.component';

import { CityValidatorDirective } from './validation/city-validator.directive';
import { AsyncCityValidatorDirective } from './validation/async-city-validator.directive';
import { MultiFieldValidatorDirective } from './validation/multi-field-validator.directive';
import { AsyncMultiFieldValidatorDirective } from './validation/async-multi-field-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabbedPaneComponent,
    TabComponent,
    TabNavigatorComponent,
    ClickWithWarningDirective,
    TooltipDirective,
    TableFieldDirective,
    DataTableComponent,
    CityValidatorDirective,
    AsyncCityValidatorDirective,
    MultiFieldValidatorDirective,
    AsyncMultiFieldValidatorDirective
  ],
  declarations: [DateComponent, CityPipe, StatusColorPipe, StatusFilterPipe],
  exports: [
    CommonModule,
    FormsModule,
    DateComponent,
    CityPipe,
    StatusColorPipe,
    StatusFilterPipe,
    TabbedPaneComponent,
    TabComponent,
    TabNavigatorComponent,
    ClickWithWarningDirective,
    TooltipDirective,
    TableFieldDirective,
    DataTableComponent,
    CityValidatorDirective,
    AsyncCityValidatorDirective,
    MultiFieldValidatorDirective,
    AsyncMultiFieldValidatorDirective
  ]
})
export class SharedModule {}
