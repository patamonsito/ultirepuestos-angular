import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    {label: 'Inicio', url: '/',
    //  menu: {
    //     type: 'menu',
    //     items: [
    //         {label: 'Home 1', url: '/'},
    //         {label: 'Home 2', url: '/home-two'},
    //         {label: 'Offcanvas Cart', url: '/offcanvas-cart'}
    //     ]
    // }
},
    {label: 'Catalogo', url: '/shop/catalog', external: false},
    {label: 'Seguimiento', url: '/shop/track-order', external: false},
    // {label: 'Blog', url: '/shop/catalog/power-tools', external: true}
];