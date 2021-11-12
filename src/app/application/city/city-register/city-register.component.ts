import { CrudRegisterImpl } from 'src/app/core/crud-generic/crud-register-impl';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CityService } from '../city.service';
import { MessageToastService } from '../../../core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';
import { StateService } from '../../state/state.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
  selector: 'app-city-register',
  templateUrl: './city-register.component.html',
  styleUrls: ['./city-register.component.scss']
})
export class CityRegisterComponent extends CrudRegisterImpl implements OnInit {

  titleCity: string;

  states = [];
  
  constructor(
    private stateService: StateService,
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected cityService: CityService,
    protected toastService: MessageToastService) {
    super(translate, cityService, toastService);
    this.createForm();
  }

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.translate.get('CITY.TITLE_EDIT').subscribe((text: string) => {
        this.titleCity = text;
      });
      this.findEntity(id);
    } else {
      this.translate.get('CITY.TITLE_NEW').subscribe((text: string) => {
        this.titleCity = text
      });
    }

    this.loadStates();

  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

      state: this.formBuilder.group({
        id: [null],
        name: ['', [Validators.required]],
      }),

    });

  }



  redirectAfterAdd(entity: any) {
    this.router.navigate(['/app/city', entity.id]);
  }

  backToSearch() {
    this.router.navigate(['/city']);
  }

  loadStates() {
    return this.stateService.listAllNoPagination()
      .then(states => {
        this.states = states._embedded.states
      })
      .catch();
  }

  onSelect(event: TypeaheadMatch) {
    var i = 0;
    while (i < this.states.length) {
      if (this.states[i].name === event.item.name) {
        this.form.value.state.id = this.states[i].id;
        break;
      }
      i = i + 1;
    }
  }

  save() {
    delete this.form.value.state.name
    
    if (this.editing) {
      this.update();
    } else {
      this.add();
    }
  }


}

