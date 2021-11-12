import { CrudSearchImpl } from 'src/app/core/crud-generic/crud-search-impl';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { GroupService } from '../group.service';
import { MessageToastService } from 'src/app/core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.scss'],
})
export class GroupSearchComponent extends CrudSearchImpl implements OnInit {

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected groupService: GroupService,
    protected toastService: MessageToastService,
    protected modalService: BsModalService) {
    super(translate, groupService, toastService, modalService);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(100)]]
    });

    this.search();
  }

  new() {
    this.router.navigate(['/group/new']);
  }

  confirmRemoval(entity: any, identification = '') {
    super.confirmRemoval(entity, entity.name);
  }

  search(paginator = 0) {
    this.service.listPaginated(this.form.value, paginator)
      .subscribe(data => {
        this.page = data.page;
        if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
          this.entities = data._embedded.groups
        } else
          this.entities = []
      });
  }

}
