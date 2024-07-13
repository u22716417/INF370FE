import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../Admin/user-management.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
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
        if (response) {
          this.stopLoadingAnimation();
          this.openPopup();
          console.log(response);
        }
      },
      (error: string) => {
        this.stopLoadingAnimation();
        this.showToast('Invalid Credentials');
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
        sessionStorage.setItem('CurrentUser', response.userTypes);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.stopLoadingAnimation();
        this.showToast(`Error: ${error}`);
      }
    });
  }

  showToast(message: string) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
}

