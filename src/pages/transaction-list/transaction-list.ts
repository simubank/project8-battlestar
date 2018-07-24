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
	sharedServiceInstance: any;
	
	constructor(private shareService: ShareService, public transactionProvider: TransactionProvider, public navCtrl: NavController, public platform: Platform) {
		this.getCreditAccountID(this.userAccountId)
			.then(() => {
				this.getTransactions(this.creditAccountId.ID);

			});
		// platform.ready().then(() => {
		// 	this.shareService.setPoints(0);
		// });

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
				let trxPoints = Math.round(trx.currencyAmount * 2);
				let tmpPts = this.shareService.getPoints();
				tmpPts += trxPoints;
				this.shareService.setPoints(tmpPts);
				return {
					merchant: trx.description,
					date: trx.postDate,
					amount: (trx.currencyAmount).toFixed(2),
					category: trx.categoryTags[0],
					points: trxPoints,
				};
			});


		});


	};
}
