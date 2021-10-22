import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-confirmacao',
  templateUrl: './dialog-confirmacao.component.html',
  styleUrls: ['./dialog-confirmacao.component.css']
})
export class DialogConfirmacaoComponent implements OnInit {

  @Output() eventConfirm = new EventEmitter();

  message: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirm() {
    this.eventConfirm.emit(true);
    this.bsModalRef.hide();
  }
}
