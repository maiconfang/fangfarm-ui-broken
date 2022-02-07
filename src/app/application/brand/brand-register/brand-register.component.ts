import { CrudRegisterImpl } from 'src/app/core/crud-generic/crud-register-impl';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BrandService } from '../brand.service';
import { MessageToastService } from '../../../core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';
import { ModelService } from '../../model/model.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
  selector: 'app-brand-register',
  templateUrl: './brand-register.component.html',
  styleUrls: ['./brand-register.component.scss']
})
export class BrandRegisterComponent extends CrudRegisterImpl implements OnInit {

  titleBrand: string;

  models = [];
  
  constructor(
    private modelService: ModelService,
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    protected brandService: BrandService,
    protected toastService: MessageToastService) {
    super(translate, brandService, toastService);
    this.createForm();
  }

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.translate.get('BRAND.TITLE_EDIT').subscribe((text: string) => {
        this.titleBrand = text;
      });
      this.findEntity(id);
    } else {
      this.translate.get('BRAND.TITLE_NEW').subscribe((text: string) => {
        this.titleBrand = text
      });
    }

    this.loadModels();

  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

      model: this.formBuilder.group({
        id: [null],
        name: ['', [Validators.required]],
      }),

    });

  }



  redirectAfterAdd(entity: any) {
    this.router.navigate(['/app/brand', entity.id]);
  }

  backToSearch() {
    this.router.navigate(['/brand']);
  }

  loadModels() {
    return this.modelService.listAllNoPagination()
      .then(models => {
        this.models = models._embedded.models
      })
      .catch();
  }

  onSelect(event: TypeaheadMatch) {
    var i = 0;
    while (i < this.models.length) {
      if (this.models[i].name === event.item.name) {
        this.form.value.model.id = this.models[i].id;
        break;
      }
      i = i + 1;
    }
  }

  save() {
    delete this.form.value.model.name
    
    if (this.editing) {
      this.update();
    } else {
      this.add();
    }
  }


}

