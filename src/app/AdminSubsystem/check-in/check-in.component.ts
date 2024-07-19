import { Component } from '@angular/core';
import { Attendee } from './classes/attendee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckInService } from './service/check-in.service';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent {

  checkInForm: FormGroup | any;
  attendee: Attendee | null = null;
  errorMessage: string | null = null;
  isLoading = false;
  
  inputValue: string = '';
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  constructor(private fb: FormBuilder, private checkInService: CheckInService,private router: Router) {
    this.checkInForm = this.fb.group({
      barcode: ['', Validators.required]
    });
  }

  appendNumber(num: number) {
    this.inputValue += num;
  }

  clearInput() {
    this.inputValue = '';
  }

  onSubmit(): void {
    if (this.checkInForm?.valid) {
      this.isLoading = true; // Show loading indicator
      const checkInViewModel = this.checkInForm.value;     
       this.checkInService.checkIn(checkInViewModel).subscribe(
        (attendee) => {
          this.isLoading = false; // Hide loading indicator
          this.attendee = attendee;
          this.errorMessage = null;
  
          if (attendee.isBarcodeValid) {
            this.router.navigate(['/verification']);
          } else {
            this.errorMessage = 'Barcode is incorrect';
          }
        },
        (error) => {
          this.isLoading = false; // Hide loading indicator
          this.errorMessage = error.message || 'An error occurred';
          this.attendee = null;
        }
      );
    }
  }
  
  
}
