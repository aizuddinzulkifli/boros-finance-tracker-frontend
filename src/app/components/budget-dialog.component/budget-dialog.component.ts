import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BudgetService } from '../../services/budget.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-budget-dialog.component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  templateUrl: './budget-dialog.component.html',
  styleUrl: './budget-dialog.component.css'
})
export class BudgetDialogComponent implements OnInit{

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BudgetDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      amount: ['', Validators.required],
      year: [2026],
      month: [2]
    });
  }

   submit() {
    this.dialogRef.close(this.form.value);
  }
}
