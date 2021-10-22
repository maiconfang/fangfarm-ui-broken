import { CrudCadastroImpl } from 'src/app/core/crud-generico/crud-cadastro-impl';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ModelService } from '../model.service';
import { MensagemToastService } from '../../../core/mensagem-toast/mensagem.toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-model-register',
  templateUrl: './model-register.component.html',
  styleUrls: ['./model-register.component.css']
})
export class ModelRegisterComponent extends CrudCadastroImpl implements OnInit {

  titleModel: string;

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected modelService: ModelService,
    protected toastService: MensagemToastService) {
    super(translate, modelService, toastService);
    this.createForm();
  }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.translate.get('MODEL.TITLE_EDIT').subscribe((text: string) => {
        this.titleModel = text;
      });
      this.findEntity(id);
    } else {
      this.translate.get('MODEL.TITLE_NEW').subscribe((text: string) => {
        this.titleModel = text
      });
    }

  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
    });
  }

  redirectAfterAdd(entity: any) {
    this.router.navigate(['/app/model', entity.id]);
  }

  backToSearch() {
    this.router.navigate(['/model']);
  }

}
