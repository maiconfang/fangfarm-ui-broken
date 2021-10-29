
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRegisterComponent } from './group-register/group-register.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [GroupRegisterComponent, GroupSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginationTableModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot()
  ],
  exports: [GroupRegisterComponent, GroupSearchComponent]
})
export class GroupModule { }
