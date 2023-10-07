import { Component } from '@angular/core';
import { CurrencyService } from '../../../../shared/services/currency.service';
import { SharingService } from 'src/app/core/services/sharing.services';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/interfaces/usuario';

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

    Usuario$: Observable<Usuario>;
    Logger: boolean = false;

    languages = [
        {name: 'Español', image: 'language-1'},
    ];

    currencies = [
        {name: '$ Pesos Chilenos', url: '', code: 'CLP', symbol: '$'}
    ];

    constructor(
        public currencyService: CurrencyService,
        private sharingService: SharingService,
    ) {
        this.Usuario$ = sharingService.sharingObservable; }
        


    ngOnInit() {
        this.Usuario$.subscribe({
            next: (e) => {
                if(e){
                    this.Logger = true;
                }
            }
        })
    }

    setCurrency(currency: Currency): void {
        this.currencyService.options = {
            code: currency.code,
            display: currency.symbol,
        };
    }
}
