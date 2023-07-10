import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../interfaces/brand';
import { Product } from '../interfaces/product';
import { Usuario } from '../interfaces/usuario';
import { Direcciones } from '../interfaces/direcciones';
import { Regiones } from '../interfaces/regiones';
import { ProductsList } from '../interfaces/list';
import { SerializedFilterValues } from '../interfaces/filter';
import {
    getBestsellers,
    getFeatured,
    getLatestProducts,
    getProduct,
    getRelatedProducts,
    getSpecialOffers,
    getTopRated,
    getShopCategoriesBySlugs,
    getShopCategoriesTree,
    getShopCategory,
    getBrands,
    getProductsList,
} from '../../../fake-server';
import { getSuggestions } from 'src/fake-server/database/products';

export interface ListOptions {
    page?: number;
    limit?: number;
    sort?: string;
    filterValues?: SerializedFilterValues;
}

export interface Correo {
    Correo: String
}

@Injectable({
    providedIn: 'root'
})




export class ShopService {
    // noinspection JSUnusedLocalSymbols
    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Returns category object by slug.
     *
     * @param slug - Unique human-readable category identifier.
     */

        /* 
router.post('/tack-id', API.POST_TRACK_CODE)*/
        
    retryPayment(Seguimiento: any, MetodoPago: any, Token: any){
        return this.http.post('https://www.service.ulti.cl/api/retry-payment', { Seguimiento, MetodoPago, Token });
    }

    getTrackCode(code: any){
        return this.http.post('https://www.service.ulti.cl/api/tack-id', { trackCode: code });
    }

    getFacturacion(id: any){
        return this.http.post('https://www.service.ulti.cl/api/get-orden', { id: id });
    }
    searchProductFast(id: any){
        return this.http.post('https://www.service.ulti.cl/api/get-products-fast', { Buscar: id });
    }

    getAplications(id: any){
        return this.http.post('https://www.service.ulti.cl/api/get-aplications', { id }); 
    }


    searchProductsByCodeModel(Page: any, CodigoModelo: any, Key: any = ''){

        return this.http.post('https://www.service.ulti.cl/api/products/model', { Page, CodigoModelo, Key });
    }

    searchProducts(key: any, options: any){
        return this.http.post('https://www.service.ulti.cl/api/get-products', { ...key, ...options});
    }

    getMarcas(){
        return this.http.get('https://www.service.ulti.cl/api/marcas-vehiculos');
    }

    buscarModelos(nombre: any){
        return this.http.post('https://www.service.ulti.cl/api/models', {nombre: nombre});
    }

    generarOrdenCompra(body: any){
        return this.http.post('https://www.service.ulti.cl/api/generar-orden', body);
        // return this.http.post('https://www.service.ulti.cl/api/generar-orden', body);
    }

    actualizarUsuario(body: any, id: string){
        return this.http.patch('https://www.service.ulti.cl/api/user/'+id, body);
    }

    registrarUsuario(body: Usuario){
        return this.http.post('https://www.service.ulti.cl/api/crear-usuario', body);
    }

    changePassword(body: any){
        return this.http.post('https://www.service.ulti.cl/api/change-password', body);
    }

    getRegiones(){
        return this.http.get<Regiones[]>('https://www.service.ulti.cl/api/get-regiones');
    }


    añadirDireccion(body: Direcciones){
        return this.http.post('https://www.service.ulti.cl/api/add-direccion', body);
    }

    actualizarDireccion(body: Direcciones){
        return this.http.post('https://www.service.ulti.cl/api/update-direccion', body);
    }

    eliminarDireccion(id: string){
        return this.http.delete('https://www.service.ulti.cl/api/eliminar-direccion/'+id);
    }

    getCategory(slug: string): Observable<Category> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/categories/power-tools.json
         *
         * where:
         * - power-tools = slug
         */
        // return this.http.get<Category>(`https://example.com/api/shop/categories/${slug}.json`);

