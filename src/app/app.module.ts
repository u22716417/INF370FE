import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

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
import { AccessDeniedComponent } from './AuthGuard/Authorization/access-denied/access-denied.component';
import { SponsorListComponent } from './AdminSubsystem/sponsor/sponsor-list/sponsor-list.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HireItemsReturnComponent } from './hire-items-return/hire-items-return.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { CreateQuotationComponent } from './create-quotation/create-quotation.component';
import { UpdatePasswordComponent } from './UserSubsystem/user/update-password/update-password.component';
import { LoginComponent } from './UserSubsystem/user/login/login.component';
import { ForgotPasswordComponent } from './UserSubsystem/user/forgot-password/forgot-password.component';
import { SettingsComponent } from './UserSubsystem/settings/settings.component';
import { HireServiceComponent } from './ServiceHireSubsystem/hireService/hire-service/hire-service.component';
import { HireItemsReceivedComponent } from './hire-items-received/hire-items-received.component';
import { SignupComponent } from './UserSubsystem/sign-up/sign-up.component';
import { HireEquipmentComponent } from './ServiceHireSubsystem/hireEquipment/hire-equipment/hire-equipment.component';
import { ClientProfileComponent } from './AdminSubsystem/client-profile/client-profile.component';



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
    AccessDeniedComponent,
    SponsorListComponent,
    SponsorListComponent,
    CheckOutComponent,
    HireItemsReturnComponent,
    QuotationListComponent,
    CreateQuotationComponent,
    UpdatePasswordComponent,
    ForgotPasswordComponent,
    LoginComponent,
    SettingsComponent,
    HireServiceComponent,
    HireItemsReceivedComponent,
    SignupComponent,
    HireEquipmentComponent,
    ClientProfileComponent
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
