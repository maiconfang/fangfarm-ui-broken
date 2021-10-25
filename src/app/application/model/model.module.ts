
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRegisterComponent } from './model-register/model-register.component';
import { ModelSearchComponent } from './model-search/model-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [ModelRegisterComponent, ModelSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginationTableModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot()
  ],
  exports: [ModelRegisterComponent, ModelSearchComponent]
})
export class ModelModule { }
