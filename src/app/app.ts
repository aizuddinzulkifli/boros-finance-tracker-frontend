import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterModule]
})
export class AppComponent {
  protected readonly title = signal('boros-finance-tracker');
}

