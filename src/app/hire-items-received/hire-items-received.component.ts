import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, pipe, throwError } from 'rxjs';
@Component({
  selector: 'app-hire-items-received',
  templateUrl: './hire-items-received.component.html',
  styleUrls: ['./hire-items-received.component.scss']
})
export class HireItemsReceivedComponent {
  hireItemsReceiveForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.hireItemsReceiveForm = this.fb.group({
      // Define form controls with their validators
      hireItemsReceiveName: ['', Validators.required],
      receiveDate: [new Date().toISOString().split('T')[0], Validators.required],
      condition: ['', Validators.required],
      clientName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.hireItemsReceiveForm.valid) {
      const hireItemsReceived = this.hireItemsReceiveForm.value;
      this.receiveHireItem(hireItemsReceived).subscribe(response => {
        alert(response.message);
        this.hireItemsReceiveForm.reset();
      });
    }
  }

  receiveHireItem(hireItemsReceived: any): Observable<any> {
    return this.http.post<any>('https://localhost:7149/api/HireItemsReceived/receive', hireItemsReceived);
    pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        alert('An error occurred. Please try again later.');
        return throwError(error);
  })
  );
}
}
