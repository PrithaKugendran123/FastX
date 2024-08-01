import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserServicesService } from '../../../User/user-services.service';
import { StorageService } from '../../services/storage/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserServicesService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit() {
    
    this.loginForm = this.fb.group({
      Email: ['', [Validators.email, Validators.required]],
      Password: ['', [Validators.required]],
      Role: ['User'] // Set default role to User for user login
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response.user != null) {
          const user = {
            id: response.user.UserId,
            role: response.user.Role
          };
          console.log('User object:', user);
          StorageService.saveUser(user);
          StorageService.saveToken(response.jwtToken);

          this.userService.setCurrentUserId(user.id);
          console.log('Current user ID set:', user.id);

          // Navigate to the user dashboard
          this.router.navigateByUrl("/userdash");

          // Show success Toastr notification with colored box
          this.toastr.success('Login successful!', 'Success', {
            progressBar: true,
            closeButton: true,
            timeOut: 3000, // Duration before auto-dismissal (ms)
            enableHtml: true, // Enable HTML for custom styling
      
          });
        }
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          // Show error Toastr notification with colored box
          this.toastr.error('Invalid credentials', 'Login unsuccessful', {
            progressBar: true,
            closeButton: true,
            timeOut: 3000, // Duration before auto-dismissal (ms)
            enableHtml: true, // Enable HTML for custom styling
            // Apply custom CSS class for colored box
          });
        } else {
          console.error("Error occurred during login:", errorResponse.error);
        }
      }
    );
  }
}
