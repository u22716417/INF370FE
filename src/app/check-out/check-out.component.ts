import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckOutService } from '../check-out.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  checkOutForm: FormGroup;
  inputValue: string = '';
  isLoading: boolean = false;
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private fb: FormBuilder,
    private checkOutService: CheckOutService
  ) {
    this.checkOutForm = this.fb.group({
      barcode: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  appendNumber(num: string): void {
    this.inputValue += num;
    this.checkOutForm.controls['barcode'].setValue(this.inputValue);
  }

  clearInput(): void {
    this.inputValue = '';
    this.checkOutForm.controls['barcode'].setValue(this.inputValue);
  }

  cancel(): void {
    this.clearInput();
    this.showMessage('Checkout canceled', 'error');
  }

  onCheckOut(): void {
    if (this.checkOutForm.valid) {
      this.isLoading = true;
      this.checkOutService.checkOutByBarcode(this.checkOutForm.value.barcode).subscribe(
        () => {
          this.isLoading = false;
          this.showMessage('Check-out successful', 'success');
          this.clearInput();
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Error during check-out:', error);
          this.showMessage('Error during check-out. Please try again.', 'error');
        }
      );
    } else {
      console.warn('Barcode number is required.');
      this.showMessage('Please enter a barcode number.', 'error');
    }
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }
}




