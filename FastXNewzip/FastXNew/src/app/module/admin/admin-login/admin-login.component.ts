import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

import { Router } from '@angular/router';
import { UserServicesService } from '../../../User/user-services.service';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { StorageService } from '../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrorStatus: boolean = false;
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
      Role: ['Admin'] // Set default role to Admin for admin login
    });
  }

  closeErrorAlert() {
    this.showErrorStatus = false;
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

          // Navigate to the admin dashboard
          this.router.navigateByUrl("/buses");

          // Show success Toastr notification
          this.toastr.success('Login successful!', 'Success', {
            progressBar: true,
            closeButton: true,
            timeOut: 3000 // Duration before auto-dismissal (ms)
          });
        }
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          // Show error Toastr notification for invalid credentials
          this.toastr.error('Invalid credentials', 'Login Error', {
            progressBar: true,
            closeButton: true,
            timeOut: 3000 // Duration before auto-dismissal (ms)
          });
          this.showErrorStatus = true;
        } else {
          console.error("Error occurred during login:", errorResponse.error);
        }
      }
    );
  }
}
