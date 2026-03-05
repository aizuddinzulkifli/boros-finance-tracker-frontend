import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard.component/dashboard.component';
import { TransactionsComponent } from './pages/transactions.component/transactions.component';
import { BudgetsComponent } from './pages/budgets.component/budgets.component';
import { ReportsInsightComponent } from './pages/reports-insight.component/reports-insight.component';
import { SettingsComponent } from './pages/settings.component/settings.component';
import { LoginComponent } from './pages/login.component/login.component';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [

  { path : '', redirectTo: 'login', pathMatch: 'full'},

  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'budgets', component: BudgetsComponent },
      { path: 'reports-insights', component: ReportsInsightComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
      { path: '**', redirectTo: 'login'}
];
