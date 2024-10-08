import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../quotation.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export class QuotationListComponent implements OnInit {
  quotations: any[] = [];
  filteredQuotations: any[] = [];
  dtOptions: Config = {};
  showHelpModal = false;  // State for displaying help modal

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

  // Method to open help modal
openHelpModal() {
  this.showHelpModal = true;
}

// Method to close help modal
closeHelpModal() {
  this.showHelpModal = false;
}
}

