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
  autoLogoutValue: number = 30; // Default is 30 minutes
  timerUpdated: boolean = false; // Flag to show success message
  timeUnit: string = 'minutes'; // Default time unit

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

  
  showSection(section: string) {
    this.activeSection = section;
  }

// Method to update the auto-logout timer
updateAutoLogoutTimer(): void {
  let newDurationMs: number;

  // Convert the selected time into milliseconds based on the selected unit
  if (this.timeUnit === 'seconds') {
    newDurationMs = this.autoLogoutValue * 1000; // Convert seconds to milliseconds
  } else if (this.timeUnit === 'minutes') {
    newDurationMs = this.autoLogoutValue * 60 * 1000; // Convert minutes to milliseconds
  } else {
    alert('Invalid time unit'); // Handle unexpected cases
    return;
  }

  // Save the new timer value to the auto-logout service and local storage
  this.autoLogoutService.setIdleTimeoutDuration(newDurationMs);
  localStorage.setItem('idleTimeoutDuration', newDurationMs.toString());
  this.timerUpdated = true;

  // Optionally, reset the success message after a timeout
  setTimeout(() => {
    this.timerUpdated = false;
  }, 3000); // Hide message after 3 seconds
}

loadSettings(): void {
  const savedTimer = localStorage.getItem('idleTimeoutDuration');
  if (savedTimer) {
    const savedDurationMs = parseInt(savedTimer, 10);
    
    // Determine whether the saved time was in seconds or minutes
    if (savedDurationMs < 60000) {
      this.timeUnit = 'seconds';
      this.autoLogoutValue = savedDurationMs / 1000; // Convert ms to seconds
    } else {
      this.timeUnit = 'minutes';
      this.autoLogoutValue = savedDurationMs / (60 * 1000); // Convert ms to minutes
    }
  }
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
