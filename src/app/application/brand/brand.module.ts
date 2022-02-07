
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRegisterComponent } from './brand-register/brand-register.component';
import { BrandSearchComponent } from './brand-search/brand-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';
import { FarmModelSelectModule } from 'src/app/core/custom/components/advanced-select/farm-model-select/farm-model-select.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [BrandRegisterComponent, BrandSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginationTableModule,
    FarmModelSelectModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  exports: [BrandRegisterComponent, BrandSearchComponent]
})
export class BrandModule { }
