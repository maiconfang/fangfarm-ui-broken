import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class CrudServiceImpl {

    NUMBER_REGISTER_BY_PAGE = '10';

    constructor(protected http: HttpClient) {
    }

    list(): Observable<any> {
      return this.http.get(`${this.getUrlResource()}`);
    }

    listWithUrl(stringUrl: string): Observable<any> {
      return this.http.get(stringUrl);
    }

    add(entity: any): Observable<any> {
      return this.http.post(this.getUrlResource(), entity);
    }

    addWithUrl(stringUrl: string): Observable<any> {
      return this.http.put(stringUrl, null);
    }

    update(entity: any): Observable<any> {
        return this.http.put(`${this.getUrlResource()}/${entity.id}`, entity);
    }

    updatePassword(id: number, entity: any): Observable<any> {
      return this.http.put(`${this.getUrlResource()}/${id}/password`, entity);
  }

    remove(id: number): Observable<any> {
      return this.http.delete(`${this.getUrlResource()}/${id}`);
    }

    removeWithUrl(stringUrl: string): Observable<any> {
      return this.http.delete(stringUrl);
    }

    requestWithUrlPut(stringUrl: string, entity: any): Observable<any> {
      return this.http.put(stringUrl, entity);
    }

    findById(id: number): Observable<any> {
      return this.http.get(`${this.getUrlResource()}/${id}`);
    }

    findByUrl(stringUrl: string): Observable<any> {
      return this.http.get(stringUrl);
    }

    listPaginated(filter: any, page: number, parameters = new HttpParams()): Observable<any> {

      if (parameters == null){
        parameters = new HttpParams();
      }

      parameters = parameters.set('page', page.toString());
      parameters = parameters.set('size', this.NUMBER_REGISTER_BY_PAGE);

      const httpOptions = {
        params: parameters
      };

      return this.http.get(`${this.getUrlResource()}`, httpOptions);
    }

    listWithOutPagination(strMapping: String, parameters = new HttpParams()): Observable<any> {

      if (parameters == null){
        parameters = new HttpParams();
      }

      const httpOptions = {
        params: parameters
      };

      return this.http.get(`${this.getUrlResource()}`+ strMapping, httpOptions);
    }

    abstract getUrlResource(): string;
}