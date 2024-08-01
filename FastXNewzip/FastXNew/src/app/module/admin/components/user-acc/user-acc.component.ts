import { Component } from '@angular/core';
import { adminService } from '../../services/admin-service.service';
import { User } from '../../services/user.model';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-acc.component.html',
  styleUrls: ['./user-acc.component.css']
})
export class UserAccountComponent {

  constructor(public objsrv: adminService) {}

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
          alert("User deleted");
          this.ngOnInit();
        },
        err => {
          alert("Error: " + err);
        }
      );
    }
  }
}
