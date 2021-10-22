import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handle(errorResponse: any) {
    console.log('erro: ' + errorResponse);
    
  }
}
