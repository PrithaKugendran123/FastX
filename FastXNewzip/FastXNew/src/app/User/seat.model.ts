// seat.model.ts

import { Bus } from "./bus.model";

export interface Seat {
    SeatId: number;
    BusId: number;
    SeatNumber: number;
    IsAvailable: boolean;
    Bus?: Bus; // Add this if you have a reference to the Bus details
  }
  