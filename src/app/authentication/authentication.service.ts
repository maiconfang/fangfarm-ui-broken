import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

import { StorageService } from '../shared/storage/storage.service';
import { Usuario } from './user-session.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private oauthTokenUrl: string;
  private revokeTokenUrl: string;

  constructor(
    private http: HttpClient, 
    private storage: StorageService,
    public translate: TranslateService
    ) {

    this.oauthTokenUrl = environment.apiURL + '/oauth';
    this.revokeTokenUrl = `${environment.apiURL}/v1/tokens`;
    

  }

  login(usuario: Usuario): Observable<string> {

    const body = `username=${usuario.login}&password=${usuario.pass}&grant_type=password`;

    return this.http.post<string>(this.oauthTokenUrl + '/token', body)

      .pipe(
        tap((res: any) => {
          this.storage.setLocalStorage('token', res.access_token);
          this.storage.setLocalStorage('login', usuario.login);
          this.storage.setLocalStorage('usuario_id', res.usuario_id);
          this.storage.setLocalStorage('current_lang', this.translate.currentLang);
        })

      );
  }

  refreshToken(): Observable<string> {

    const body = 'grant_type=refresh_token';

    return this.http.post<string>(this.oauthTokenUrl + '/token', body)
      .pipe(
        tap((res: any) => {
          this.storage.setLocalStorage('token', res.access_token)
        }),
        catchError((err: HttpErrorResponse) => {
          this.storage.setLocalStorage('token', null)
          this.storage.setLocalStorage('usuario', null)
          return throwError(err);
        })
      );

  }

  logout() {
    return this.http.delete(this.revokeTokenUrl + '/revoke', { withCredentials: true })
      .toPromise()
      .then(() => {
        console.log('FINALIZE')
        this.storage.setLocalStorage('token', null)
        this.storage.setLocalStorage('usuario', null)
      });
  }

  isTokenExpired() {
    console.log("isTokenExpired")
   }

  isTokenExits() { 
    console.log("isTokenExits")
  }

  isTokenValid() {
    console.log("isTokenValid")
  }

}
