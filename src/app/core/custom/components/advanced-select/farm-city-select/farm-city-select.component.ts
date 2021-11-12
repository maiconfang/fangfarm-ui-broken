import { Component, Input, Output, OnInit, TemplateRef, EventEmitter  } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CityService } from 'src/app/application/city/city.service';
import { Page } from 'src/app/core/pagination-table/pagination-table'; 
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-farm-city-select',
  templateUrl: './farm-city-select.component.html',
  styleUrls: ['./farm-city-select.component.scss']
})
export class FarmCitySelectComponent implements OnInit {

  @Output() public citySelectOutPut: EventEmitter<any> = new EventEmitter();

  public entitiesCitySelect = [];
  public pageCitySelect: Page;
  public form: FormGroup;
  
  
  modalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    protected cityService: CityService,
    private modalService: BsModalService,
    ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(100)]]
    });

    this.search();

  }

  openModalWithClass(template: TemplateRef<any>) {
    this.resetDataForm();
    this.search();
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  closeModalWithClass() {
    this.resetDataForm();
     this.modalService.hide();
  }

  selectCity(entity: any){
    this.citySelectOutPut.emit(entity)
    this.closeModalWithClass();
    
  }

  changePageSelect(event) {
    this.search(event.page);
  }

  search(paginator = 0) {
    this.cityService.listPaginated(this.form.value, paginator)
    .subscribe(data => {
      this.pageCitySelect = data.page;
      if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
        this.entitiesCitySelect = data._embedded.cities
      } else
        this.entitiesCitySelect = []
    });
      
  }

  resetDataForm() {
    this.form.patchValue({
      id: null,
      name: null,
      fs: null,
      
    });
  }

  onEnter() {
    this.search();
  }


}


