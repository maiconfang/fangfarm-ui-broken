import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { UsuarioService } from '../usuario.service';
import { MensagemToastService } from './../../../core/mensagem-toast/mensagem.toast.service';
import { CrudPesquisaImpl } from 'src/app/core/crud-generico/crud-pesquisa-impl';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent extends CrudPesquisaImpl implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    protected usuarioService: UsuarioService,
    protected toastService: MensagemToastService,
    protected modalService: BsModalService) {
      super(usuarioService, toastService, modalService);
    }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.maxLength(100)]]
    });

    super.pesquisar();
  }

  novo() {
    this.router.navigate(['/usuario/novo']);
  }

  confirmarExclusao(entidade: any, identificacao = '') {
    super.confirmarExclusao(entidade, entidade.username);
  }


pesquisar(paginacao = 0) {
  this.service.listarPaginado(this.formulario.value, paginacao)
    .subscribe(data => {
      this.page = data.page;
      if(data.page.totalElements > 0  ){
        this.entidades = data._embedded.usuarios;
      } else 
      this.entidades = [{}]
    });
}

}
