import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { SplashScreen } from '@ionic-native/splash-screen'
import { StatusBar } from '@ionic-native/status-bar'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'

import { AccountProvider } from '../providers/account/account'
import { CustomerProvider } from '../providers/customer/customer'
import { TransactionProvider } from '../providers/transaction/transaction'

import { CustomerDetailPage } from './../pages/customer-detail/customer-detail'
import { TransactionListPage } from './../pages/transaction-list/transaction-list'
import { AboutPage } from './../pages/about/about';
import { HomePage } from '.././pages/home/home';
import { TabsPage } from './../pages/tabs/tabs';

import { KeysPipe } from './../pipes/KeysPipe'
import { MyApp } from './app.component'

@NgModule({
  declarations: [
    MyApp,
    TransactionListPage,
    KeysPipe,
    CustomerDetailPage,
    AboutPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TransactionListPage,
    CustomerDetailPage,
    AboutPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomerProvider,
    AccountProvider,
    TransactionProvider,
  ]
})
export class AppModule {}
