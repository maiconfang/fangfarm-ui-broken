import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';
import { GroupFilter } from './group';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends CrudServiceImpl {

  groupUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.groupUrl = `${environment.apiUrl}/v1/groups`;
  }

  getUrlResource(): string {
    return this.groupUrl;
  }

  listPaginated(filter: GroupFilter, page: number, parameters = new HttpParams()): Observable<any> {

    if (filter.name) {
      parameters = parameters.set('name', filter.name);
    }

    return super.listPaginated(filter, page, parameters);
  }

  listAll(): Promise<any> {
    return this.http.get<any>(this.groupUrl)
      .toPromise()
      .then(response => response);
  }

}
