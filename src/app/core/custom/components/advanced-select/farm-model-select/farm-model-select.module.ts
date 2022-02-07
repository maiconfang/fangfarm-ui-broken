import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FarmModelSelectComponent } from './farm-model-select.component';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';
import { SharedModule } from 'src/app/shared/shared.module'; 


@NgModule({
    imports: [ 
      CommonModule, 
      PaginationTableModule, 
      SharedModule,
    ],
    declarations: [ 
      FarmModelSelectComponent 
    ],
    exports: [
      FarmModelSelectComponent 
      ]
  })
export class FarmModelSelectModule { }