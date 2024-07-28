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
import { ClientProfile } from './AdminSubsystem/client-profile/client-profile';
import { ClientProfileComponent } from './AdminSubsystem/client-profile/client-profile.component';
import { AccessDeniedComponent } from './AuthGuard/Authorization/access-denied/access-denied.component';
import { SettingsComponent } from './UserSubsystem/settings/settings.component';
import { LoginComponent } from './UserSubsystem/user/login/login.component';
import { GenerateCodeComponent } from './AdminSubsystem/couponCode/generate-code/generate-code.component';
import { CouponCodeViewComponent } from './AdminSubsystem/couponCode/coupon-code-view/coupon-code-view.component';



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
    LoginComponent,
    GenerateCodeComponent,
    CouponCodeViewComponent
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
    RouterModule
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
