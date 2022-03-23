import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[city]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CityValidatorDirective, multi: true }]
})
export class CityValidatorDirective implements Validator {
  // validCities: string[] = ['Graz', 'Hamburg'];

  @Input() city: string[] = [];

  validate(c: AbstractControl): ValidationErrors | null {
    if (!this.city.includes(c.value)) {
      return {
        city: {
          actualCity: c.value,
          validCities: this.city.join(', ')
        }
      };
    }

    return null; // no error
  }
}
