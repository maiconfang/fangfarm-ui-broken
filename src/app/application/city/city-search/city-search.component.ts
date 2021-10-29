import { CrudSearchImpl } from 'src/app/core/crud-generic/crud-search-impl';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { CityService } from '../city.service';
import { MessageToastService } from 'src/app/core/message-toast/message.toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent extends CrudSearchImpl implements OnInit {

  constructor(
    protected translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router,
    protected cityService: CityService,
    protected toastService: MessageToastService,
    protected modalService: BsModalService) {
    super(translate, cityService, toastService, modalService);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.maxLength(100)]]
    });

    this.search();
  }

  new() {
    this.router.navigate(['/city/new']);
  }

  confirmRemoval(entity: any, identification = '') {
    super.confirmRemoval(entity, entity.name);
  }

  search(paginator = 0) {
    this.service.listPaginated(this.form.value, paginator)
      .subscribe(data => {
        this.page = data.page;
        if (data.page.totalElements > 0 && typeof data._embedded !== 'undefined') {
          this.entities = data._embedded.cities
        } else
          this.entities = [{}]
      });
  }

}
