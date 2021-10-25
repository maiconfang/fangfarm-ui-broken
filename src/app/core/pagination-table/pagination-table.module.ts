import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationTableComponent } from './pagination-table.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    imports: [ CommonModule, TooltipModule.forRoot() ],
    declarations: [ PaginationTableComponent ],
    exports: [ PaginationTableComponent ]
  })
export class PaginationTableModule { }