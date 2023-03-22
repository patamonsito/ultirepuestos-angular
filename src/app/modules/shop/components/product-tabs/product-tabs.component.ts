import { Component, Input } from '@angular/core';
import { ProductFeaturesSection} from '../../../../shared/interfaces/product';
import { specification } from '../../../../../data/shop-product-spec';
import { reviews } from '../../../../../data/shop-product-reviews';
import { Review } from '../../../../shared/interfaces/review';
import { ShopService } from 'src/app/shared/api/shop.service';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent {
    @Input() withSidebar = false;
    @Input() tab: 'aplicaciones'|'descripcion' = 'aplicaciones';

    aplications: any = [];
    keyAplications: any = [];
    keyAplicationsNames: any = [];
    specification: ProductFeaturesSection[] = specification;
    reviews: Review[] = reviews;

    constructor(
        private shop: ShopService
    ) { }

    ngOnInit(){
        let code = window.location.href.split('/')[window.location.href.split('/').length - 1];
        this.shop.getAplications(code).subscribe((e: any) => {

            this.keyAplications = Object.keys(e[0]).toString().replace('Años,', '').replace('Años', '').replace('AñoI', 'Año Inicio').replace('AñoT', 'Año Termino').replace('[', '').replace(']', '').split(',');
            this.keyAplicationsNames = Object.keys(e[0]).toString().replace('Años,', '').replace('[', '').replace(']', '').split(',');
            JSON.parse(JSON.stringify(e).replace('Años: [],', ''))
            this.aplications = e;



        })
    }

    

}
