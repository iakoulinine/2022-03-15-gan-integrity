/* eslint-disable no-restricted-syntax */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  first,
  firstValueFrom,
  Observable,
  publishLast,
  ReplaySubject,
  share,
  shareReplay,
  Subject,
} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  expertMode = false;
  needsLogin$: Observable<boolean> | undefined;
  _userName = '';

  get userName(): string {
    return this._userName;
  }

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}

  changed($event: CustomEvent): void {
    console.debug('$event.detail ', $event.detail);

    this.expertMode = $event.detail;
  }

  ngOnInit() {
    this.needsLogin$ = this.route.params.pipe(
      map((params) => !!params['needsLogin'])
    );

    const promise = new Promise((resolve) => resolve(1));
    promise.then((number) => console.log(number));

    const observable = new Observable((subscriber) => {
      subscriber.next('airports loading...');
      fetch('http://www.angular.at/api/airport')
        .then((res) => res.json())
        .then((airports) => {
          subscriber.next(airports);
          subscriber.complete();
        });
    }).pipe(
      share({ connector: () => new ReplaySubject(1), resetOnComplete: false })
    );

    observable.subscribe((airports) => console.log('1: %o', airports));
    observable.subscribe((airports) => console.log('2: %o', airports));

    window.setTimeout(() => {
      console.log('3rd subscription started...');
      observable.subscribe((airports) => console.log('3: %o', airports));
    }, 1000);

    console.log('Finished');
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!';
  }

  logout(): void {
    this._userName = '';
  }
}
