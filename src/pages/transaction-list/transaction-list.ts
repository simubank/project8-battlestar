import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

import { TransactionProvider } from './../../providers/transaction/transaction';
import { ShareService } from './../../providers/share/share';
import { AboutPage } from '../about/about';

@IonicPage()
@Component({
	selector: 'page-transaction-list',
	templateUrl: 'transaction-list.html',
	providers: [TransactionProvider]
})

export class TransactionListPage {	
	totalPoints = -1;  
	userAccountId = '3b16ee68-1980-4499-a8f2-0f1039cd473c_91b03ea8-721a-415c-be16-e255a534ac1b';
	transactions: any;
	otherstuff: any;
	creditAccountId: any;
	
	constructor(shareService: ShareService, public transactionProvider: TransactionProvider, public navCtrl: NavController, public platform: Platform) {
		this.getCreditAccountID(this.userAccountId)
			.then(() => {
				this.getTransactions(this.creditAccountId.ID);

			});
		platform.ready().then(() => {
			shareService.setPoints(666);
		});

	};

	getCreditAccountID(userAccountID) {
		return this.transactionProvider.getTransactionsByCustomerAccount(userAccountID)
		.then(data => {
			this.creditAccountId = data;
			this.creditAccountId = this.creditAccountId.result.creditCardAccounts.map(creditCardAcc => {
				return {
					ID: creditCardAcc.cards[0].accountId
				};
			})[0];
		})
	};
	

	getTransactions(accountId) {
		return this.transactionProvider.getTransactions(accountId)
		.then(data => {

			this.transactions = data;
			this.transactions = this.transactions.result.map(trx => {

				return {
					merchant: trx.description,
					date: trx.postDate,
					amount: (trx.currencyAmount).toFixed(2),
					category: trx.categoryTags[0],
					points: Math.round(trx.currencyAmount * 2),
				};
			});


		});


	};
}
