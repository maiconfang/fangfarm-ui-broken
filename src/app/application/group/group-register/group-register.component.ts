import { CrudRegisterImpl } from 'src/app/core/crud-generic/crud-register-impl';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GroupService } from '../group.service';
import { MessageToastService } from '../../../core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group-register',
  templateUrl: './group-register.component.html',
  styleUrls: ['./group-register.component.scss']
})
export class GroupRegisterComponent extends CrudRegisterImpl implements OnInit {

  titleGroup: string;

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected groupService: GroupService,
    protected toastService: MessageToastService) {
    super(translate, groupService, toastService);
    this.createForm();
  }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.translate.get('GROUP.TITLE_EDIT').subscribe((text: string) => {
        this.titleGroup = text;
      });
      this.findEntity(id);
    } else {
      this.translate.get('GROUP.TITLE_NEW').subscribe((text: string) => {
        this.titleGroup = text
      });
    }

  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]]
    });
  }

  redirectAfterAdd(entity: any) {
    this.router.navigate(['/app/group', entity.id]);
  }

  backToSearch() {
    this.router.navigate(['/group']);
  }

}
