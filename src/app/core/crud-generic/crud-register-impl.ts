import { FormGroup } from '@angular/forms';
import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';
import { MessageToastService } from '../message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';

export abstract class CrudRegisterImpl {

    public form: FormGroup;

    constructor(
        protected translate: TranslateService,
        protected service: CrudServiceImpl,
        protected toastService: MessageToastService) {}

    findEntity(id: number) {
        this.service.findById(id).subscribe( entity => {
            this.updateFormWithEntity(entity);
        });
    }

    save() {
        if (this.editing) {
            this.update();
        } else {
            this.add();
        }
    }

    add() {
        this.service.add(this.form.value).subscribe(entity => {
            this.toastService.showMessageSuccess(this.translate.instant('CRUD.MSG_SUCCESS_CREATED'));
            this.redirectAfterAdd(entity);
        });
    }

    update() {
        this.service.update(this.form.value).subscribe( entity => {
            this.toastService.showMessageSuccess(this.translate.instant('CRUD.MSG_SUCCESS_UPDATED'));
            this.updateFormWithEntity(entity);
        });
    }
    
    updateFormWithEntity(entity: any) {
        this.form.patchValue(entity);
    }

    get editing() {
        return Boolean(this.form.get('id').value);
    }

    abstract createForm();
    abstract redirectAfterAdd(entity: any);
    abstract backToSearch();
    
}