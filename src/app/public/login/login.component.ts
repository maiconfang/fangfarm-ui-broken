
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User, UserSession } from 'src/app/authentication/user-session.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  typeSelected: string;

  constructor(
    private auth: AuthenticationService,
    private user: UserSession,
    private router: Router,
    private fb: FormBuilder,
    private spinnerService: NgxSpinnerService
  ) { 

    this.createForm();
    this.doLoginAutomatic();
    this.typeSelected = 'pacman';
  }

  ngOnInit() {
  }

  createForm() {
    
    this.form = this.fb.group({
      "login": ['', Validators.required],
      "pass": ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit(form) {
    setTimeout(() => { this.spinnerService.show(); }, 30);
    this.auth.login(<User>this.form.value)
<<<<<<< HEAD
      .subscribe(
        data => {
          console.log('Redirect');
          this.router.navigate(['/app']);
        }
      );
  }
=======
    .subscribe(
      data => {
        this.spinnerService.hide();
        this.router.navigate(['/app']);
      }, error => {
        this.spinnerService.hide();
        
      }
    );
}
>>>>>>> 29f5fa2a3681f27eb3f7b0c49e3186313d3991c9

  doLoginAutomatic() {
    this.user.fethUser().then(res => {
      if (res && res.remember === true) {
        this.router.navigate(['/home']);
      } 
    })
  }


}
