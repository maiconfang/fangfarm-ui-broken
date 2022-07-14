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
  changePasswordForm: FormGroup;

  userLoggedId = this.storage.getLocalStorage('user_id');

  constructor(
    private storage: StorageService,
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    protected profileUpdateService: ProfileUpdateService,
    protected toastService: MessageToastService) {
    super(translate, profileUpdateService, toastService)
    this.createForm();
  }


  ngOnInit() {
    
    if (this.userLoggedId) {
      this.findEntity(this.userLoggedId);
    }

  }

  createForm() {

    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(11)]],
      newPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(11)]]
   
  })

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      email: ['', [Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(100)]]
    });
  }

  redirectAfterAdd(entity: any) {
    //this.router.navigate(['/app/user', entity.id]);
  }

  backToSearch() {
    //this.router.navigate(['/user']);
  }

  update() {
    this.service.update(this.form.value).subscribe(entity => {
      this.toastService.showMessageSuccess(this.translate.instant('CRUD.MSG_SUCCESS_UPDATED'));
      this.updateFormWithEntity(entity);
    });
  }

  updatePassword(){
    this.service.updatePassword(this.userLoggedId, this.changePasswordForm.value).subscribe(entity => {
      this.toastService.showMessageSuccess(this.translate.instant('PROFILE.MSG_SUCCESS_UPDATED_PASSWORD'));
      this.updateFormWithEntity(entity);
    });
  }

}
