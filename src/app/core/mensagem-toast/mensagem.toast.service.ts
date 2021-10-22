import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MensagemToastService {

  constructor(private toasterService: ToastrService) { }

  exibirMensagemSucesso(mensagem: string) {
    this.toasterService.success(mensagem, '', {
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 8000,
    });
  }

  exibirMensagemAviso(mensagem: string, html = false) {
    this.toasterService.warning(mensagem, '', {
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 8000,
      enableHtml: html,
    });
  }

}
