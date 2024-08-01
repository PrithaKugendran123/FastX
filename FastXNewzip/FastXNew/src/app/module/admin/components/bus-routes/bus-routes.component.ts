import { Component, OnInit } from '@angular/core';

import { FormGroup, NgForm } from '@angular/forms';
import { adminService } from '../../services/admin-service.service';
import { Route } from '../../services/route.model';

@Component({
  selector: 'app-bus-routes',
  templateUrl: './bus-routes.component.html',
  styleUrls: ['./bus-routes.component.css'] 
})
export class RouteComponent implements OnInit {
  bookingForm: FormGroup;
  busRoutes: any[] = [];
  bppData: Route = new Route();
  constructor(public objservice: adminService) {}
  
   ngOnInit(): void {}
  //   this.refreshBusRoutes();
  //   this.objservice.getBusRouteList().subscribe(
  //     (response: any) => {
  //       console.log('Received data:', response);
  
  //       // Check if '$values' is a property in your response object
  //       if (response && response.$values && Array.isArray(response.$values)) {
  //         this.objservice.blist = response.$values;
  //         console.log('Received routes:', this.objservice.blist);
  //       } else {
  //         console.error('Invalid response format. Expected an object with "$values" property as an array.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching bus routes:', error);
  //     }
  //   );
  // }
  
  
  
  // resetForm(form?:NgForm){
  //   if(form!=null){
  //     form.form.reset();
  //   }
  //   else{
  //     this.objservice.bppData={RouteId:0,Origin:'',Destination:'',TravelDate:''}
  //   }
  // }
  // onSubmit(form:NgForm){
  //   if(this.objservice.bppData.RouteId==0){
  //     this.insertRecord(form);
      
  //   }
  //   else{
  //     this.updateRecord(form);
      
  //   }this.resetForm();
  // }
  // updateRecord(form: NgForm) {
  //   this.objservice.updateBusRoute().subscribe(
  //     (res) => {
  //       this.refreshBusRoutes();
  //     },
  //     (err) => {
  //       alert('Error' + err);
  //     }
  //   );
  // }
  //  private refreshBusRoutes() {
  //   this.objservice.getBusRouteList().subscribe(
  //     (response: Route[]) => {
  //       this.objservice.blist = response;
  //       console.log('Received routes:', this.objservice.blist);
  //     },
  //     (error) => {
  //       console.error('Error fetching bus routes:', error);
  //     }
  //   );
  // }
  // insertRecord(form:NgForm){
  //   this.objservice.regRoute().subscribe(res=>{;
  //   this.objservice.getBusRouteList();
  // alert("route registration success!");},
  // err=>{alert('Error'+err);})
  // }

   }