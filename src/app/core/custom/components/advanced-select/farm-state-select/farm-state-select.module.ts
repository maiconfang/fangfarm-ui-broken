import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FarmStateSelectComponent } from './farm-state-select.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    imports: [ CommonModule, TooltipModule.forRoot() ],
    declarations: [ FarmStateSelectComponent ],
    exports: [ FarmStateSelectComponent ]
  })
export class FarmStateSelectModule { }