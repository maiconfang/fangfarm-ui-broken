import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../shared/storage/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    private storage: StorageService
  ) {

    const browserLang = this.storage.getLocalStorage('current_lang');
    translate.use(browserLang.match(/PT-BR|EN/) ? browserLang : 'PT-BR');

  }

  ngOnInit() {
    this.toogleSubMenu();
  }

  toogleSubMenu() {
    const acc = document.querySelectorAll('.sidebar ul li a');
    let last;

    for (let i = 0; i < acc.length; i++) {

      acc[i].addEventListener('click', function () {

        if (last) {
          if (!this.parentElement.parentElement.classList.contains('toogleSubMenu')) {
            last.classList.toggle('toogleSubMenu');
          }
        }

        if (this.nextElementSibling) {
          if (this.nextElementSibling.nodeName === 'UL') {
            this.nextElementSibling.classList.toggle('toogleSubMenu');
            this.classList.toggle('activated');
            last = this.nextElementSibling;
          }
        } else {
          last.classList.toggle('toogleSubMenu');
          last.classList.toggle('activated');
        }

      });
    }
  }

}
