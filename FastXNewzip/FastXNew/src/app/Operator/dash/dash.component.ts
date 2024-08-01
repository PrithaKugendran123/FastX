import { Component } from '@angular/core';
import { StorageService } from '../../auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent {
  constructor(private router:Router) { }
  ngOnInit(): void {
  }
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
