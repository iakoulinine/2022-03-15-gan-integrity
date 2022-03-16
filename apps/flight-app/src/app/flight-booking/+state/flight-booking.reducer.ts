import { Flight } from '@flight-workspace/flight-lib';
import { createReducer, on } from '@ngrx/store';
import { immerOn } from 'ngrx-immer/store';
import {
  delayFirstFlight,
  delayFlight,
  flightsLoaded,
} from './flight-booking.actions';

export interface FlightBookingState {
  flights: Flight[];
}

const initalState: FlightBookingState = {
  flights: [
    {
      id: 1,
      from: 'Wien',
      to: 'Kopenhagen',
      date: '2022-03-16',
      delayed: false,
    },
  ],
};

export const flightBookingReducer = createReducer<FlightBookingState>(
  initalState,
  immerOn(flightsLoaded, (state, action) => {
    state.flights = action.flights;
  }),
  // on(delayFirstFlight, (state) => {
  //   const { flights } = state;
  //   if (flights.length === 0) {
  //     return state;
  //   }
  //
  //   const [flight] = flights;
  //   const oldDate = new Date(flight.date);
  //   const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
  //   const newFlight = { ...flight, date: newDate.toISOString() };
  //
  //   return { ...state, flights: [newFlight, ...flights.slice(1)] };
  // }),
  immerOn(delayFirstFlight, (state) => {
    const { flights } = state;
    if (flights.length === 0) {
      return;
    }

    const [flight] = flights;
    const oldDate = new Date(flight.date);
    const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
    flight.date = newDate.toISOString();
  }),
  on(delayFlight, (state, { id }) => {
    const flights = state.flights.map((flight) => {
      if (flight.id === id) {
        const oldDate = new Date(flight.date);
        const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
        flight.date = newDate.toISOString();
        const newFlight = { ...flight, date: newDate.toISOString() };
        return newFlight;
      } else {
        return flight;
      }
    });

    return { ...state, flights };
  })
);
