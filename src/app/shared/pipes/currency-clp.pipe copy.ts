import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
        name: 'precioClienteCLP'
    })

export class precioClienteCLP implements PipeTransform {

    public transform(value: any) {
        value = Math.round(Number(value) * 2);
        return '$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}