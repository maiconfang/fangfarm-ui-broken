import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';
import { EmployeeFilter } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudServiceImpl {

  employeeUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.employeeUrl = `${environment.apiUrl}/v1/employees`;
  }

  getUrlResource(): string {
    return this.employeeUrl;
  }

  listPaginated(filter: EmployeeFilter, page: number, parameters = new HttpParams()): Observable<any> {

    if (filter.name) {
      parameters = parameters.set('name', filter.name);
    }

    return super.listPaginated(filter, page, parameters);
  }

  listAll(): Promise<any> {
    return this.http.get<any>(this.employeeUrl)
      .toPromise()
      .then(response => response);
  }

}
