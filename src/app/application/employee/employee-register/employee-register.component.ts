import { CrudRegisterImpl } from 'src/app/core/crud-generic/crud-register-impl';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../employee.service';
import { CityService } from '../../city/city.service';
import { MessageToastService } from '../../../core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';

import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent extends CrudRegisterImpl implements OnInit {

  titleEmployee: string;

  cities = [];

  constructor(
    private cityService: CityService,
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected employeeService: EmployeeService,
    protected toastService: MessageToastService) {
    super(translate, employeeService, toastService);
    this.createForm();
  }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.translate.get('EMPLOYEE.TITLE_EDIT').subscribe((text: string) => {
        this.titleEmployee = text;
      });
      this.findEntity(id);
    } else {
      this.translate.get('EMPLOYEE.TITLE_NEW').subscribe((text: string) => {
        this.titleEmployee = text
      });
    }

    this.loadCities();

  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      rg: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cpf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],

      address: this.formBuilder.group({
        zip: [],
        type: [],
        number: [],
        complement: [],
        block: [],

        city: this.formBuilder.group({
          id: [''],
          name: ['']
        })
      }),

    });

    
  }

  redirectAfterAdd(entity: any) {
    this.router.navigate(['/app/employee', entity.id]);
  }

  backToSearch() {
    this.router.navigate(['/employee']);
  }

  loadCities() {
    return this.cityService.listAll()
      .then(cities => {
        this.cities = cities._embedded.cities
        console.log(this.cities);
        
      })
      .catch();
  }

  onSelect(event: TypeaheadMatch) {
    var i = 0;
    while (i < this.cities.length) {
      if (this.cities[i].name === event.item.name) {
        this.form.value.address.city.id = this.cities[i].id;
        break;
      }
      i = i + 1;
    }
  }

  save() {
    delete this.form.value.address.city.name
    
    if (this.editing) {
      this.update();
    } else {
      this.add();
    }
  }


}
