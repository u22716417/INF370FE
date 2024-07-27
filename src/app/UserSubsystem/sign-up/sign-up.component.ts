import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignupComponent implements OnInit {
  stage: number = 1;
  profileImage: string | ArrayBuffer | null = null;
  profileImagePreview: string | ArrayBuffer | null = null;
  message: string = '';
  userDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profileImage: ''
  };

  loginDetails = {
    username: '',
    password: '',
    confirmPassword: ''
  };
  errorMessage: string = '';
  imagePreview: null | undefined;
  showPopup: boolean = false; // Add a flag for the popup
  isPopupVisible: boolean = false;

  constructor(private userManagementService: UserManagementService, private route: Router) {}
  ngOnInit(): void {
    this.message = 'Sign up Successful ';
  }

  nextStage() {
    if (this.validateStage1()) {
      this.stage = 2;
    }
  }

  previousStage() {
    this.stage = 1;
  }

  validateStage1(): boolean {
    return this.userDetails.firstName !=null && this.userDetails.lastName !=null && this.userDetails.email !=null && this.userDetails.phoneNumber !=null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Please select a valid image file.';
      this.imagePreview = null;
      return;
    }

    // Check if the file size is less than 2MB
    if (file.size > 2 * 1024 * 1024) {
      this.errorMessage = 'The file size must be less than 2MB.';
      this.imagePreview = null;
      return;
    }


    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
        this.profileImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.route.navigate(['/']);
  }

  onSubmit() {
    if (this.loginDetails.password !== this.loginDetails.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const signupData = {
      ...this.userDetails,
      ...this.loginDetails,
      profileImage: this.profileImage
    };

    this.userManagementService.signup(signupData).subscribe(
      response => {
        this.message = 'Signup successful';
        this.isPopupVisible = true;
      },
      error => {

        this.message = error;
        // Handle signup error
      }
    );
  }
}