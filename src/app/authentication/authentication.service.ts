import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

import { StorageService } from '../shared/storage/storage.service';
import { User } from './user-session.service';
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

    this.oauthTokenUrl = environment.apiUrl + '/oauth';
    this.revokeTokenUrl = `${environment.apiUrl}/v1/tokens`;
    

  }

  login(user: User): Observable<string> {

    const body = `username=${user.login}&password=${user.pass}&grant_type=password`;

    return this.http.post<string>(this.oauthTokenUrl + '/token', body)

      .pipe(
        tap((res: any) => {
          this.storage.setLocalStorage('token', res.access_token);
          this.storage.setLocalStorage('login', user.login);
          this.storage.setLocalStorage('user_id', res.usserr_id);
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
          this.storage.setLocalStorage('user', null)
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
        this.storage.setLocalStorage('user', null)
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
