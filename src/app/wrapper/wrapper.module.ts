import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ApplicationModule } from './../application/application.module';
import { PublicModule } from './../public/public.module';
import { PublicComponent } from './../public/public.component';
import { WrapperComponent } from './wrapper.component';

const routes: Routes = [
/*   
  {
    path: '', component: WrapperComponent,
  },
 */
];


@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PublicModule,
    ApplicationModule
  ],
  exports: [WrapperComponent, RouterModule]
})
export class WrapperModule { }
