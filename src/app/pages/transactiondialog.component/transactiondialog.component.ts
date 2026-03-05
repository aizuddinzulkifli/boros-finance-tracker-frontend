import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Category } from '../../services/category.service';
import { MatNativeDateModule } from '@angular/material/core';
import { Action } from 'rxjs/internal/scheduler/Action';


@Component({
  selector: 'app-transactiondialog.component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './transactiondialog.component.html',
  styleUrl: './transactiondialog.component.css'
})
export class TransactionDialogComponent {

  form = {
    amount: null,
    description: '',
    date: '',
    categoryId: null
  }

  constructor(
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      categories: Category[],
      mode: 'add' | 'edit',
      transaction?: any
    }
  ) {}

  categories: Category[] = [];
  mode: 'add' | 'edit' = 'add';

  ngOnInit() {
    console.log('Categories received:', this.data.categories);
    this.categories = this.data.categories;
    this.mode = this.data.mode;

    if (this.mode === 'edit' && this.data.transaction) {
      this.form = {
        amount: this.data.transaction.amount,
        description: this.data.transaction.description,
        date: this.data.transaction.date,
        categoryId: this.data.transaction.categoryId
      };
    }
  }

  save() {
    if (!this.form.date) {
      return;
  }

  const formattedDate = new Date(this.form.date)
    .toISOString()
    .split('T')[0];

  const payload = {
    amount: this.form.amount,
    description: this.form.description,
    date: formattedDate,
    categoryId: this.form.categoryId
  };

  if(this.mode === 'add') {
    this.dialogRef.close(payload);
  }

  if(this.mode === 'edit') {
    this.dialogRef.close({
      action: 'update',
      payload: payload
    });
  }

  //this.dialogRef.close(payload);
    //this.dialogRef.close(this.form);
  }

  delete() {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.dialogRef.close({
        action: 'delete'
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
