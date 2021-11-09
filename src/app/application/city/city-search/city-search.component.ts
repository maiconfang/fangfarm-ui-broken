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
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent extends CrudSearchImpl implements OnInit {

  states = [];

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
    this.loadStates();
  }

  new() {
    this.router.navigate(['/city/new']);
  }

  confirmRemoval(entity: any, identification = '') {
    super.confirmRemoval(entity, entity.name);
  }

  loadStates() {
    return this.stateService.listAll()
      .then(cities => {
        this.states = cities._embedded.states
      })
      .catch();
  }

  search(paginator = 0) {
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
    this.populateDataForm(answerStateSelect);
  }

  onSelect(event: TypeaheadMatch) {
    var i = 0;
    while (i < this.states.length) {
      if (this.states[i].name === event.item.name) {
        this.form.value.name = this.states[i].name;
        this.form.value.id = this.states[i].id;

        break;
      }
      i = i + 1;
    }

    this.populateDataForm(this.form.value)
  }

  populateDataForm(data) {
    this.form.patchValue({
      stateId: data.id,

      state: {
        id: data.id,
        name: data.name
      }
    });

  }

  resetDataForm() {
    this.form.patchValue({
      name: null,
      stateId: null,

      state: {
        id: null,
        name: null,
      }
    });
  }



}
