import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';


import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [ProfileUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaginationTableModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot()
  ],
  exports: [ProfileUpdateComponent]
})
export class ProfileModule { }
