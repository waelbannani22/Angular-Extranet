import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LoginPharmacienService } from '../services/login-pharmacien.service';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}

export function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    if (file && file.size) {
      const fileSizeInBytes = file.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInMB > maxSize) {
        return { 'fileSizeExceeded': true };
      }
    }
    return null;
  };
}
export function isStillValide(loginService:LoginPharmacienService){
  
  if (!loginService.isAuthenticated()){
    loginService.logOut()
    
 }
}
