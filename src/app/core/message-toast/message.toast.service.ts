import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageToastService {

  constructor(private toasterService: ToastrService) { }

  showMessageSuccess(message: string) {
    this.toasterService.success(message, '', {
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showMessageAdvise(message: string, html = false) {
    this.toasterService.warning(message, '', {
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
      enableHtml: html,
    });
  }

}
