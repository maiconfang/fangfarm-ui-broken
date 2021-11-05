import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InterceptorRequestHandleService } from './interceptor-request-handle.service';
import { InterceptorResponseHandleService } from './interceptor-response-handle.service';

import { AppRoutingModule } from '../app-routing.module';

import { NgSelectModule } from '@ng-select/ng-select';
import { WrapperModule } from '../wrapper/wrapper.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './page-not-found.component';
import { NotAuthorizedComponent } from './not-authorized.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    NotAuthorizedComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgSelectModule,
    WrapperModule,
    BrowserAnimationsModule, // required for ToastrModule
    ToastrModule.forRoot() // ToastrModule added
  ],
  exports: [
    AppRoutingModule,
    NgSelectModule,
    BrowserAnimationsModule,
    ToastrModule,
    WrapperModule,
    TranslateModule,
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorRequestHandleService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorResponseHandleService, multi: true }
  ]
})
export class CoreModule { }
