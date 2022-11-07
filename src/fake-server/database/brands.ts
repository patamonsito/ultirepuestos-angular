import { BrandDef } from '../interfaces/brand-def';
import { Brand } from '../../app/shared/interfaces/brand';
import { Observable, of } from 'rxjs';

let lastBrandId = 0;

const brandsDef: BrandDef[] = [
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/1.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/2.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/3.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/4.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/5.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/7.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/8.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/9.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/10.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/11.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/12.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/13.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/14.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/15.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/16.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/17.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/18.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/19.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/20.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/21.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/22.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/23.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/24.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/25.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/45.png'
    },
    {
        slug: 'brandix',
        name: 'Brandix',
        image: 'assets/images/logos/50.png'
    },
];

export const brands: Brand[] = brandsDef.map(brandDef => {
    return {
        ...brandDef,
        id: ++lastBrandId,
    };
});

export function getBrands(): Observable<Brand[]> {
    return of(brands);
}

