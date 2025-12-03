import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-flight-validation-errors',
  imports: [],
  templateUrl: './flight-validation-errors.component.html',
  styleUrl: './flight-validation-errors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightValidationErrorsComponent {
  readonly validationErrors = input.required<ValidationErrors | null | undefined>();
  readonly fieldLabel = input('Field');
}
