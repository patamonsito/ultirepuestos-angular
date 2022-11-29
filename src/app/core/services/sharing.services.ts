import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SharingService {
    constructor(private http: HttpClient) {}
    private sharingObservablePrivate: BehaviorSubject<Usuario> =
        new BehaviorSubject<Usuario>({
            Apellido: '',
            Contraseña: '',
            Correo: '',
            Nombre: '',
            Rut: '',
            Telefono: '',
        });

    get sharingObservable() {
        return this.sharingObservablePrivate.asObservable();
    }

    set sharingObservableData(data: Usuario) {
        this.sharingObservablePrivate.next(data);
    }

    iniciarSesion(email: string, contraseña: string) {
        let body = {
            Correo: email,
            Contraseña: contraseña,
        };

        this.http
            .post('http://localhost:3000/api/user-login', body)
            .subscribe({
                error: (err) => console.log(err),
                next: (data: any) => {
                    localStorage.setItem('Usuario', JSON.stringify(data));
                    if(!data?.id){
                        this.sharingObservablePrivate.next({
                            Apellido: '',
                            Contraseña: '',
                            Correo: '',
                            Nombre: '',
                            Rut: '',
                            Telefono: '',
                        })
                    }else{
                        this.sharingObservablePrivate.next(data)
                    }
                },
            });
    }

    cerrarSesion(){
        localStorage.removeItem('Usuario');
        this.sharingObservablePrivate.next({
            Apellido: '',
            Contraseña: '',
            Correo: '',
            Nombre: '',
            Rut: '',
            Telefono: '',
        })
    }
}
