import { MobileMenuItem } from '../app/shared/interfaces/mobile-menu-item';

export const mobileMenuOffline: MobileMenuItem[] = [
    {type: 'link', label: 'Inicio', url: '/'},

    // {type: 'link', label: 'Categories', url: '/shop/catalog', children: [
    //     {type: 'link', label: 'Power Tools', url: '/shop/catalog', children: [
    //     ]},
    //     {type: 'link', label: 'Machine Tools', url: '/shop/catalog', children: [
    //         {type: 'link', label: 'Thread Cutting',      url: '/shop/catalog'},
    //         {type: 'link', label: 'Chip Blowers',        url: '/shop/catalog'},
    //         {type: 'link', label: 'Sharpening Machines', url: '/shop/catalog'},
    //         {type: 'link', label: 'Pipe Cutters',        url: '/shop/catalog'},
    //         {type: 'link', label: 'Slotting machines',   url: '/shop/catalog'},
    //         {type: 'link', label: 'Lathes',              url: '/shop/catalog'}
    //     ]}
    // ]},

    // {type: 'link', label: 'Catalogo', url: '/shop/catalog'},
    
    {type: 'link', label: 'Seguimiento', url: '/shop/track-order' },

    {type: 'link', label: 'Iniciar Sesion', url: '/account/login'},
    
    {type: 'link', label: 'Registrarse', url: '/account/login'},

    // {type: 'link', label: 'Shop', url: '/shop/catalog/power-tools', children: [
    //     {type: 'link', label: 'Shop Grid', url: '/shop/catalog/power-tools', children: [
    //         {type: 'link', label: '3 Columns Sidebar',  url: '/shop/catalog/power-tools'},
    //         {type: 'link', label: '4 Columns Full',     url: '/shop/category-grid-4-columns-full'},
    //         {type: 'link', label: '5 Columns Full',     url: '/shop/category-grid-5-columns-full'}
    //     ]},
    //     {type: 'link', label: 'Shop List',          url: '/shop/category-list'},
    //     {type: 'link', label: 'Shop Right Sidebar', url: '/shop/category-right-sidebar'},
    //     {type: 'link', label: 'Product',            url: '/shop/product-standard', children: [
    //         {type: 'link', label: 'Product',            url: '/shop/product-standard'},
    //         {type: 'link', label: 'Product Alt',        url: '/shop/product-columnar'},
    //         {type: 'link', label: 'Product Sidebar',    url: '/shop/product-sidebar'}
    //     ]},
    //     {type: 'link', label: 'Cart',        url: '/shop/cart'},
    //     {type: 'link', label: 'Checkout',    url: '/shop/cart/checkout'},
    //     {type: 'link', label: 'Order Success',    url: '/shop/cart/checkout/success'},
    //     {type: 'link', label: 'Wishlist',    url: '/shop/wishlist'},
    //     {type: 'link', label: 'Compare',     url: '/shop/compare'},
    //     {type: 'link', label: 'Track Order', url: '/shop/track-order'}
    // ]},

    // {type: 'link', label: 'Blog', url: '/blog', children: [
    //     {type: 'link', label: 'Blog Classic',         url: '/blog/category-classic'},
    //     {type: 'link', label: 'Blog Grid',            url: '/blog/category-grid'},
    //     {type: 'link', label: 'Blog List',            url: '/blog/category-list'},
    //     {type: 'link', label: 'Blog Left Sidebar',    url: '/blog/category-left-sidebar'},
    //     {type: 'link', label: 'Post Page',            url: '/blog/post-classic'},
    //     {type: 'link', label: 'Post Without Sidebar', url: '/blog/post-full'}
    // ]},

    // {type: 'link', label: 'Pages', url: '/site', children: [
    //     {type: 'link', label: 'About Us',             url: '/site/about-us'},
    //     {type: 'link', label: 'Contact Us',           url: '/site/contact-us'},
    //     {type: 'link', label: 'Contact Us Alt',       url: '/site/contact-us-alt'},
    //     {type: 'link', label: '404',                  url: '/site/not-found'},
    //     {type: 'link', label: 'Terms And Conditions', url: '/site/terms'},
    //     {type: 'link', label: 'FAQ',                  url: '/site/faq'},
    //     {type: 'link', label: 'Components',           url: '/site/components'},
    //     {type: 'link', label: 'Typography',           url: '/site/typography'}
    // ]},

    // {type: 'button', label: 'Currency', children: [
    //     {type: 'button', label: '$ CLP',      data: {currency: 'CLP'}},
    // ]},

    // {type: 'button', label: 'Language', children: [
    //     {type: 'button', label: 'Español', data: {language: 'ES'}}
    // ]}
];
