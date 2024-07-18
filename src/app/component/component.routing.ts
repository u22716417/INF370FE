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


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
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
				component: VenuesComponent
			},
			{
				path: 'service',
				component: ServiceListComponent
			},
			{
				path: 'equipment',
				component: EquipmentListComponent
			},
			{
				path: 'codes',
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
				path: 'orders',
				component: LoginComponent
			},
			{
				path: 'quotations',
				component: LoginComponent
			},
			{
				path: 'sponsors',
				component: LoginComponent
			},
			{
				path: 'assignment',
				component: LoginComponent
			}
		]
	}
];
