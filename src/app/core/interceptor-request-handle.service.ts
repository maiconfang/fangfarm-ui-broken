import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';
import { StorageService } from '../shared/storage/storage.service';
import { catchError, flatMap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorRequestHandleService implements HttpInterceptor {

  private refreshTokenInProgress = false;

  constructor(private auth: AuthenticationService, private storate: StorageService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = this.storate.getLocalStorage('token');
    const authReq = this.applyCredentials(req, token);

    return next.handle(authReq)
      .pipe(
        catchError(err => {
          // if session expires
          if (err.status === 401 && authReq.url.endsWith('oauth/token')) {
            this.router.navigate(['/login']);
            return throwError(err);
          }
          if (err.status === 401 && !this.refreshTokenInProgress) {            
            this.refreshTokenInProgress = true;
            return this.auth.refreshToken().pipe(
              flatMap((res: any) => {
                return next.handle(this.applyCredentials(req, res.access_token)
                );
              }),
              finalize(() => {
                this.refreshTokenInProgress = false;
              })
            );
          }
          return throwError(err);
        }) //catchError 
      ) // pipe
  }


  private applyCredentials = (req: HttpRequest<any>, token: string) => {

    if (req.url.endsWith('oauth/token')) {
      return req.clone({
        withCredentials: true,
        setHeaders: {
          'Authorization': 'Basic ' + environment.basicAuth,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

    } else if (req.url.endsWith('/register')) {

      return req;

    } else if (req.url.startsWith('https://viacep.com.br')) {

      return req;

    } else if (req.url.endsWith('/importar')) {

      return req.clone({
        withCredentials: true,
        setHeaders: {
          'Authorization': `Bearer ${token}`,
        }
      });

    } else {

      return req.clone({
        withCredentials: true,
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

    }

  }

}
