import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfileUpdateService } from '../profile-update.service';
import { MessageToastService } from '../../../core/message-toast/message.toast.service';
import { CrudRegisterImpl } from 'src/app/core/crud-generic/crud-register-impl';
import { TranslateService } from '@ngx-translate/core';

import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent extends CrudRegisterImpl implements OnInit {

  form: FormGroup;
  titleUser: string;
  showPassword: boolean;

  userLoggedId = this.storage.getLocalStorage('user_id');

  constructor(
    private storage: StorageService,
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected profileUpdateService: ProfileUpdateService,
    protected toastService: MessageToastService) {
    super(translate, profileUpdateService, toastService)
    this.createForm();
  }


  ngOnInit() {

    console.log(" userLoggedId asdfdasf " +  this.userLoggedId);

    if (this.userLoggedId) {
      this.translate.get('USER.TITLE_EDIT').subscribe((text: string) => {
        this.titleUser = text;
        this.form.removeControl('password');
      });
      this.findEntity(this.userLoggedId);
    } else {
      console.log("nao pode cair aquiii, pois nao tem outra option");
      
    }

    if (typeof this.userLoggedId === 'undefined') {
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
