import { DialogConfirmacaoComponent } from 'src/app/core/dialog-confirmacao/dialog-confirmacao.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import { CrudServiceImpl } from 'src/app/core/crud-generico/crud-service-impl';
import { Page } from '../paginacao-tabela/paginacao-tabela';
import { MensagemToastService } from '../mensagem-toast/mensagem.toast.service';
import { TranslateService } from '@ngx-translate/core';

export abstract class CrudPesquisaImpl {

    public entidades = [];
    public page: Page;
    public formulario: FormGroup;
    protected modalRef: BsModalRef;
    public exibirGifAguarde = false;

    constructor(
        protected translate: TranslateService,
        protected service: CrudServiceImpl,
        protected toastService: MensagemToastService,
        protected modalService: BsModalService) {}

        pesquisar(paginacao = 0) {
            this.service.listarPaginado(this.formulario.value, paginacao)
              .subscribe(resultado => {
                this.page = resultado;
                this.entidades = resultado.content;
              });
        }

    excluir(entidade: any) {
        this.service.excluir(entidade.id).subscribe(resultado => {
          this.toastService.exibirMensagemSucesso(this.translate.instant('CRUD.MSG_SUCCESS_REMOVE'));
          this.pesquisar();
        });
    }

    confirmarExclusao(entidade: any, identificacao = '') {

        const initialState = {
            message: this.translate.instant('CRUD.MSG_CONFIRM_REMOVE') + `"` +  identificacao + `" ?`
        };
        this.modalRef = this.modalService.show(DialogConfirmacaoComponent, {initialState});
        this.modalRef.content.eventConfirm.subscribe((value) => {
            this.excluir(entidade);
        });
    }

    exportar() {
        this.exibirGifAguarde = true;
        this.service.exportar()
        .subscribe(bytes => {
          const downloadURL = window.URL.createObjectURL(bytes);
          const link = document.createElement('a');
          link.href = downloadURL;
          link.download = "dados.csv";
          link.click();
          this.exibirGifAguarde = false;
        });
    }

    acionarComponenteUpload() {
        document.getElementById('componenteUpload').click();
    }

    inputFileChange(event) {
        if (event.target.files && event.target.files[0]) {
            const arquivo = event.target.files[0];

            if (arquivo.name.indexOf('.csv') > 0) {

                this.exibirGifAguarde = true;
                this.service.importar(arquivo)
                    .subscribe( resultado => {
                    const mensagem = `Importado com sucesso: ${resultado.nrLinhaSucesso} <br/>Falha ao importar: ${resultado.nrLinhaFalha}`;
                    this.toastService.exibirMensagemAviso(mensagem, true);
                    this.pesquisar();
                    this.exibirGifAguarde = false;
                    const target = event.target || event.srcElement;
                    target.value = '';
                    });
            } else {
            this.toastService.exibirMensagemAviso('Formato inválido. Aceito somente arquivo CSV');
            }
        }
    }

    changePage(event) {
        this.pesquisar(event.page);
    }

    abstract novo();
}