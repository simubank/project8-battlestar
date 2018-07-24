import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { TransactionProvider } from '../providers/transaction/transaction';
import { Settings } from '../providers/settings/settings';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { ShareService } from '../providers/share/share';

import { TransactionListPage } from './../pages/transaction-list/transaction-list';
import { AboutPage } from './../pages/about/about';
import { HomePage } from '.././pages/home/home';
import { TabsPage } from './../pages/tabs/tabs';
import { SettingsPage} from './../pages/settings/settings';
import { TutorialPage } from './../pages/tutorial/tutorial';


import { KeysPipe } from './../pipes/KeysPipe'
import { MyApp } from './app.component'

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  return new Settings(storage, {
    option1: 1000,
    option2: 2000,
    option3: 5000
  });
}

@NgModule({
  declarations: [
    MyApp,
    TransactionListPage,
    KeysPipe,
    AboutPage,
    HomePage,
    TabsPage,
    SettingsPage,
    TutorialPage
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TransactionListPage,
    AboutPage,
    HomePage,
    TabsPage,
    SettingsPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TransactionProvider,
    GoogleMaps,
    Geolocation,
    ShareService,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
