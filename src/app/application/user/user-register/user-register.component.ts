import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../user.service';
import { MessageToastService } from '../../../core/message-toast/message.toast.service';
import { CrudRegisterImpl } from 'src/app/core/crud-generic/crud-register-impl';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent extends CrudRegisterImpl implements OnInit {

  form: FormGroup;
  titleUser: string;

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected userService: UserService,
    protected toastService: MessageToastService) {
      super(translate, userService, toastService)
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
