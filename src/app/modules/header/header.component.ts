import { Component, Input } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';
import { Brand } from '../../shared/interfaces/brand';
import { ShopService } from '../../shared/api/shop.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() layout: 'classic'|'compact' = 'classic';

    brands$!: Observable<Brand[]>;
    
    constructor(public store: StoreService, private shop: ShopService,) { 

    }

    ngOnInit(): void {
        this.brands$ = this.shop.getPopularBrands();
    }

}
