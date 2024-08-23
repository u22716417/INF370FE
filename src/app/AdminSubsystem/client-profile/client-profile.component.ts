import { Component, OnInit } from '@angular/core';
import { ClientProfileService } from './service/client-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientProfile } from './client-profile';
import { RouterModule } from '@angular/router';
import { TicketService } from 'src/app/clientSubsystem/Services/ticket.service';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  clients: ClientProfile[] = [];
  selectedClientId: number = 0;
  selectedClientName: string = '';
  selectedClientOrders: any[] = [];
  isOrderHistoryOpen: boolean = false;
  dtOptions: Config = {};
  
  constructor(private clientProfileService: ClientProfileService, private router: Router, private route: ActivatedRoute, private orderHistory: TicketService) {   
   }

  ngOnInit(): void {
    this.getAllClientProfiles();
    };
  
    getAllClientProfiles() {
      this.clientProfileService.getAllClientProfiles().subscribe(result =>{
        let clientList:any[] = result
        clientList.forEach((element) => {
          this.clients.unshift(element)
        });
      })
    }
    //loadClientList(): void {
      //this.clientProfileService.getAllClientProfiles().subscribe((data: ClientProfile[]) => {
        //this.clients = data;
      //});

      openOrderHistory(client: ClientProfile): void {
        this.selectedClientId = client.clientId;
        this.selectedClientName = client.clientName;
        this.getClientOrderHistory(client.clientId);
        this.isOrderHistoryOpen = true;
      }
    
      closeOrderHistory(): void {
        this.isOrderHistoryOpen = false;
      }
    
      getClientOrderHistory(clientId: number): void {
        // Replace with your service to get client orders
        this.orderHistory.getOrderHistory(clientId).subscribe((orders: any[]) => {
          this.selectedClientOrders = orders;
        });
      }

      encodeUri(value: string): string {
        return encodeURIComponent(value);
      }

}








  


