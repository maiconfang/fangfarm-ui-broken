import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';
import { BrandFilter } from './brand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends CrudServiceImpl {

  brandUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.brandUrl = `${environment.apiUrl}/v1/brands`;
  }

  getUrlResource(): string {
    return this.brandUrl;
  }

  listPaginated(filter: BrandFilter, page: number, parameters = new HttpParams()): Observable<any> {

    if (filter.name) {
      parameters = parameters.set('name', filter.name);
    }

    if (filter.modelId) {
      parameters = parameters.set('modelId', filter.modelId);
    }

    return super.listPaginated(filter, page, parameters);
  }

  listAll(): Promise<any> {
    return this.http.get<any>(this.brandUrl)
      .toPromise()
      .then(response => response);
  }

  listAllNoPagination(): Promise<any> {
    
    return this.http.get<any>(this.brandUrl + "/noPagination")
      .toPromise()
      .then(response => response);
  }

}
