import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

//Observable class extensions
import 'rxjs/add/observable/of';

//Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
    selector: 'hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
    providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {
    heroes: Observable<Hero[]>;

    // A Subject is a producer of an observable event stream;
    // searchTerms produces an Observable of strings, the filter criteria for the name search.
    private searchTerms = new Subject<string>();
    constructor(private heroSearchService: HeroSearchService, private router: Router) { }

    // Push a search term into the observable stream
    // Each call to search() puts a new string into this subject's observable stream by calling next().
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() //ignore if next search term is same as previous
            // switchMap calls the search service for each search term that makes it through debounce and distinctUntilChanged.
            // It cancels and discards previous search observables, returning only the latest search service observable.
            .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}
