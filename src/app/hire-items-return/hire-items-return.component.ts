import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-hire-items-return',
  templateUrl: './hire-items-return.component.html',
  styleUrls: ['./hire-items-return.component.scss']
})
export class HireItemsReturnComponent {
  hireItemsReturnForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.hireItemsReturnForm = this.fb.group({
      hireItemsReturnedName: ['', Validators.required],
      dateReturned: [new Date().toISOString().split('T')[0], Validators.required],
      condition: ['', Validators.required],
      clientName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.hireItemsReturnForm.valid) {
      const hireItemsReturned = this.hireItemsReturnForm.value;
      this.returnHireItem(hireItemsReturned).subscribe(response => {
        alert(response.message);
        this.hireItemsReturnForm.reset();
      }, error => {
        alert('Client is not found');
      });
    }
  }

  returnHireItem(hireItemsReturned: any): Observable<any> {
    return this.http.post<any>('https://localhost:7149/api/HireditemsReturned/return', hireItemsReturned)
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  }
}

