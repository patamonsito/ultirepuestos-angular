import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.sass']
})
export class LayoutComponent {
    links: {label: string; url: string}[] = [
        {label: 'Resumen', url: './dashboard'},
        {label: 'Editar Perfil', url: './profile'},
        {label: 'Mis Ordenes', url: './orders'},
        {label: 'Direcciones', url: './addresses'},
        {label: 'Cerrar Sesion', url: './login'}
    ];

    constructor() { }
}
