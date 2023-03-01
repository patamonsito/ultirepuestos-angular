import { Component, HostBinding, Input } from '@angular/core';
import { theme } from '../../../../data/theme';

export interface SocialLinksItem {
    type: string;
    url: string;
    icon: string;
}

export type SocialLinksShape = 'circle' | 'rounded';

@Component({
    selector: 'app-social-links',
    templateUrl: './social-links.component.html',
    styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {
    theme = theme;

    items: SocialLinksItem[] = [
        {type: 'facebook', url: 'https://www.facebook.com/Ulti-Repuestos-100846552731441', icon: 'fab fa-facebook-f'},
        {type: 'instagram', url: 'https://www.instagram.com/ultirepuestos/?hl=es-la', icon: 'fab fa-instagram'},
        {type: 'youtube', url: 'https://www.youtube.com/@ultirepuestos4892', icon: 'fab fa-youtube'},
    ];

    @Input() shape: SocialLinksShape = 'circle';

    @HostBinding('class.social-links') classSocialLinks = true;

    @HostBinding('class.social-links--shape--circle') get classSocialLinksShapeCircle(): boolean { return this.shape === 'circle'; }

    @HostBinding('class.social-links--shape--rounded') get classSocialLinksShapeRounded(): boolean { return this.shape === 'rounded'; }

    constructor() { }
}
