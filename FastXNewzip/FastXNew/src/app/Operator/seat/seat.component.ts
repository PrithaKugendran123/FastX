import { Component, OnInit } from "@angular/core";
import { OpServiceService } from "../shared/op-servie.service";



@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  seatWithBusDetails: any[];

  constructor(private opService: OpServiceService) {}

  ngOnInit(): void {
   
   
  }

  
  fillForm(seat){
    this.opService.ppData=seat;
}

  // loadSeatWithBusDetails() {
  //   this.opService.getSeatwithBusDetails().subscribe(
  //     (data: any) => {
      
  //       if (typeof data === 'object' && Array.isArray(data.$values)) {
  //         this.seatWithBusDetails = data.$values.map(seat => ({
  //           SeatId: seat.SeatId,
  //           SeatNumber: seat.SeatNumber,
  //           IsAvailable: seat.IsAvailable,
  //           Bus: seat.Bus || {}  
  //         }));
  //         console.log('Processed data:', this.seatWithBusDetails);
  //       } else {
  //         console.error('Invalid data format. Expected an object with $values property as an array.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

  // // Delete a seat record.
  // delRecord(pid) {
  //   if (confirm("Are you sure?")) {
  //     this.opService.delSeat(pid).subscribe(
  //       res => {
  //         alert("This seat is deleted");
  //         this.opService.seatList();
  //       },
  //       err => {
  //         alert("Error: " + err);
  //       }
  //     );
  //   }
  // }
}
