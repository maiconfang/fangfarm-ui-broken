import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setLocalStorage(key: string, value: any) {
    if (value instanceof Object) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  getLocalStorage(key: string): any {
    if (localStorage.getItem(key)) {
      try {
        return JSON.parse(localStorage.getItem(key) || '{}')
      } catch (error) {
        return localStorage.getItem(key)
      }
    } else {
      return null
    }
  }

  fechLocalStorage(key: any): Promise<any>{
    return Promise.resolve(this.getLocalStorage(key)) 
  }

}
