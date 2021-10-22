import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PaginacaoTabelaModule } from 'src/app/core/paginacao-tabela/paginacao-tabela.module';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';

@NgModule({
  declarations: [UsuarioPesquisaComponent, UsuarioCadastroComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginacaoTabelaModule
  ],
  exports: [UsuarioPesquisaComponent, UsuarioCadastroComponent]
})
export class UsuarioModule { }
