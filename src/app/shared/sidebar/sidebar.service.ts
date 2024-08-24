import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteInfo } from './sidebar.metadata';
import { CLIENTROUTES, ADMINROUTES,OWNERROUTES } from './menu-items';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { AuthService } from 'src/app/AuthGuard/Authorization/AuthGuard';
import { ComponentsRoutes } from 'src/app/component/component.routing';


@Injectable({
    providedIn: 'root'
})
export class VerticalSidebarService {

    public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen: boolean = false;

    MENUITEMS: RouteInfo[] = CLIENTROUTES;

    items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);

    constructor(private authService: AuthService,) {
    }

    private filterMenuItemsBasedOnRoles() {
        const userRoles = this.authService.getCurrentUserRole(); // Get the current user roles
        
    }
}