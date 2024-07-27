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
  attendee: Attendee | null = null;
  errorMessage: string | null = null;
  isLoading = false;
  showNotification: boolean = false;
  notificationMessage: string = '';

  inputValue: string = '';
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  private usedBarcodes: Set<string> = new Set();

  constructor(private fb: FormBuilder, private checkInService: CheckInService, private router: Router) {
    this.checkInForm = this.fb.group({
      barcode: ['', Validators.required]
    });
  }

  appendNumber(num: number) {
    this.inputValue += num;
    this.checkInForm.patchValue({ barcode: this.inputValue });
  }

  clearInput() {
    this.inputValue = '';
    this.checkInForm.patchValue({ barcode: '' });
  }

  onSubmit(): void {
    if (this.checkInForm.valid) {
      const barcode = this.checkInForm.value.barcode;

      if (this.usedBarcodes.has(barcode)) {
        this.showPopupNotification('This barcode has already been checked in.');
        return;
      }


      const checkInViewModel = this.checkInForm.value;     
      this.checkInService.checkIn(checkInViewModel).subscribe(
        (attendee) => {
          
          this.attendee = attendee;
          this.errorMessage = null;

          if (attendee) { // Assuming `attendee` is returned on success
            this.usedBarcodes.add(barcode);
            this.showPopupNotification('Check-in successful.');
            // this.router.navigate(['/verification']);
          } else {
            this.showPopupNotification('Check-in failed.');
          }
        },
        (error) => {
          //this.errorMessage = error.message || 'An error occurred';
          this.showPopupNotification('An error occured');
          this.attendee = null;
        }
      );
    } else {
      this.showPopupNotification('Please enter a valid barcode');
    }
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
