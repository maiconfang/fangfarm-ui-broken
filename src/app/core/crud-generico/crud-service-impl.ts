import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class CrudServiceImpl {

    NR_REGISTRO_POR_PAGINA = '10';

    constructor(protected http: HttpClient) {
    }

    listar(): Observable<any> {
      return this.http.get(`${this.getUrlResource()}`);
    }

    listarComUrl(stringUrl: string): Observable<any> {
      return this.http.get(stringUrl);
    }

    adicionar(entidade: any): Observable<any> {
      return this.http.post(this.getUrlResource(), entidade);
    }

    adicionarComUrl(stringUrl: string): Observable<any> {
      return this.http.put(stringUrl, null);
    }

    atualizar(entidade: any): Observable<any> {
        return this.http.put(`${this.getUrlResource()}/${entidade.id}`, entidade);
    }

    excluir(id: number): Observable<any> {
      return this.http.delete(`${this.getUrlResource()}/${id}`);
    }

    excluirComUrl(stringUrl: string): Observable<any> {
      return this.http.delete(stringUrl);
    }

    requisicaoComUrlPut(stringUrl: string, entidade: any): Observable<any> {
      return this.http.put(stringUrl, entidade);
    }

    buscarPorID(id: number): Observable<any> {
      return this.http.get(`${this.getUrlResource()}/${id}`);
    }

    buscarPorUrl(stringUrl: string): Observable<any> {
      return this.http.get(stringUrl);
    }

    exportar(): Observable<any> {
      const httpOptions = {
        responseType: 'blob' as 'json'
      };
      return this.http.get(`${this.getUrlResource()}/exportar`, httpOptions);
    }

    importar(arquivo: any): Observable<any> {

      const formData = new FormData();
      formData.append('arquivo', arquivo);

      const httpOptions = {
        headers: new HttpHeaders()
      };

      return this.http.post(`${this.getUrlResource()}/importar`, formData, httpOptions);
    }

    listarPaginado(filtro: any, pagina: number, parametros = new HttpParams()): Observable<any> {

      if (parametros == null){
        parametros = new HttpParams();
      }

      parametros = parametros.set('page', pagina.toString());
      parametros = parametros.set('size', this.NR_REGISTRO_POR_PAGINA);

      const httpOptions = {
        params: parametros
      };

      return this.http.get(`${this.getUrlResource()}`, httpOptions);
    }

    listarSemPaginacao(strMapping: String, parametros = new HttpParams()): Observable<any> {

      if (parametros == null){
        parametros = new HttpParams();
      }

      const httpOptions = {
        params: parametros
      };

      return this.http.get(`${this.getUrlResource()}`+ strMapping, httpOptions);
    }

    abstract getUrlResource(): string;
}