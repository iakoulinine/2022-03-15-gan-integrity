import { Flight } from '@flight-workspace/flight-lib';
import { createAction, props } from '@ngrx/store';

export const flightsLoaded = createAction(
  '[FlightBooking] Flights Loaded',
  props<{ flights: Flight[] }>()
);

export const delayFirstFlight = createAction(
  '[FlightBooking] Delay 1st Flight'
);

export const delayFlight = createAction(
  '[FlightBooking] Delay Flight',
  props<{ id: number }>()
);

export const loadFlights = createAction(
  '[FlightBooking] Load Flights',
  props<{ from: string; to: string }>()
);
