import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  transactionId: number;
  categoryName: string;
  type: string;
  date: string;
  description: string;
  amount: number;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) {}


  getTransactions(page: number, size: number, sort: string ='date,desc'){
    return this.http.get<Page<Transaction>>(
      `${this.apiUrl}?page=${page}&size=${size}&sort=${sort}`
    );
  }

  createTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, transaction);
  }


  updateTransaction(transactionId: number, body: any) {
    return this.http.put(`${this.apiUrl}/${transactionId}`, body);
  }
  
  deleteTransaction(transactionId: number) {
    return this.http.delete(`${this.apiUrl}/${transactionId}`);
  }

  getFilteredTransactions(page: number, size: number,filters: any, sort: string ='date,desc') {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('sort', sort);


    if (filters.startDate) {
      params = params.set('startDate',this.formatDate(filters.startDate));
    }

    if (filters.endDate) {
      params = params.set('endDate', this.formatDate(filters.endDate));
    }

    if (filters.categoryName) {
      params = params.set('categoryName', filters.categoryName);
    }

    if (filters.type) {
      params = params.set('type', filters.type);
    }

    return this.http.get<Page<Transaction>>(
      `${this.apiUrl}/filter`, { params }
    );

  }


  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

}
