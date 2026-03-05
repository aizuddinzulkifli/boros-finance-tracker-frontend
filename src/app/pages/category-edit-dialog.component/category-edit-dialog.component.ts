import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../services/category.service';

@Component({
  selector: 'app-category-edit-dialog.component',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDialogModule
  ],
  templateUrl: './category-edit-dialog.component.html',
  styleUrl: './category-edit-dialog.component.css'
})
export class CategoryEditDialogComponent {

  category: Partial<Category>;
  isNew: boolean;

  constructor(
    private dialogRef: MatDialogRef<CategoryEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Partial<Category>, isNew: boolean }
  ) {
    this.category = data.category;
    this.isNew = data.isNew;
  }

  save() {
    if(!this.category.name || this.category.name.trim() === '') return;
    this.dialogRef.close(this.category);
  }

  cancel() {
    this.dialogRef.close();
  }
}
