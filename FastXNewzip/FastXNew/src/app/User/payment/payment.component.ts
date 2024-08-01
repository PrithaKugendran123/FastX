import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServicesService } from '../user-services.service';
import { Payment } from '../payment.model';
import { Booking } from '../../Operator/shared/booking.model';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentMethod: string = '';
  accountDetails: string = '';
  paymentDate: Date = new Date();
  transactionStatus: string = 'Pending'; // Assuming default transaction status
  totalPrice: number; // Total price calculated from bus fare
  busId: number;
userId:number;
  constructor(private userService: UserServicesService, private router: Router,private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.busId = params['busId'];
      this.userId = params['userId'];
      console.log('Bus ID:', this.busId);
      console.log('User ID:', this.userId);
  
      // Fetch schedule details and calculate total price here using the busId
      const scheduleId = 4; // Replace with the actual ID of the schedule you want to get details for
      this.userService.getScheduleDetailsById(scheduleId).subscribe(
        (scheduleDetails) => {
          if (scheduleDetails && scheduleDetails.Fare) {
            this.totalPrice = scheduleDetails.Fare; // Assuming Fare is the property containing the fare amount
          }
        },
        (error) => {
          console.error('Error fetching schedule details:', error);
        }
      );
    });
  }
  

  submitPayment(): void {    
    // Assuming you have all necessary data to create a booking
    const bookingData: Booking = {
      BusId: this.busId,
      ScheduleId: 4,
      UserId: this.userService.getCurrentUserId(),
      TotalSeats: 1,
      SeatNumbers: this.userService.getSelectedSeatId().toString(),
      TotalCost: this.totalPrice,
      BookingDate: new Date(),
      BusType: '',
      PickUp: '',
      DropPoint: ''
    };

    // Call the postBooking method to send the booking data to the backend
    this.userService.postBooking(bookingData).subscribe(
      (createdBooking) => {
        console.log('Booking created successfully:', createdBooking);
        alert('Payment successful! Booking confirmed.');
        this.router.navigateByUrl('/mybooking');
      },
      (error) => {
        console.error('Error creating booking:', error);
        alert('Error creating booking. Please try again later.');
        // Handle error appropriately, e.g., show error message to the user
      }
    );
  }
}
