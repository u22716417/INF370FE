import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ADMINROUTES,CLIENTROUTES,OWNERROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from 'src/app/AuthGuard/Authorization/AuthGuard';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService
  ) {}

  // End open close
  ngOnInit() {

      let currentUserRole = this.userService.getCurrentUserRole();
      if(currentUserRole == 'Client')
      {
      this.sidebarnavItems = CLIENTROUTES.filter(sidebarnavItem => sidebarnavItem);
      }
      if(currentUserRole == 'Admin')
      {
         this.sidebarnavItems = ADMINROUTES.filter(sidebarnavItem => sidebarnavItem);
      }
      if(currentUserRole == 'Owner')
      {
       this.sidebarnavItems = OWNERROUTES.filter(sidebarnavItem => sidebarnavItem);
      }

  }
}
