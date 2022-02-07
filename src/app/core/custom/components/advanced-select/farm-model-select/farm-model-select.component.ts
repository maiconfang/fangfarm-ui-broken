import { Component, Input, Output, OnInit, TemplateRef, EventEmitter  } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModelService } from 'src/app/application/model/model.service';
import { Page } from 'src/app/core/pagination-table/pagination-table'; 
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-farm-model-select',
  templateUrl: './farm-model-select.component.html',
  styleUrls: ['./farm-model-select.component.scss']
})
export class FarmModelSelectComponent implements OnInit {

  @Output() public modelSelectOutPut: EventEmitter<any> = new EventEmitter();

  public entitiesModelSelect = [];
  public pageModelSelect: Page;
  public form: FormGroup;
  
  
  modalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    protected modelService: ModelService,
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

  selectModel(entity: any){
    this.modelSelectOutPut.emit(entity)
    this.closeModalWithClass();
  }

  changePageSelect(event) {
    this.search(event.page);
  }

  search(paginator = 0) {
    this.modelService.listPaginated(this.form.value, paginator)
    .subscribe(data => {
      this.pageModelSelect = data.page;
      if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
        this.entitiesModelSelect = data._embedded.models
      } else
        this.entitiesModelSelect = []
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


