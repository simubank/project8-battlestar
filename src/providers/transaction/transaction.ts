import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@app/env';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': ENV.authorization
  })
};

@Injectable()
export class TransactionProvider {
  constructor(public http: HttpClient) {  }
  
  getTransactions(creditAccountId) {
		return new Promise(resolve => {
			this.http.get(`${ENV.botsApiUrl}/api/accounts/${creditAccountId}/transactions`, httpOptions)
			.subscribe(data => {
				resolve(data);
			}, err => {
				console.log(err);
			});
		});
	}

	getTransactionsByCustomerAccount(accountId) {
		return new Promise(resolve => {
			this.http.get (`${ENV.botsApiUrl}/api/customers/${accountId}/accounts`, httpOptions)
			.subscribe(data => {
				resolve(data);
			}, err => {
				console.log(err);
			});
		});
	}
}
