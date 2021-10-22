import { FormArray, FormGroup, FormControl } from "@angular/forms";
import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FormValidations {

  constructor(
    public translate: TranslateService) {
  }


  getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      'required': `${fieldName}` + this.translate.instant('FORM_VALIDATIONS.REQUERID'),
      'minlength': `${fieldName}` + this.translate.instant('FORM_VALIDATIONS.MIN_LENGTH') + 
                   `${validatorValue.requiredLength}` + this.translate.instant('FORM_VALIDATIONS.CHARACTERS'),

      'maxlength': `${fieldName}` + this.translate.instant('FORM_VALIDATIONS.MAX_LENGTH') +
                   `${validatorValue.requiredLength}` + this.translate.instant('FORM_VALIDATIONS.CHARACTERS')

    };

    return config[validatorName];
  }

  

}  