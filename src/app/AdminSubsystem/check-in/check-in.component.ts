import { Component } from '@angular/core';
import { Attendee } from './classes/attendee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckInService } from './service/check-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent {
  checkInForm: FormGroup;
  attendeeForm: FormGroup;
  attendee: Attendee | null = null;
  errorMessage: string | null = null;
  isLoading = false;
  showNotification: boolean = false;
  notificationMessage: string = '';
  inputValue: string = '';
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  showAttendeeModal = false;
  private usedBarcodes: Set<string> = new Set();

  constructor(private fb: FormBuilder, private checkInService: CheckInService, private router: Router) {
    this.checkInForm = this.fb.group({
      barcode: ['', Validators.required]
    });

    this.attendeeForm = this.fb.group({
      attendeeName: ['', Validators.required],
      attendeeSurname: ['', Validators.required],
      attendeeEmail: ['', [Validators.required, Validators.email]],
      attendeePhone: ['', Validators.required]
    });
  }

  appendNumber(num: number) {
    this.inputValue += num;
    this.checkInForm.controls['barcode'].setValue(this.inputValue);
  }

  clearInput() {
    this.inputValue = '';
    this.checkInForm.controls['barcode'].reset();
  }

  onSubmit(): void {
    if (this.checkInForm.valid) {
      const barcode = this.checkInForm.value.barcode;

      if (this.usedBarcodes.has(barcode)) {
        this.showPopupNotification('This barcode has already been checked in.');
        return;
      }

      this.isLoading = true;
      this.checkInService.validateBarcode(barcode).subscribe({
        next: (isValid) => {
          this.isLoading = false;
          if (isValid) {
            this.showAttendeeModal = true;  // Show attendee modal on successful validation
          } 
          
          else {
            this.showPopupNotification('Invalid barcode.');
          }
        },
        error: () => {
          this.isLoading = false;
          this.showPopupNotification('Error validating barcode.');
        }
      });
    } else {
      this.showPopupNotification('Please enter a valid barcode');
    }
  }

  submitAttendeeDetails(): void {
    if (this.attendeeForm.valid) {
      const checkInViewModel = {
        ...this.checkInForm.value,
        ...this.attendeeForm.value
      };

      this.checkInService.checkIn(checkInViewModel).subscribe({
        next: (attendee) => {
          this.isLoading = false;
          if (attendee) {
            this.attendee = attendee;
            this.usedBarcodes.add(this.checkInForm.value.barcode);
            this.showPopupNotification('Check-in successful.');
            this.closeAttendeeModal();  // Close the modal after successful check-in
          } else {
            this.showPopupNotification('Check-in failed.');
          }
        },
        error: () => {
          this.isLoading = false;
          this.showPopupNotification('An error occurred during check-in.');
          this.attendee = null;
        }
      });
    } else {
      this.showPopupNotification('Please fill in all the required details.');
    }
  }
    
  closeAttendeeModal(): void {
    this.showAttendeeModal = false;
  }

  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 3000);
  }
}
