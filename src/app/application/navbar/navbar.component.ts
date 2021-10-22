
import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { StorageService } from '../../shared/storage/storage.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuarioLogado = this.storage.getLocalStorage('login');

  countEnvelopes: number;
  nomeUsuarioL: string;

  constructor(
    private navbarService: NavbarService,
    private storage: StorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
    ) {
    
  }

  ngOnInit() {
    
  }


  logout() {
    this.authenticationService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  toggleSideBar() {
    var element = document.querySelector(".sidebar");
  
    if (element.classList) {
      element.classList.toggle("hideSidebar");
    } else {
      var classes = element.className.split(" ");
      var i = classes.indexOf("hideSidebar");
  
      if (i >= 0)
        classes.splice(i, 1);
      else
        classes.push("hideSidebar");
      element.className = classes.join(" ");
    }
  }

}
