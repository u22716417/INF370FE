import { Component, OnInit } from '@angular/core';
import { TicketService } from '../Services/ticket.service';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {


  services: any[] = [];

  constructor(private serviceService: TicketService) { }

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    this.serviceService.getServices().subscribe(
      (data: any[]) => {
        this.services = data;
      },
      (error) => {
        console.error('Error fetching services', error);
      }
    );
  }

}
