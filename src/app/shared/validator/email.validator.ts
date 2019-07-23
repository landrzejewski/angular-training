import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[app-email][ngModel],[app-email][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AppEmailValidator), multi: true }
  ]
})
export class AppEmailValidator {

  validator: Function

  constructor() {
    this.validator = this.validateEmailFactory();
  }

  validate(control: FormControl) {
    return this.validator(control);
  }

  validateEmailFactory() {
    return (control: FormControl) => {
      const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      return EMAIL_REGEXP.test(control.value) ? null : {
        email: {
          hint: '(Correct email pattern: name@domain.com)'
        }
      };
    };
  }

}
