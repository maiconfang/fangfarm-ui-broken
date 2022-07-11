import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';
import { VehicleFilter } from './vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends CrudServiceImpl {

  vehicleUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.vehicleUrl = `${environment.apiUrl}/v1/vehicles`;
  }

  getUrlResource(): string {
    return this.vehicleUrl;
  }

  listPaginated(filter: VehicleFilter, page: number, parameters = new HttpParams()): Observable<any> {

    if (filter.licensePlate) {
      parameters = parameters.set('licensePlate', filter.licensePlate);
    }

    if (filter.brandId) {
      parameters = parameters.set('brandId', filter.brandId);
    }

    return super.listPaginated(filter, page, parameters);
  }

  listAll(): Promise<any> {
    return this.http.get<any>(this.vehicleUrl)
      .toPromise()
      .then(response => response);
  }

  listAllNoPagination(): Promise<any> {
    
    return this.http.get<any>(this.vehicleUrl + "/noPagination")
      .toPromise()
      .then(response => response);
  }

}
