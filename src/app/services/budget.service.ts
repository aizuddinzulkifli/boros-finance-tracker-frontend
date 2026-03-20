import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private apiUrl = 'http://localhost:8080/budget';

  constructor(
    private http: HttpClient
  ) {}

  getBudgets() {
    return this.http.get<Budget[]>(`${this.apiUrl}`);
  }

  createBudget(data: any) {
    return this.http.post<Budget>(`${this.apiUrl}`, data);
  }

  updateBudget(id: number, data: any) {
    return this.http.put<Budget>(`${this.apiUrl}/${id}`, data)
  }

  deleteBudget(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  getBudgetStatus(year: number, month: number) {
    return this.http.get<BudgetStatus[]>(`${this.apiUrl}/status/${year}/${month}`)
  }
  
}

export interface Budget {
  budgetId: number;
  categoryId: number;
  categoryName: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  year: number;
  month: number;
}

export interface BudgetStatus {
  categoryName: string;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  percentUsed: number;
  status: 'SAFE' | 'WARNING' | 'OVERSPENT';
}
