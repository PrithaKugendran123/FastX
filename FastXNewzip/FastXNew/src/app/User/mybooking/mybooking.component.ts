import { Component, OnInit } from '@angular/core';
import { Booking } from '../../Operator/shared/booking.model';
import { UserServicesService } from '../user-services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css']
})
export class MybookingComponent implements OnInit {
  bookings: Booking[] = [];
  currentUserId: number;

  constructor(private userService: UserServicesService,private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Fetch the current user ID from the service
    this.currentUserId = this.userService.getCurrentUserId();
    console.log('Current user ID:', this.currentUserId);
    this.loadBookingsForCurrentUser();
  }
  navigateToBooking(): void {
    this.router.navigate(['/userbooking']); // Replace '/booking' with the actual route to your booking page
  }
  loadBookingsForCurrentUser(): void {
    this.userService.getBookingsByUserId(this.currentUserId).subscribe(
      (data: any) => {
        if (data && data.$values) {
          this.bookings = data.$values.reverse(); // Reverse the order of the bookings
          console.log('Bookings:', this.bookings);
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching bookings for current user:', error);
      }
    );
  }
  

  getBusDetailsForBookings(): void {
    for (const booking of this.bookings) {
      const busId = booking.Bus.BusId;
      this.userService.getBusDetailsById(busId).subscribe(
        (busDetails: any) => {
          console.log('Bus details:', busDetails);
          // Here you can handle bus details as per your requirement
        },
        (error) => {
          console.error('Error fetching bus details:', error);
        }
      );
    }
  }
  // refundBooking(booking: any): void {
  //   // Simulate refund process
  //   // Update booking status to "Refunded"
  //   // Display confirmation or error message to the user
  //   alert('Refunding booking:');
  //   // Perform refund logic here
  // }
  isMostRecentBooking(booking: Booking): boolean {
    // Check if the booking date is the most recent compared to others
    const mostRecentBooking = this.bookings.reduce((prev, current) =>
      new Date(current.BookingDate) > new Date(prev.BookingDate) ? current : prev
    );
    return booking === mostRecentBooking;
  }
  
}
