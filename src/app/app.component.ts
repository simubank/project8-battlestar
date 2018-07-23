import { TransactionListPage } from './../pages/transaction-list/transaction-list'
import { AboutPage } from './../pages/about/about';
import { HomePage } from './../pages/home/home';
import { TabsPage } from './../pages/tabs/tabs';
import { SettingsPage} from './../pages/settings/settings';
import { TutorialPage } from './../pages/tutorial/tutorial';

import { Component, ViewChild } from '@angular/core';
import { Config, Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { Settings } from '../providers/settings/settings';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = TutorialPage;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Transaction List', component: TransactionListPage },
    { title: 'Home', component: HomePage},
    { title: 'Tabs', component: TabsPage},
    { title: 'About', component: AboutPage},
    { title: 'Settings', component: SettingsPage},
    { title: 'Tutorial', component: TutorialPage}
  ]

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.initTranslate();
   
  }
  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  };


  openPage(page) {
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
