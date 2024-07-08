import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  
  currentUserType : string ='';
  
  ngOnInit(): void {

    const item = sessionStorage.getItem('CurrentUser')
    if(item)
    {
      this.currentUserType = item;
    }

  }
}
