import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Operator } from '../../services/operator.model';
import { adminService } from '../../services/admin-service.service';

@Component({
  selector: 'app-operator-account',
  templateUrl: './operator-acc.component.html',
  styleUrls: ['./operator-acc.component.css']
})
export class OperatorAccountComponent implements OnInit {
  operators: Operator[];

  constructor(private adminService: adminService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadOperators();
  }

  loadOperators() {
    this.adminService.getOperatorList().subscribe(
      (response: any) => {
        // Extract the array from the response object
        if (response && response.$values && Array.isArray(response.$values)) {
          this.operators = response.$values;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching operator list:', error);
      }
    );
  }

  deleteOperator(operatorId: number) {
    if (confirm('Are you sure you want to delete this operator?')) {
      this.adminService.deleteOperator(operatorId).subscribe(
        () => {
          this.toastr.success('Operator deleted successfully.');
          this.loadOperators(); // Refresh the operator list after deletion
        },
        (error) => {
          console.error('Error deleting operator:', error);
          this.toastr.error('Error deleting operator. Please try again.');
        }
      );
    }
  }
}
