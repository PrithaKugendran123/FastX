import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OpServiceService } from '../shared/op-servie.service';

@Component({
  selector: 'app-seat-reg',
  templateUrl: './seat-reg.component.html',
  styleUrls: ['./seat-reg.component.css'] // Fix the property name to styleUrls
})
export class SeatRegComponent {
  constructor(public objservice: OpServiceService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm): void {
    if (form != null) {
      form.form.reset();
    } else {
      this.objservice.ppData = {
        SeatId: 0,
        BusId: 0,
        SeatNumber: 0,
        IsAvailable: true,
        Bus: null, // or set it to an empty object if needed
      };
    }
  }

  onSubmit(form: NgForm): void {
    if (this.objservice.ppData.SeatId == 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
    this.resetForm();
  }

  updateRecord(form: NgForm): void {
    this.objservice.updateSeat().subscribe(
      (res) => {
        this.objservice.seatList();
        alert('Seat Updated!');
      },
      (err) => {
        alert('Error' + err);
      }
    );
  }

  insertRecord(form: NgForm): void {
    this.objservice.regSeat().subscribe(
      (res) => {
        this.objservice.seatList();
        alert('Seat registration success!');
      },
      (err) => {
        alert('Error' + err);
      }
    );
  }
}
