import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

import { SharedModule } from '../shared/shared.module';

import { ModelModule } from './model/model.module';
import { ModelService } from './model/model.service';
import { ModelRegisterComponent } from './model/model-register/model-register.component';
import { ModelSearchComponent } from './model/model-search/model-search.component';

import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserSearchComponent } from './user/user-search/user-search.component';

import { NotAuthorizedComponent } from '../core/not-authorized.component';
import { PageNotFoundComponent } from '../core/page-not-found.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CityModule } from './city/city.module';
import { CityService } from './city/city.service';
import { CityRegisterComponent } from './city/city-register/city-register.component';
import { CitySearchComponent } from './city/city-search/city-search.component';

import { StateModule } from './state/state.module';
import { StateService } from './state/state.service';
import { StateRegisterComponent } from './state/state-register/state-register.component';
import { StateSearchComponent } from './state/state-search/state-search.component';


const routesApp: Routes = [
  {
    path: 'app', component: ApplicationComponent,
    children: [

      { path: 'model', component: ModelSearchComponent },
      { path: 'model/new', component: ModelRegisterComponent },
      { path: 'model/:id', component: ModelRegisterComponent },

      { path: 'user', component: UserSearchComponent },
      { path: 'user/new', component: UserRegisterComponent },
      { path: 'user/:id', component: UserRegisterComponent },

      { path: 'city', component: CitySearchComponent },
      { path: 'city/new', component: CityRegisterComponent },
      { path: 'city/:id', component: CityRegisterComponent },

      { path: 'state', component: StateSearchComponent },
      { path: 'state/new', component: StateRegisterComponent },
      { path: 'state/:id', component: StateRegisterComponent },

      { path: 'not-authorized', component: NotAuthorizedComponent },
      { path: 'page-not-found', component: PageNotFoundComponent }
    ]
  },
];


@NgModule({
  declarations: [
    ApplicationComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesApp),
    SharedModule,
    ModelModule,
    UserModule,
    CityModule,
    StateModule,
    TooltipModule.forRoot(),
  
  ],
  exports: [
    ApplicationComponent, RouterModule
  ],
  providers: [
    ModelService,
    UserService,
    CityService,
    StateService,
  
  ]
})
export class ApplicationModule { }
