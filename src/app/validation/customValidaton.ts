import { AbstractControl, ValidationErrors } from "@angular/forms";
import dogrula from 'tckimlikno';

export async function identifyValidator(control: AbstractControl): Promise<ValidationErrors | null> {
  const name = control.get('name')?.value;
  const surname = control.get('surname')?.value;
  const bornDate = control.get('bornDate')?.value;
  const identifyNumber = control.value;

  return dogrula({
    ad: name,
    soyad: surname,
    tc: Number(identifyNumber),
    dogum_yili: Number(bornDate.getFullYear())
  }).then(result => {
    if (result) {
      return { invalidValue: true };
    } else {
      return null;
    }
  }).catch(() => {
    return { invalidValue: true };
  });
}