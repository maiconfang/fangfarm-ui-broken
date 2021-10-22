import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { UsuarioService } from '../usuario.service';
import { MensagemToastService } from './../../../core/mensagem-toast/mensagem.toast.service';
import { CrudPesquisaImpl } from 'src/app/core/crud-generico/crud-pesquisa-impl';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent extends CrudPesquisaImpl implements OnInit {

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected usuarioService: UsuarioService,
    protected toastService: MensagemToastService,
    protected modalService: BsModalService) {
      super(translate, usuarioService, toastService, modalService);
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.maxLength(100)]]
    });

    super.search();
  }

  new() {
    this.router.navigate(['/usuario/novo']);
  }

  confirmRemoval(entity: any, identification = '') {
    super.confirmRemoval(entity, entity.username);
  }


  search(paginacao = 0) {
  this.service.listPaginated(this.form.value, paginacao)
    .subscribe(data => {
      this.page = data.page;
      if(data.page.totalElements > 0  ){
        this.entities = data._embedded.usuarios;
      } else 
      this.entities = [{}]
    });
}

}
