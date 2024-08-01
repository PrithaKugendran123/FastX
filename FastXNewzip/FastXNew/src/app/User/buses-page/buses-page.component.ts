import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServicesService } from '../user-services.service';
import { SeatAvailComponent } from '../seat-avail/seat-avail.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-buses-page',
  templateUrl: './buses-page.component.html',
  styleUrls: ['./buses-page.component.css']
})
export class BusesPageComponent implements OnInit {
  routeId: number;
  availableBuses: any[] = [];
  filteredBuses: any[] = []; // Added filteredBuses array
  selectedBusId: number;
  selectedSeat: number;
  selectedSeats: number[] = [];
  busTypeFilter: string = ''; // Added busTypeFilter
  seatTypeFilter: string = ''; // Added seatTypeFilter
  // Inside your component class
noBusesFound: boolean = false;


  @ViewChild('seatAvailabilityContainer', { read: ViewContainerRef }) seatAvailabilityContainer: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private userService: UserServicesService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.routeId = +params.get('id');
      this.fetchAvailableBuses();
    });
    this.checkSeatSelection(); // Add this line to initialize button state
  }
  
  showSeatDropdown(bus: any): void {
    // Toggle the visibility flag for the clicked bus
    bus.showSeatDropdown = !bus.showSeatDropdown;
  
    // Set a flag to indicate whether to show status images
    bus.showStatusImages = bus.showSeatDropdown;
  
    // If the dropdown is being shown, fetch seats for the clicked bus
    if (bus.showSeatDropdown) {
      this.userService.getSeatsByBusId(bus.BusId).subscribe(
        (data: any) => {
          console.log('Fetched Seat Details for Bus ID', bus.BusId, ':', data);
          bus.Seats = data;
  
          // Set flag to indicate that seats are shown for this bus
          bus.seatsShown = true;
  
          // Hide the seat dropdown for other buses
          this.availableBuses.forEach(b => {
            if (b !== bus) {
              b.showSeatDropdown = false;
              b.showStatusImages = false; // Reset status images flag for other buses
              b.seatsShown = false; // Set flag to false for other buses
            }
          });
        },
        (error) => {
          console.error('Error fetching seat details:', error);
        }
      );
    } else {
      // Hide the seats and reset the flag
      bus.Seats = null;
      bus.seatsShown = false;
    }
  }
  


  
  
  

  fetchAvailableBuses(): void {
    this.userService.getBusListByRouteId(this.routeId).subscribe(
      (data: any) => {
        console.log('Received data:', data);
        if (data && data.buses && data.buses.$values) {
          this.availableBuses = data.buses.$values;
          this.filteredBuses = this.availableBuses; // Initialize filteredBuses
          this.availableBuses.forEach(bus => bus.showSeatDropdown = false);
        } else {
          console.error('Invalid data structure:', data);
        }
      },
      (error) => {
        console.error('Error fetching available buses:', error);
      }
    );
  }

  bookTicket(bus: any, selectedSeat: number): void {
    const ticketPrice = 20; 
    const bookingData = {
      busDetails: bus,
      selectedSeat: selectedSeat,
      ticketPrice: ticketPrice,
      routeId: this.routeId, // Include routeId in the booking data
      userId: this.userService.getCurrentUserId(), // Fetch the userId
      busId: bus.BusId // Fetch the busId from the bus object
    };

    this.router.navigate(['/final-booking'], { queryParams: bookingData })
      .then(() => {
        console.log('Navigated to /final-booking route with queryParams:', bookingData);
      })
      .catch(error => {
        console.error('Error navigating to /final-booking route:', error);
        // Handle error appropriately, e.g., show error message to the user
      });
  }
  toggleSeatSelection(seatNumber: number): void {
    // Check if the seat is available (not booked)
    const seat = this.filteredBuses.flatMap(bus => bus.Seats.$values).find(seat => seat.SeatNumber === seatNumber);
    if (!seat || !seat.IsAvailable) {
      return; // Exit the method if the seat is not available (booked)
    }

    const index = this.selectedSeats.indexOf(seatNumber);
    if (index === -1) {
      // Seat is not selected, so add it to the selectedSeats array
      this.selectedSeats.push(seatNumber);
      this.userService.setSelectedSeatId(seatNumber); 
    } else {
      // Seat is already selected, so remove it from the selectedSeats array
      this.selectedSeats.splice(index, 1);
      this.userService.setSelectedSeatId(null); 
    }
    this.checkSeatSelection();
}


  

  checkSeatSelection(): void {
    if (this.selectedSeats.length > 0) {
      this.selectedSeat = this.selectedSeats[0];
    } else {
      this.selectedSeat = null; 
    }
  }

  isSeatSelected(seatNumber: number): boolean {
    return this.selectedSeats.includes(seatNumber);
  }

  applyFilters(): void {
    // Filter by bus type
    let filteredByBusType = this.availableBuses.filter(bus => {
      return this.busTypeFilter === '' || bus.BusType.toLowerCase() === this.busTypeFilter.toLowerCase();
    });
  
    // Filter by seat type
    this.filteredBuses = filteredByBusType.filter(bus => {
      return this.seatTypeFilter === '' || bus.SeatType.toLowerCase() === this.seatTypeFilter.toLowerCase();
    });
  
    // Check if no buses are found
    this.noBusesFound = this.filteredBuses.length === 0;
  }
// Inside your component class
constructImageUrl(busId: number): string {
  let imageUrl: string;
  // Use a switch statement or if-else conditions to determine the image URL based on bus ID
  switch (busId) {
    case 1:
      imageUrl = 'assets/images/bus1.jpeg';
      break;
    case 3:
      imageUrl = 'assets/images/bus31.jpeg';
      break;
      case 4:
      imageUrl = 'assets/images/bus 4.jpg';
      break;
      case 5:
      imageUrl = 'assets/images/bus 13.jpg';
      break;
      case 6:
      imageUrl = 'assets/images/bus 5.jpg';
      break;
      case 7:
      imageUrl = 'assets/images/bus 10.jpg';
      break;
      case 8:
      imageUrl = 'assets/images/bus 14.jpg';
      break;
      case 9:
      imageUrl = 'assets/images/bus 16.jpg';
      break;
      case 10:
      imageUrl = 'assets/images/bus 12.jpg';
      break;
      case 11:
      imageUrl = 'assets/images/bus2.jpeg';
      break;
      case 12:
      imageUrl = 'assets/images/bus 5.jpg';
      break;
      case 13:
      imageUrl = 'assets/images/bus 6.jpg';
      break;
      case 14:
      imageUrl = 'assets/images/bus 9.jpg';
      break;
      case 15:
      imageUrl = 'assets/images/bus 9.jpg';
      break;
      case 16:
      imageUrl = 'assets/images/bus 5.jpg';
      break;
      
    // Add more cases for other bus IDs if needed
    default:
      imageUrl = 'assets/images/default.jpeg'; // Default image URL for unknown bus IDs
      break;
  }
  return imageUrl;
}

  

}
