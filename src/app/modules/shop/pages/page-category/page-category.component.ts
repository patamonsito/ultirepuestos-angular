import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { Link } from '../../../../shared/interfaces/link';
import { RootService } from '../../../../shared/services/root.service';
import { of, Subject, timer } from 'rxjs';
import { debounce, mergeMap, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';
import { parseProductsListParams } from '../../resolvers/products-list-resolver.service';
import { ShopService } from '../../../../shared/api/shop.service';
import { parseFilterValue } from '../../../../shared/helpers/filter';
import { Category } from '../../../../shared/interfaces/category';
import { dataMock } from './productos.mock';
import { fromEvent } from "rxjs";

@Component({
    selector: 'app-grid',
    templateUrl: './page-category.component.html',
    styleUrls: ['./page-category.component.scss'],
    providers: [
        {provide: PageCategoryService, useClass: PageCategoryService},
        {provide: ShopSidebarService, useClass: ShopSidebarService},
    ]
})

export class PageCategoryComponent implements OnDestroy {
    destroy$: Subject<void> = new Subject<void>();

    columns: 3|4|5 = 3;
    viewMode: 'grid'|'grid-with-features'|'list' = 'list';
    sidebarPosition: 'start'|'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
    breadcrumbs: Link[] = [];
    pageHeader = '';
    keyMarca: string = '';
    Marcas: any[] = [];
    saveMarcas: any[] = [];
    MarcaVehiculo: any = -1;
    Modelo: any = -1;
    Modelos: any[] = [];
    saveModelos: any[] = [];
    keyModelo: string = '';
    dataProducts: any;
    saveDataProducts: any;
    haveResult: boolean = false;

    constructor(
        private root: RootService,
        private router: Router,
        private route: ActivatedRoute,
        private pageService: PageCategoryService,
        private shop: ShopService,
        private location: Location,
    ) {
        // this.route.data.subscribe(data => { // TODO

        this.reloadMarcas();
        this.pageService.setIsLoading(true);


        let data: any = dataMock

            this.breadcrumbs = [
                {label: 'Inicio', url: this.root.home()},
                {label: 'Catalogo', url: this.root.shop()},
            ];

            // If categorySlug is undefined then this is a root catalog page.
            if (!this.getCategorySlug()) {
                this.pageHeader = 'Catalogo';
            } else {
                this.pageHeader = data['category'].name;

                this.breadcrumbs = this.breadcrumbs.concat([
                    ...data['category'].parents.map(
                        (parent: Category) => ({label: parent.name, url: this.root.category(parent)})
                    ),
                    {label: data['category'].name, url: this.root.category(data['category'])},
                ]);
            }
            this.pageService.setList(data['products']);
            this.dataProducts = data['products'];
            this.columns = 'columns' in data ? data['columns'] : this.columns;
            this.viewMode = 'viewMode' in data ? data['viewMode'] : this.viewMode;
            this.sidebarPosition = 'sidebarPosition' in data ? data['sidebarPosition'] : this.sidebarPosition;
        this.route.queryParams.subscribe(queryParams => {
            this.pageService.setOptions(parseProductsListParams(queryParams), false); // Aqui se envia los parametros de paginacion
        });

        console.log(this.pageService.options)

        this.pageService.optionsChange$.pipe(
            debounce(changedOptions => {
                return changedOptions.filterValues ? timer(250) : of(changedOptions);
            }),
            mergeMap(() => {
                this.updateUrl();
                this.pageService.setIsLoading(true);

                console.log(
                    this.pageService.options.page,
                    this.Modelo.id,
                    this.filterKeyProducts, 'parametros') 

                return this.shop.searchProductsByCodeModel( // llamada a la API y pasa los parametros
                    this.pageService.options.page,
                    this.Modelo.id,
                    this.filterKeyProducts
                ).pipe(
                    takeUntil(this.pageService.optionsChange$)
                );
            })
            ,
            takeUntil(this.destroy$),
        ).subscribe((data: any) => {
            // If categorySlug is undefined then this is a root catalog page.
            if (!this.getCategorySlug()) {
                this.pageHeader = 'Catalogo';
            } else {
                this.pageHeader = data['category'].name;

                this.breadcrumbs = this.breadcrumbs.concat([
                    ...data['category'].parents.map(
                        (parent: Category) => ({label: parent.name, url: this.root.category(parent)})
                    ),
                    {label: data['category'].name, url: this.root.category(data['category'])},
                ]);
            }
            this.pageService.setList(data['products']);
            this.dataProducts = data['products'];

            this.columns = 'columns' in data ? data['columns'] : this.columns;
            this.viewMode = 'viewMode' in data ? data['viewMode'] : this.viewMode;
            this.sidebarPosition = 'sidebarPosition' in data ? data['sidebarPosition'] : this.sidebarPosition;

            this.pageService.setIsLoading(false);
        });
        
        console.log(this.pageService.optionsChange$.subscribe(e => {
        }))
    }

    async searchMarca(target: any | null){

        let result = await target ? this.saveMarcas.filter(e => {
          if(e.nombre.includes(target.toUpperCase())){
            return e;
          }
        }) : this.saveMarcas;
  
        this.Marcas = result
    }


    selectedMarca(marca: any){
        this.pageService.setIsLoading(true);
        this.MarcaVehiculo = marca;
        this.shop.buscarModelos(marca.nombre).subscribe((e: any) => {
            this.Modelos = e;
            this.saveModelos = e;
        })

        this.pageService.setIsLoading(false);
    }

    async searchModel(target: any | null){
        let result = await target ? this.saveModelos.filter(e => {
          if(e.descripcion.includes(target.toUpperCase())){
            return e;
          }
        }) : this.saveModelos;
  
        this.Modelos = result
    }


    reloadMarcas(){
        this.pageService.setIsLoading(true);
        this.MarcaVehiculo = -1;
        this.Modelo = -1;
        this.Modelos = [];
        this.shop.getMarcas().subscribe((e: any) =>{
            console.log(e, 'response')
            this.Marcas = e;
            this.saveMarcas = e;
        })
        
        this.pageService.setIsLoading(false);
    }


    reloadModelos(){
        this.pageService.setIsLoading(true);
        this.selectedMarca(this.MarcaVehiculo);
        this.Modelo = -1;
        this.pageService.setIsLoading(false);
    }

    selectedModel(model: any){

        let modelo = model.id
        this.pageService.setIsLoading(true);
        this.shop.searchProductsByCodeModel(1, modelo).subscribe((data: any) => {
            // this.shop.searchProducts({ key: ''}, {}).subscribe((data: any) => {

                console.log(data);

            this.breadcrumbs = [
                {label: 'Inicio', url: this.root.home()},
                {label: 'Catalogo', url: this.root.shop()},
            ];

            // If categorySlug is undefined then this is a root catalog page.
            if (!this.getCategorySlug()) {
                this.pageHeader = 'Catalogo';
            } else {
                this.pageHeader = data['category'].name;

                this.breadcrumbs = this.breadcrumbs.concat([
                    ...data['category'].parents.map(
                        (parent: Category) => ({label: parent.name, url: this.root.category(parent)})
                    ),
                    {label: data['category'].name, url: this.root.category(data['category'])},
                ]);
            }
            this.pageService.setList(data['products']);
            this.dataProducts = data['products'];

            this.columns = 'columns' in data ? data['columns'] : this.columns;
            this.viewMode = 'viewMode' in data ? data['viewMode'] : this.viewMode;
            this.sidebarPosition = 'sidebarPosition' in data ? data['sidebarPosition'] : this.sidebarPosition;
            this.Modelo = model;
        this.pageService.setIsLoading(false);
        })
    }



    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    updateUrl(): void {
        const tree = this.router.parseUrl(this.router.url);
        tree.queryParams = this.getQueryParams();
        this.location.replaceState(tree.toString());
    }

    getQueryParams(): Params {
        const params: Params = {};
        const options =  this.pageService.options;
        const filterValues = options.filterValues;

        if ('page' in options && options.page !== 1) {
            params['page'] = options.page;
        }
        if ('limit' in options && options.limit !== 12) {
            params['limit'] = options.limit;
        }
        if ('sort' in options && options.sort !== 'default') {
            params['sort'] = options.sort;
        }
        if ('filterValues' in options) {
            this.pageService.filters.forEach(filter => {
                if (!filterValues || !filterValues[filter.slug]) {
                    return;
                }

                const filterValue: any = parseFilterValue(filter.type as any, filterValues[filter.slug]);

                switch (filter.type) {
                    case 'range':
                        if (filter.min !== filterValue[0] || filter.max !== filterValue[1]) {
                            params[`filter_${filter.slug}`] = `${filterValue[0]}-${filterValue[1]}`;
                        }
                        break;
                    case 'check':
                    case 'color':
                        if (filterValue.length > 0) {
                            params[`filter_${filter.slug}`] = filterValues[filter.slug];
                        }
                        break;
                    case 'radio':
                        if (filterValue !== filter.items[0].slug) {
                            params[`filter_${filter.slug}`] = filterValue;
                        }
                        break;
                }
            });
        }

        console.log(params, 'params')
        return params;
    }

    getCategorySlug(): string|null {
        return this.route.snapshot.params['sort'] || this.route.snapshot.data['categorySlug'] || null;
    }

    getProductsViewLayout(): 'grid-3-sidebar'|'grid-4-full'|'grid-5-full' {
        return 'grid-' + this.columns + '-full' as 'grid-3-sidebar'|'grid-4-full'|'grid-5-full';
    }

    async filterKeyProducts(value: any){
        
        this.haveResult = true;

        let model = this.Modelo.id

        console.log(1, model, value)

        this.shop.searchProductsByCodeModel(1, model, value).subscribe((data: any) => {
            console.log(data)
            this.breadcrumbs = [
                {label: 'Inicio', url: this.root.home()},
                {label: 'Catalogo', url: this.root.shop()},
            ];

            // If categorySlug is undefined then this is a root catalog page.
            if (!this.getCategorySlug()) {
                console.log('paso por aqui')
                this.pageHeader = 'Catalogo';
            } else {
                this.pageHeader = data['category'].name;

                this.breadcrumbs = this.breadcrumbs.concat([
                    ...data['category'].parents.map(
                        (parent: Category) => ({label: parent.name, url: this.root.category(parent)})
                    ),
                    {label: data['category'].name, url: this.root.category(data['category'])},
                ]);
            }
            this.pageService.setList(data['products']);
            this.dataProducts = data['products'];

            console.log(this.dataProducts)
            this.columns = 'columns' in data ? data['columns'] : this.columns;
            this.viewMode = 'viewMode' in data ? data['viewMode'] : this.viewMode;
            this.sidebarPosition = 'sidebarPosition' in data ? data['sidebarPosition'] : this.sidebarPosition;
        this.pageService.setIsLoading(false);
        })

    }

}
