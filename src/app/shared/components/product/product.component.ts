import { Component, Inject, Input, PLATFORM_ID, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { FormControl } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { RootService } from '../../services/root.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type ProductLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
    @Input() public layout: ProductLayout = 'standard';
    @Input() public product!: Product;

    public quantity: FormControl = new FormControl(1);

    public addingToCart = false;
    public addingToWishlist = false;
    public addingToCompare = false;

    private destroy$: Subject<void> = new Subject();

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private cart: CartService,
        private wishlist: WishlistService,
        private compare: CompareService,
        public root: RootService,
    ) { }

    ngOnInit(): void {
    }

    addToCart(): void {
        if (!this.addingToCart && this.product && this.quantity.value > 0) {
            this.addingToCart = true;

            this.cart.add(this.product, this.quantity.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe({ complete: () => this.addingToCart = false });
        }
    }

    addToWishlist(): void {
        if (!this.addingToWishlist && this.product) {
            this.addingToWishlist = true;

            this.wishlist.add(this.product)
                .pipe(takeUntil(this.destroy$))
                .subscribe({ complete: () => this.addingToWishlist = false });
        }
    }

    addToCompare(): void {
        if (!this.addingToCompare && this.product) {
            this.addingToCompare = true;

            this.compare.add(this.product)
                .pipe(takeUntil(this.destroy$))
                .subscribe({ complete: () => this.addingToCompare = false });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}