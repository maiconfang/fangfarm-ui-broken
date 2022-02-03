import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';  

@Injectable({
  providedIn: 'root'
})
export class GroupPermissionService  extends CrudServiceImpl {

  groupPermissionUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.groupPermissionUrl = `${environment.apiUrl}/v1/groups/`;
  }

  getUrlResource(): string {
    return this.groupPermissionUrl;
  }

}
