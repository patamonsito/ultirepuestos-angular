import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MobileMenuService } from '../../../../shared/services/mobile-menu.service';
import { mobileMenuOffline } from '../../../../../data/mobile-menu-offline';
import { mobileMenu } from '../../../../../data/mobile-menu';
import { MobileMenuItem } from '../../../../shared/interfaces/mobile-menu-item';
import { SharingService } from 'src/app/core/services/sharing.services';
import { ShopService } from 'src/app/shared/api/shop.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/interfaces/usuario';


@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss']
})

export class MobileMenuComponent implements OnDestroy, OnInit {
    private destroy$: Subject<void> = new Subject();

    isOpen = false;
    links: MobileMenuItem[] = [];
    Usuario$: Observable<Usuario>;

    constructor(private shopService: ShopService, private sharingService: SharingService, private router: Router, public mobilemenu: MobileMenuService) { 
      this.Usuario$ = sharingService.sharingObservable;
    }

    ngOnInit(): void {

        this.Usuario$.subscribe((e) => {
            if(e){
                this.links = mobileMenu
            }else{
                this.links = mobileMenuOffline
            }
        })

        this.mobilemenu.isOpen$.pipe(takeUntil(this.destroy$)).subscribe(isOpen => this.isOpen = isOpen);


    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
  
    onItemClick(event: MobileMenuItem): void {
        if (event.type === 'link') {
            this.mobilemenu.close();
        }

        // if (event.data && event.data.language) {
        //     console.log(event.data.language); // change language
        // }
    }
}
