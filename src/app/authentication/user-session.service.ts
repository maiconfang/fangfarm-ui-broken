import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { StorageService } from '../shared/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserSession {

  helper = new JwtHelperService();

  constructor(private storage: StorageService) { }

  get user(): Usuario {
    return this.storage.getLocalStorage('usuario')
  }

  fethUser(): Promise<Usuario> {
    return Promise.resolve(this.storage.getLocalStorage('usuario'))
  }

  getUser(): Usuario {
    return this.storage.getLocalStorage('usuario')
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

  async setUserLogged(usuario: Usuario) {
    this.storage.setLocalStorage('usuario', usuario)
    return true;
  }

}

export interface Usuario {

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
