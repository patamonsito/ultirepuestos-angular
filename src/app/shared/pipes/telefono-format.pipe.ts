import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({
        name: 'telefono'
    })

export class telefono implements PipeTransform {

    public transform(value: any) {
        return value.slice(0, 3) + ' ' + value.slice(0, 4).slice(3) + ' ' + value.slice(0, 8).slice(4) + ' ' + value.slice(0, 12).slice(8);
    }
}
