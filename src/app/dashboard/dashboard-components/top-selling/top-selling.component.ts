import { Component, OnInit } from '@angular/core';
import { DashTopSelling, Product } from './top-selling-data';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {

  topSelling: Product[] = [];

  constructor(private dashTable: DashTopSelling) { }

  ngOnInit(): void {
    this.dashTable.getDashboardData().subscribe(response => {
      response.forEach((element: any) => {
        let item: Product = {
          image: element.image,
          uname: element.name,
          gmail: element.email,
          productName: '',
          status: '',
          weeks: element.numberOfTickets,
          budget: element.totalSales
        };

        this.topSelling.push(item);
      });

      console.log(this.topSelling);
    });
  }
}
