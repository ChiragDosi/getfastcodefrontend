import { Td1ListComponent , Td1DetailsComponent, Td1NewComponent } from './td-1/index';
import { RoleListComponent , RoleDetailsComponent, RoleNewComponent } from './role/index';
import { PermissionListComponent , PermissionDetailsComponent, PermissionNewComponent } from './permission/index';
import { RolepermissionListComponent , RolepermissionDetailsComponent, RolepermissionNewComponent } from './rolepermission/index';
import { UserListComponent , UserDetailsComponent, UserNewComponent } from './user/index';
import { UserpermissionListComponent , UserpermissionDetailsComponent, UserpermissionNewComponent } from './userpermission/index';
import { UserroleListComponent , UserroleDetailsComponent, UserroleNewComponent } from './userrole/index';

import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { CanDeactivateGuard } from 'fastCodeCore';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/index';
import { AuthGuard } from './core/auth-guard';
import { CallbackComponent } from './oauth/callback.component';
import { TaskAppRoutes } from '../../projects/task-app/src/public_api';
import { SchedulerRoutes } from '../../projects/scheduler/src/public_api';
import { EmailRoutes } from '../../projects/ip-email-builder/src/public_api';

const routes: Routes = [

	
	{ path: 'dashboard',  component: DashboardComponent ,canActivate: [ AuthGuard ]  },
	{ path: 'login', component: LoginComponent },
	{ path: 'login/:returnUrl', component: LoginComponent },
	{ path: 'callback', component: CallbackComponent },

    { path: 'task-app', children: TaskAppRoutes ,canActivate: [ AuthGuard ]},
    {path: 'scheduler', children: SchedulerRoutes},
    {path: 'email', children: EmailRoutes,canActivate: [ AuthGuard ] },

    { path: '', component: HomeComponent },

   { path: 'role', component: RoleListComponent, canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },
   { path: 'role/new', component: RoleNewComponent ,canActivate: [ AuthGuard ]  },
   { path: 'role/:id', component: RoleDetailsComponent ,canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },

   { path: 'permission', component: PermissionListComponent, canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },
   { path: 'permission/new', component: PermissionNewComponent ,canActivate: [ AuthGuard ]  },
   { path: 'permission/:id', component: PermissionDetailsComponent ,canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },

   { path: 'rolepermission', component: RolepermissionListComponent, canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },
   { path: 'rolepermission/new', component: RolepermissionNewComponent ,canActivate: [ AuthGuard ]  },
   { path: 'rolepermission/:id', component: RolepermissionDetailsComponent ,canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },

   { path: 'user', component: UserListComponent, canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },
   { path: 'user/new', component: UserNewComponent ,canActivate: [ AuthGuard ]  },
   { path: 'user/:id', component: UserDetailsComponent ,canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },

   { path: 'userpermission', component: UserpermissionListComponent, canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },
   { path: 'userpermission/new', component: UserpermissionNewComponent ,canActivate: [ AuthGuard ]  },
   { path: 'userpermission/:id', component: UserpermissionDetailsComponent ,canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },

   { path: 'userrole', component: UserroleListComponent, canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },
   { path: 'userrole/new', component: UserroleNewComponent ,canActivate: [ AuthGuard ]  },
   { path: 'userrole/:id', component: UserroleDetailsComponent ,canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },

   { path: 'td1', component: Td1ListComponent, canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },
   { path: 'td1/new', component: Td1NewComponent ,canActivate: [ AuthGuard ]  },
   { path: 'td1/:id', component: Td1DetailsComponent ,canActivate: [ AuthGuard ], canDeactivate: [CanDeactivateGuard] },
	{ path: '', redirectTo: '/', pathMatch: 'full' }, 
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true, enableTracing: true });


