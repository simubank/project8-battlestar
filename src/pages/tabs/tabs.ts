import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { TransactionListPage } from '../transaction-list/transaction-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TransactionListPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
