import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '../../../globals';
import { AuthenticationService } from '../../../core/authentication.service';
import { GlobalPermissionService } from '../../../core/global-permission.service';
import { Router, Event } from '@angular/router';
import entities from './entities.json';
import { MatSidenav, MatSidenavContent } from '@angular/material';
import { FastCodeCoreTranslateUiService } from '../../../../../projects/fast-code-core/src/public_api';
import { SchedulerTranslateUiService } from '../../../../../projects/scheduler/src/public_api';
import { EmailBuilderTranslateUiService } from '../../../../../projects/ip-email-builder/src/public_api';
import { TaskAppTranslateUiService } from '../../../../../projects/task-app/src/public_api';

@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
	@ViewChild("drawer", { static: false }) drawer: MatSidenav;
	@ViewChild("navContent", { static: false }) navContent: MatSidenavContent;

	appName: string = 'example179';
	selectedLanguage: string;
	entityList = entities;

	hasTaskAppPermission: boolean = false;
	hasAdminAppPermission: boolean = false;

	isSmallDevice$: Observable<boolean>;
	isMediumDevice$: Observable<boolean>;
	isCurrentRootRoute: boolean = false;
	constructor(
		private router: Router,
		public translate: TranslateService,
		public Global: Globals,
		public Auth: AuthenticationService,
		public globalPermissionService: GlobalPermissionService,
		private fastCodeCoreTranslateUiService: FastCodeCoreTranslateUiService,
		private schedulerTranslateUiService: SchedulerTranslateUiService,
		private emailBuilderTranslateUiService: EmailBuilderTranslateUiService,
		private taskAppTranslateUiService: TaskAppTranslateUiService,
	) {

		this.isSmallDevice$ = Global.isSmallDevice$;
		this.isMediumDevice$ = Global.isMediumDevice$;

		this.router.events.subscribe((event: Event) => {
			this.isCurrentRootRoute = (this.router.url == '/') ? true : false;
		});

		this.selectedLanguage = localStorage.getItem('selectedLanguage');

	}

	switchLanguage(language: string) {
		if(this.translate.translations[language]){
			this.translate.use(language);
		}else{
			this.translate.use(language).subscribe(() => {
				this.schedulerTranslateUiService.init(language);
				this.fastCodeCoreTranslateUiService.init(language);
				this.emailBuilderTranslateUiService.init(language);
				this.taskAppTranslateUiService.init(language);
			});
		}
		localStorage.setItem('selectedLanguage', language);
		this.selectedLanguage = language;
	}
	onNavMenuClicked() {
		console.log('nav clicked');
	}
	isMenuVisible(entityName: string) {
		return this.Auth.token ? this.globalPermissionService.hasPermissionOnEntity(entityName, "READ") : false;
	}

	login() {
		this.router.navigate(['/login'], { queryParams: { returnUrl: 'dashboard' } });
	}

	logout() {
		this.Auth.logout();
		this.router.navigate(['/']);
	}

	isFlowableMenuVisible(app: string) {
		return this.Auth.token ? this.globalPermissionService.hasPermission(app) : false;
	}


}