import { Component } from '@angular/core';
import { CurrencyService } from '../../../../shared/services/currency.service';

interface Currency {
    name: string;
    url: string;
    code: string;
    symbol: string;
}

@Component({
    selector: 'app-header-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
    languages = [
        {name: 'Español', image: 'language-1'},
    ];

    currencies = [
        {name: '$ Pesos Chilenos', url: '', code: 'CLP', symbol: '$'}
    ];

    constructor(
        public currencyService: CurrencyService
    ) { }

    setCurrency(currency: Currency): void {
        this.currencyService.options = {
            code: currency.code,
            display: currency.symbol,
        };
    }
}
