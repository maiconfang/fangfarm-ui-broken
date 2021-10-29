import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {

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
