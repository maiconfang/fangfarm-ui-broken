import { Component, OnInit } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  navbarOpen = false;

  constructor(
    public translate: TranslateService
  ) { 
    translate.addLangs(['PT-BR', 'EN']);
    translate.setDefaultLang('EN');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/PT-BR|EN/) ? browserLang : 'EN');
  }

  ngOnInit() {  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
