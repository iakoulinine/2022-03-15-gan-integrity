import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightBookingState } from './flight-booking.reducer';

const featureSelector =
  createFeatureSelector<FlightBookingState>('flightBooking');

export const selectFlights = createSelector(
  featureSelector,
  (state) => state.flights
);
