import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generico/crud-service-impl';
import { ModelFilter } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends CrudServiceImpl {

  modeloUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.modeloUrl = `${environment.apiURL}/v1/models`;
  }

  getUrlResource(): string {
    return this.modeloUrl;
  }

  listarPaginado(filtro: ModelFilter, pagina: number, parametros = new HttpParams()): Observable<any> {

    if (filtro.name) {
      parametros = parametros.set('name', filtro.name);
    }

    return super.listarPaginado(filtro, pagina, parametros);
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.modeloUrl)
      .toPromise()
      .then(response => response);
  }

}
