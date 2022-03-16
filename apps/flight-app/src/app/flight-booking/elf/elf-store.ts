import { Flight } from '@flight-workspace/flight-lib';
import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

const flightsStore = createStore({ name: 'flights' }, withEntities<Flight>());

export const flights$ = flightsStore.pipe();
