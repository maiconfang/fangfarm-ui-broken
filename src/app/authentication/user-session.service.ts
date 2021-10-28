import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { StorageService } from '../shared/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserSession {

  helper = new JwtHelperService();

  constructor(private storage: StorageService) { }

  get user(): User {
    return this.storage.getLocalStorage('user')
  }

  fethUser(): Promise<User> {
    return Promise.resolve(this.storage.getLocalStorage('user'))
  }

  getUser(): User {
    return this.storage.getLocalStorage('user')
  }

  hasRole(...regra: string[]): boolean {

    if(this.storage.getLocalStorage('token') != null){

      const roules = this.helper.decodeToken(this.storage.getLocalStorage('token')).authorities;

      if(roules.includes('ROLE_IS_ADMIN')){
        return true
      } else {
        for (let i = 0; i < regra.length; i++) {
          if (roules.includes(regra[i])){
            return true
          } 
        }
      }

    }

    return false

  }

  async setUserLogged(user: User) {
    this.storage.setLocalStorage('user', user)
    return true;
  }

}

export interface User {

  id: number;
  pass: string;
  repass: string;
  username: string;
  remember: boolean;
  login: string;
  status: string;
  statusBoolean: boolean;
  confirmaSenha: string;
}
