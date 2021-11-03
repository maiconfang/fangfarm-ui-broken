import { Component, Input, Output, OnInit, TemplateRef, EventEmitter  } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-farm-state-select',
  templateUrl: './farm-state-select.component.html',
  styleUrls: ['./farm-state-select.component.scss']
})
export class FarmStateSelectComponent implements OnInit {

  back: string;
  next: string;

  private size: number = 10;
  private i: number;
  public page;
  @Input("page") public set value(page: any) {
    if (!page) return;
    this.page = page;
    this.setPagetion();
  }
  @Output() public paginationEvent: EventEmitter<any> = new EventEmitter();

  @Input() entitiesM;

  @Input() recebeFamilia;
  // Original
  //@Output() respostaFamilia = new EventEmitter();
  @Output() public respostaFamilia: EventEmitter<any> = new EventEmitter();
  //@Output() public paginationEvent: EventEmitter<any> = new EventEmitter();

  
  modalRef: BsModalRef;
  LABEL_STATE: string;
  nameState: string;

  constructor(
    protected translate: TranslateService,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {

    this.translate.get('PAGINATOR.BACK').subscribe((text: string) => {
      this.back = text;
    });
    
    this.translate.get('PAGINATOR.NEXT').subscribe((text: string) => {
      this.next = text;
    });
    //console.log(this.recebeFamilia);
    //console.log('Objeto familia recebido do component pai via Input: ', this.recebeFamilia);
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
    this.nameState = entity.name;
    this.closeModalWithClass();
    
  }

  reciverFeedback() {
    this.respostaFamilia.emit({"nome": "Raphella resp", "SobreNome": "Souza re"})
    console.log('Resposta para o component pai', this.respostaFamilia.emit({"nome": "Raphella resp", "SobreNome": "Souza re"}));
  }

  changePage(page?) {
    setTimeout(() => {
      this.paginationEvent.emit({ page: page ? page : 0, size: this.size });
    });
  }

  setPagetion() {
    let pages = new Array<number>();
    let inc = (this.page.number - 2) <= 0 ? (4 - this.page.number) : 2;
    let dec = (this.page.number + 2) >= this.page.totalPages ? (5 - (this.page.totalPages - this.page.number)) : 2;
    let inicio = (this.page.number - dec) <= 0 ? 0 : (this.page.number - dec);
    let fim = (this.page.number + inc) < this.page.totalPages ? (this.page.number + inc) : (this.page.totalPages - 1);
    for (let i = inicio; i <= fim; i++) {
      pages.push(i);
    }
    this.page.pages = pages;
  }

}


