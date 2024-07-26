import { Component } from '@angular/core';
import { QuotationService } from '../quotation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.scss']
})
export class CreateQuotationComponent {
  form: FormGroup;

  constructor(private quotationService: QuotationService, private fb: FormBuilder) {
    this.form = this.fb.group({
      clientId: [null, Validators.required],
      serviceId: [null, Validators.required],
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
      formData.append('ClientId', this.form.get('clientId')?.value);
      formData.append('ServiceId', this.form.get('serviceId')?.value);
      formData.append('AmountPayable', this.form.get('amountPayable')?.value);
      formData.append('QuotationDate', this.form.get('quotationDate')?.value);
      formData.append('QuotationFile', this.form.get('quotationFile')?.value);

      this.quotationService.createQuotation(formData).subscribe(response => {
        console.log('Quotation created successfully', response);
        // Optionally, redirect to another page or show a success message
      }, error => {
        console.error('Error creating quotation', error);
        // Handle the error
      });
    }
  }
}

