import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  incomes: number =  3500;
  expenses: number = 1500;
  get balance() {
    return this.incomes - this.expenses;
  }

  recentTransactions = [
    {title: 'Groceries', note: 'Biskut', amount: 35, type: 'Food & Dining', date: '30-7-2025' },
    {title: 'Groceries', note: 'Biskut', amount: 35, type: 'Food & Dining', date: '30-7-2025' },
    {title: 'Groceries', note: 'Biskut', amount: 35, type: 'Food & Dining', date: '30-7-2025' },
  ]

}
