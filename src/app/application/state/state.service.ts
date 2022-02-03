import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';
import { StateFilter } from './state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService extends CrudServiceImpl {

  stateUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.stateUrl = `${environment.apiUrl}/v1/states`;
  }

  getUrlResource(): string {
    return this.stateUrl
  }

  listPaginated(filter: StateFilter, page: number, parameters = new HttpParams()): Observable<any> {

    if (filter.name) {
      parameters = parameters.set('name', filter.name);
    }

    return super.listPaginated(filter, page, parameters);
  }

  listAllNoPagination(): Promise<any> {
    return this.http.get<any>(this.stateUrl + "/noPagination")
      .toPromise()
      .then(response => response);
  }

}
