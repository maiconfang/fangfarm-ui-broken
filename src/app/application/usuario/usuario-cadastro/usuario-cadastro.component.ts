import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from '../usuario.service';
import { MensagemToastService } from './../../../core/mensagem-toast/mensagem.toast.service';
import { CrudCadastroImpl } from 'src/app/core/crud-generico/crud-cadastro-impl';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent extends CrudCadastroImpl implements OnInit {

  formulario: FormGroup;
  titulo: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected usuarioService: UsuarioService,
    protected toastService: MensagemToastService) {
      super(usuarioService, toastService)
      this.createForm();
    }

    ngOnInit() {

      const id: number = this.route.snapshot.params['id'];

      if (id) {
        this.titulo = 'Edição de Usuário';
        super.buscarEntidade(id);
      } else {
        this.titulo = 'Novo Usuário';
      }
    }

    createForm() {
      this.formulario = this.formBuilder.group({
        id: [''],
        nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        senha: [''],
      });
    }

    redirecionarAposAdicionar(entidade: any) {
      this.router.navigate(['/app/usuario', entidade.id]);
    }

    voltarParaPesquisa() {
      this.router.navigate(['/usuario']);
    }

    atualizar() {
      this.formulario.removeControl('senha');
      this.service.atualizar(this.formulario.value).subscribe( entidade => {
          this.toastService.exibirMensagemSucesso('Atualizado com sucesso');
          this.atualizarFormularioComEntidade(entidade);
      });
    }

  }
