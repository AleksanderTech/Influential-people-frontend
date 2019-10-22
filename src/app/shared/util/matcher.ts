import { FormGroup } from '@angular/forms';

export function matchTwoValues(firstValue: string, secondValue: string) {
    return (formGroup: FormGroup) => {
        const firstControl = formGroup.controls[firstValue];
        const secondControl = formGroup.controls[secondValue];

        if (secondControl.errors && !secondControl.errors.mustMatch) {
            return;
        }
        if (firstControl.value !== secondControl.value) {
            secondControl.setErrors({ match: true });
        } else {
            secondControl.setErrors(null);
        }
    }
}