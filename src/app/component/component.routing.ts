import { RouterModule,Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { LoginComponent } from '../UserSubsystem/user/login/login.component';
import { VenuesComponent } from '../AdminSubsystem/venue/venues/venues.component';
import { ServiceListComponent } from '../AdminSubsystem/service/service-list/service-list.component';
import { EquipmentListComponent } from '../AdminSubsystem/equipment/equipment-list/equipment-list.component';
import { CodesListComponent } from '../AdminSubsystem/couponCode/codes-list/codes-list.component';
import { SponsorListComponent } from '../AdminSubsystem/sponsor/sponsor-list/sponsor-list.component';
import { CheckInComponent } from '../AdminSubsystem/check-in/check-in.component';
import { CheckOutComponent } from '../check-out/check-out.component';
import { QuotationListComponent } from '../quotation-list/quotation-list.component';
import { CreateQuotationComponent } from '../create-quotation/create-quotation.component';
import { ServiceCreateUpdateComponent } from '../AdminSubsystem/service/service-create-update/service-create-update.component';
import { HireItemsReturnComponent } from '../hire-items-return/hire-items-return.component';
import { EventListComponent } from '../AdminSubsystem/event/event-list/event-list.component';
import { ViewAllEventsComponent } from '../clientSubsystem/view-all-events/view-all-events.component';
import { SettingsComponent } from '../UserSubsystem/settings/settings.component';
import { ClientProfileComponent } from '../AdminSubsystem/client-profile/client-profile.component';
import { CouponCodeViewComponent } from '../AdminSubsystem/couponCode/coupon-code-view/coupon-code-view.component';
import { GenerateCodeComponent } from '../AdminSubsystem/couponCode/generate-code/generate-code.component';
import { FaqListComponent } from '../AdminSubsystem/FAQ/faq-list/faq-list.component';
import { HireServiceComponent } from '../ServiceHireSubsystem/hireService/hire-service/hire-service.component';
import { ViewClientProfileComponent } from '../AdminSubsystem/client-profile/view-client-profile/view-client-profile.component';
import { CheckoutComponent } from '../clientSubsystem/checkout/checkout.component';
import { UnSoldTicketReportComponent } from '../Reporting/un-sold-ticket-report/un-sold-ticket-report.component';
import { ReportComponent } from '../Reporting/report/report.component';
import { TicketSalesReportComponent } from '../Reporting/ticket-sales-report/ticket-sales-report.component';
import { OrderHistoryComponent } from '../clientSubsystem/order-history/order-history.component';
import { ViewServiceComponent } from '../clientSubsystem/view-service/view-service.component';
import { PayFastComponent } from '../clientSubsystem/payfast/payfast.component';
import { FaqCreateUpdateComponent } from '../AdminSubsystem/FAQ/faq-create-update/faq-create-update.component';
import { HireItemsReceivedComponent } from '../hire-items-received/hire-items-received.component';
import { HireEquipmentComponent } from '../ServiceHireSubsystem/hireEquipment/hire-equipment/hire-equipment.component';
import { CustomerSatisfactionReportComponent } from '../Reporting/customer-satisfaction-report/customer-satisfaction-report.component';
import { EventCreateUpdateComponent } from '../AdminSubsystem/event/event-create-update/event-create-update.component';
import { EventAttendanceReportComponent } from '../Reporting/event-attendance-report/event-attendance-report.component';
import { HireServiceReportComponent } from '../Reporting/hire-service-report/hire-service-report.component';
import { RoleBasedAuthGuard } from '../AuthGuard/Authorization/RoleBasedAuthGuard';
import { HireEmployeeComponent } from '../AdminSubsystem/hire-employee/hire-employee/hire-employee.component';
import { AuditLogsComponent } from '../auditTrail/audit-logs/audit-logs.component';
import { HelpComponent } from '../HelpSubsystem/help/help.component';
import { DispenseHireItemsComponent } from '../ServiceHireSubsystem/dispense-hire-items/dispense-hire-items.component';
import { CollectHireItemsComponent } from '../ServiceHireSubsystem/collect-hire-items/collect-hire-items.component';
import { SponsorCreateUpdateComponent } from '../AdminSubsystem/sponsor/sponsor-create-update/sponsor-create-update.component';
import { BackupAndRestoreComponent } from '../AdminSubsystem/backup-and-restore/backup-and-restore/backup-and-restore.component';
import { CreateUpdateComponent } from '../AdminSubsystem/venue/create-update/create-update.component';
import { EquipmentCreateUpdateComponent } from '../AdminSubsystem/equipment/equipment-create-update/equipment-create-update.component';



export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [

			{
				path: 'UnSoldTicketReport',
				component: UnSoldTicketReportComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path:'Reporting',
				component:ReportComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'TicketSalesReport',
				component: TicketSalesReportComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'CustomerSatisfactionReport',
				component: CustomerSatisfactionReportComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'EventAttendanceReport',
				component: EventAttendanceReportComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'HireServiceReport',
				component: HireServiceReportComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'orderHistory',
				component: OrderHistoryComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client'] } // Specify allowed roles here
			},
			{
				path: 'ViewService',
				component: ViewServiceComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here

			},
			{
				path: 'backup-and-restore',
				component: BackupAndRestoreComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'payfast',
				component: PayFastComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'checkout',
				component: CheckoutComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'event-list',
				component: EventListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'eventShop',
				component: ViewAllEventsComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client'] } // Specify allowed roles here
			},
			{
				path: 'settings',
				component: SettingsComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'table',
				component: TableComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: NgbdButtonsComponent
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'create-update',
				component: CreateUpdateComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
				
			},
			{
				path: 'service-list',
				component: ServiceListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'equipment-list',
				component: EquipmentListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'codes-list',
				component: CodesListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'coupon-code-view',
				component: CouponCodeViewComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'generate-code',
				component: GenerateCodeComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			
			{
				path: 'clients',
				component: ClientProfileComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'check-in',
				component: CheckInComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'quotations',
				component: LoginComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'sponsor-list',
				component: SponsorListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
              
				path: 'faq-list',
				component: FaqListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'faq-create-update/:id',
				component: FaqCreateUpdateComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'hire-service',
				component: HireServiceComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path:'equipment-list',
				component: EquipmentListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
				},
			
				{
				  path: 'equipment-create-update/:id',
				  component: EquipmentCreateUpdateComponent,
				  canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin'] } // Specify allowed roles here
				},
				{
				  path: 'generate-code/:id',
				  component: GenerateCodeComponent,
				  canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
				},
				{
				  path: 'coupon-code-view/:id',
				  component: CouponCodeViewComponent,
				  canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
				},
			
				{path:'sponsor-list',
				  component: SponsorListComponent,
				  canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
				  },
			
			  {
				path: 'view-client-profile/:id',
				component: ViewClientProfileComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			  },
			  {
				path: 'sponsor-list',
				component: SponsorListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			  },
			  {
				path: 'venue',
				component: VenuesComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			  },
			  {
				path: 'sponsor-list',
				component: SponsorListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			  },
			  {
				path: 'codes-list',
				component: CodesListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			  },
			  {
				path: 'generate-code',
				component: GenerateCodeComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			  },
			  {
				path: 'coupon-code-view',
				component: CouponCodeViewComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			  },
			

			{
				path: 'hire-items-received',
				component: HireItemsReceivedComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'events',
				component: EventListComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'hire-equipment',
				component: HireEquipmentComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path:'checkout',
				component:CheckOutComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path:'quotationlist',
			 	component:QuotationListComponent,
				 canActivate: [RoleBasedAuthGuard],
				 data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
              path:'create-quotation',
			  component:CreateQuotationComponent,
			  canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
	        {
				path:'service-create-update/:id',
				component:ServiceCreateUpdateComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
              	
			},
			{
				path:'returnitems',
				component:HireItemsReturnComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Client','Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'event-create-update/:id',
				component: EventCreateUpdateComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'sponsor-create-update/:id',
				component: SponsorCreateUpdateComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'hire-employee',
				component: HireEmployeeComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Owner'] } // Specify allowed roles here
			},			
			{
				path: 'audit',
				component: AuditLogsComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			},
			{
				path: 'help',
				component: HelpComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner', 'Client'] } // Specify allowed roles here
			},
			{
				path: 'Recieved',
				component: HireItemsReceivedComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner', 'Client'] } // Specify allowed roles here
			},


			{
				path: 'Despense',
				component: DispenseHireItemsComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner', 'Client'] } // Specify allowed roles here
			},

			{
				path: 'Collect',
				component: CollectHireItemsComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner', 'Client'] } // Specify allowed roles here
			},
			{
				path: 'create-update/:id',
				component: CreateUpdateComponent,
				canActivate: [RoleBasedAuthGuard],
				data: { roles: ['Admin','Owner'] } // Specify allowed roles here
			}


		]
	}
]
	


