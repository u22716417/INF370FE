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
      quotationDate: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const quotationData = {
        ClientName: this.form.get('clientName')?.value,
        ServiceName: this.form.get('serviceName')?.value,
        EquipmentName: this.form.get('equipmentName')?.value,
        AmountPayable: this.form.get('amountPayable')?.value,
        QuotationDate: this.form.get('quotationDate')?.value
      };

      this.http.post<any>(this.apiUrl, quotationData).subscribe(response => {
        alert('Quotation created successfully');
        this.closeScreen();
      }, error => {
        alert('Error creating quotation');
      });
    }
  }

  closeScreen() {
    // Close the current window
    window.close();
  }
}


