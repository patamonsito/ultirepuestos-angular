import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-block-info',
    templateUrl: './block-info.component.html',
    styleUrls: ['./block-info.component.scss']
})
export class BlockInfoComponent  {
    @Input() layout: 'large-first'|'large-last' = 'large-first';


    constructor() { }
}
