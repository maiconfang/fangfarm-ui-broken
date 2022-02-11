import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FarmBrandSelectComponent } from './farm-brand-select.component';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';
import { SharedModule } from 'src/app/shared/shared.module'; 


@NgModule({
    imports: [ 
      CommonModule, 
      PaginationTableModule, 
      SharedModule,
    ],
    declarations: [ 
      FarmBrandSelectComponent 
    ],
    exports: [
      FarmBrandSelectComponent 
      ]
  })
export class FarmBrandSelectModule { }