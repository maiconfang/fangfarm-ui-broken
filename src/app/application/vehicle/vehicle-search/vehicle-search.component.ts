import { CrudSearchImpl } from 'src/app/core/crud-generic/crud-search-impl';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { VehicleService } from '../vehicle.service';
import { MessageToastService } from 'src/app/core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';
import { BrandService } from '../../brand/brand.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent extends CrudSearchImpl implements OnInit {

  brands = [];

  constructor(
    protected brandService: BrandService,
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected vehicleService: VehicleService,
    protected toastService: MessageToastService,
    protected modalService: BsModalService) {
    super(translate, vehicleService, toastService, modalService);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      color: ['', [Validators.maxLength(100)]],
      licensePlate: ['', [Validators.maxLength(100)]],
      brandId: [''],

      brand: this.formBuilder.group({
        id: [null],
        name: [],
      }),

    });

    this.search();
    this.loadBrands();
  }

  new() {
    this.router.navigate(['/vehicle/new']);
  }

  confirmRemoval(entity: any, identification = '') {
    super.confirmRemoval(entity, entity.name);
  }

  loadBrands() {
    return this.brandService.listAllNoPagination()
      .then(vehicles => {
        this.brands = vehicles._embedded.brands
      })
      .catch();
  }

  search(paginator = 0) {
    this.service.listPaginated(this.form.value, paginator)
      .subscribe(data => {
        this.page = data.page;
        if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
          this.entities = data._embedded.vehicles
        } else
          this.entities = []
      });
  }

  recieveBrandOfSelect(answerBrandSelect) {
    this.populateDataForm(answerBrandSelect);
  }

  onSelect(event: TypeaheadMatch) {
    var i = 0;
    while (i < this.brands.length) {
      if (this.brands[i].name === event.item.name) {
        this.form.value.name = this.brands[i].name;
        this.form.value.id = this.brands[i].id;

        break;
      }
      i = i + 1;
    }

    this.populateDataForm(this.form.value)
  }

  populateDataForm(data) {
    this.form.patchValue({
      brandId: data.id,

      brand: {
        id: data.id,
        name: data.name
      }
    });

  }

  resetDataForm() {
    this.form.patchValue({
      name: null,
      brandId: null,

      brand: {
        id: null,
        name: null,
      }
    });
  }



}
