import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../auth/services/storage/storage.service';

@Component({
  selector: 'app-operator-dashboard',
  templateUrl: './operator-dashboard.component.html',
  styleUrl: './operator-dashboard.component.css'
})
export class OperatorDashboardComponent {
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
