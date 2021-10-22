import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { FormMessagesErroComponent } from './form-messages-erro/form-messages-erro.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    FormDebugComponent,
    FormMessagesErroComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FormDebugComponent,
    FormMessagesErroComponent,
    RouterModule,
    NgxMaskModule,
    AlertModule,
    BsDropdownModule,
    TranslateModule
  ],
  providers: [

  ]
})
export class SharedModule { }
