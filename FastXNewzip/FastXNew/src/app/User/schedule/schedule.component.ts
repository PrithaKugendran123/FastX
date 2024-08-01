import { Component } from '@angular/core';
import { Bus } from '../bus.model';
import { BusService } from '../bus.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
selectedBus:Bus;
scheduleDetails: any;
constructor(private route :ActivatedRoute,private busService: BusService) { }

  // ngOnInit() {
  //   this.busService.selectedBus.subscribe(bus => {
  //     this.selectedBus = bus;
  //     // Use this.selectedBus to fetch and display schedule information
  //   });
  // }
  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     const busId = params['busId'];
  //     this.busService.getBusSchedule(busId).subscribe(schedule => {
  //       this.schedule = schedule;
  //     });
  //   });
}
