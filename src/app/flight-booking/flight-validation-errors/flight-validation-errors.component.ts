import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-flight-validation-errors',
  templateUrl: './flight-validation-errors.component.html',
  styleUrls: ['./flight-validation-errors.component.css'],
  standalone: false
})
export class FlightValidationErrorsComponent {
  @Input() errors: ValidationErrors | null | undefined;
  @Input() fieldLabel = '';
}
