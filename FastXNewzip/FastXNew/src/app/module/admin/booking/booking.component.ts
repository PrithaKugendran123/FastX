import { Component } from '@angular/core';
import { adminService } from '../services/admin-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-adbooking',
  templateUrl: './adbooking.component.html',
  styleUrl: './adbooking.component.css'
})
export class AdBookingComponent {
  bookings: any[];

  constructor(private bookingsService: adminService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void {
    this.bookingsService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  deleteBooking(bookingId: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingsService.deleteBooking(bookingId).subscribe(() => {
        // Remove the deleted booking from the UI
        this.bookings = this.bookings.filter(booking => booking.BookingId !== bookingId);
      });
    }
  }
}