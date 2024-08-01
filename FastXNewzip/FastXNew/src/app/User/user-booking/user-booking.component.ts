// user-booking.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../user-services.service';
import { Router } from '@angular/router';
import { StorageService } from '../../auth/services/storage/storage.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {
  bookingForm: FormGroup;
  busRoutes: any[] = [];
  selectedBusId: number | null = null;
  uniqueOrigins: string[] = []; 
  uniqueDestination:string[]=[];
  constructor(
    private fb: FormBuilder,
    private busRouteService: UserServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBusRoutes();
  }

  initForm(): void {
    this.bookingForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      travelDate: ['', Validators.required],
    });
  }

  loadBusRoutes(): void {
    this.busRouteService.getBusRouteList().subscribe((data: any) => {
      console.log('Received bus routes data:', data);
      this.busRoutes = data.$values;
      this.uniqueOrigins = this.getUniqueOrigins(this.busRoutes);
      this.uniqueDestination=this.getUniqueDestination(this.busRoutes);
      
    });
  }
  getUniqueDestination(routes: any[]): string[] {
    const uniqueDestiniSet = new Set<string>();
    routes.forEach(route => {
      uniqueDestiniSet.add(route.Destination);
    });
    return Array.from(uniqueDestiniSet);
  }
  
  getUniqueOrigins(routes: any[]): string[] {
    const uniqueOriginsSet = new Set<string>();
    routes.forEach(route => {
      uniqueOriginsSet.add(route.Origin);
    });
    return Array.from(uniqueOriginsSet);
  }
  

  onSelectBus(busId: number): void {
    console.log('Selected bus ID:', busId);
    this.selectedBusId = busId;
    this.busRouteService.setSelectedBusId(busId); // Set selected bus ID in service
  }

  onSubmit(): void {
    console.log('Submitting booking form...');
    if (this.bookingForm.invalid) {
      console.log('Booking form is invalid.');
      return;
    }

    const formData = this.bookingForm.value;
    console.log('Form data:', formData);

    const selectedRoute = this.busRoutes.find(
      (route) => route.Origin === formData.origin && route.Destination === formData.destination
    );

    if (selectedRoute) {
      console.log('Selected route:', selectedRoute);
      this.router.navigate([`/busespage/${selectedRoute.RouteId}`], {
        state: { route: selectedRoute, formData: formData }
      });
    } else {
      alert('No matching route found for the selected origin and destination.');
    }
  }
  logout(){
    StorageService.logout(); // Reset login status after logout
    this.router.navigateByUrl("/login");
  }
}
