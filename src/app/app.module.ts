import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';


import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { RegisterComponent } from './UserSubsystem/user/register/register.component';
import { CodesListComponent } from './AdminSubsystem/couponCode/codes-list/codes-list.component';
import { ServiceListComponent } from './AdminSubsystem/service/service-list/service-list.component';
import { VenuesComponent } from './AdminSubsystem/venue/venues/venues.component';
import { EquipmentListComponent } from './AdminSubsystem/equipment/equipment-list/equipment-list.component';
import { CheckInComponent } from './AdminSubsystem/check-in/check-in.component';
import { EquipmentCreateUpdateComponent } from './AdminSubsystem/equipment/equipment-create-update/equipment-create-update.component';
import { ClientProfile } from './AdminSubsystem/client-profile/client-profile';
import { ClientProfileComponent } from './AdminSubsystem/client-profile/client-profile.component';
import { AccessDeniedComponent } from './AuthGuard/Authorization/access-denied/access-denied.component';
import { SettingsComponent } from './UserSubsystem/settings/settings.component';
import { ServiceCreateUpdateComponent } from './AdminSubsystem/service/service-create-update/service-create-update.component';
import { HireServiceComponent } from './ServiceHireSubsystem/hireService/hire-service/hire-service.component';
import { HireItemsReceivedComponent } from './hire-items-received/hire-items-received.component';
import { SignupComponent } from './UserSubsystem/sign-up/sign-up.component';
import { HireEquipmentComponent } from './ServiceHireSubsystem/hireEquipment/hire-equipment/hire-equipment.component';
import { ViewClientProfileComponent } from './AdminSubsystem/client-profile/view-client-profile/view-client-profile.component';
import { LoginComponent } from './UserSubsystem/user/login/login.component';
import { GenerateCodeComponent } from './AdminSubsystem/couponCode/generate-code/generate-code.component';
import { FaqListComponent } from './AdminSubsystem/FAQ/faq-list/faq-list.component';
import { ForgotPasswordComponent } from './UserSubsystem/user/forgot-password/forgot-password.component';
import { ViewAllEventsComponent } from './clientSubsystem/view-all-events/view-all-events.component';
import { CheckoutComponent } from './clientSubsystem/checkout/checkout.component';
import { PayFastComponent } from './clientSubsystem/payfast/payfast.component';
import { FaqCreateUpdateComponent } from './AdminSubsystem/FAQ/faq-create-update/faq-create-update.component';
import { OrderHistoryComponent } from './clientSubsystem/order-history/order-history.component';
import { TicketSalesReportComponent } from './Reporting/ticket-sales-report/ticket-sales-report.component';
import { ReportComponent } from './Reporting/report/report.component';
import { UnSoldTicketReportComponent } from './Reporting/un-sold-ticket-report/un-sold-ticket-report.component';
import { ViewServiceComponent } from './clientSubsystem/view-service/view-service.component';
import { EventListComponent } from './AdminSubsystem/event/event-list/event-list.component';
import { HireItemsReturnComponent } from './hire-items-return/hire-items-return.component';
import { CustomerSatisfactionReportComponent } from './Reporting/customer-satisfaction-report/customer-satisfaction-report.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CheckOutComponent } from './check-out/check-out.component';
import { CreateQuotationComponent } from './create-quotation/create-quotation.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { EventCreateUpdateComponent } from './AdminSubsystem/event/event-create-update/event-create-update.component';
import { EventAttendanceReportComponent } from './Reporting/event-attendance-report/event-attendance-report.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import FullCalendarModule
import dayGridPlugin from '@fullcalendar/daygrid'; // import the dayGrid plugin
import { HireServiceReportComponent } from './Reporting/hire-service-report/hire-service-report.component';




@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    RegisterComponent,
    CodesListComponent, 
    ServiceListComponent,
    VenuesComponent,
    EquipmentListComponent,
    CheckInComponent,
    EquipmentCreateUpdateComponent,
    ClientProfileComponent,
    AccessDeniedComponent,
    SettingsComponent,
    ServiceCreateUpdateComponent,
    HireServiceComponent,
    HireItemsReceivedComponent,
    SignupComponent,
    HireEquipmentComponent,
    ViewClientProfileComponent,
    LoginComponent,
    GenerateCodeComponent,
    FaqListComponent,
    ForgotPasswordComponent,
    ViewAllEventsComponent,
    CheckoutComponent,
    PayFastComponent,
    FaqCreateUpdateComponent,
    FaqListComponent,
    OrderHistoryComponent,
    TicketSalesReportComponent,
    ReportComponent,
    UnSoldTicketReportComponent,
    HireItemsReceivedComponent,
    ViewServiceComponent,
    EventListComponent,
    HireItemsReturnComponent,
    CustomerSatisfactionReportComponent,
    EventCreateUpdateComponent,
    EventAttendanceReportComponent,
    CheckOutComponent,
    CreateQuotationComponent,
    QuotationListComponent,
    EventCreateUpdateComponent,
    HireServiceReportComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false}),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    NgApexchartsModule,
    FullCalendarModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
