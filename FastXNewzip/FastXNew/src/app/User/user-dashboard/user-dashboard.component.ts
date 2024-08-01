import { Component } from '@angular/core';
import { adminService } from '../../module/admin/services/admin-service.service';
import { User } from '../../module/admin/services/user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
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
}
