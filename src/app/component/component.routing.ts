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
import { HireItemsReturnComponent } from '../hire-items-return/hire-items-return.component';
import { QuotationListComponent } from '../quotation-list/quotation-list.component';
import { CreateQuotationComponent } from '../create-quotation/create-quotation.component';
import { SettingsComponent } from '../UserSubsystem/settings/settings.component';
import { ServiceCreateUpdateComponent } from '../AdminSubsystem/service/service-create-update/service-create-update.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
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
				path: 'reports',
				component: LoginComponent
			},
			{
				path: 'clients',
				component: LoginComponent
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
              path:'check-out',
			  component:CheckOutComponent
			},
			{
              path:'returnitems',
			  component:HireItemsReturnComponent
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
			}
		]
	}
];
