import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';
import { ModelFilter } from './model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends CrudServiceImpl {

  modelUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.modelUrl = `${environment.apiUrl}/v1/models`;
  }

  getUrlResource(): string {
    return this.modelUrl;
  }

  listPaginated(filter: ModelFilter, page: number, parameters = new HttpParams()): Observable<any> {

    if (filter.name) {
      parameters = parameters.set('name', filter.name);
    }

    return super.listPaginated(filter, page, parameters);
  }

  listAll(): Promise<any> {
    return this.http.get<any>(this.modelUrl)
      .toPromise()
      .then(response => response);
  }

  listAllNoPagination(): Promise<any> {
    return this.http.get<any>(this.modelUrl + "/noPagination")
      .toPromise()
      .then(response => response);
  }

}
