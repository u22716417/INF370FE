import { Component, OnInit } from '@angular/core';
import { ClientProfileService } from './service/client-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientProfile } from './client-profile';
import { RouterModule } from '@angular/router';
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
    }





  


