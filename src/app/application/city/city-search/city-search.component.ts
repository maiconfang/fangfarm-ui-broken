import { CrudSearchImpl } from 'src/app/core/crud-generic/crud-search-impl';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { CityService } from '../city.service';
import { MessageToastService } from 'src/app/core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';
import { StateService } from '../../state/state.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent extends CrudSearchImpl implements OnInit {

  constructor(
    protected stateService: StateService,
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected cityService: CityService,
    protected toastService: MessageToastService,
    protected modalService: BsModalService) {
    super(translate, cityService, toastService, modalService);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(100)]],
      stateId: [''],

      state: this.formBuilder.group({
        id: [null],
        name: [],
      }),

    });

    this.search();
  }

  new() {
    this.router.navigate(['/city/new']);
  }

  confirmRemoval(entity: any, identification = '') {
    super.confirmRemoval(entity, entity.name);
  }

  search(paginator = 0) {
    console.log("entrou no método search");

    console.log(this.form.value);


    this.service.listPaginated(this.form.value, paginator)
      .subscribe(data => {
        this.page = data.page;
        if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
          this.entities = data._embedded.cities
        } else
          this.entities = [{}]
      });
  }

  recieveStateOfSelect(answerStateSelect) {
    //console.log('Foi emitido o evento e chegou no pai >>>> ', answerStateSelect);
    //console.log(answerStateSelect.id);
    //  this.form.value.state.id = answerStateSelect.id
    //  this.form.value.state.name = answerStateSelect.name
    //  console.log(this.form.value.state);
    this.populaDadosForm(answerStateSelect);

  }

  populaDadosForm(dados) {
    this.form.patchValue({
      stateId: dados.id,

      state: {
        id: dados.id,
        name: dados.name
      }

    });
  }

}
