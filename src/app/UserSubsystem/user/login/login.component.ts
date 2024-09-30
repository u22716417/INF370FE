import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 
  isPopupVisible: boolean = false;
  message: string = '';
  number: number = 0;
  private intervalId: any;
  isLoading: boolean = false; 

  constructor(private formBuilder: FormBuilder, private authService: UserManagementService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.message = '';
  }

  startLoadingAnimation(): void {
    this.isLoading = true; // Set isLoading to true
    let dots = '';
    this.intervalId = setInterval(() => {
      if (dots.length < 3) {
        dots += '.';
      } else {
        dots = '';
      }
      this.message = `Loading${dots}`;
    }, 500); 
  }

  stopLoadingAnimation(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.message = ''; 
      this.isLoading = false; // Set isLoading to false
    }
  }

  authenticate() {
    this.startLoadingAnimation();
    const { username, password } = this.loginForm.value; 
    this.authService.authenticate(username, password).subscribe(
      (response: boolean) => {
        this.stopLoadingAnimation();
        if (response) {
          this.openPopup();
          console.log(response);
        } else {
          this.message = 'Invalid Credentials';
        }
      },
      (error: string) => {
        this.stopLoadingAnimation();
        this.message = 'Invalid Credentials';
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
          this.router.navigate(['/dashboard']); 
        } else {
          this.message = 'Invalid OTP';
        }
      },
      error: (error) => {
        this.stopLoadingAnimation();
        this.message = 'Invalid OTP';
      }
    });
  }
}
