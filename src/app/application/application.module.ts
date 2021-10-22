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
import { NaoAutorizadoComponent } from '../core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from '../core/pagina-nao-encontrada.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


const routesApp: Routes = [
  {
    path: 'app', component: ApplicationComponent,
    children: [

      { path: 'model', component: ModelSearchComponent },
      { path: 'model/new', component: ModelRegisterComponent },
      { path: 'model/:id', component: ModelRegisterComponent },
      { path: 'nao-autorizado', component: NaoAutorizadoComponent },
      { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent }
    ]
  },
];


@NgModule({
  declarations: [
    ApplicationComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesApp),
    SharedModule,
    ModelModule,
    TooltipModule.forRoot(),
  
  ],
  exports: [
    ApplicationComponent, RouterModule
  ],
  providers: [
    ModelService,
  
  ]
})
export class ApplicationModule { }
