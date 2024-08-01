import { Component, OnInit } from '@angular/core';
import { OpServiceService } from '../../../Operator/shared/op-servie.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class busScheduleComponent implements OnInit {
  scheduleWithBusDetails: any[];

  constructor(private opService: OpServiceService) {}

  ngOnInit(): void {
    
  
  }

//   fillForm(schedule) {
//     this.opService.bsData = schedule;
//   }

  
//   loadScheduleWithBusDetails() {
//     this.opService.getSchedulesWithBusDetails().subscribe(
//       (data: any) => {
       
//         if (typeof data === 'object' && Array.isArray(data.$values)) {
//           this.scheduleWithBusDetails = data.$values.map(schedule => ({
//             ScheduleId: schedule.ScheduleId,
//             DepartureTime: schedule.DepartureTime, 
//             ArrivalTime: schedule.ArrivalTime,     
//             Fare: schedule.Fare,
//             Bus: schedule.Bus || {}
//           }));
          
//           console.log('Processed data:', this.scheduleWithBusDetails);
//         } else {
//           console.error('Invalid data format. Expected an object with $values property as an array.');
//         }
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   }


//   delRecord(scheduleId) {
//     if (confirm("Are you sure?")) {
//       this.opService.delSchedule(scheduleId).subscribe(
//         res => {
//           alert("This schedule is deleted");
//           this.opService.scheduleList();
//         },
//         err => {
//           alert("Error: " + err);
//         }
//       );
//     }
//   }
}