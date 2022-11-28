import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharingService } from './services/sharing.services';

@NgModule({
    imports: [CommonModule],
    providers: [SharingService],
})

export class CoreModule {}