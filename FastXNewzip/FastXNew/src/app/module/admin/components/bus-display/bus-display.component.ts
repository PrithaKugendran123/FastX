import { Component, OnInit, ElementRef } from '@angular/core';
import { Route } from '../../services/route.model';
import { adminService } from '../../services/admin-service.service';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-display',
  templateUrl: './bus-display.component.html',
  styleUrls: ['./bus-display.component.css']
})
export class DisplayComponent implements OnInit {
  routes: Route[];
  selectedRoute: Route;

  constructor(
    private adminService: adminService,
    private elementRef: ElementRef,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.refreshBusRoutes();
  }

  refreshBusRoutes(): void {
    this.adminService.getBusRouteList().subscribe(
      (data: any) => {
        if (data && data.$values) {
          this.routes = data.$values;
        } else {
          this.routes = [];
        }
      },
      error => {
        console.error('Error fetching bus routes:', error);
        this.toastr.error('Failed to fetch bus routes'); // Show toastr for error
      }
    );
  }

  deleteRoute(routeId: number): void {
    if (confirm('Are you sure you want to delete this route?')) {
      this.adminService.delRoute(routeId).subscribe(
        () => {
          this.refreshBusRoutes();
          this.toastr.success('Route deleted successfully'); // Show toastr for successful deletion
        },
        error => {
          console.error('Error deleting route:', error);
          this.toastr.error('Error deleting route'); // Show toastr for error
        }
      );
    }
  }
  
  updateRoute(route: Route): void {
    this.adminService.updateRoute(route).subscribe(
      response => {
        console.log('Route updated successfully:', response);
        this.refreshBusRoutes();
        this.toastr.success('Route updated successfully'); // Show toastr for successful update
      },
      error => {
        console.error('Error updating route:', error);
        this.toastr.error('Error updating route'); // Show toastr for error
      }
    );
  }
  
  editRoute(route: Route): void {
    this.selectedRoute = route;
    // Scroll to the edit form
    this.scrollToForm();
  }

  private scrollToForm() {
    const formElement = this.elementRef.nativeElement.querySelector('.edit-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
