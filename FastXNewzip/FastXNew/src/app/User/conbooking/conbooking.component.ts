import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../user-services.service';
import { Booking } from '../../Operator/shared/booking.model'; 

@Component({
  selector: 'app-conbooking',
  templateUrl: './conbooking.component.html',
  styleUrls: ['./conbooking.component.css']
})
export class ConbookingComponent implements OnInit {
  bookings: Booking[] = [];
  bookingId: number = 0;
  selectedSeatNumber: number;
  currentUserId: number; 

  constructor(private userService: UserServicesService) {}

  ngOnInit(): void {
    this.bookingId = 1;
    this.loadBooking(this.bookingId);
   
  }

  loadBooking(bookingId: number): void {
    if (bookingId !== 0) {
      this.userService.getBookings(bookingId).subscribe(
        (booking: Booking) => {
          this.bookings.push(booking); 
        },
        (error) => {
          console.error('Error fetching booking:', error);
        }
      );
    } else {
      console.error('Booking ID is not available.');
    }
  }

  
}