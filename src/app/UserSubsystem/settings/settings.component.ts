import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { AutologoutService } from '../autologout.service';

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
  showHelpModal = false;  // State for displaying help modal

  autoLogoutTimer: number = 45; // Default timer in minutes
  timerUpdated: boolean = false; // Flag to show success message


  constructor(private profileService:UserManagementService,private autoLogoutService: AutologoutService){}

  ngOnInit(): void {
    this.loadSettings();
    this.displaymsg = false;
    this.displayErrormsg = false;
    this.displaymsg1 = false;
    this.displayErrormsg1 = false;
    this.displayvalmsg1 = false;
    this.loadSettings();  // Load the saved auto-logout timer

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
     // Initialize the auto-logout timer in the service
  const savedTimer = localStorage.getItem('idleTimeoutDuration');
  if (savedTimer) {
    const savedDurationMs = parseInt(savedTimer, 10);
    this.autoLogoutService.setIdleTimeoutDuration(savedDurationMs);
  }
  }

  loadSettings() {
    const savedTimer = localStorage.getItem('idleTimeoutDuration');
    if (savedTimer) {
      // Convert the stored value (milliseconds) to minutes
      this.autoLogoutTimer = Math.floor(parseInt(savedTimer, 10) / (60 * 1000));
    }
  }
 
  showSection(section: string) {
    this.activeSection = section;
  }

// Method to update the auto-logout timer
updateAutoLogoutTimer(): void {
  // Validation: Check if the timer is a valid positive number
  if (this.autoLogoutTimer <= 0) {
    alert('Please enter a valid time in minutes.'); // Display an error message
    return; // Exit the function if the timer value is invalid
  }

  // Convert minutes to milliseconds
  const newDurationMs = this.autoLogoutTimer * 60 * 1000;

  // Save the new timer value to the autologout service
  this.autoLogoutService.setIdleTimeoutDuration(newDurationMs);
  this.timerUpdated = true;

  // Optionally, reset the success message after a timeout
  setTimeout(() => {
    this.timerUpdated = false;
  }, 3000); // Hide message after 3 seconds
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
   // Method to open help modal
   openHelpModal() {
    this.showHelpModal = true;
  }

  // Method to close help modal
  closeHelpModal() {
    this.showHelpModal = false;
  }
}
