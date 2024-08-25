import { Component, NgZone, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { ServicesServiceService } from 'src/app/AdminSubsystem/service/service/services-service.service';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { HireServiceService } from '../../hireService-service/hire-service.service';
import { TicketService } from 'src/app/clientSubsystem/Services/ticket.service';
import { HireItemService } from '../../service/hire-item.service';
import { HireEquipmentViewModel } from '../../HireItem';
import { filter } from 'rxjs';
import { event } from 'jquery';

@Component({
  selector: 'app-hire-service',
  templateUrl: './hire-service.component.html',
  styleUrls: ['./hire-service.component.scss']
})
export class HireServiceComponent implements OnInit {


  ServiceType: number = 0;
  isEquipment: boolean = false;
  equipmentOptions: any[] = [];

  services: any[] = [];
  selectedServiceId: number = 0;
  calendarOptions: CalendarOptions;
  showPopup = false;
  popupDate = '';
  startDate: string | null = null;
  endDate: string | null = null;
  quotes: any[] = [];
  activeTab: string = 'calendar'; // Default active tab
  SelectedServiceName: string = '';
  showPaymentPopup = false;
  processing = false;
  paymentServiceName = '';
  paymentAmount = 0;
  cardNumber = '';
  expiryDate = '';
  cvv = '';
  quoteId: number = 0;
  showHelpModal = false; // Property to control modal visibility
  isService: boolean = false;
  errorMessage: string = ''; // Property to store error messages
  Equipmentid: number = 0;

  SelectedEquipment: number = 0;
  showEqupmentPopup: boolean = false;
  CurrentEquipment: any;

  constructor(
    private serviceService: ServicesServiceService,
    private usermanagement: UserManagementService,
    private hireService: HireServiceService,
    private cartService: TicketService,
    private hireItemService: HireItemService
  ) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      dateClick: this.handleDateClick.bind(this),
      events: []
    };
  }

  closeEqPopup() {
    this.showEqupmentPopup = false;
  }
  onServiceSelected() {
    if (this.ServiceType == 1) {
      this.isService = true;
      this.isEquipment = false;
    }
    if (this.ServiceType == 2) {
      this.isService = false;
      this.isEquipment = true;
    }
  }

  closePaymentPopup() {
    this.showPaymentPopup = false;
  }
    handleEquipmentChange(event: any) {
      this.fetchEquipmentBookingSchedule(event.equipmentId);
    }

    fetchEquipmentBookingSchedule(equipmentId: number) {
      this.serviceService.getEquipmentBookingSchedule(equipmentId).subscribe(bookings => {
        console.log('---------------->', bookings);
        const events = bookings.map((booking: any) => ({
          title: 'Booked',
          start: booking.startDate,
          end: booking.endDate,
          color: 'red'
        }));
        this.calendarOptions.events = events; // Set events directly without concatenation
      });
    }
  processPayment() {
    this.processing = true;
    setTimeout(() => {
      // logic to process the payment
      console.log('Processing payment for:', {
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        cvv: this.cvv,
        amount: this.paymentAmount
      });
      this.processing = false;
      this.showPaymentPopup = false;
      this.Confirm();
      this.ngOnInit();
    }, 5000);
  }

  fetchEquipmentOptions(): void {
    this.hireItemService.getEquipmentOptions().subscribe(
      (options: any[]) => {
        this.equipmentOptions = [...options];
        console.log('Equipment options:', this.equipmentOptions);
      },
      error => {
        console.error('Error fetching equipment options', error);
      }
    );
  }

  ngOnInit(): void {
    this.fetchEquipmentOptions();
    this.serviceService.getAllServices().subscribe(response => {
      this.services = [...response];
      console.log(this.services);
    });

    this.serviceService.getQuotes(this.usermanagement.getcurrentUserID()).subscribe(response => {
      this.quotes = [...response];
      console.log(this.quotes);
    });
  }

  rejectQuote(id: number) {
    this.hireService.rejectQuote(id).subscribe(res => {
      console.log(res);
      alert('Successfully Rejected Quote');
      this.ngOnInit();
    });
  }

  acceptQuote(item: any) {
    this.paymentServiceName = item.serviceName;
    this.paymentAmount = item.quotePrice;
    this.showPaymentPopup = true;
    this.quoteId = item.id;
  }

  Confirm() {
    const id = this.quoteId;
    this.hireService.approveQuote(id).subscribe(res => {
      console.log(res);
      alert('Successfully Approved Quote');
    });
  }

  handleServiceChange(event: any) {
    this.selectedServiceId = +event.target.value; // Use unary + operator to convert string to number
    this.SelectedServiceName = this.services.find(s => s.id == this.selectedServiceId).serviceName;
    console.log("-------------------------->",this.SelectedServiceName);
    if (this.selectedServiceId) {
      this.fetchBookingSchedule(this.selectedServiceId);
    }
  }

  postQuote() {
    const currentUser = this.usermanagement.getcurrentUserID();

    this.serviceService.createQuote(this.selectedServiceId, this.startDate, this.endDate, currentUser).subscribe(response => {
      console.log(response);
    });

    this.closePopup();
  }

  fetchBookingSchedule(serviceId: number) {
    this.serviceService.getBookingSchedule(serviceId).subscribe(bookings => {
      console.log('---------------->', bookings);
      const events = bookings.map((booking: any) => ({
        title: 'Booked',
        start: booking.start,
        end: booking.end,
        color: 'red'
      }));
      this.calendarOptions.events = events; // Set events directly without concatenation
    });
  }

  handleDateClick(arg: any) {
    const clickedDate = arg.dateStr;
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'yyyy-mm-dd' format

    if (clickedDate < today) {
      // If the selected date is in the past
      this.errorMessage = 'You cannot select a date in the past.';
      console.error(this.errorMessage);
      return;
    }

    this.errorMessage = ''; // Clear any previous error message

    if (!this.startDate || (this.startDate && this.endDate)) {
      // First date selected or both dates already selected (resetting)
      this.startDate = clickedDate;
      this.endDate = null;
    } else {
      // Second date selected
      if (new Date(clickedDate) < new Date(this.startDate)) {
        // If clicked date is earlier than start date
        this.endDate = this.startDate;
        this.startDate = clickedDate;
      } else {
        this.endDate = clickedDate;
      }
    }

    // Update date fields
    this.updateDateFields();
    // Reload events to include newly selected dates
    this.calendarOptions.events = [...this.getEvents(), ...this.getBookedEvents()];
  }

  onSubmit(): void {
   

      
      const hireRequest: any = {
        HireEquipmentId: 0, 
        EquipmentId: this.SelectedEquipment,
        ClientId: parseInt(sessionStorage.getItem('CurrentUserId') || '0', 10),
        HireStartDate: this.startDate,
        HireEndDate: this.endDate,
        Status: 'Pending'}
      
        this.hireItemService.createHireItem(hireRequest).subscribe(x=>{
          if(x)
          {
            this.closeEqPopup();
          }
        })
   
    }
  
  


  updateDateFields() {
    const startDateInput = document.querySelector('input[type="date"]:nth-of-type(1)') as HTMLInputElement;
    const endDateInput = document.querySelector('input[type="date"]:nth-of-type(2)') as HTMLInputElement;

    if (startDateInput) {
      startDateInput.value = this.startDate || '';
    }
    if (endDateInput) {
      endDateInput.value = this.endDate || '';
    }
  }

  getEvents() {
    // Create temporary events for selected dates
    const events = [];
    if (this.startDate) {
      events.push({
        title: 'Start Date',
        start: this.startDate,
        classNames: ['highlighted-date'],
        color: 'blue'
      });
    }
    if (this.endDate) {
      events.push({
        title: 'End Date',
        start: this.endDate,
        classNames: ['highlighted-date'],
        color: 'blue'
      });
    }
    return events;
  }

  getBookedEvents() {
    // Retrieve booked events from calendarOptions to ensure they are included
    const events = this.calendarOptions.events as any[];
    return events.filter(event => event.title === 'Booked');
  }

  closePopup() {
    this.showPopup = false;
  }

  openPopup() {
    this.showPopup = true;
  }

  openEquipmentPopup() {

    this.CurrentEquipment = this.equipmentOptions.filter(x=>x.equipmentId == this.SelectedEquipment)[0];
    
    this.showEqupmentPopup = true;
  }
  // Method to open the help modal
  openHelpModal() {
    this.showHelpModal = true;
  }

  // Method to close the help modal
  closeHelpModal() {
    this.showHelpModal = false;
  }
}
