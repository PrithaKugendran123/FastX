export class Seat {
  SeatId: number;
  BusId: number | null;
  SeatNumber: number;
  IsAvailable: boolean;
  Bus: Bus | null; // Assuming you have a Bus class

  constructor() {
    this.SeatId = 0;
    this.BusId = null;
    this.SeatNumber = 0;
    this.IsAvailable = true;
    this.Bus = null;
  }
}

export class Bus {
  BusId: number;
  BusNumber: string;
  BusName: string;

  constructor() {
    this.BusId = 0;
    this.BusNumber = '';
    this.BusName = '';
  }
}
