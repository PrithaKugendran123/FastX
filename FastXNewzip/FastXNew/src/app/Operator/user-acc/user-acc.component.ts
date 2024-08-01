import { Component } from '@angular/core';
import { adminService } from '../../module/admin/services/admin-service.service';
import { User } from '../../module/admin/services/user.model';
import { ToastrService } from 'ngx-toastr'; // Import the ToastrService

@Component({
  selector: 'app-user-acc',
  templateUrl: './user-acc.component.html',
  styleUrls: ['./user-acc.component.css'] // Correct the styleUrl to styleUrls
})
export class UserAccComponent {

  constructor(public objsrv: adminService, private toastr: ToastrService) {} // Inject ToastrService

  ngOnInit(): void {
    this.objsrv.getUserList().subscribe(
      (response: any) => {      
        if (response.$values && Array.isArray(response.$values)) {
          this.objsrv.ulist = response.$values as User[];
        } else {          
          this.objsrv.ulist = response as User[];
        }
      },
      (error) => {
        console.error('Error fetching user list:', error);
      }
    );
  }

  delRecord(pid) {
    if (confirm("Are you sure?")) {
      this.objsrv.delUser(pid).subscribe(
        res => {
          this.toastr.success('User deleted successfully!', 'Success'); // Show success toastr
          this.ngOnInit();
        },
        err => {
          this.toastr.error('Error occurred while deleting user', 'Error'); // Show error toastr
        }
      );
    }
  }
}
