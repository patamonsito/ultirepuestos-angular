import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = 'Merced 838, oficina 117, Santiago';
    email = 'contacto@ulti.cl';
    phone = ['+56 9 8687 4327', '+56 9 4105 4479'];
    hours = 'Lun-Vie 9:00 - 18:00';

    get primaryPhone(): string|null {
        return this.phone.length > 0 ? this.phone[0] : null;
    }

    constructor() { }
}
