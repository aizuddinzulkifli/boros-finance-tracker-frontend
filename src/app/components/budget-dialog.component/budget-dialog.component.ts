import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Budget, BudgetService } from '../../services/budget.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { Category } from '../../services/category.service';

@Component({
  selector: 'app-budget-dialog.component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
],
  templateUrl: './budget-dialog.component.html',
  styleUrl: './budget-dialog.component.css'
})
export class BudgetDialogComponent implements OnInit{

  form!: FormGroup;
  categories: Category[] = [];
  mode: 'add' | 'edit'= 'add';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      categories: Category[],
      mode: 'add' | 'edit',
      budget?: any;
    }
  ) {}

  ngOnInit(): void {
    this.mode = this.data.mode;
    this.form = this.fb.group({
      categoryId: [this.data.budget?.categoryId || '', Validators.required],
      amount: [this.data.budget?.amount || '', Validators.required],
      year: [this.data.budget?.year || new Date().getFullYear(), Validators.required],
      month: [this.data.budget?.month || new Date().getMonth() + 1, Validators.required]
    });

    this.categories = this.data.categories;
    //this.mode = this.data.mode;

    if (this.mode === 'edit' && this.data.budget) {
      this.form.patchValue ({
      categoryId: this.data.budget.categoryId,
      amount: this.data.budget.amount,
      year: this.data.budget.year,
      month: this.data.budget.month
      });
    }


    this.loadBudgets();
  }

  loadBudgets() {
    // this.budgetService
    // .get
  }

   submit() {

    if(this.form.invalid) return;

    this.loading = false;

    const payload = this.form.value;
    this.dialogRef.close(payload);
  }

  delete() {
    if (confirm('Are you sure want to delete this budget?')) {
      this.dialogRef.close({
        action: 'delete'
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
