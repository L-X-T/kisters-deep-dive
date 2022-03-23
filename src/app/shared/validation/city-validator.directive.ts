import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[city]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CityValidatorDirective, multi: true }]
})
export class CityValidatorDirective implements Validator {
  validCities: string[] = ['Graz', 'Hamburg'];

  validate(c: AbstractControl): ValidationErrors | null {
    if (!this.validCities.includes(c.value)) {
      return { city: true }; // error
    }

    return null; // no error
  }
}
