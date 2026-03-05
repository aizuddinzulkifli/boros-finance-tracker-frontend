import { Component } from '@angular/core';
import { CategoryService, Category } from '../../services/category.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryEditDialogComponent } from '../category-edit-dialog.component/category-edit-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorydialog.component',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './categorydialog.component.html',
  styleUrl: './categorydialog.component.css'
})
export class CategoryDialogComponent {

  categories: Category[] = [];
  displayedColumns: string[] = ['categoryId','name','type', 'actions'];

  constructor(
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Failed to load categories', err)
    })
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoryEditDialogComponent, {
      width: '400px',
      data: { category: { name: ''}, isNew: true }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.categoryService.createCategory(result).subscribe(() => this.loadCategories());
    });
  }

  editCategory(category: Category){
    const dialogRef = this.dialog.open(CategoryEditDialogComponent, {
      width: '400px',
      data: { category: { ...category}, isNew: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.updateCategory(result).subscribe(() => {
          this.loadCategories();
        })
      }
    })
  }

  deleteCategory(category: Category) {
    if(confirm(`Are you sure you want to delete "${category.name}"?`)) {
      this.categoryService.deleteCategory(category.categoryId).subscribe(() => this.loadCategories());
    }
  }

  isDefaultCategory(category: Category): boolean {
    return category.owner === 'Default';
  }

}
