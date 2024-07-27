import { Component } from '@angular/core';
import { CheckOutService } from '../check-out.service';
//import { MatSnackBar } from '@angular/material/snack-bar'; // Assuming you're using Angular Material

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
  barcodeNumber: string = '';
  isLoading: boolean = false; // To manage loading state

  constructor(private checkOutService: CheckOutService) {}

  onCheckOut(): void {
    if (this.barcodeNumber.trim()) {
      this.isLoading = true;
      this.checkOutService.checkOutByBarcode(this.barcodeNumber).subscribe(
        () => {
          this.isLoading = false;
         // this.snackBar.open('Check-out successful', 'Close', { duration: 3000 });
          this.barcodeNumber = ''; 
        },
        (error: any) => {
          this.isLoading = false;
          console.error('Error during check-out:', error);
        //  this.snackBar.open('Error during check-out. Please try again.', 'Close', { duration: 3000 });
        }
      );
    } else {
      console.warn('Barcode number is required.');
    //  this.snackBar.open('Please enter a barcode number.', 'Close', { duration: 3000 });
    }
  }

  cancel(): void {
    this.barcodeNumber = ''; // Clear the barcode number if needed
    console.log('Checkout canceled');
  }
}