        // This is for demonstration purposes only. Remove it and use the code above.
        return getShopCategory(slug);
    }


    suscribirCorreo(correo: string){
        return this.http.post('https://www.service.ulti.cl/api/suscribir', {Correo: correo});
    }

    /**
     * Returns a category tree.
     *
     * @param parent - If a parent is specified then its descendants will be returned.
     * @param depth  - Maximum depth of category tree.
     */
    getCategories(parent: Partial<Category>|null = null, depth: number = 0): Observable<Category[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/categories.json?parent=latest-news&depth=1
         *
         * where:
         * - parent = parent.slug
         * - depth  = depth
         */
        // const params: {[param: string]: string} = {
        //     parent: parent.slug,
        //     depth: depth.toString(),
        // };
        //
        return this.http.post<Category[]>('https://www.service.ulti.cl/api/categorias', {});

        // This is for demonstration purposes only. Remove it and use the code above.
        // return getShopCategoriesTree(parent ? parent.slug : null, depth);
    }

    /**
     * Returns an array of the specified categories.
     *
     * @param slugs - Array of slugs.
     * @param depth - Maximum depth of category tree.
     */
    getCategoriesBySlug(slugs: string[], depth: number = 0): Observable<Category[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/categories.json?slugs=power-tools,measurement&depth=1
         *
         * where:
         * - slugs = slugs.join(',')
         * - depth = depth
         */
        // const params: {[param: string]: string} = {
        //     slugs: slugs.join(','),
        //     depth: depth.toString(),
        // };
        //
        // return this.http.get<Category[]>('https://example.com/api/shop/categories.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return this.http.post<Category[]>('https://www.service.ulti.cl/api/categorias', {});
        // return getShopCategoriesBySlugs(slugs, depth);
    }

    /**
     * Returns paginated products list.
     * If categorySlug is null then a list of all products should be returned.
     *
     * @param categorySlug         - Unique human-readable category identifier.
     * @param options              - Options.
     * @param options.page         - Page number (optional).
     * @param options.limit        - Maximum number of items returned at one time (optional).
     * @param options.sort         - The algorithm by which the list should be sorted (optional).
     * @param options.filterValues - An object whose keys are filter slugs and values ​​are filter values (optional).
     */
    getProductsList(categorySlug: string|null, options: ListOptions): Observable<ProductsList> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products.json?category=screwdriwers&page=2&limit=12&sort=name_desc&filter_price=500-1000
         *
         * where:
         * - category     = categorySlug
         * - page         = options.page
         * - limit        = options.limit
         * - sort         = options.sort
         * - filter_price = options.filterValues.price
         */
        // const params: {[param: string]: string} = {};
        //
        // if (categorySlug) {
        //     params.category = categorySlug;
        // }
        // if ('page' in options) {
        //     params.page = options.page.toString();
        // }
        // if ('limit' in options) {
        //     params.limit = options.limit.toString();
        // }
        // if ('sort' in options) {
        //     params.sort = options.sort;
        // }
        // if ('filterValues' in options) {
        //     Object.keys(options.filterValues).forEach(slug => params[`filter_${slug}`] = options.filterValues[slug]);
        // }
        //
        // return this.http.get<ProductsList>('https://example.com/api/products.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getProductsList(categorySlug, options);
    }

    getProduct(id: string): any {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products/electric-planer-brandix-kl370090g-300-watts.json
         *
         * where:
         * - electric-planer-brandix-kl370090g-300-watts = productSlug
         */
        // return this.http.get<Product>(`https://example.com/api/products/${productSlug}.json`);

        // This is for demonstration purposes only. Remove it and use the code above.


        return this.http.post('https://www.service.ulti.cl/api/product', {id: id});
    }

    /**
     * Returns popular brands.
     */
    getPopularBrands(): Observable<Brand[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/brands/popular.json
         */
        // return this.http.get<Brand[]>('https://example.com/api/shop/brands/popular.json');

        // This is for demonstration purposes only. Remove it and use the code above.
        return getBrands();
    }

    getBestsellers(limit: number|null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/bestsellers.json?limit=3
         *
         * where:
         * - limit = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/bestsellers.json', {params});

        return this.http.post<Product[]>('https://www.service.ulti.cl/api/productos-populares', {});
        // This is for demonstration purposes only. Remove it and use the code above.
        // return getBestsellers(limit);
    }


    getPopulateCustom(repuesto: string): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/bestsellers.json?limit=3
         *
         * where:
         * - limit = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/bestsellers.json', {params});

        return this.http.post<Product[]>('https://www.service.ulti.cl/api/productos-populares', { Repuesto: repuesto});
        // This is for demonstration purposes only. Remove it and use the code above.
        // return getBestsellers(limit);
    }


    getTopRated(limit: number|null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/top-rated.json?limit=3
         *
         * where:
         * - limit = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/top-rated.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getTopRated(limit);
    }

    getSpecialOffers(limit: number|null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/special-offers.json?limit=3
         *
         * where:
         * - limit = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/special-offers.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getSpecialOffers(limit);
    }

    getFeaturedProducts(categorySlug: string|null = null, limit: number|null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/featured.json?category=screwdrivers&limit=3
         *
         * where:
         * - category = categorySlug
         * - limit    = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (category) {
        //     params.category = category;
        // }
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //

        return this.http.post<Product[]>('https://www.service.ulti.cl/api/ofertas', { Repuesto: categorySlug, limit: limit, Public: true });

        // This is for demonstration purposes only. Remove it and use the code above. 
        // return getFeatured(categorySlug, limit);
    }

    getLatestProducts(categorySlug: string|null = null, limit: number|null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/latest.json?category=screwdrivers&limit=3
         *
         * where:
         * - category = categorySlug
         * - limit    = limit
         */
        // const params: {[param: string]: string} = {};
        //
        // if (category) {
        //     params.category = category;
        // }
        // if (limit) {
        //     params.limit = limit.toString();
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/latest.json', {params});

        return this.http.post<Product[]>('https://www.service.ulti.cl/api/productos-relacionados', { Repuesto: categorySlug });
        // This is for demonstration purposes only. Remove it and use the code above.
        return getLatestProducts(categorySlug, limit);
    }

    getRelatedProducts(product: Partial<Product>): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/products/related.json?for=water-tap
         *
         * where:
         * - for = product.slug
         */
        // const params: {[param: string]: string} = {
        //     for: product.slug,
        // };
        //
        // return this.http.get<Product[]>('https://example.com/api/shop/products/related.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getRelatedProducts(product);
    }

    getSuggestions(query: string, limit: number, categorySlug: string|null = null): Observable<Product[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/search/suggestions.json?query=screwdriver&limit=5&category=power-tools
         *
         * where:
         * - query = query
         * - limit = limit
         * - category = categorySlug
         */
        // const params: {[param: string]: string} = {query, limit: limit.toString()};
        //
        // if (categorySlug) {
        //     params.category = categorySlug;
        // }
        //
        // return this.http.get<Product[]>('https://example.com/api/search/suggestions.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getSuggestions(query, limit, categorySlug);
    }


    // getUser(query: string): Observable<Product[]> {
    //     // return this.http.post<Product[]>('https://example.com/api/search/suggestions.json', {params});
    // }
}
