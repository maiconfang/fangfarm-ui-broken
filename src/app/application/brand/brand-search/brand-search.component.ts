import { CrudSearchImpl } from 'src/app/core/crud-generic/crud-search-impl';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { BrandService } from '../brand.service';
import { MessageToastService } from 'src/app/core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';
import { ModelService } from '../../model/model.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
  selector: 'app-brand-search',
  templateUrl: './brand-search.component.html',
  styleUrls: ['./brand-search.component.scss']
})
export class BrandSearchComponent extends CrudSearchImpl implements OnInit {

  models = [];

  constructor(
    protected modelService: ModelService,
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected brandService: BrandService,
    protected toastService: MessageToastService,
    protected modalService: BsModalService) {
    super(translate, brandService, toastService, modalService);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(100)]],
      modelId: [''],

      model: this.formBuilder.group({
        id: [null],
        name: [],
      }),

    });

    this.search();
    this.loadModels();
  }

  new() {
    this.router.navigate(['/brand/new']);
  }

  confirmRemoval(entity: any, identification = '') {
    super.confirmRemoval(entity, entity.name);
  }

  loadModels() {
    return this.modelService.listAllNoPagination()
      .then(brands => {
        this.models = brands._embedded.models
      })
      .catch();
  }

  search(paginator = 0) {
    this.service.listPaginated(this.form.value, paginator)
      .subscribe(data => {
        this.page = data.page;
        if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
          this.entities = data._embedded.brands
        } else
          this.entities = []
      });
  }

  recieveModelOfSelect(answerModelSelect) {
    console.log("recieveModelOfSelect");
    
    this.populateDataForm(answerModelSelect);
  }

  onSelect(event: TypeaheadMatch) {
    var i = 0;
    while (i < this.models.length) {
      if (this.models[i].name === event.item.name) {
        this.form.value.name = this.models[i].name;
        this.form.value.id = this.models[i].id;

        break;
      }
      i = i + 1;
    }

    this.populateDataForm(this.form.value)
  }

  populateDataForm(data) {
    console.log("populateDataForm");
    console.log(data);
    
    this.form.patchValue({
      modelId: data.id,

      model: {
        id: data.id,
        name: data.name
      }
    });

  }

  resetDataForm() {
    this.form.patchValue({
      name: null,
      modelId: null,

      model: {
        id: null,
        name: null,
      }
    });
  }



}
