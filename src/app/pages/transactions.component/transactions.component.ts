import { AfterViewInit, Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sort, MatSortModule, MatSort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TransactionService, Transaction } from '../../services/transaction.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransactionDialogComponent } from '../transactiondialog.component/transactiondialog.component';
import { CategoryService, Category } from '../../services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatProgressSpinnerModule

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class TransactionsComponent {

  showAddForm = false;

  newTransaction: any = {
    amount: null,
    categoryId: null,
    description: '',
    date: ''
  };

  filters: any = {
    startDate: null,
    endDate: null,
    categoryName: null,
    type: null
  }

  sortField = 'date';
  sortDirection = 'desc';

  isLoading = false;

  //Hardcoded
//   categories = [
//   { id: 1, name: 'Salary' },
//   { id: 2, name: 'Food & Dining' },
//   { id: 3, name: 'Transport' }
// ];

  categories: Category[] = [];
  transactions: Transaction[] = [];
  totalElements = 0;
  pageSize = 5;
  currentPage = 0;

  private showMessage(message: string, isError: boolean = false) {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: isError ? ['snackbar-error'] : ['snackbar-success']
  });
}


  // displayedColumns: string[] = ['id', 'name', 'date', 'account', 'amount', 'actions'];
  // dataSource = new MatTableDataSource<ListTransactions>(TRANSACTIONS_DATA);

  displayedColumns: string[] = ['no', 'categoryName', 'type', 'date', 'description', 'amount', 'actions'];
  dataSource = new MatTableDataSource<Transaction>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadTransactions();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }

  loadTransactions() {

    this.isLoading = true;

    const sortParam = `${this.sortField},${this.sortDirection}`;

    const hasFilter = 
    this.filters.startDate ||
    this.filters.endDate ||
    this.filters.categoryName ||
    this.filters.type;

    const request$ = hasFilter
      ? this.transactionService.getFilteredTransactions(
        this.currentPage,
        this.pageSize,
        this.filters,
        sortParam
      )
      : this.transactionService.getTransactions(
        this.currentPage,
        this.pageSize,
        sortParam
      );

      request$.subscribe({
        next: response => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
        this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });


  // this.transactionService
  //   .getTransactions(this.currentPage, this.pageSize)
  //   .subscribe(response => {
  //     this.dataSource.data = response.content;
  //     this.totalElements = response.totalElements;
  //   });
}

applyFilters() {
  this.currentPage = 0;
  this.loadTransactions();
}

get hasActiveFilter(): boolean {
  return !!(
    this.filters.startDate ||
    this.filters.endDate ||
    this.filters.categoryName ||
    this.filters.type
  );
}

clearFilters() {
  this.filters = {
    startDate: null,
    endDate: null,
    categoryName: null,
    type: null
  };
  this.currentPage = 0;
  this.loadTransactions();
}

onPageChange(event: PageEvent) {
  this.currentPage = event.pageIndex;
  this.pageSize = event.pageSize;
  this.loadTransactions();
}

onSort(event: Sort) {
  this.sortField = event.active;
  this.sortDirection = event.direction || 'desc';
  this.currentPage = 0;
  this.loadTransactions();
}

  openAddDialog() {
  this.dialog.open(TransactionDialogComponent, {
    width: '400px',
    data: {
      categories: this.categories,
      mode: 'add'
    }
  }).afterClosed().subscribe(result => {

    if(!result) return;

    if (result) {
      this.transactionService.createTransaction(result)
      .subscribe({
        next: () => {
        this.showMessage('Transaction added successfully');
        this.loadTransactions();
        },
        error: () => {
          this.showMessage('Failed to add transaction', true);
        }
      });
    }
  });
}

  openEditDialog(transaction: any) {
    this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      data: {
        categories: this.categories,
        mode: 'edit',
        transaction: transaction
      }
    }).afterClosed().subscribe(result => {

      if(!result) return;

      if(result?.action === 'update') {
        this.transactionService.updateTransaction(transaction.transactionId, result.payload)
        .subscribe({
          next: () => {
            this.showMessage('Transaction updated succesfully');
          this.loadTransactions();
          },
          error: () => {
            this.showMessage('Update failed', true);
          }
        });
      }

      if(result?.action === 'delete') {
        this.transactionService.deleteTransaction(transaction.transactionId)
        .subscribe({
          next: () => {

            this.showMessage('Transaction deleted');
          this.loadTransactions();
          },
          error: () => {
            this.showMessage('Delete failed', true);
          }
        });
      }
    })
  }

  onEdit(element:any){
    console.log('Edit clicked for:', element);
  }

    onIconClick(element:any){
    console.log('Edit clicked for:', element);
  }

}

export interface ListTransactions {
  id: number;
  name: string;
  date: string;
  account: string;
  amount: string;
}

const TRANSACTIONS_DATA: ListTransactions[] = [
  {id:1, name: 'Item A', date: '23 April 2025', account: 'Food & Dining', amount: 'RM786'},
  {id:2, name: 'Item B', date: '23 April 2025', account: 'Food & Dining', amount: 'RM786'},
  {id:3, name: 'Item C', date: '23 April 2025', account: 'Food & Dining', amount: 'RM786'},
  {id:4, name: 'Item D', date: '23 April 2025', account: 'Food & Dining', amount: 'RM786'},
  {id:5, name: 'Item E', date: '23 April 2025', account: 'Food & Dining', amount: 'RM786'},
  {id:6, name: 'Item F', date: '23 April 2025', account: 'Food & Dining', amount: 'RM786'},
];
