import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  delayFirstFlight,
  delayFlight,
} from '../+state/flight-booking.actions';
import { FlightBookingRepository } from '../elf/elf-store';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent {
  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true,
  };

  // flights$ = this.store.select(selectFlights);
  flights$ = this.elfRepo.getFlights();

  constructor(private store: Store, private elfRepo: FlightBookingRepository) {}

  search() {
    if (!this.from || !this.to) return;
    // this.store.dispatch(loadFlights({ from: this.from, to: this.to }));

    this.elfRepo.search(this.from, this.to);
  }

  delay(): void {
    this.store.dispatch(delayFirstFlight());
  }

  delayFlight(id: number) {
    this.store.dispatch(delayFlight({ id }));
  }
}
