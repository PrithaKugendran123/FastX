import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-nav-ad',
  templateUrl: './nav-ad.component.html',
  styleUrl: './nav-ad.component.css'
})
export class NavAdComponent {
  constructor(private router:Router){}
  ngOnInit():void{
    
  }
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
