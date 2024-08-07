import { Routes } from '@angular/router';
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
import { EquipmentCreateUpdateComponent } from '../AdminSubsystem/equipment/equipment-create-update/equipment-create-update.component';
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



export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'UnSoldTicketReport',
				component: UnSoldTicketReportComponent
			},
			{
				path:'Reporting',
				component:ReportComponent
			},
			{
				path: 'TicketSalesReport',
				component: TicketSalesReportComponent
			},
			{
				path: 'CustomerSatisfactionReport',
				component: CustomerSatisfactionReportComponent
			},
			{
				path: 'orderHistory',
				component: OrderHistoryComponent
			},
			{
				path: 'ViewService',
				component: ViewServiceComponent
			},
			{
				path: 'payfast',
				component: PayFastComponent
			},
			{
				path: 'checkout',
				component: CheckoutComponent
			},
			{
				path: 'event-list',
				component: EventListComponent
			},
			{
				path: 'eventShop',
				component: ViewAllEventsComponent
			},
			{
				path: 'settings',
				component: SettingsComponent
			},
			{
				path: 'table',
				component: TableComponent
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
				path: 'venues',
				component: VenuesComponent,
				
			},
			{
				path: 'service-list',
				component: ServiceListComponent
			},
			{
				path: 'equipment-list',
				component: EquipmentListComponent
			},
			{
				path: 'codes-list',
				component: CodesListComponent
			},
			{
				path: 'coupon-code-view',
				component: CouponCodeViewComponent
			},
			{
				path: 'generate-code',
				component: GenerateCodeComponent
			},
			{
				path: 'reports',
				component: LoginComponent
			},
			{
				path: 'clients',
				component: ClientProfileComponent
			},
			{
				path: 'check-in',
				component: CheckInComponent
			},
			{
				path: 'quotations',
				component: LoginComponent
			},
			{
				path: 'sponsor-list',
				component: SponsorListComponent
			},
			{
				path: 'assignment',
				component: LoginComponent
			},
			{
              
				path: 'faq-list',
				component: FaqListComponent
			},
			{
				path: 'faq-create-update',
				component: FaqCreateUpdateComponent
			},
			{
				path: 'hire-service',
				component: HireServiceComponent
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
			

			{
				path: 'hire-items-received',
				component: HireItemsReceivedComponent
			},
			{
				path: 'events',
				component: EventListComponent
			},
			{
				path: 'hire-equipment',
				component: HireEquipmentComponent
			},
			{
				path:'checkout',
				component:CheckOutComponent
			},
			{
				path:'quotationlist',
			 	component:QuotationListComponent
			},
			{
              path:'create-quotation',
			  component:CreateQuotationComponent
			},
	        {
				path:'service-create-update',
				component:ServiceCreateUpdateComponent
              	
			},
			{
				path:'returnitems',
				component:HireItemsReturnComponent
			},
		    {
				path: 'hire-items-return',
				component: HireItemsReturnComponent
			
			
			},
			{
				path: 'event-create-update/:id',
				component: EventCreateUpdateComponent 
			},



		]
	}
]
	


