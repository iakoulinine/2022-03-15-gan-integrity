import { Inject, Injectable } from '@angular/core';
import { FlightService } from '@flight-workspace/flight-lib';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { createEffects } from '@ngrx/effects/src/effects_module';
import { Store } from '@ngrx/store';
import { catchError, filter, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { flightsLoaded, loadFlights } from './flight-booking.actions';

@Injectable()
export class FlightBookingEffects {
  constructor(
    private flightService: FlightService,
    private actions$: Actions,
    private store: Store<any>
  ) {}

  loadFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFlights),
      concatLatestFrom(() => this.store.select((state) => state)),
      switchMap(([action, state]) =>
        this.flightService
          .find(action.from, action.to)
          .pipe(catchError(() => of([])))
      ),
      map((flights) => flightsLoaded({ flights }))
    )
  );
}
