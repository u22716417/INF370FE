import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FullComponent } from './layouts/full/full.component';
import { RegisterComponent } from './UserSubsystem/user/register/register.component';
import { CheckInComponent } from './AdminSubsystem/check-in/check-in.component';
import { VerificationComponent } from './AdminSubsystem/check-in/verification/verification.component';
import { VenueService } from './AdminSubsystem/venue/service/venue-service.service';
import { VenuesComponent } from './AdminSubsystem/venue/venues/venues.component';
import { EquipmentListComponent } from './AdminSubsystem/equipment/equipment-list/equipment-list.component';
import { SponsorServiceService } from './AdminSubsystem/sponsor/service/sponsor-service.service';
import { SponsorListComponent } from './AdminSubsystem/sponsor/sponsor-list/sponsor-list.component';
import { EquipmentCreateUpdateComponent } from './AdminSubsystem/equipment/equipment-create-update/equipment-create-update.component';
import { AccessDeniedComponent } from './AuthGuard/Authorization/access-denied/access-denied.component';
import { LoginComponent } from './UserSubsystem/user/login/login.component';
import { UserAuthGuard } from './AuthGuard/Authentication/UserAuthGuard';
import { RoleBasedAuthGuard } from './AuthGuard/Authorization/RoleBasedAuthGuard';
import { ForgotPasswordComponent } from './UserSubsystem/user/forgot-password/forgot-password.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [UserAuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
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
     
    ]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },
];
