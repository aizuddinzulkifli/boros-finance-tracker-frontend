import { Component } from '@angular/core';
import { BudgetService, BudgetStatus , Budget} from '../../services/budget.service';
import { BudgetDialogComponent } from '../../components/budget-dialog.component/budget-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BudgetTableComponent } from '../../components/budget-table.component/budget-table.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService, Category } from '../../services/category.service';
import { BudgetManageComponent } from '../../components/budget-manage.component/budget-manage.component';
import { MatFormField } from "@angular/material/form-field";
import { MatOption, MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';
import { MatInput, MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    BudgetTableComponent,
    MatButtonModule,
    MatFormField,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent {

  year = 2026;
  month = 2;

  months = [
    { value: 1, name: 'Jan' },
      { value: 2, name: 'Feb' },
      { value: 3, name: 'Mar' },
      { value: 4, name: 'Apr' },
      { value: 5, name: 'May' },
      { value: 6, name: 'Jun' },
      { value: 7, name: 'Jul' },
      { value: 8, name: 'Aug' },
      { value: 9, name: 'Sep' },
      { value: 10, name: 'Oct' },
      { value: 11, name: 'Nov' },
      { value: 12, name: 'Dec' }
  ];

  budgetStatus: BudgetStatus[] = [];
  categories: Category[] = [];

  constructor(
    private budgetService: BudgetService,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ){}

  ngOnInit() {
    this.loadCategories();
    this.loadBudgetStatus();

  //   //Hardcoded
  //   this.budgetStatus = [
  //   { categoryName: 'Food', budgetAmount: 500, spentAmount: 320, remainingAmount: 180, percentUsed: 64, status: 'SAFE' },
  //   { categoryName: 'Transport', budgetAmount: 200, spentAmount: 250, remainingAmount: -50, percentUsed: 125, status: 'OVERSPENT' },
  //   { categoryName: 'Entertainment', budgetAmount: 300, spentAmount: 120, remainingAmount: 180, percentUsed: 40, status: 'SAFE' },
  //   { categoryName: 'Shopping', budgetAmount: 400, spentAmount: 400, remainingAmount: 0, percentUsed: 100, status: 'WARNING' }
  // ];
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.filter(category => category.type === 'EXPENSE');
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }

  loadBudgetStatus() {
    this.budgetService
    .getBudgetStatus(this.year, this.month)
    .subscribe(res => {
      this.budgetStatus = res;
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(BudgetManageComponent, {
      width: '880px',
    maxWidth: '95vw',
      data: {
        categories: this.categories,
        mode: 'add'
      }
    });

    dialogRef.afterClosed().subscribe(res => {

      this.loadBudgetStatus();

      //Duplicate in dialog
      // if(!res) return;

      // this.budgetService.createBudget(res)
      // .subscribe(() => {
      //   this.loadBudgetStatus();
      // });
    });
  }

//   openEditDialog(row: Budget){

//   const dialogRef = this.dialog.open(BudgetDialogComponent, {
//     width: '420px',
//     data: row
//   });

//   dialogRef.afterClosed().subscribe(res => {
//     if (res) {
//       this.loadBudgetStatus();
//     }
//   });

// }

}
