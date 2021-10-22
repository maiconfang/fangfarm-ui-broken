import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from '../usuario.service';
import { MensagemToastService } from './../../../core/mensagem-toast/mensagem.toast.service';
import { CrudCadastroImpl } from 'src/app/core/crud-generico/crud-cadastro-impl';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent extends CrudCadastroImpl implements OnInit {

  form: FormGroup;
  titleUser: string;

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected usuarioService: UsuarioService,
    protected toastService: MensagemToastService) {
      super(translate, usuarioService, toastService)
      this.createForm();
    }

    ngOnInit() {

      const id: number = this.route.snapshot.params['id'];

      if (id) {
        this.titleUser = 'Edição de Usuário';
        super.findEntity(id);
      } else {
        this.titleUser = 'Novo Usuário';
      }
    }

    createForm() {
      this.form = this.formBuilder.group({
        id: [''],
        nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        senha: [''],
      });
    }

    redirectAfterAdd(entity: any) {
      this.router.navigate(['/app/usuario', entity.id]);
    }

    backToSearch() {
      this.router.navigate(['/usuario']);
    }

    update() {
      this.form.removeControl('senha');
      this.service.update(this.form.value).subscribe( entity => {
          this.toastService.showMessageSuccess('Atualizado com sucesso');
          this.updateFormWithEntity(entity);
      });
    }

  }
