import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorResponseHandleService implements HttpInterceptor {

  constructor(
    public toasterService: ToastrService,
    protected translate: TranslateService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(

      catchError(err => {
        if (err instanceof HttpErrorResponse) {

          switch (err.status) {
            case 400:
              if (err.error.error === 'invalid_grant') {

                this.translate.get('INTERCEPTOR.STATUS_400').subscribe((text: string) => {
                  this.presentToast('error', text);
                });

              } else {
                this.presentToast('error', err.error.detail);
              }
              break;
            case 401:
              if (err.error === null) {

                this.translate.get('INTERCEPTOR.STATUS_401').subscribe((text: string) => {
                  this.presentToast('error', text);
                });

              } else {
                const detail = err.error.error_description;
                if (detail && detail.startsWith('Invalid refresh token (expired)')) {

                  this.translate.get('INTERCEPTOR.TOKEN_EXPIRED').subscribe((text: string) => {
                    this.presentToast('error', text);
                  });

                } else if (detail && detail.startsWith('Full authentication is required')) {

                  this.translate.get('INTERCEPTOR.FULL_AUTHENTICATION').subscribe((text: string) => {
                    this.presentToast('error', text);
                  });

                }
              }
              break;
            case 403:
              let errors403 = err.error;
              let mensage403 = errors403.userMessage;
              this.presentToast('error', mensage403);
              break;
            case 404:

              this.translate.get('INTERCEPTOR.STATUS_404').subscribe((text: string) => {
                this.presentToast('error', text);
              });

              break;
            case 405:
              this.translate.get('INTERCEPTOR.STATUS_405').subscribe((text: string) => {
                this.presentToast('error', text);
              });
              break;
            case 409:
              let errors = err.error;
              let message = errors.userMessage;
              this.presentToast('error', message);
              break;
            case 500:
              this.translate.get('INTERCEPTOR.STATUS_500').subscribe((text: string) => {
                this.presentToast('error', text);
              });
              break;
            default:
              this.translate.get('INTERCEPTOR.STATUS_DEFAULT').subscribe((text: string) => {
                this.presentToast('error', text);
              });
              break;
          }

        }
        return throwError(err);
        //return of(err);
      }));

  }

  presentToast(type: string, msg: string) {

    if (type === 'error') {
      this.toasterService.error(msg, 'Opps!!', {
        //closeButton: true,
        positionClass: 'toast-bottom-right',
        timeOut: 5000,
        //onActivateTick: true
      });
    } else {
      this.toasterService.success(msg, 'Opps!!', {
        closeButton: true,
        positionClass: 'toast-bottom-right',
        timeOut: 5000,
        //onActivateTick: true
      });
    }


  }

}