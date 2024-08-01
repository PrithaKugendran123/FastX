import { Component } from '@angular/core';
import { OpServiceService } from '../shared/op-servie.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bus-schedule-reg',
  templateUrl: './bus-schedule-reg.component.html',
  styleUrl: './bus-schedule-reg.component.css'
})
export class BusScheduleRegComponent {

  constructor(public objservice: OpServiceService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    } else {
      this.objservice.bsData = {
        ScheduleId: 0,
        BusId: 0,
        DepartureTime: new Date(),
        ArrivalTime: new Date(),
        Fare: 0
      };
    }
  }

  onSubmit(form: NgForm) {
    if (this.objservice.bsData.ScheduleId === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
    // Reset the form after submission
    this.resetForm(form);
  }

  updateRecord(form: NgForm) {
    if (this.objservice.bsData && this.objservice.bsData.ScheduleId !== 0) {
      this.objservice.updateSchedule(this.objservice.bsData).subscribe(
        res => {
          // Refresh the schedule list after update
          this.objservice.scheduleList();
          alert('Schedule Updated!');
        },
        err => {
          alert('Error' + err);
        }
      );
    } else {
      alert('Invalid schedule data');
    }
  }
  

  insertRecord(form: NgForm) {
    this.objservice.regSchedule().subscribe(
      res => {
        // Refresh the schedule list after registration
        this.objservice.scheduleList();
        alert('Schedule registration success!');
      },
      err => {
        alert('Error' + err);
      }
    );
  }
}