import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import {
  combineLatest,
  filter,
  Observable,
  of,
  pairwise,
  pluck,
  shareReplay,
  switchMap,
} from 'rxjs';
import { map } from 'rxjs/operators';

function isNotUndefined<T>(obj: T | undefined): asserts obj is T {
  if (obj === undefined) {
    throw new Error('obj is undefined');
  }
}

@Component({
  selector: 'flight-workspace-flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css'],
})
export class FlightLookaheadComponent {
  loading = false;

  flights$: Observable<Flight[]>;
  diff$: Observable<number>;
  control = new FormControl();

  // online$ = interval(2000).pipe(
  //   startWith(0),
  //   map(() => Math.random() < 0.5),
  //   distinctUntilChanged()
  // );
  online$ = of(true);

  constructor(private flightService: FlightService) {
    const input$ = this.control.valueChanges
      .pipe
      // debounceTime(500),
      // filter((input) => input.length >= 3),
      // distinctUntilChanged()
      ();

    this.flights$ = combineLatest([input$, this.online$]).pipe(
      filter(([, online]) => online),
      switchMap(([input]) => this.flightService.find(input, '')),
      shareReplay()
    );

    this.diff$ = this.flights$.pipe(
      pairwise(),
      map(([flights1, flights2]) => flights1.length - flights2.length)
    );
  }
}
