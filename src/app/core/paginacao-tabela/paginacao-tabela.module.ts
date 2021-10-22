import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginacaoTabelaComponent } from './paginacao-tabela.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    imports: [ CommonModule, TooltipModule.forRoot() ],
    declarations: [ PaginacaoTabelaComponent ],
    exports: [ PaginacaoTabelaComponent ]
  })
export class PaginacaoTabelaModule { }