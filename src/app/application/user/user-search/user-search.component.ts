import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { UserService } from '../user.service';
import { MessageToastService } from '../../../core/message-toast/message.toast.service';
import { CrudSearchImpl } from 'src/app/core/crud-generic/crud-search-impl';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent extends CrudSearchImpl implements OnInit {

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected userService: UserService,
    protected toastService: MessageToastService,
    protected modalService: BsModalService) {
      super(translate, userService, toastService, modalService);
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.maxLength(100)]]
    });

    super.search();
  }

  new() {
    this.router.navigate(['/usuario/novo']);
  }

  confirmRemoval(entity: any, identification = '') {
    super.confirmRemoval(entity, entity.username);
  }


  search(pagination = 0) {
  this.service.listPaginated(this.form.value, pagination)
    .subscribe(data => {
      this.page = data.page;
      if(data.page.totalElements > 0  ){
        this.entities = data._embedded.usuarios;
      } else 
      this.entities = [{}]
    });
}

}
