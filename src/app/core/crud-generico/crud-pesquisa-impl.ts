import { DialogConfirmacaoComponent } from 'src/app/core/dialog-confirmacao/dialog-confirmacao.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import { CrudServiceImpl } from 'src/app/core/crud-generico/crud-service-impl';
import { Page } from '../paginacao-tabela/paginacao-tabela';
import { MensagemToastService } from '../mensagem-toast/mensagem.toast.service';
import { TranslateService } from '@ngx-translate/core';

export abstract class CrudPesquisaImpl {

    public entities = [];
    public page: Page;
    public form: FormGroup;
    protected modalRef: BsModalRef;
    public exibirGifAguarde = false;

    constructor(
        protected translate: TranslateService,
        protected service: CrudServiceImpl,
        protected toastService: MensagemToastService,
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
        this.modalRef = this.modalService.show(DialogConfirmacaoComponent, { initialState });
        this.modalRef.content.eventConfirm.subscribe((value) => {
            this.remove(entity);
        });
    }

    changePage(event) {
        this.search(event.page);
    }

    abstract new();
}