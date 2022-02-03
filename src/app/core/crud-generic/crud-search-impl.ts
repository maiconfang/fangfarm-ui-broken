import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import { CrudServiceImpl } from 'src/app/core/crud-generic/crud-service-impl';
import { Page } from '../pagination-table/pagination-table';
import { MessageToastService } from '../message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';

export abstract class CrudSearchImpl {

    public entities = [];
    public page: Page;
    public form: FormGroup;
    protected modalRef: BsModalRef;
    public showGifWait = false;

    constructor(
        protected translate: TranslateService,
        protected service: CrudServiceImpl,
        protected toastService: MessageToastService,
        protected modalService: BsModalService) { }

    search(paginator = 0) {
        this.service.listPaginated(this.form.value, paginator)
            .subscribe(result => {
                this.page = result;
                this.entities = result.content;
            });
    }

    remove(entity: any) {
        this.service.remove(entity.id).subscribe(result => {
            this.toastService.showMessageSuccess(this.translate.instant('CRUD.MSG_SUCCESS_REMOVE'));
            this.search();
        });
    }

    confirmRemoval(entity: any, identification = '') {

        const initialState = {
            message: this.translate.instant('CRUD.MSG_CONFIRM_REMOVE') + `"` + identification + `" ?`
        };
        this.modalRef = this.modalService.show(DialogConfirmationComponent, { initialState });
        this.modalRef.content.eventConfirm.subscribe((value) => {
            this.remove(entity);
        });
    }

    changePage(event) {
        this.search(event.page);
    }

    abstract new();
}