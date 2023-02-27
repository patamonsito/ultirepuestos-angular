import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../../shared/api/shop.service';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

@Component({
    selector: 'app-page-product',
    templateUrl: './page-product.component.html',
    styleUrls: ['./page-product.component.scss']
})
export class PageProductComponent implements OnInit {
    relatedProducts$!: Observable<Product[]>;
    products: any;
    product!: Product;
    layout: 'standard'|'columnar'|'sidebar' = 'standard';
    sidebarPosition: 'start'|'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"

    constructor(
        private shop: ShopService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {


        this.route.data.subscribe(data => {
            this.layout = data['layout'] || this.layout;
            this.sidebarPosition = data['sidebarPosition'] || this.sidebarPosition;
            let code = window.location.href.split('/')[window.location.href.split('/').length - 1];

            this.shop.getProduct(code).subscribe((e: any) =>{
                this.product = e;
            }
            )

            this.shop.getFeaturedProducts().subscribe((e: any) => {
                this.products = e;
            })
             // obtener productos relacionados
        });
    }
}
