import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

  constructor(private forgotPasswordService:UserManagementService,  private router: Router){}
 
  username: string = '';
  loading: boolean = false;
  message = "Invalid Username, Try Again"
  error: boolean | undefined;
  showPopup: boolean = false; // Add a flag for the popup

  ngOnInit(): void {
    this.error = false;
  }

  async onSubmit() {
    this.loading = true; // Set loading to true when the API call starts
    try {
      const response = await firstValueFrom(this.forgotPasswordService.resetPassword(this.username));
      this.showPopup = true; // Show the popup on success
      setTimeout(() => {
        this.showPopup = false;
        this.router.navigate(['/login']); // Navigate back to login after 2 seconds
      }, 2000);
      // Handle successful response
    } catch (error) {
      this.error = true;
      console.error('Error resetting password', error);
      // Handle error response
    }
    finally
    {
      this.loading = false; // Set loading to false when the API call is complete
    }
  }
}
