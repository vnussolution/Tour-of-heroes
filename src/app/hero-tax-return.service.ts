import { Injectable } from '@angular/core';

import { HeroTaxReturn } from './hero';
import { HeroService } from './hero.service';

@Injectable()
export class HeroTaxReturnService {
    private currentTaxReturn: HeroTaxReturn;
    private originalTaxReturn: HeroTaxReturn;

    constructor(private heroService: HeroService) { }

    set taxReturn(htr: HeroTaxReturn) {
        this.originalTaxReturn = htr;
        this.currentTaxReturn = htr.clone();
    }

    get taxReturn(): HeroTaxReturn {
        return this.currentTaxReturn;
    }

    restoreTaxReturn() {
        this.taxReturn = this.originalTaxReturn;
    }

    saveTaxReturn() {
        this.taxReturn = this.currentTaxReturn;
        this.heroService.saveTaxReturn(this.currentTaxReturn).subscribe();
    }
}