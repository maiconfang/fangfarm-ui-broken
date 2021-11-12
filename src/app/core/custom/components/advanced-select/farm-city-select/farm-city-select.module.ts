import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FarmCitySelectComponent } from './farm-city-select.component';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';
import { SharedModule } from 'src/app/shared/shared.module'; 


@NgModule({
    imports: [ 
      CommonModule, 
      PaginationTableModule, 
      SharedModule,
    ],
    declarations: [ 
      FarmCitySelectComponent 
    ],
    exports: [
      FarmCitySelectComponent 
      ]
  })
export class FarmCitySelectModule { }