import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { MessageToastService } from '../../../core/message-toast/message.toast.service';
import { CrudRegisterImpl } from 'src/app/core/crud-generic/crud-register-impl';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent extends CrudRegisterImpl implements OnInit {

  form: FormGroup;
  titleUser: string;
  id: number;
  showPassword: boolean;

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected userService: UserService,
    protected toastService: MessageToastService) {
    super(translate, userService, toastService)
    this.createForm();
  }


  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.translate.get('USER.TITLE_EDIT').subscribe((text: string) => {
        this.titleUser = text;
        this.form.removeControl('password');
      });
      this.findEntity(this.id);
    } else {
      this.translate.get('USER.TITLE_NEW').subscribe((text: string) => {
        this.titleUser = text
      });
    }

    if (typeof this.id === 'undefined') {
      this.showPassword = true;
    }

  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      email: ['', [Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    });
  }

  redirectAfterAdd(entity: any) {
    this.router.navigate(['/app/user', entity.id]);
  }

  backToSearch() {
    this.router.navigate(['/user']);
  }

  update() {
    this.form.removeControl('password');
    this.service.update(this.form.value).subscribe(entity => {
      this.toastService.showMessageSuccess(this.translate.instant('CRUD.MSG_SUCCESS_UPDATED'));
      this.updateFormWithEntity(entity);
    });
  }

}
