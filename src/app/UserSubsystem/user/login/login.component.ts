import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  isPopupVisible: boolean = false;
  message: string = '';
  number: number = 0;
  private intervalId: any;

  constructor(private authService: UserManagementService, private router: Router) { }

  ngOnInit(): void {
    
    this.message = '';
  }

  startLoadingAnimation(): void {
    let dots = '';
    this.intervalId = setInterval(() => {
      if (dots.length < 3) {
        dots += '.';
      } else {
        dots = '';
      }
      this.message = `Loading${dots}`;
    }, 500); // Update every 500 milliseconds
  }

  stopLoadingAnimation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.message = ''; // Optionally reset the message
    }
  }

  authenticate() {
    this.startLoadingAnimation();
    this.authService.authenticate(this.username, this.password).subscribe(
      (response: boolean) => {
        this.stopLoadingAnimation();
        if (response) {
          this.openPopup();
          console.log(response);
        } else {
          this.message=('Invalid Credentials');
        }
      },
      (error: string) => {
        this.stopLoadingAnimation();
        this.message=('Invalid Credentials');
      }
    );
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  verifyOTP() {
    this.startLoadingAnimation();
    this.authService.authenticateOTP(this.number).subscribe({
      next: (response) => {
        this.stopLoadingAnimation();
        console.log('Success:', response);
        if (response) {
          sessionStorage.setItem('CurrentUser', response.c);
          sessionStorage.setItem('CurrentUserId', response.u);

          this.router.navigate(['/dashboard']); // When Login Is A success
        } else {
          this.message=('Invalid OTP');
        }
      },
      error: (error) => {
        this.stopLoadingAnimation();
        this.message =('Invalid OTP');
      }
    });
  }
}
