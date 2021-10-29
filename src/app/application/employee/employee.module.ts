
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [EmployeeRegisterComponent, EmployeeSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginationTableModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  exports: [EmployeeRegisterComponent, EmployeeSearchComponent]
})
export class EmployeeModule { }
