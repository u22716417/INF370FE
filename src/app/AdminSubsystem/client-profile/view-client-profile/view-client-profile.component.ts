import { Component, OnInit } from '@angular/core';
import { ClientProfileService } from '../service/client-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientProfile } from '../client-profile';

@Component({
  selector: 'app-view-client-profile',
  templateUrl: './view-client-profile.component.html',
  styleUrls: ['./view-client-profile.component.css']
})
export class ViewClientProfileComponent implements OnInit {
  
  existingClient: ClientProfile = { 
    clientId: 0,
    titleId: 0, 
    subscriptionId: 0, 
    clientName: '', 
    clientSurname: '',
     clientPhone: '', 
     clientEmail: ''
    };

constructor (private clientProfileService: ClientProfileService, private router: Router, private route: ActivatedRoute) {}
  
ngOnInit(): void {
    this.route.params.subscribe(params => {
      const clientId = +params['id'];
      this.getClientProfile(clientId)
    })
  }

  getClientProfile(clientId: number): void {
    this.clientProfileService.getClientProfile(clientId).subscribe((data: ClientProfile) => {
      this.existingClient = data;
    }, error => {
      console.error('Cannot load client profile:', error);
    });
    console.log(clientId);
  }

close() {
  this.router.navigate(['/client-profile']);
}
}
