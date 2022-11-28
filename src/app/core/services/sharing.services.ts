import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SharingService {
    constructor(
        private http: HttpClient,
    ) { }
    private sharingObservablePrivate: BehaviorSubject<Usuario> =
        new BehaviorSubject<Usuario>({
            Apellido: '',
            Contraseña: '',
            Correo: '',
            Nombre: '',
            Rut: '',
            Telefono: ''
        });

    get sharingObservable() {
        return this.sharingObservablePrivate.asObservable();
    }

    set sharingObservableData(data: Usuario){
        this.sharingObservablePrivate.next(data);
    }

    iniciarSesion(email: string, contraseña: string){
        let body = {
            email,
            contraseña
        }

        this.http.post('http://localhost:3000/api/crear-usuario', body).subscribe({
            error: err => console.log(err),
            next: data => { localStorage.setItem('usuario', JSON.stringify(data)); }
        });
    }

}
