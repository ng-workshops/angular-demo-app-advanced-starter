import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { integerValidator } from '../shared/input-integer/integer.validator';

function passwordMatchesValidator(form: FormGroup): null {
  const password = form.get('password.value');
  const repeatedPassword = form.get('password.repeat');

  if (password.value !== repeatedPassword.value) {
    password.setErrors({ not_equal: true });
  } else {
    password.setErrors(null);
  }

  return null;
}

export class Settings {
  theme: Theme;
  isAdmin = false;
  password: {
    value: string;
    repeat?: string;
  };
  rights: string[] = [];
  salary: number;

  static toFormGroup(settings: Settings): FormGroup {
    settings = settings || new Settings();
    settings.password = settings.password || { value: null };

    const formBuilder = new FormBuilder();

    return formBuilder.group(
      {
        theme: formBuilder.control(settings.theme),
        isAdmin: formBuilder.control(settings.isAdmin),
        salary: formBuilder.control(settings.salary, integerValidator()),
        password: formBuilder.group({
          value: formBuilder.control(
            settings.password.value,
            Validators.minLength(6)
          ),
          repeat: formBuilder.control(
            settings.password.repeat,
            Validators.minLength(6)
          )
        }),
        rights: formBuilder.array(settings.rights || [])
      },
      { validator: passwordMatchesValidator }
    );
  }
}

export type Theme = 'light' | 'dark';
