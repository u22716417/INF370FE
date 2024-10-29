import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Service } from '../AdminSubsystem/service/service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class HomePageComponent implements OnInit{
  
  events: any[] = [];


  constructor(private eventService: Service, private route: Router ) {}
  
  
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events: any) => {
        console.log('Get events:', events); 
        this.route.navigate(['/event-list']); 
      },
      error: (error: any) => {
        console.error('Error fetching upcoming events:', error);
      }
    });
  }
  
}



  