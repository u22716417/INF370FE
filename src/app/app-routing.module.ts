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
import { RoleBasedAuthGuard } from './AuthGuard/Authorization/RoleBasedAuthGuard';
import { UserAuthGuard } from './AuthGuard/Authentication/UserAuthGuard';
import { AccessDeniedComponent } from './AuthGuard/Authorization/access-denied/access-denied.component';
import { LoginComponent } from './UserSubsystem/user/login/login.component';
import { ViewClientProfileComponent } from './AdminSubsystem/client-profile/view-client-profile/view-client-profile.component';
import { CodesListComponent } from './AdminSubsystem/couponCode/codes-list/codes-list.component';
import { GenerateCodeComponent } from './AdminSubsystem/couponCode/generate-code/generate-code.component';
import { CouponCodeViewComponent } from './AdminSubsystem/couponCode/coupon-code-view/coupon-code-view.component';
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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },

  {path:'equipment-list',
    component: EquipmentListComponent
    },

    {
      path: 'equipment-create-update/:id',
      component: EquipmentCreateUpdateComponent 
    },
    {
      path: 'generate-code/:id',
      component: GenerateCodeComponent
    },
    {
      path: 'coupon-code-view/:id',
      component: CouponCodeViewComponent
    },

    {path:'sponsor-list',
      component: SponsorListComponent
      },

  {
    path: 'view-client-profile/:id',
    component: ViewClientProfileComponent
  },
  {
    path: 'codes-list',
    component: CodesListComponent
  },
  {
    path: 'generate-code',
    component: GenerateCodeComponent
  },
  {
    path: 'coupon-code-view',
    component: CouponCodeViewComponent
  },


];
