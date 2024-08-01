import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../auth/services/storage/storage.service';

@Component({
  selector: 'app-nav-op',
  templateUrl: './nav-op.component.html',
  styleUrl: './nav-op.component.css'
})

export class NavOpComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}

