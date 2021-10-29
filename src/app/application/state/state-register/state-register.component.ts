import { CrudRegisterImpl } from 'src/app/core/crud-generic/crud-register-impl';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StateService } from '../state.service';
import { MessageToastService } from '../../../core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-state-register',
  templateUrl: './state-register.component.html',
  styleUrls: ['./state-register.component.css']
})
export class StateRegisterComponent extends CrudRegisterImpl implements OnInit {

  titleState: string;

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected stateService: StateService,
    protected toastService: MessageToastService) {
    super(translate, stateService, toastService);
    this.createForm();
  }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.translate.get('STATE.TITLE_EDIT').subscribe((text: string) => {
        this.titleState = text;
      });
      this.findEntity(id);
    } else {
      this.translate.get('STATE.TITLE_NEW').subscribe((text: string) => {
        this.titleState = text
      });
    }

  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      fs: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]]
    });
  }

  redirectAfterAdd(entity: any) {
    this.router.navigate(['/app/state', entity.id]);
  }

  backToSearch() {
    this.router.navigate(['/state']);
  }

}
