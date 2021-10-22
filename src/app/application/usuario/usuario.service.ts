import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generico/crud-service-impl';
import { UsuarioFiltro } from './usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudServiceImpl {

  usuarioUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.usuarioUrl = `${environment.apiURL}/v1/usuarios`;
  }

  getUrlResource(): string {
    return this.usuarioUrl;
  }

  listPaginated(filter: UsuarioFiltro, page: number, parameters = new HttpParams()): Observable<any> {

    if (filter.nome) {
      parameters = parameters.set('nome', filter.nome);
    }

    if (filter.email) {
      parameters = parameters.set('email', filter.email);
    }

    return super.listPaginated(filter, page, parameters);
  }

  listAll(): Promise<any> {
    return this.http.get<any>(this.usuarioUrl)
      .toPromise()
      .then(response => response);
  }
  

}
