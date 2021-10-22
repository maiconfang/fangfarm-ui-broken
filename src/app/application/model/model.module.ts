
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRegisterComponent } from './model-register/model-register.component';
import { ModelSearchComponent } from './model-search/model-search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginacaoTabelaModule } from 'src/app/core/paginacao-tabela/paginacao-tabela.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [ModelRegisterComponent, ModelSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginacaoTabelaModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot()
  ],
  exports: [ModelRegisterComponent, ModelSearchComponent]
})
export class ModelModule { }
