import { UserSearchComponent } from './user-search/user-search.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationTableModule } from 'src/app/core/pagination-table/pagination-table.module';
import { UserRegisterComponent } from './user-register/user-register.component';

@NgModule({
  declarations: [UserSearchComponent, UserRegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaginationTableModule
  ],
  exports: [UserSearchComponent, UserRegisterComponent]
})
export class UserModule { }
