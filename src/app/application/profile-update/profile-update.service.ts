import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';

@Injectable({
  providedIn: 'root'
})
export class ProfileUpdateService extends CrudServiceImpl {

  userUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.userUrl = `${environment.apiUrl}/v1/usserrs`;
  }

  getUrlResource(): string {
    return this.userUrl;
  }
  

}
