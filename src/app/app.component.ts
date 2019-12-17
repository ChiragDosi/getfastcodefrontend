import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FastCodeCoreTranslateUiService } from '../../projects/fast-code-core/src/public_api';
import { SchedulerTranslateUiService } from '../../projects/scheduler/src/public_api';
import { EmailBuilderTranslateUiService } from '../../projects/ip-email-builder/src/public_api';
import { UpgradeModule } from "@angular/upgrade/static";
import { TaskAppTranslateUiService } from '../../projects/task-app/src/public_api';
import { AuthenticationService } from './core/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fcclient';

  constructor(private upgrade: UpgradeModule, private taskAppTranslateUiService: TaskAppTranslateUiService,
    private translate: TranslateService,
    private fastCodeCoreTranslateUiService: FastCodeCoreTranslateUiService,
    private schedulerTranslateUiService: SchedulerTranslateUiService,
    private emailBuilderTranslateUiService: EmailBuilderTranslateUiService,
    private authService: AuthenticationService,
  ) {
    let languages = ["en", "fr"];
    let defaultLang = languages[0];
    translate.addLangs(languages);
    translate.setDefaultLang(defaultLang);

    let browserLang = translate.getBrowserLang();
    let lang = "";
    

    let selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage && languages.includes(selectedLanguage)) {
      lang = selectedLanguage;
    }
    else {
      lang = languages.includes(browserLang) ? browserLang : defaultLang;
      localStorage.setItem('selectedLanguage', lang);
    }

    translate.use(lang).subscribe(() => {
      defaultLang = this.translate.defaultLang;
      if(defaultLang != lang){
        this.initializeLibrariesTranslations(defaultLang);
      }
      this.initializeLibrariesTranslations(lang);
    });

    if (this.authService.loginType == 'oidc') {
      this.authService.configure();
    }
  }

  initializeLibrariesTranslations(lang: string){
    this.schedulerTranslateUiService.init(lang);
    this.fastCodeCoreTranslateUiService.init(lang);
    this.emailBuilderTranslateUiService.init(lang);
    this.taskAppTranslateUiService.init(lang);
  }

  ngOnInit() {
    this.upgrade.bootstrap(document.body, ['flowableAdminApp']);
  }
}
