import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DirectionService } from '../../../shared/services/direction.service';

@Component({
    selector: 'app-block-slideshow',
    templateUrl: './block-slideshow.component.html',
    styleUrls: ['./block-slideshow.component.scss']
})
export class BlockSlideshowComponent {
    @Input() withDepartments = false;

    options = {
        nav: false,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: {items: 1}
        },
        rtl: this.direction.isRTL()
    };

    slides = [
        {
            title: 'Somos Multimarca',
            text: 'Nos especializamos en muchas marcas para ofrecerte un catalogo muy amplio.',
            image_classic: 'https://i.imgur.com/PrJ5vyn.jpg',
            image_full: 'https://i.imgur.com/PrJ5vyn.jpg',
            image_mobile: 'https://i.imgur.com/x8EOWBU.jpg'
        },
        {
            title: 'Repuestos Originales y Alternativos',
            text: 'Compra sin salir de casa, cotiza con nosotros.',
            image_classic: 'https://i.imgur.com/9seYqkv.jpg',
            image_full: 'https://i.imgur.com/9seYqkv.jpg',
            image_mobile: 'https://i.imgur.com/dBmYCCa.jpg'
        },
        {
            title: 'Paga con tus tajetas de debito o credito',
            text: 'Aceptamos todo metodo de pago.',
            image_classic: 'https://i.imgur.com/aeMTwKT.jpg',
            image_full: 'https://i.imgur.com/aeMTwKT.jpg',
            image_mobile: 'https://i.imgur.com/mtKwcpl.jpg'
        }
    ];

    constructor(
        public sanitizer: DomSanitizer,
        private direction: DirectionService
    ) { }
}
