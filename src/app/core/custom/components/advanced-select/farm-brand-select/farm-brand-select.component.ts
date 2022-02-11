import { Component, Input, Output, OnInit, TemplateRef, EventEmitter  } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BrandService } from 'src/app/application/brand/brand.service';
import { Page } from 'src/app/core/pagination-table/pagination-table'; 
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-farm-brand-select',
  templateUrl: './farm-brand-select.component.html',
  styleUrls: ['./farm-brand-select.component.scss']
})
export class FarmBrandSelectComponent implements OnInit {

  @Output() public brandSelectOutPut: EventEmitter<any> = new EventEmitter();

  public entitiesBrandSelect = [];
  public pageBrandSelect: Page;
  public form: FormGroup;
  
  
  modalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    protected brandService: BrandService,
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

  selectBrand(entity: any){
    this.brandSelectOutPut.emit(entity)
    this.closeModalWithClass();
    
  }

  changePageSelect(event) {
    this.search(event.page);
  }

  search(paginator = 0) {
    this.brandService.listPaginated(this.form.value, paginator)
    .subscribe(data => {
      this.pageBrandSelect = data.page;
      if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
        this.entitiesBrandSelect = data._embedded.brands
      } else
        this.entitiesBrandSelect = []
    });
      
  }

  resetDataForm() {
    this.form.patchValue({
      id: null,
      name: null,
    });
  }

  onEnter() {
    this.search();
  }


}


