import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from './public.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './project/project.component';
import { ContactComponent } from './contact/contact.component';

import { SharedModule } from './../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from "ngx-spinner";

const routesPub: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'contact', component: ContactComponent },
    ]
  },
];

@NgModule({
  declarations: [
    PublicComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    ProjectComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesPub),
    SharedModule,
    TabsModule.forRoot(),
    NgxSpinnerModule,
  ], 
  exports: [
    PublicComponent, RouterModule
  ]
})
export class PublicModule { }
