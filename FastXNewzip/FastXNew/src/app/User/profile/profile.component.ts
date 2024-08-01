import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { User } from '../../module/admin/services/user.model';
import { UserServicesService } from '../user-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User = new User();

  constructor(
    private userService: UserServicesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService // Inject ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    this.userService.getUser().subscribe((user: User) => {
      this.user = user;
      this.profileForm.patchValue(user);
    });
  }

  initializeForm(): void {
    this.profileForm = this.formBuilder.group({
      Name: ['', Validators.required], // Use 'Name' instead of 'name'
      ContactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Add pattern validator for ContactNumber
      Address: ['', Validators.required],
      Gender:['',Validators.required],
      Email:['',Validators.required],
      Password:['',Validators.required]
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      return; // If form is invalid, do not proceed with update
    }

    this.user = { ...this.user, ...this.profileForm.value };

    this.userService.updateUser(this.user).subscribe(() => {
      console.log('Profile updated successfully');
      // Show success Toastr notification
      this.toastr.success('Profile updated successfully', 'Success');
    }, error => {
      console.error('Error updating profile:', error);
      // Show error Toastr notification
      this.toastr.error('Failed to update profile', 'Error');
    });
  }
}
