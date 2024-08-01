import { Component, OnInit } from '@angular/core';
import { OpServiceService } from '../shared/op-servie.service';
import { ToastrService } from 'ngx-toastr'; // Import the ToastrService

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'] // Correct the styleUrl to styleUrls
})
export class BookingComponent implements OnInit {
  bookingWithBusDetails: any[];

  constructor(private opService: OpServiceService, private toastr: ToastrService) {} // Inject ToastrService

  ngOnInit(): void {
    this.loadBookingWithBusDetails();
  }

  loadBookingWithBusDetails() {
    console.log('Loading booking data...');
    this.opService.getBookingwithBusDetails().subscribe(
      (data: any) => {
        console.log('Received data:', data);
        if (typeof data === 'object' && Array.isArray(data.$values)) {
          this.bookingWithBusDetails = data.$values.map(booking => {
            const processedBooking: any = {
              TotalSeats: booking.TotalSeats || 0,
              TotalCost: booking.TotalCost || 0,
              SeatNumber: booking.SeatNumbers || '',
              BookingDate: booking.BookingDate || new Date(),
              Bus: booking.Bus || {} ,
              User: booking.User || {} 
            };
            if ('BookingId' in booking) {
              processedBooking.BookingId = booking.BookingId;
            } else {
              processedBooking.BookingId = undefined;
            }
            return processedBooking;
          });
          console.log('Processed data:', this.bookingWithBusDetails);
        } else {
          console.error('Invalid data format. Expected an object with $values property as an array.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  delRecord(pid) {
    if (confirm("Are you sure?")) {
      this.opService.delBooking(pid).subscribe(
        res => {
          this.toastr.success('Booking deleted successfully!', 'Success'); // Show success toastr
          this.loadBookingWithBusDetails(); // Reload booking data after deletion
        },
        err => {
          this.toastr.error('Error occurred while deleting booking', 'Error'); // Show error toastr
        }
      );
    }
  }
}
