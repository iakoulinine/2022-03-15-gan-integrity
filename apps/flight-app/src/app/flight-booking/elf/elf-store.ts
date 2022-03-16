import { Injectable } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { createStore } from '@ngneat/elf';
import { devTools } from '@ngneat/elf-devtools';
import {
  selectAllEntities,
  selectEntities,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { updateRequestStatus, withRequestsStatus } from '@ngneat/elf-requests';
import { Observable } from 'rxjs';

devTools();

const store = createStore(
  { name: 'flightBooking' },
  withEntities<Flight>(),
  withRequestsStatus<'flights'>()
);

@Injectable({ providedIn: 'root' })
export class FlightBookingRepository {
  constructor(private flightService: FlightService) {}

  getFlights(): Observable<Flight[]> {
    return store.pipe(selectAllEntities());
  }

  search(from: string, to: string) {
    store.update(updateRequestStatus('flights', 'pending'));
    this.flightService.find(from, to).subscribe((flights) => {
      store.update(
        setEntities(flights),
        updateRequestStatus('flights', 'success')
      );
    });
  }
}
