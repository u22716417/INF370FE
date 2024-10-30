import { Component, NgZone, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { ServicesServiceService } from 'src/app/AdminSubsystem/service/service/services-service.service';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { HireServiceService } from '../../hireService-service/hire-service.service';
import { TicketService } from 'src/app/clientSubsystem/Services/ticket.service';
import { HireItemService } from '../../service/hire-item.service';
import { HireEquipmentViewModel, HireItem } from '../../HireItem';
import { filter } from 'rxjs';
import { event } from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExistingEquipmentResponse } from '../../hireEquipment/existing-equipment-response';

@Component({
  selector: 'app-hire-service',
  templateUrl: './hire-service.component.html',
  styleUrls: ['./hire-service.component.scss']
})
export class HireServiceComponent implements OnInit {


  ServiceType: number = 0;
  isEquipment: boolean = false;
  equipmentOptions: any[] = [];
  paymentForm!: FormGroup;
  showOverlay: boolean = false;
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
  SelectedEquipmentIds: number[] = [];
  showNotification: boolean = false;
  notificationMessage: string = '';
  SelectedEquipment: number = 0;
  showEqupmentPopup: boolean = false;
  CurrentEquipment: any;
  isValid: boolean =  true;

  constructor(
    private serviceService: ServicesServiceService,
    private usermanagement: UserManagementService,
    private hireService: HireServiceService,
    private cartService: TicketService,
    private hireItemService: HireItemService, private route: Router, private fb: FormBuilder
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

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  closeEqPopup() {
    this.showEqupmentPopup = false;
  }
  onServiceSelected() {
    this.calendarOptions.events = [];  // Clear calendar events

    if (this.ServiceType == 1) {  // Service selected
        this.isService = true;
        this.isEquipment = false;
    } else if (this.ServiceType == 2) {  // Equipment selected
        this.isService = false;
        this.isEquipment = true;
    }
}

  closePaymentPopup() {
    this.showPaymentPopup = false;
  }
    




    isEquipmentSelected(equipmentId: number): boolean {
      return this.SelectedEquipmentIds.includes(equipmentId);
    }
  
   
    handleEquipmentChange(event: any, equipment: any) {
      if (event.target.checked) {
        this.SelectedEquipmentIds.push(equipment.equipmentId);
      } else {
        this.SelectedEquipmentIds = this.SelectedEquipmentIds.filter(id => id !== equipment.equipmentId);
      }
  
      this.fetchEquipmentBookingSchedule(equipment.equipmentId);
    }


//   handleEquipmentChange(event: any) {
//     this.SelectedEquipment = +event.target.value;  // Convert to number

//     if (this.SelectedEquipment) {
//         this.fetchEquipmentBookingSchedule(this.SelectedEquipment);  // Load equipment-specific bookings
//     } else {
//         this.calendarOptions.events = [];  // Clear calendar if no equipment is selected
//     }
// }
fetchEquipmentBookingSchedule(equipmentId: number) {
  this.hireItemService.getHireItems().subscribe(
      (hireItems: HireItem[]) => {
          console.log('Fetched Hire Items:', hireItems);

          // Filter for the specific equipment
          const equipmentBookings = hireItems.filter(item => item.equipmentId === equipmentId);
          console.log('Filtered Equipment Bookings:', equipmentBookings);

          if (equipmentBookings.length === 0) {
              console.log('No bookings found for this equipment.');
              this.calendarOptions.events = []; // Clear events if no bookings
              return;
          }

          // Map the filtered bookings to events for the calendar
          const mappedEvents = equipmentBookings.map(item => {
              console.log('Item:', item); // Log each item to check the structure
              const startDate = new Date(item.startDate); // Changed to match your interface
              const endDate = new Date(item.endDate); // Changed to match your interface

              // Check for valid dates
              if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                  console.error(`Invalid date(s) for StartDate=${item.startDate}, EndDate=${item.endDate}`);
                  return null; // Skip this event if dates are invalid
              }

              return {
                  title: 'Hired',
                  start: startDate,
                  end: endDate,
                  color: 'red',
              };
          }).filter(event => event !== null) as EventInput[];

          this.calendarOptions.events = mappedEvents; // Assign mapped events to calendar options
      },
      (error) => {
          console.error('Error fetching hire items:', error);
          this.calendarOptions.events = []; // Clear events on error
      }
  );
}



    fetchEquipmentOptions(): void {
      this.hireItemService.getEquipmentOptions().subscribe(
          (options: any[]) => {
              console.log('Fetched Equipment Options:', options);
              this.equipmentOptions = [...options]; // Save the options
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
      this.showPopupNotification('Successfully Rejected Quote');
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
      this.showPopupNotification('Successfully Approved Quote');
    });
  }

  handleServiceChange(event: any) {
    this.selectedServiceId = +event.target.value; // Convert to number
    this.SelectedServiceName = this.services.find(s => s.id == this.selectedServiceId)?.serviceName || '';

    if (this.selectedServiceId) {
        this.fetchBookingSchedule(this.selectedServiceId);  // Load service-specific bookings
    } else {
        this.calendarOptions.events = [];  // Clear calendar if no service is selected
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


    const isOverlapping = (start1: Date, end1: Date, start2: Date, end2: Date): boolean => {
      return start1 <= end2 && start2 <= end1;
    };



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

      for (let event of this.getBookedEvents()) {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
    
        // Check if the new event's range overlaps with any existing event's range
        if(this.startDate && this.endDate)
        {
          if (isOverlapping(eventStart, eventEnd, new Date(this.startDate) , new Date(this.endDate) )) {
            this.errorMessage = 'This booking overlaps with an existing Booking.';
            this.endDate = '';
            this.startDate ='';
            this.isValid = false;

            return;
          }
        }
      }

    }

    // Update date fields
    this.updateDateFields();
    // Reload events to include newly selected dates
    this.calendarOptions.events = [...this.getEvents(), ...this.getBookedEvents()];
  }

  onSubmit(): void {
   
    console.log(this.SelectedEquipmentIds);
      const hireRequest: any = {
        HireEquipmentId: 0, 
        EquipmentIds:this.SelectedEquipmentIds,
        EquipmentId: this.SelectedEquipment,
        ClientId: parseInt(sessionStorage.getItem('CurrentUserId') || '0', 10),
        HireStartDate: this.startDate,
        HireEndDate: this.endDate,
        Status: 'Pending'}
      console.log(hireRequest);
      this.hireItemService.createHireItem(hireRequest).subscribe((response: ExistingEquipmentResponse) => {
        console.log(response); 
        if (response.message)
           {  
            alert(response.message);
            this .closeEqPopup();
           } 
           else 
           {this .closeEqPopup(); } 
          });
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

  processPayment(): void {
    if (this.paymentForm.valid) {
      this.showOverlay = true;

      const paymentRequest = {
        userId: this.usermanagement.getcurrentUserID(),

      };
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

  }

  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 3000);
  }
}
