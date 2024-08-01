import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../user-services.service';
import { Schedule } from '../../Operator/shared/schedule.model';
import { Bus } from '../bus.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-final-booking',
  templateUrl: './final-booking.component.html',
  styleUrls: ['./final-booking.component.css'],
})
export class FinalBookingComponent implements OnInit {
  selectedSeatId: number;
  schedule: Schedule;
  busDetails: any;
  routeId: number; 
  userId: number; // Assuming you have userId property to store the selected userId

  constructor(private userService: UserServicesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const routeId = params['routeId']; 
      const scheduleId = 4;
      this.selectedSeatId = this.userService.getSelectedSeatId();
      this.userId = this.userService.getCurrentUserId();
      console.log('Selected Seat Number:', this.selectedSeatId);
      this.userService.getScheduleDetailsById(scheduleId).subscribe(
        (schedule: Schedule) => {
          this.schedule = schedule;
          console.log('Fetched schedule details:', this.schedule);
  
          this.userService.getBusListByRouteId(routeId).subscribe(
            (response) => {
              this.busDetails = response;
              console.log('Fetched bus details:', this.busDetails);
            },
            (error) => {
              console.error('Error fetching bus details:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching schedule details:', error);
        }
      );
    });
  }

  confirmBooking() {
    // Navigate to payment page with dynamically generated queryParams
    this.router.navigate(['/payment'], { queryParams: { busId: this.busDetails.buses.$values[0].BusId, userId: this.userId } });
  }
}
