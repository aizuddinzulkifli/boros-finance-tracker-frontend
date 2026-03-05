import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-reports-insight',
  templateUrl: './reports-insight.component.html',
  styleUrls: ['./reports-insight.component.css'],
  imports:[
    CommonModule,
    MatTabsModule
  ]
})
export class ReportsInsightComponent {

}
