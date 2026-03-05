import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { BudgetStatus } from '../../services/budget.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-budget-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressBarModule

  ],
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.css'
})
export class BudgetTableComponent {

  @Input() budgets: BudgetStatus[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  displayedColumns: string[] = ['category', 'amount'];

  dataSource = [
    { category: 'Food', amount: 500 },
    { category: 'Transport', amount: 200 }
  ];

  columns = [
    'category',
    'budget',
    'spent',
    'remaining',
    'status',
    'action'
  ];

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
