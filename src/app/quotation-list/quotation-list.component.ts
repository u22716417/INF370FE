import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../quotation.service';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export class QuotationListComponent implements OnInit {
  quotations: any[] = [];
  filteredQuotations: any[] = [];

  constructor(private quotationService: QuotationService) {}

  ngOnInit(): void {
    this.getAllQuotations();
  }

  getAllQuotations(): void {
    this.quotationService.getQuotations().subscribe({
      next: (result) => {
        this.quotations = result;
        this.filteredQuotations = [...this.quotations];
        console.log('Fetched quotations:', this.quotations);
      },
      error: (err) => {
        console.error('Error fetching quotations', err);
      }
    });
  }

  sendEmail(id: number): void {
    this.quotationService.sendEmail(id).subscribe({
      next: () => {
        console.log(`Email sent for quotation ${id}`);
        alert(`Email sent for quotation ${id}`);
      },
      error: (err) => {
        console.error('Error sending email', err);
      }
    });
  }
}

