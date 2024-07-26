import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  activeSection: string = 'updateProfile';

  profile = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };


  passwords = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private profileService:UserManagementService){}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('CurrentUserId');
    if (userId) {
      this.profileService.getUserProfile(userId).subscribe(
        data => {
          this.profile = {
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
  }

  changePassword() {
    if (this.passwords.newPassword !== this.passwords.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }
    // Handle password change logic
    console.log('Password changed:', this.passwords);
  }
}
