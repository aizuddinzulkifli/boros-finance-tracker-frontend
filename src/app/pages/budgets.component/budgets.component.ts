import { Component } from '@angular/core';
import { BudgetService, BudgetStatus } from '../../services/budget.service';
import { BudgetDialogComponent } from '../../components/budget-dialog.component/budget-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BudgetTableComponent } from '../../components/budget-table.component/budget-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    BudgetTableComponent,
  ],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent {

  year = 2026;
  month = 2;

  budgetStatus: BudgetStatus[] = [];

  constructor(
    private budgetService: BudgetService,
    private dialog: MatDialog
  ){}

  ngOnInit() {
    this.loadBudgetStatus();
  }

  loadBudgetStatus() {
    this.budgetService
    .getBudgetStatus(this.year, this.month)
    .subscribe(res => {
      this.budgetStatus = res;
    });
  }

  openAddDialog(){
    this.dialog.open(BudgetDialogComponent)
    .afterClosed()
    .subscribe(res => {
      if (res) {
        this.loadBudgetStatus();
      }
    })
  }

}
