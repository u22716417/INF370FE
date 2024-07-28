import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.scss']
})
export class CreateQuotationComponent {
  form: FormGroup;
  private apiUrl = 'https://localhost:7149/api/Quotation'; 

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      clientName: ['', Validators.required],
      serviceName: ['', Validators.required],
      equipmentName: ['', Validators.required],
      amountPayable: [null, [Validators.required, Validators.min(0)]],
      quotationDate: [null, Validators.required],
      quotationFile: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({ quotationFile: file });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('ClientName', this.form.get('clientName')?.value);
      formData.append('ServiceName', this.form.get('serviceName')?.value);
      formData.append('EquipmentName', this.form.get('equipmentName')?.value);
      formData.append('AmountPayable', this.form.get('amountPayable')?.value);
      formData.append('QuotationDate', this.form.get('quotationDate')?.value);
      formData.append('QuotationFile', this.form.get('quotationFile')?.value);

      this.http.post<any>(this.apiUrl, formData).subscribe(response => {
        console.log('Quotation created successfully', response);
        // Optionally, redirect to another page or show a success message
      }, error => {
        console.error('Error creating quotation', error);
        // Handle the error
      });
    }
  }
}

