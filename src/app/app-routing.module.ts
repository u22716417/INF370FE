import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FullComponent } from './layouts/full/full.component';
import { RegisterComponent } from './UserSubsystem/user/register/register.component';
import { CheckInComponent } from './AdminSubsystem/check-in/check-in.component';
import { VenueService } from './AdminSubsystem/venue/service/venue-service.service';
import { VenuesComponent } from './AdminSubsystem/venue/venues/venues.component';
import { EquipmentListComponent } from './AdminSubsystem/equipment/equipment-list/equipment-list.component';
import { SponsorServiceService } from './AdminSubsystem/sponsor/service/sponsor-service.service';
import { SponsorListComponent } from './AdminSubsystem/sponsor/sponsor-list/sponsor-list.component';
import { EquipmentCreateUpdateComponent } from './AdminSubsystem/equipment/equipment-create-update/equipment-create-update.component';
import { RoleBasedAuthGuard } from './AuthGuard/Authorization/RoleBasedAuthGuard';
import { UserAuthGuard } from './AuthGuard/Authentication/UserAuthGuard';
import { AccessDeniedComponent } from './AuthGuard/Authorization/access-denied/access-denied.component';
import { LoginComponent } from './UserSubsystem/user/login/login.component';
import { ViewClientProfileComponent } from './AdminSubsystem/client-profile/view-client-profile/view-client-profile.component';
import { CodesListComponent } from './AdminSubsystem/couponCode/codes-list/codes-list.component';
import { GenerateCodeComponent } from './AdminSubsystem/couponCode/generate-code/generate-code.component';
import { CouponCodeViewComponent } from './AdminSubsystem/couponCode/coupon-code-view/coupon-code-view.component';
import { ForgotPasswordComponent } from './UserSubsystem/user/forgot-password/forgot-password.component';
import { SignupComponent } from './UserSubsystem/sign-up/sign-up.component';
import { ReportComponent } from './Reporting/report/report.component';
import { TicketSalesReportComponent } from './Reporting/ticket-sales-report/ticket-sales-report.component';
import { SponsorCreateUpdateComponent } from './AdminSubsystem/sponsor/sponsor-create-update/sponsor-create-update.component';
import { CreateUpdateComponent } from './AdminSubsystem/venue/create-update/create-update.component';
import { EventCreateUpdateComponent } from './AdminSubsystem/event/event-create-update/event-create-update.component';
import { ServiceCreateUpdateComponent } from './AdminSubsystem/service/service-create-update/service-create-update.component';
import { HelpComponent } from './HelpSubsystem/help/help.component';
import { SalesAttendanceReportComponent } from './Reporting/sales-attendance-report/sales-attendance-report.component';
import { NonAttendanceReportComponent } from './Reporting/non-attendance-report/non-attendance-report.component';
import { HomePageComponent } from './home-page/home-page.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [UserAuthGuard],
    children: [
       { path: '', redirectTo: '/home-page', pathMatch: 'full' }, // Change here
      { path: 'home-page', component: HomePageComponent }, // Ensure HomePageComponent is accessible
        {
          path: 'dashboard',
          loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
          canActivate: [RoleBasedAuthGuard],
          data: { roles: ['Admin', 'Owner', "Client"] } // Specify allowed roles here
        },
        {
          path: 'about',
          loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
          canActivate: [RoleBasedAuthGuard],
          data: { roles: ['Admin', 'Owner', "Client"] } // Specify allowed roles here

        },
        {
          path: 'component',
          loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
          canActivate: [RoleBasedAuthGuard],
          data: { roles: ['Admin', 'Owner', "Client"] } // Specify allowed roles here
        },
        {
          path: 'client-profile',
          loadChildren: () => import('./AdminSubsystem/client-profile/client-profile.component').then(m => m.ClientProfileComponent),
          canActivate: [RoleBasedAuthGuard],
          data: { roles: ['Admin'] } // Specify allowed roles here

        },
     
    ]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: 'signUp',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },
  {
    path:'ticket-sales-report',
    component:TicketSalesReportComponent
  },
  {
    path:'sales-attendance-report',
    component: SalesAttendanceReportComponent
  },
  {
    path: 'equipment-create-update/0',
    component: EquipmentCreateUpdateComponent
  },
  {
    path: 'generate-code/0',
    component: GenerateCodeComponent
  },
  {
    path: 'sponsor-create-update/0',
    component: SponsorCreateUpdateComponent
  },
  {
    path: 'create-update/0',
    component: CreateUpdateComponent
  },
  {
    path: 'coupon-code-view/:id',
    component: CouponCodeViewComponent
  },
  {
    path: 'sponsor-create-update/:id',
    component: SponsorCreateUpdateComponent
  },
  {
    path: 'event-create-update/:id',
    component: EventCreateUpdateComponent
  },
  {
    path: 'create-update/:Id',
    component: CreateUpdateComponent
  },
  {
    path: 'create-update/:Id',
    component: CreateUpdateComponent
  },
  { path: 'equipment-create-update',
    component: EquipmentCreateUpdateComponent
   },
  // {
   // path: 'equipment-create-update/:Id',
   // component: EquipmentCreateUpdateComponent
  //}
  

];
