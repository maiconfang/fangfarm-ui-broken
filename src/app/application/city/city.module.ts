
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRegisterComponent } from './city-register/city-register.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [CityRegisterComponent, CitySearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginationTableModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  exports: [CityRegisterComponent, CitySearchComponent]
})
export class CityModule { }
