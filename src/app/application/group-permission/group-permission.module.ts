import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';
import { GroupPermissionRegisterComponent } from './group-permission-register/group-permission-register.component';
import { GroupPermissionSearchComponent } from './group-permission-search/group-permission-search.component';

@NgModule({
  declarations: [GroupPermissionRegisterComponent, GroupPermissionSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    TooltipModule.forRoot(),
    PaginationTableModule,
  ],
  exports: [GroupPermissionRegisterComponent, GroupPermissionSearchComponent]
})
export class GroupPermissionModule { }
