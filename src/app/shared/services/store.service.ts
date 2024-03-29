import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = 'Vía Lactea 4097, Macul, RM';
    email = 'ventas@ulti.cl';
    phone = ['+56 9 8687 4327'];
    hours = 'Lun-Vie 9:30 - 18:30';

    get primaryPhone(): string|null {
        return this.phone.length > 0 ? this.phone[0] : null;
    }

    constructor() { }
}
