import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { BudgetStatus } from '../../services/budget.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { OnChanges, SimpleChanges } from '@angular/core';
import { BudgetDialogComponent } from '../budget-dialog.component/budget-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-budget-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule

  ],
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.css'
})
export class BudgetTableComponent {

  //@Input() budgets: BudgetStatus[] = [];
  private _budgets: BudgetStatus[] = [];

@Input()
set budgets(value: BudgetStatus[]) {
  this._budgets = value ?? [];
  this.dataSource.data = this._budgets;
}

get budgets(): BudgetStatus[] {
  return this._budgets;
}

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  displayedColumns: string[] = ['category', 'budget', 'spent', 'remaining', 'status'];
  //dataSource = new MatTableDataSource<BudgetStatus>([]);

dataSource = new MatTableDataSource<BudgetStatus>([
  {
    categoryName: 'Food',
    budgetAmount: 500,
    spentAmount: 320,
    remainingAmount: 180,
    percentUsed: 64,
    status: 'SAFE'
  },
  {
    categoryName: 'Transport',
    budgetAmount: 200,
    spentAmount: 250,
    remainingAmount: -50,
    percentUsed: 125,
    status: 'OVERSPENT'
  },
  {
    categoryName: 'Entertainment',
    budgetAmount: 300,
    spentAmount: 120,
    remainingAmount: 180,
    percentUsed: 40,
    status: 'SAFE'
  },
  {
    categoryName: 'Shopping',
    budgetAmount: 400,
    spentAmount: 400,
    remainingAmount: 0,
    percentUsed: 100,
    status: 'WARNING'
  }
]);


  onEdit(row: any){
    this.edit.emit(row);
  }

  onDelete(row: any){
    this.delete.emit(row);
  }

  getColor(status: string) {
    if (status === 'SAFE') return 'primary';
    if (status === 'WARNING') return 'accent';
    return 'warn';
  }


}
