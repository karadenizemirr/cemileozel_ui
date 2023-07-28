import { AbstractControl, ValidatorFn,ValidationErrors } from '@angular/forms';

export function stringValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Doğrulama mantığını burada uygulayın
    const regex = /^[a-zA-Z]{3,}$/;
    if (!regex.test(value)) {
      return { errors: { message: 'Sayı ya da özel karakter içermemeli.' } };
    }

    return null;
  };
}


export function bornDateValidator(): ValidatorFn{
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value

    const currentDate = new Date()
    const bornDate = new Date(value)

    if(bornDate > currentDate){
      return {
        errors: {
          message: "Doğum tarihi geçerli değil"
        }
      }
    }

    return null;
  };
}

// Phone Number Validator
export function phoneNumberValidator(): ValidatorFn{
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value

    const regex = /^(?:\+|00)(?:90)?(5\d{9})$/;
    if(!regex.test(value)){
      return {
        errors: {
          message: 'Telefon numarası yanlış'
        }
      }
    }

    return null;
  }
}

// Email Adress Validation
export function emailValidator(): ValidatorFn{
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(value)) {
      return { errors: { message: 'Geçerli bir e-posta adresi girin.' } };
    }
    return null;
  }
}

//Date Validasyon
export function dateValidator(): ValidatorFn{
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value

    const nowDate = new Date()
    const startDate = new Date(value)

    if(startDate < nowDate){
      return {
        errors: {
          message: 'Tarih geçerli değil.Geçmiş için seçim yapılamaz.'
        }
      }
    }

    return null;
  }
}