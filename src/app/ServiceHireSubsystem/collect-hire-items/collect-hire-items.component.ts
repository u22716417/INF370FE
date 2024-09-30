import { Component, OnInit } from '@angular/core';
import { HireItemService } from '../service/hire-item.service';

@Component({
  selector: 'app-collect-hire-items',
  templateUrl: './collect-hire-items.component.html',
  styleUrls: ['./collect-hire-items.component.css']
})
export class CollectHireItemsComponent implements OnInit {
  todaysBookings: any[] = [];

  constructor(private hireItemsService: HireItemService) {}

  ngOnInit(): void {
    let clientid = 0; 
    const item = sessionStorage.getItem('CurrentUserId');
    if (item) {
      clientid = parseInt(item, 10);
      console.log(clientid);
    }

    this.hireItemsService.getHireItemsForToday(clientid).subscribe(response => {
      console.log(response);
      this.todaysBookings = response; // Assuming response is an array of hire items
    }, error => {
      console.error('Error fetching hire items:', error);
    });
  }
}
