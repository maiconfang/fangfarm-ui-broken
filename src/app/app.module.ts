import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { DialogConfirmacaoComponent } from './core/dialog-confirmacao/dialog-confirmacao.component';
import { MensagemToastService } from './core/mensagem-toast/mensagem.toast.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LassComponent } from './lass/lass.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader'

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DialogConfirmacaoComponent,
    LassComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [ MensagemToastService ],
  bootstrap: [AppComponent],
  entryComponents: [ DialogConfirmacaoComponent ]
})
export class AppModule { }