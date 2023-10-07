import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../../shared/api/shop.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

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
        private titleService: Title,
        private shop: ShopService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {


        this.route.data.subscribe(data => {
            this.layout = data['layout'] || this.layout;
            this.sidebarPosition = data['sidebarPosition'] || this.sidebarPosition;

            this.product = this.route.snapshot.data["datos"];

            this.titleService.setTitle(this.product.name + ' | ' + this.product.oem || 'Producto no encontrado');


            console.log(this.route.snapshot.data)


            this.shop.getFeaturedProducts().subscribe((e: any) => {
                this.products = e;
            })
             // obtener productos relacionados
        });
    }
}
