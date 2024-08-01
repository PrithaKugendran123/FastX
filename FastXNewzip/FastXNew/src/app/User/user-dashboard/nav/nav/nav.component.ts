import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    StorageService.logout(); // Reset login status after logout
    this.router.navigateByUrl("/login");
  }
}
