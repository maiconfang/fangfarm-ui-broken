import { CrudSearchImpl } from 'src/app/core/crud-generic/crud-search-impl';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { GroupPermissionService } from '../group-permission.service';
import { MessageToastService } from 'src/app/core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';
import { GroupService } from '../../group/group.service';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-group-permission-search',
  templateUrl: './group-permission-search.component.html',
  styleUrls: ['./group-permission-search.component.scss']
})
export class GroupPermissionSearchComponent extends CrudSearchImpl implements OnInit {

  groupss = [];

  constructor(
    private groupService: GroupService,
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected groupPermissionService: GroupPermissionService,
    protected toastService: MessageToastService,
    protected modalService: BsModalService) {
    super(translate, groupPermissionService, toastService, modalService);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: ['']
    });

    this.loadGroup();
  }

  new() {
    this.router.navigate(['/group-permission/new']);
  }

  confirmRemoval(entity: any, identification = '') {
    const initialState = {
      message: `Deseja realmente excluir '${identification}'?`
    };
    this.modalRef = this.modalService.show(DialogConfirmationComponent, { initialState });
    this.modalRef.content.eventConfirm.subscribe((value) => {
      this.remove(entity);
    });
  }

  remove(entity: any) {
    const urlGroupPermission = this.groupPermissionService.getUrlResource() + this.form.value.id + "/permissions/" + entity.id;
    this.service.removeWithUrl(urlGroupPermission).subscribe(result => {
      this.toastService.showMessageSuccess("Excluído com sucesso");
      this.search();
    });
  }

  search(paginator = 0) {
    const urlGroupPermission = this.groupPermissionService.getUrlResource() + this.form.value.id + "/permissions"
    this.service.listWithUrl(urlGroupPermission)
      .subscribe(data => {
        try {
          this.page = data.page;
          this.entities = data._embedded.permssions;
          console.log("data._embedded.permssions");
          console.log(data._embedded.permssions);
          
          
        } catch (error) {
          this.entities = []
        }
      });
  }


  loadGroup() {
    return this.groupService.listAll()
      .then(group => {
        this.page = group.page;
        console.log(" loadGroup() {");
        
        console.log(group._embedded.groups);
        
        this.groupss = group._embedded.groups
      })
      .catch();
  }


}
