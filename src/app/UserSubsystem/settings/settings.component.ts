import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  activeSection: string = 'updateProfile';
  displaymsg : boolean = false; 
  displayErrormsg : boolean = false; 

  profile = {
    userId: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };


  passwords = {
    userId: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  displaymsg1: boolean = false;
  displayErrormsg1: boolean = false;
  displayvalmsg1: boolean = false;

  constructor(private profileService:UserManagementService){}

  ngOnInit(): void {
    this.displaymsg = false;
    this.displayErrormsg = false;
    this.displaymsg1 = false;
    this.displayErrormsg1 = false;
    this.displayvalmsg1 = false;

    const userId = sessionStorage.getItem('CurrentUserId');
    if (userId) {
      this.passwords.userId = userId;

      this.profileService.getUserProfile(userId).subscribe(
        data => {
          this.profile = {
            userId: userId,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber
          };
        },
        error => {
          console.error('Error fetching user profile', error);
        }
      );
    } else {
      console.error('No CurrentUserId found in session storage');
    }
  }

  showSection(section: string) {
    this.activeSection = section;
  }

  updateProfile() {
    // Handle profile update logic
    console.log('Profile updated:', this.profile);

    // Call service to update profile
    this.profileService.updateUserProfile(this.profile).subscribe(
      response => {
        this.displaymsg = true;
        this.displayErrormsg = false;
        this.displayvalmsg1 = false;

        console.log('Profile update successful', response);
      },
      error => {
        this.displayErrormsg = true;
        this.displaymsg = false;
        this.displayvalmsg1 = false;

        console.error('Error updating profile', error);
      }
    );
  }

  changePassword() {
    if (this.passwords.newPassword !== this.passwords.confirmPassword) {
      this.displaymsg1 = false;
      this.displayErrormsg1 = false;
      this.displayvalmsg1 = true;

      return;
    }
    this.profileService.updateUserProfilePasswords(this.passwords).subscribe(
      response => {
        this.displaymsg1 = true;
        this.displayErrormsg1 = false;
        this.displayvalmsg1 = false;

        console.log('Password changed:', this.passwords);

      },
      error => {
        this.displayErrormsg1 = true;
        this.displaymsg1 = false;
        this.displayvalmsg1 = false;

        console.error('Error updating profile', error);
      });
    // Handle password change logic
  }
}
