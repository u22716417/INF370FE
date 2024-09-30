import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from '../AuthGuard/Authorization/AuthGuard';
import { UserManagementService } from '../AuthGuard/Authentication/UserManagementService';
import { FeedsComponent } from './dashboard-components/feeds/feeds.component';
import { FeedService } from './dashboard-components/feeds/feeds-data';
import { Router } from '@angular/router';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild(FeedsComponent) childComponent : FeedsComponent | undefined;
  
  subtitle: string;
  fullName: any;

  feedItem : any = {task:'', icon:''};

  constructor(  private userService: AuthService, private user: UserManagementService, private feedService: FeedService, private router: Router) {
    this.subtitle = 'This is some text within a card block.';
  }

  isAdmin: boolean = false;
  isClient: boolean = false;
  isOwner: boolean = false;

  SubmitFeed()
  {

    this.feedService.postFeed(this.feedItem).subscribe(s=>{
      if(s)
      {
        window.location.reload();
      }
     })
  }
  refreshChild() {
    if(this.childComponent)
          this.childComponent.ngOnInit();
    }
  ngAfterViewInit() 
  {

    let currentUserRole = this.userService.getCurrentUserRole();
    if(currentUserRole == 'Client')
      {
          this.isClient = true;
          this.isAdmin = false;
          this.isOwner = false;
      }
      if(currentUserRole == 'Admin')
      {
          this.isClient = false;
          this.isAdmin = true;
          this.isOwner = false;
      }
      if(currentUserRole == 'Owner')
      {
        this.isClient = false;
        this.isAdmin = false;
        this.isOwner = true;
      }

      this.user.getUser().subscribe(response =>{
        console.log(response);
        this.fullName = response.fullName;
       
      });

   }
}
