import { Component } from '@angular/core';
import { ClientProfileService } from '../service/client-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientProfile } from '../client-profile';

@Component({
  selector: 'app-view-client-profile',
  templateUrl: './view-client-profile.component.html',
  styleUrls: ['./view-client-profile.component.css']
})
export class ViewClientProfileComponent {
  
  existingClient: ClientProfile = { clientId: 0,titleId: 0, subscriptionId: 0, 
    clientName: '', clientSurname: '', clientPhone: '', clientEmail: ''};

constructor (private clientProfileService: ClientProfileService, private router: Router, private route: ActivatedRoute) {}

loadClientProfile(clientId: number): void {
  this.clientProfileService.getClientProfile(clientId).subscribe((data: ClientProfile) => {
    this.existingClient = data;
  });
}
cancel() {
  this.router.navigate(['/client-profile']);
}
//getClientProfile(clientId: number): void {
  //this.clientProfileService.getClientProfile(clientId).subscribe(result => {
    //this.existingClient = [result]; // Assuming result is a single client object
 // }, error => {
   // console.error('Error fetching client profile:', error);
  //});
//}

}
