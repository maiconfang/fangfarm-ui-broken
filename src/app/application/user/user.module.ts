import { UserSearchComponent } from './user-search/user-search.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';
import { UserRegisterComponent } from './user-register/user-register.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [UserSearchComponent, UserRegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginationTableModule,
    TooltipModule.forRoot(),
  ],
  exports: [UserSearchComponent, UserRegisterComponent]
})
export class UserModule { }
