import { NgFor, NgIf } from '@angular/common';
import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { cu } from '@fullcalendar/core/internal-common';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { TicketService } from 'src/app/clientSubsystem/Services/ticket.service';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports:[NgbDropdownModule, NgIf, RouterLink, NgFor],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {

  @Output() toggleSidebar = new EventEmitter<void>();
  NavData : any;
  public showSearch = false;
  fullName: string ='';
  email : string ='';
  phone : string ='';
  title: string ='';
  currentUsertype : string = '';
  usertype: string = '';
  base64Image: SafeResourceUrl  ='';
  itemCount: number = 0;
  constructor(private modalService: NgbModal, private authService: UserManagementService, private router: Router, private sanitizer: DomSanitizer, private cartService:TicketService) {
  }
  

  ngAfterViewInit() { 
    this.NavData = [];
    this.authService.getUser().subscribe(response =>{
     console.log(response);
     this.base64Image =  this.sanitizer.bypassSecurityTrustResourceUrl(response.image) ;
     this.fullName = response.fullName;
     this.title = response.title;
     this.email = response.email;
     this.phone = response.phoneNumber; 
     this.usertype = response.userType;
   });

   let cut = sessionStorage.getItem("CurrentUser")
    if(cut!=null)
    {
       this.currentUsertype = cut; 
    }

  }
  cartItems = [
    { name: 'Event 1', price: 10 },
    { name: 'Event 2', price: 15 },
    { name: 'Event 3', price: 20 }
  ];

  getCartItems(){
    return this.cartService.getCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }
  getItemCount(): number {
    return this.cartService.getCartCount();
  }
  removeFromCart(id:number)
  {
    this.cartService.removeFromCart(id);
  }
  AddQuantityCart(id : number)
  {
    this.cartService.AddQuantityCart(id);
  }

  isModalVisible = false;

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  Logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-warning',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/user1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/user2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/user4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  }

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Español',
    code: 'es',
    icon: 'es'
  },
  {
    language: 'Français',
    code: 'fr',
    icon: 'fr'
  },
  {
    language: 'German',
    code: 'de',
    icon: 'de'
  }]

 
}
