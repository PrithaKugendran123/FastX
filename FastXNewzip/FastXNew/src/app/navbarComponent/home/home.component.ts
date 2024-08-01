import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../auth/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router:Router){}
  ngOnInit():void{
    
  }
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
