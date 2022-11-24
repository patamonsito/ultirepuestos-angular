import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {

    loginForm = new FormGroup({
      Correo: new FormControl('', [Validators.email]),
      Contraseña: new FormControl('', [Validators.min(3), Validators.max(10)]),
    });

    registerForm = new FormControl({
      Nombre: new FormControl('', [Validators.required, Validators.pattern('a-zA-ZñÑá-úÁ-Ú ')]),
      Apellido: new FormControl('', [Validators.required, Validators.pattern('a-zA-ZñÑá-úÁ-Ú ')]),
      Rut: new FormControl('', [Validators.required]),
      Correo: new FormControl('', [Validators.required, Validators.email]),
      Contraseña: new FormControl('', [Validators.required]),
      ReContraseña: new FormControl('', [Validators.required])
    })

    constructor() { }
}
