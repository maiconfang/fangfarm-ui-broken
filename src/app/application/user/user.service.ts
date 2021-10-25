import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';
import { UserFilter } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudServiceImpl {

  userUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.userUrl = `${environment.apiURL}/v1/usuarios`;
  }

  getUrlResource(): string {
    return this.userUrl;
  }

  listPaginated(filter: UserFilter, page: number, parameters = new HttpParams()): Observable<any> {

    if (filter.nome) {
      parameters = parameters.set('nome', filter.nome);
    }

    if (filter.email) {
      parameters = parameters.set('email', filter.email);
    }

    return super.listPaginated(filter, page, parameters);
  }

  listAll(): Promise<any> {
    return this.http.get<any>(this.userUrl)
      .toPromise()
      .then(response => response);
  }
  

}
