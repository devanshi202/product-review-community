import { AbstractControl, ValidationErrors } from '@angular/forms';

export class InputValidator {

    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {

        if((control.value as string).length>0 && (control.value as string).trim() == ""){

            return {cannotContainSpace: true}

        }
        return null;

    }

}