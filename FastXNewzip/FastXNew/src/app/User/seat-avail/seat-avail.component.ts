import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserServicesService } from '../user-services.service';

@Component({
  selector: 'app-seat-avail',
  templateUrl: './seat-avail.component.html',
  styleUrls: ['./seat-avail.component.css']
})
export class SeatAvailComponent {
  @Input() busId: number;
  seatAvailability: any[] = [];
  selectedSeatNumber: number;
  @Output() seatSelected = new EventEmitter<number>();

  constructor(private userService: UserServicesService) {}

  ngOnChanges(): void {
    if (this.busId) {
      this.fetchSeatAvailability();
    }
  }

  fetchSeatAvailability(): void {
    this.userService.getSeatsByBusId(this.busId).subscribe(
      (data: any) => {
        console.log('Fetched Seat Availability Data:', data);
        this.seatAvailability = data;
      },
      (error) => {
        console.error('Error fetching seat availability:', error);
      }
    );
  }

  selectSeat(seatNumber: number): void {
    const selectedSeat = this.seatAvailability.find(seat => seat.SeatNumber === seatNumber);
    if (selectedSeat && selectedSeat.IsAvailable) {
      this.selectedSeatNumber = seatNumber;
      this.seatSelected.emit(seatNumber);
    } else {
      console.log('Seat', seatNumber, 'is occupied.');
      // Optionally, you can provide user feedback here (e.g., a message or UI indication).
    }
  }
  
  
  

  isSelected(seatNumber: number): boolean {
    console.log('Seat:', seatNumber, 'isSelected:', this.selectedSeatNumber === seatNumber);
    return this.selectedSeatNumber === seatNumber;
  }
  
  
}
