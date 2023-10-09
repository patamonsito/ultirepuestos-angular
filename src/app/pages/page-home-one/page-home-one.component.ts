import { Component, OnDestroy, OnInit } from '@angular/core';
import { posts } from '../../../data/blog-posts';
import { Brand } from '../../shared/interfaces/brand';
import { Observable, Subject, merge } from 'rxjs';
import { ShopService } from '../../shared/api/shop.service';
import { Product } from '../../shared/interfaces/product';
import { Category } from '../../shared/interfaces/category';
import { BlockHeaderGroup } from '../../shared/interfaces/block-header-group';
import { takeUntil, tap } from 'rxjs/operators';

interface ProductsCarouselGroup extends BlockHeaderGroup {
    products$: Observable<Product[]>;
}

interface ProductsCarouselData {
    abort$: Subject<void>;
    loading: boolean;
    products: Product[];
    groups: ProductsCarouselGroup[];
}

@Component({
    selector: 'app-home',
    templateUrl: './page-home-one.component.html',
    styleUrls: ['./page-home-one.component.scss']
})
export class PageHomeOneComponent implements OnInit, OnDestroy {
    destroy$: Subject<void> = new Subject<void>();
    bestsellers$!: Observable<Product[]>;
    brands$!: Observable<Brand[]>;
    popularCategories$!: Observable<Category[]>;

    columnTopRated$!: Observable<Product[]>;
    columnSpecialOffers$!: Observable<Product[]>;
    columnBestsellers$!: Observable<Product[]>;

    posts = posts;

    featuredProducts!: ProductsCarouselData;
    latestProducts!: ProductsCarouselData;

    constructor(
        private shop: ShopService,
    ) { }

    ngOnInit(): void {
        this.bestsellers$ = this.shop.getFeaturedProducts(' ', 11);
        this.brands$ = this.shop.getPopularBrands();
        this.popularCategories$ = this.shop.getCategoriesBySlug([
            'power-tools',
            'hand-tools',
            'machine-tools',
            'power-machinery',
            'measurement',
            'clothes-and-ppe',
        ], 1);
        this.columnTopRated$ = this.shop.getFeaturedProducts('MASCARA', 3);
        this.columnSpecialOffers$ = this.shop.getFeaturedProducts('RADIADOR', 3);
        this.columnBestsellers$ = this.shop.getFeaturedProducts('REJILLA', 3);

        this.featuredProducts = {
            abort$: new Subject<void>(),
            loading: false,
            products: [],
            groups: [
                {
                    name: 'Kits',
                    current: true,
                    products$: this.shop.getFeaturedProducts('KIT', 8),
                },
                {
                    name: 'Frontales',
                    current: false,
                    products$: this.shop.getFeaturedProducts('FRONTAL', 8),
                },
                {
                    name: 'Cazoletas',
                    current: false,
                    products$: this.shop.getFeaturedProducts('CAZOLETA', 8),
                },
                {
                    name: 'Bieletas',
                    current: false,
                    products$: this.shop.getFeaturedProducts('BIELETA', 8),
                },
            ],
        };
        this.groupChange(this.featuredProducts, this.featuredProducts.groups[0]);

        this.latestProducts = {
            abort$: new Subject<void>(),
            loading: false,
            products: [],
            groups: [
                {
                    name: 'Amortiguadores',
                    current: true,
                    products$: this.shop.getFeaturedProducts('AMORTIGUADOR', 8),
                },
                {
                    name: 'Pastillas de Freno',
                    current: false,
                    products$: this.shop.getFeaturedProducts('PASTILLAS', 8),
                },
                {
                    name: 'Balatas de Freno',
                    current: false,
                    products$: this.shop.getFeaturedProducts('BALATA', 8),
                },
                {
                    name: 'Rótulas',
                    current: false,
                    products$: this.shop.getFeaturedProducts('ROTULA', 8),
                },
            ],
        };
        this.groupChange(this.latestProducts, this.latestProducts.groups[0]);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    groupChange(carousel: ProductsCarouselData, group: BlockHeaderGroup): void {
        carousel.loading = true;
        carousel.abort$.next();

        (group as ProductsCarouselGroup).products$.pipe(
            tap(() => carousel.loading = false),
            takeUntil(merge(this.destroy$, carousel.abort$)),
        ).subscribe(x => carousel.products = x);
    }
}
