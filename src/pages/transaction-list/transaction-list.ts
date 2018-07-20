import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

import { TransactionProvider } from './../../providers/transaction/transaction';

@IonicPage()
@Component({
	selector: 'page-transaction-list',
	templateUrl: 'transaction-list.html',
	providers: [TransactionProvider]
})

export class TransactionListPage {	  
	userAccountId = '3b16ee68-1980-4499-a8f2-0f1039cd473c_91b03ea8-721a-415c-be16-e255a534ac1b';
	transactions: any;
	creditAccountId: any;
	
	constructor(public transactionProvider: TransactionProvider) {
		this.getCreditAccountID(this.userAccountId)
			.then(() => {
				this.getTransactions(this.creditAccountId.ID);
			});
	};

	getCreditAccountID(userAccountID) {
		return this.transactionProvider.getTransactionsByCustomerAccount(userAccountID)
		.then(data => {
			this.creditAccountId = data;
			console.log(this.creditAccountId.result.creditCardAccounts);
			this.creditAccountId = this.creditAccountId.result.creditCardAccounts.map(creditCardAcc => {
				return {
					ID: creditCardAcc.cards[0].accountId
				};
			})[0];
		})
	};
	getTransactions(accountId) {
		this.transactionProvider.getTransactions(accountId)
		.then(data => {
			this.transactions = data;
			this.transactions = this.transactions.result.map(trx => {
				return {
					merchant: trx.description,
					date: trx.postDate,
					amount: (trx.currencyAmount).toFixed(2),
					category: trx.categoryTags[0],
					points: Math.round(trx.currencyAmount),
				};
			});
			console.log(this.transactions);
		});
	};
}
