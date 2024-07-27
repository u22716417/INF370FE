import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../quotation.service';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss']
})
export class QuotationListComponent implements OnInit {
  quotations: any[] = [];

  constructor(private quotationService: QuotationService) { }

  ngOnInit(): void {
    this.quotationService.getQuotations().subscribe(data => {
      this.quotations = data;
    });
  }
}

