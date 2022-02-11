import { CrudRegisterImpl } from 'src/app/core/crud-generic/crud-register-impl';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { VehicleService } from '../vehicle.service';
import { MessageToastService } from '../../../core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';
import { BrandService } from '../../brand/brand.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
  selector: 'app-vehicle-register',
  templateUrl: './vehicle-register.component.html',
  styleUrls: ['./vehicle-register.component.scss']
})
export class VehicleRegisterComponent extends CrudRegisterImpl implements OnInit {

  titleVehicle: string;

  brands = [];
  
  constructor(
    private brandService: BrandService,
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected vehicleService: VehicleService,
    protected toastService: MessageToastService) {
    super(translate, vehicleService, toastService);
    this.createForm();
  }

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.translate.get('VEHICLE.TITLE_EDIT').subscribe((text: string) => {
        this.titleVehicle = text;
      });
      this.findEntity(id);
    } else {
      this.translate.get('VEHICLE.TITLE_NEW').subscribe((text: string) => {
        this.titleVehicle = text
      });
    }

    this.loadBrands();

  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      licensePlate: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      color: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      year: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      fuel: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

      brand: this.formBuilder.group({
        id: [null],
        name: ['', [Validators.required]],
      }),

    });

  }



  redirectAfterAdd(entity: any) {
    this.router.navigate(['/app/vehicle', entity.id]);
  }

  backToSearch() {
    this.router.navigate(['/vehicle']);
  }

  loadBrands() {
    return this.brandService.listAllNoPagination()
      .then(brands => {
        this.brands = brands._embedded.brands
      })
      .catch();
  }

  onSelect(event: TypeaheadMatch) {
    var i = 0;
    while (i < this.brands.length) {
      if (this.brands[i].name === event.item.name) {
        this.form.value.brand.id = this.brands[i].id;
        break;
      }
      i = i + 1;
    }
  }

  save() {
    delete this.form.value.brand.name
    
    if (this.editing) {
      this.update();
    } else {
      this.add();
    }
  }


}

