import { Component, Input, Output, OnInit, TemplateRef, EventEmitter  } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { StateService } from 'src/app/application/state/state.service'; 
import { Page } from 'src/app/core/pagination-table/pagination-table'; 
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-farm-state-select',
  templateUrl: './farm-state-select.component.html',
  styleUrls: ['./farm-state-select.component.scss']
})
export class FarmStateSelectComponent implements OnInit {

  @Output() public stateSelectOutPut: EventEmitter<any> = new EventEmitter();

  public entitiesStateSelect = [];
  public pageStateSelect: Page;
  public form: FormGroup;
  
  
  modalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    protected stateService: StateService,
    private modalService: BsModalService,
    ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(100)]]
    });

    this.search();

  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  closeModalWithClass() {
     this.modalService.hide();
  }

  selectState(entity: any){
    this.stateSelectOutPut.emit(entity)
    this.closeModalWithClass();
    
  }

  changePageSelect(event) {
    this.search(event.page);
  }

  search(paginator = 0) {
    this.stateService.listPaginated(this.form.value, paginator)
    .subscribe(data => {
      this.pageStateSelect = data.page;
      if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
        this.entitiesStateSelect = data._embedded.states
      } else
        this.entitiesStateSelect = [{}]
    });
      
  }



}


