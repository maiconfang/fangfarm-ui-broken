
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRegisterComponent } from './vehicle-register/vehicle-register.component';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';
import { FarmBrandSelectModule } from 'src/app/core/custom/components/advanced-select/farm-brand-select/farm-brand-select.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [VehicleRegisterComponent, VehicleSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginationTableModule,
    FarmBrandSelectModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  exports: [VehicleRegisterComponent, VehicleSearchComponent]
})
export class VehicleModule { }
