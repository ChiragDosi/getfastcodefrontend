import { Td1ListComponent , Td1DetailsComponent, Td1NewComponent } from './td-1/index';
import { RoleListComponent , RoleDetailsComponent, RoleNewComponent } from './role/index';
import { PermissionListComponent , PermissionDetailsComponent, PermissionNewComponent } from './permission/index';
import { RolepermissionListComponent , RolepermissionDetailsComponent, RolepermissionNewComponent } from './rolepermission/index';
import { UserListComponent , UserDetailsComponent, UserNewComponent } from './user/index';
import { UserpermissionListComponent , UserpermissionDetailsComponent, UserpermissionNewComponent } from './userpermission/index';
import { UserroleListComponent , UserroleDetailsComponent, UserroleNewComponent } from './userrole/index';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';

/** core components and filters for authorization and authentication **/

import { AuthenticationService } from './core/authentication.service';
import { AuthGuard } from './core/auth-guard';
import { JwtInterceptor } from './core/jwt-interceptor';
import { JwtErrorInterceptor } from './core/jwt-error-interceptor';
import { GlobalPermissionService } from './core/global-permission.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CallbackComponent } from './oauth/callback.component';

/** end of core components and filters for authorization and authentication **/

import { IpEmailBuilderModule } from '../../projects/ip-email-builder/src/public_api';
import { SchedulerModule } from '../../projects/scheduler/src/public_api';
import { UpgradeModule } from "@angular/upgrade/static"; 
import { UrlHandlingStrategy } from '@angular/router';
import { TaskAppModule } from '../../projects/task-app/src/public_api';

import {
  MatButtonModule, MatToolbarModule, MatSidenavModule,
  MatIconModule, MatListModule, MatRadioModule, MatTableModule,
  MatCardModule, MatTabsModule, MatInputModule, MatDialogModule,
  MatSelectModule, MatCheckboxModule, MatAutocompleteModule,
  MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatSortModule,
  MatPaginatorModule, MatProgressSpinnerModule,MatSnackBarModule
} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { routingModule } from './app.routing';
import { FastCodeCoreModule } from '../../projects/fast-code-core/src/public_api';

/** common components and filters **/

import { MainNavComponent } from './common/components/main-nav/main-nav.component';
import { BottomTabNavComponent } from './common/components/bottom-tab-nav/bottom-tab-nav.component';

/** end of common components and filters **/

import { environment } from '../environments/environment';
import { Globals } from './globals';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export class CustomHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) {
    let urlStr = url.toString().split('/');
    return url.toString() == "/" || (urlStr.length > 1 && urlStr[1] != "flowable-admin")
  }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

@NgModule({
  declarations: [
    Td1ListComponent,
    Td1DetailsComponent,
    Td1NewComponent,
    RoleListComponent,
    RoleDetailsComponent,
    RoleNewComponent,
    PermissionListComponent,
    PermissionDetailsComponent,
    PermissionNewComponent,
    RolepermissionListComponent,
    RolepermissionDetailsComponent,
    RolepermissionNewComponent,
    UserListComponent,
    UserDetailsComponent,
    UserNewComponent,
    UserpermissionListComponent,
    UserpermissionDetailsComponent,
    UserpermissionNewComponent,
    UserroleListComponent,
    UserroleDetailsComponent,
    UserroleNewComponent,
  	HomeComponent,
  	DashboardComponent,
	LoginComponent,
	CallbackComponent,
    AppComponent,
    MainNavComponent,
    BottomTabNavComponent,
  ],
  imports: [
    BrowserModule,
    routingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    NgxMaterialTimepickerModule,
    IpEmailBuilderModule.forRoot({
      xApiKey: 't7HdQfZjGp6R96fOV4P8v18ggf6LLTQZ1puUI2tz',
      apiPath:environment.apiUrl
    }),
    SchedulerModule.forRoot({
      apiPath: environment.apiUrl
    }),
    UpgradeModule,  
    TaskAppModule.forRoot({
      apiPath: environment.flowableUrl + "/flowable-task" // url where task backend app is running
	}),
    FastCodeCoreModule.forRoot({
      apiUrl: environment.apiUrl
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  providers: [
		{ provide: UrlHandlingStrategy, useClass: CustomHandlingStrategy },
		AuthenticationService,
		GlobalPermissionService,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtErrorInterceptor, multi: true },
		AuthGuard,
		
		Globals
	],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }


