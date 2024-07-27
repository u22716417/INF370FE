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
  searchTerm: string = '';

  constructor(private quotationService: QuotationService) { }

  ngOnInit(): void {
    this.quotationService.getQuotations().subscribe(data => {
      this.quotations = data;
      this.filteredQuotations = data; 
    });
  }

  filterQuotations(): void {
    this.filteredQuotations = this.quotations.filter(quotation =>
      quotation.serviceName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      quotation.serviceDescription.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}


