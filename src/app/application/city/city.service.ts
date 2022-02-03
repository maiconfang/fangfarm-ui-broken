import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';
import { CityFilter } from './city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService extends CrudServiceImpl {

  cityUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.cityUrl = `${environment.apiUrl}/v1/cities`;
  }

  getUrlResource(): string {
    return this.cityUrl;
  }

  listPaginated(filter: CityFilter, page: number, parameters = new HttpParams()): Observable<any> {

    if (filter.name) {
      parameters = parameters.set('name', filter.name);
    }

    if (filter.stateId) {
      parameters = parameters.set('stateId', filter.stateId);
    }

    return super.listPaginated(filter, page, parameters);
  }

  listAll(): Promise<any> {
    return this.http.get<any>(this.cityUrl)
      .toPromise()
      .then(response => response);
  }

  listAllNoPagination(): Promise<any> {
    console.log(this.cityUrl + "/noPagination");
    
    return this.http.get<any>(this.cityUrl + "/noPagination")
      .toPromise()
      .then(response => response);
  }

}
