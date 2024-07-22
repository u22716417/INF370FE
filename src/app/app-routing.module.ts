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
import { CodesListComponent } from './AdminSubsystem/couponCode/codes-list/codes-list.component';
import { CouponCodeViewComponent } from './AdminSubsystem/couponCode/coupon-code-view/coupon-code-view.component';
import { EventListComponent } from './AdminSubsystem/event/event-list/event-list.component';
import { EventCreateUpdateComponent } from './AdminSubsystem/event/event-create-update/event-create-update.component';
import { SponsorCreateUpdateComponent } from './AdminSubsystem/sponsor/sponsor-create-update/sponsor-create-update.component';
import { CreateUpdateComponent } from './AdminSubsystem/venue/create-update/create-update.component';
import { GenerateCodeComponent } from './AdminSubsystem/couponCode/generate-code/generate-code.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
    ]
  },
  {
    path:'AddUser',
    component: RegisterComponent
  },
  {
    path:'check-in',
    component: CheckInComponent
  },
  {
    path:'verification',
    component: VerificationComponent
  },

  {path:'equipment-list',
    component: EquipmentListComponent
    },

    {path:'event-list',
      component: EventListComponent
      },

      {path:'event-create-update/:id',
        component: EventCreateUpdateComponent
      },

      {path:'venue-create-update/:id',
        component: CreateUpdateComponent
      },
    {
      path: 'equipment-create-update/:id',
      component: EquipmentCreateUpdateComponent 
    },
    {
      path: 'sponsor-create-update/:id',
      component: SponsorCreateUpdateComponent
    },
    {path:'sponsor-list',
      component: SponsorListComponent
      },
    
      {path:'codes-list',
        component: CodesListComponent
        },
      
        {path:'coupon-code-view',
          component: CouponCodeViewComponent
          },
          {path:'generate-code/:id',
            component: GenerateCodeComponent
            },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
