import { CrudPesquisaImpl } from 'src/app/core/crud-generico/crud-pesquisa-impl';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ModelService } from '../model.service';
import { MensagemToastService } from 'src/app/core/mensagem-toast/mensagem.toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-model-search',
  templateUrl: './model-search.component.html',
  styleUrls: ['./model-search.component.css'],
})
export class ModelSearchComponent extends CrudPesquisaImpl implements OnInit {

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected modelService: ModelService,
    protected toastService: MensagemToastService,
    protected modalService: BsModalService) {
    super(translate, modelService, toastService, modalService);
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: ['', [Validators.maxLength(100)]]
    });

    this.pesquisar();
  }

  novo() {
    this.router.navigate(['/model/new']);
  }

  confirmarExclusao(entidade: any, identificacao = '') {
    super.confirmarExclusao(entidade, entidade.name);
  }

  pesquisar(paginacao = 0) {
    this.service.listarPaginado(this.formulario.value, paginacao)
      .subscribe(data => {
        this.page = data.page;
        if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
          this.entidades = data._embedded.models
        } else
          this.entidades = [{}]
      });
  }

}
