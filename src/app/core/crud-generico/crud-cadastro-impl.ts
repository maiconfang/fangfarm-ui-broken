import { FormGroup } from '@angular/forms';
import { CrudServiceImpl } from 'src/app/core/crud-generico/crud-service-impl';
import { MensagemToastService } from '../mensagem-toast/mensagem.toast.service';
import { TranslateService } from '@ngx-translate/core';

export abstract class CrudCadastroImpl {

    public formulario: FormGroup;

    constructor(
        protected translate: TranslateService,
        protected service: CrudServiceImpl,
        protected toastService: MensagemToastService) {}

    buscarEntidade(id: number) {
        this.service.buscarPorID(id).subscribe( entidade => {
            this.atualizarFormularioComEntidade(entidade);
        });
    }

    salvar() {
        if (this.editando) {
            this.atualizar();
        } else {
            this.adicionar();
        }
    }

    adicionar() {
        this.service.adicionar(this.formulario.value).subscribe(entidade => {
            this.toastService.exibirMensagemSucesso(this.translate.instant('CRUD.MSG_SUCCESS_CREATED'));
            this.redirecionarAposAdicionar(entidade);
        });
    }

    atualizar() {
        this.service.atualizar(this.formulario.value).subscribe( entidade => {
            this.toastService.exibirMensagemSucesso(this.translate.instant('CRUD.MSG_SUCCESS_UPDATED'));
            this.atualizarFormularioComEntidade(entidade);
        });
    }

    atualizarFormularioComEntidade(entidade: any) {
        this.formulario.patchValue(entidade);
    }

    get editando() {
        return Boolean(this.formulario.get('id').value);
    }

    abstract createForm();
    abstract redirecionarAposAdicionar(entidade: any);
    abstract voltarParaPesquisa();
}