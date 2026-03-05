import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryDialogComponent } from '../categorydialog.component/categorydialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports:[
    CommonModule,
    MatTabsModule
  ]
})
export class SettingsComponent {

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {} 


  openCategoryDialog() {
    this.dialog.open(CategoryDialogComponent, {
      width: '600px',
      maxHeight: '80vh'
    });
  }

  logout() {
    if(confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    }
  }

}
