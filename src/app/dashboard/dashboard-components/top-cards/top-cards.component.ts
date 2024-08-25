import { Component, OnInit } from '@angular/core';
import {DashboardSalesService, topcard,topcards} from './top-cards-data';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards:topcard[];
  dashcards: any[] = [];
  constructor(private dashbaordItem: DashboardSalesService ) { 

    this.topcards=topcards;
  }

  ngOnInit(): void {

    this.dashbaordItem.getDashboardData().subscribe(response =>{
      this.topcards[0].title = 'R '+response.yearlyEarning;
      this.topcards[1].title = response.totalTicketSales;
      this.topcards[1].subtitle = "Total Ticket Sales"
      this.topcards[2].title = response.ticketSold;
      this.topcards[2].subtitle = "Number of Tickets Sold"
      this.topcards[3].title = response.weeklySales;
    })

  }

}
