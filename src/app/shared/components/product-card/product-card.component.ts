import { 
    ChangeDetectionStrategy, ChangeDetectorRef, Component, 
    Input, OnChanges, OnDestroy, OnInit, SimpleChanges 
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService } from '../../services/cart.service';
import { Product, ProductAttribute } from '../../interfaces/product';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { QuickviewService } from '../../services/quickview.service';
import { RootService } from '../../services/root.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit, OnDestroy, OnChanges {
    private destroy$: Subject<void> = new Subject();

    @Input() product!: Product;
    @Input() layout: 'grid-sm'|'grid-nl'|'grid-lg'|'list'|'horizontal'|null = null;

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;
    showingQuickview = false;
    featuredAttributes: ProductAttribute[] = [];

    constructor(
        private cd: ChangeDetectorRef,
        public root: RootService,
        public cart: CartService,
        public wishlist: WishlistService,
        public compare: CompareService,
        public quickview: QuickviewService,
        public currency: CurrencyService
    ) { }

    ngOnInit(): void {
        this.currency.changes$.pipe(takeUntil(this.destroy$)).subscribe(() => this.cd.markForCheck());
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['product'] && changes['product'].currentValue) {
            this.featuredAttributes = this.product.attributes.filter(x => x.featured);
        }
    }

    private toggleStatus(target: 'addingToCart' | 'addingToWishlist' | 'addingToCompare' | 'showingQuickview', status: boolean): void {
        this[target] = status;
        this.cd.markForCheck();
    }

    addToCart(): void {
        if (!this.addingToCart) {
            this.toggleStatus('addingToCart', true);
            this.cart.add(this.product, 1).subscribe({
                complete: () => this.toggleStatus('addingToCart', false)
            });
        }
    }

    addToWishlist(): void {
        if (!this.addingToWishlist) {
            this.toggleStatus('addingToWishlist', true);
            this.wishlist.add(this.product).subscribe({
                complete: () => this.toggleStatus('addingToWishlist', false)
            });
        }
    }

    addToCompare(): void {
        if (!this.addingToCompare) {
            this.toggleStatus('addingToCompare', true);
            this.compare.add(this.product).subscribe({
                complete: () => this.toggleStatus('addingToCompare', false)
            });
        }
    }

    showQuickview(): void {
        if (!this.showingQuickview) {
            this.toggleStatus('showingQuickview', true);
            this.quickview.show(this.product).subscribe({
                complete: () => this.toggleStatus('showingQuickview', false)
            });
        }
    }
}