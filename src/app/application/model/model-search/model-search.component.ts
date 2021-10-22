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
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(100)]]
    });

    this.search();
  }

  new() {
    this.router.navigate(['/model/new']);
  }

  confirmRemoval(entity: any, identification = '') {
    super.confirmRemoval(entity, entity.name);
  }

  search(paginator = 0) {
    this.service.listPaginated(this.form.value, paginator)
      .subscribe(data => {
        this.page = data.page;
        if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
          this.entities = data._embedded.models
        } else
          this.entities = [{}]
      });
  }

}
