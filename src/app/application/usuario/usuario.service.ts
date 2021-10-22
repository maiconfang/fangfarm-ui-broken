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

  listarPaginado(filtro: UsuarioFiltro, pagina: number, parametros = new HttpParams()): Observable<any> {

    if (filtro.nome) {
      parametros = parametros.set('nome', filtro.nome);
    }

    if (filtro.email) {
      parametros = parametros.set('email', filtro.email);
    }

    return super.listarPaginado(filtro, pagina, parametros);
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.usuarioUrl)
      .toPromise()
      .then(response => response);
  }
  

}
