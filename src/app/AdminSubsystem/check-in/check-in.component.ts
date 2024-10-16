import { Component, OnInit } from '@angular/core';
import { Attendee } from './classes/check-in';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckInService } from './service/check-in.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit  {
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
  showHelpModal = false;  // State for displaying help modal
  private usedBarcodes: Set<string> = new Set();
  public webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();
  private imageUrl = 'http://api.qrserver.com/v1/read-qr-code/'; // API URL
  Image: string = '';

  constructor(private fb: FormBuilder, private checkInService: CheckInService, private router: Router, private http: HttpClient) {
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

  ngOnInit(): void {
  
  }


  
  // Trigger the webcam capture
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    //console.log('Captured Image:', webcamImage);
    
    // Check if the image is valid
    if (!webcamImage || !webcamImage.imageAsBase64) {
      console.error('No valid image captured.');
      return;
    }
    console.log(webcamImage.imageAsBase64);
     this.Image = 'data:image/png;base64,'+ webcamImage.imageAsBase64; /// Just to check what image was uploaded
    this.webcamImage = webcamImage;
    this.uploadImage();
  }
  
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

 // Convert base64 data URL to Blob
private dataURItoBlob(dataURI: string): Blob {
 

  const base64String = dataURI;

  // Remove any whitespace characters from the base64 string
  const cleanedBase64 = base64String.replace(/\s/g, '');

  // Decode the base64 string
  const byteString = atob(cleanedBase64);

  // Create an ArrayBuffer and a Uint8Array to hold the binary data
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  // Fill the Uint8Array with the decoded binary data
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  // Return the binary data as a Blob, with the correct MIME type
  return new Blob([intArray], { type: '.png' });
}


  // Upload the captured image to the API
 // Upload the captured image to the API
 public uploadImage(): void {
  if (this.webcamImage) {
    const imageBlob = this.dataURItoBlob(this.webcamImage.imageAsBase64);
    const formData = new FormData();
    formData.append('file', imageBlob, 'webcam-image.png');

    this.http.post(this.imageUrl, formData).subscribe(
      (response: any) => {
        if (response && response[0] && response[0].symbol && response[0].symbol[0].data) {
          const qrCodeData = response[0].symbol[0].data;
          console.log('QR Code Data:', qrCodeData);

          // Send QR Code data to API for validation and check-in
          this.sendQrCodeDataToApi(qrCodeData);
        } else {
          this.showPopupNotification('No QR code found in the image.');
        }
      },
      (error) => {
        console.error('Upload failed', error);
      }
    );
  } else {
    this.showPopupNotification('No image captured.');
  }
}

sendQrCodeDataToApi(qrCodeData: string): void {
  const checkInViewModel = {
    QrCodeData: qrCodeData
  };

  this.http.post<Attendee>('https://localhost:7149/api/CheckIn/CheckIn', checkInViewModel).subscribe(
    (response) => {
      console.log('Check-In successful:', response);
      this.showPopupNotification('Check-In successful!');
      this.getAttendeeDetails(qrCodeData);
    },
    (error) => {
      console.error('Check-In failed:', error);
      if (error.status === 400 && error.error === "This ticket has already been checked in.") {
        this.showPopupNotification('This ticket has already been checked in.');
      } else {
        this.showPopupNotification('Check-In failed. Please try again.');
      }
    }

  );
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

  
  // Method to open help modal
openHelpModal() {
  this.showHelpModal = true;
}

// Method to close help modal
closeHelpModal() {
  this.showHelpModal = false;
}

// New method to fetch attendee details based on the ticket's ClientId after check-in
getAttendeeDetails(qrCodeData: string): void {
  // This API endpoint should return the attendee details based on the QR code data
  this.http.get<Attendee>(`https://localhost:7149/api/CheckIn/GetAttendeeDetails/${qrCodeData}`).subscribe(
    (attendee) => {
      this.attendee = attendee; // assuming the API returns the attendee details in this format
      console.log('Attendee Details:', this.attendee);
      this.showAttendeeModal = true;

      
    },
    (error) => {
      console.error('Failed to fetch attendee details:', error);
      this.showPopupNotification('Failed to fetch attendee details. Please try again.');
    }
    
  );
}


}
