import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatAnchor, MatButton, MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef, MatTableModule, MatTableDataSource } from "@angular/material/table";
import { Budget, BudgetService } from '../../services/budget.service';
import { BudgetDialogComponent } from '../budget-dialog.component/budget-dialog.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-budget-manage.component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule
],
  templateUrl: './budget-manage.component.html',
  styleUrl: './budget-manage.component.css'
})
export class BudgetManageComponent implements OnInit {

  displayedColumns = ['category', 'amount', 'year', 'month', 'actions'];
  dataSource = new MatTableDataSource<Budget>([]);
  budgets: Budget[] = [];
  categories: any[] = [];

  form!: FormGroup;
  editingBudget: Budget | null = null; // track budget being edited
  loading = false;

  constructor(
    private budgetService: BudgetService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      amount: ['', Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      month: [new Date().getMonth() + 1, Validators.required]
    });

    this.loadBudgets();
    this.loadCategories();
  }

  loadBudgets(){
    this.budgetService.getBudgets().subscribe(res => {
      this.budgets = res;
      this.dataSource.data = this.budgets;
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(res =>{
      this.categories = res.filter(c => c.type === 'EXPENSE');
    });
  }

  resetForm(){
    this.editingBudget = null;
    this.form.reset({
      categoryId: '',
      amount: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    });
  }

  submit() {
    if(this.form.invalid) return;

    const payload = this.form.value;
    this.loading = true;

    //this.dialogRef.close(payload);

    if (this.editingBudget){
      //Edit existing
      this.budgetService.updateBudget(this.editingBudget.budgetId, payload)
      .subscribe({
        next: res => {
          this.snackBar.open('Budget updated successfully', 'Close', {
            duration: 3000
        });
          this.loadBudgets();
          this.resetForm();
        },
        error: () => {
          this.snackBar.open('Failed to update budget', 'Close', {
            duration: 3000
          });
        },
        complete: () => this.loading = false
      });
    } else {
      //Add new
      this.budgetService.createBudget(payload)
      .subscribe({
        next: res => {
          this.snackBar.open('Budget added successfully', 'Close', {
            duration: 3000
          });
          this.loadBudgets();
          this.resetForm();
        },
        error: () => {
          this.snackBar.open('Failed to add budget', 'Close', {
            duration: 3000
          });
        },
        complete: () => this.loading = false
      });
    }
  }

  editBudget(budget: Budget){

    this.editingBudget = budget;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const selectedCategory = this.categories.find(
      c => c.name === budget.categoryName
    );

    this.form.patchValue({
      categoryId: selectedCategory?.categoryId,
      //categoryId: budget.categoryId,
      amount: budget.amount,
      year: budget.year,
      month: budget.month
    })

  }

  deleteBudget(budget: Budget){
    if(confirm(`Delete budget "${budget.categoryName}"?`)){
      this.budgetService.deleteBudget(budget.budgetId).subscribe(() => {
        this.snackBar.open('Budget deleted', 'Close', {
          duration: 3000
        });
        this.loadBudgets();
        if  (this.editingBudget?.budgetId === budget.budgetId) this.resetForm();
      });
    }
  }

  getMonthName(month:number) {
    return this.months.find(m => m.value === month)?.name;
  }

  months = [
{value:1,name:'January'},
{value:2,name:'February'},
{value:3,name:'March'},
{value:4,name:'April'},
{value:5,name:'May'},
{value:6,name:'June'},
{value:7,name:'July'},
{value:8,name:'August'},
{value:9,name:'September'},
{value:10,name:'October'},
{value:11,name:'November'},
{value:12,name:'December'}
];


}
