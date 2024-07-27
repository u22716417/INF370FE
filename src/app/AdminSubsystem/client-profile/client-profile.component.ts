import { Component, OnInit } from '@angular/core';
import { ClientProfileService } from './service/client-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientProfile } from './client-profile';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  clients: ClientProfile[] = [];
  
  constructor(private clientProfileService: ClientProfileService, private router: Router, private route: ActivatedRoute) {   
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const clientIdParam = params.get('clientId'); // Get clientId as a string
      if (clientIdParam) {
        const clientId = +clientIdParam; // Convert clientId to number
        this.getClientProfile(clientId);
      } else {
        console.error('clientId not provided');
        this.getAllClients(); // Or handle the missing clientId case appropriately
      }
    });
  }

  getAllClients(): void {
    this.clientProfileService.getAllClients().subscribe(result => {
      this.clients = result;
    }, error => {
      console.error('Error fetching clients:', error);
    });
  }

  getClientProfile(clientId: number): void {
    this.clientProfileService.getClientProfile(clientId).subscribe(result => {
      this.clients = result;
    }, error => {
      console.error('Error fetching client profile:', error);
    });
  }
}
