import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landingpage } from './pages/landingpage/landingpage';
import { Login } from './pages/login/login';
import { Addpatient } from './pages/addpatient/addpatient';
import { Checkout } from './pages/checkout/checkout';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './auth-guard';

const routes: Routes = [
  { path: '', component: Landingpage , pathMatch : 'full'},         
  { path: 'login', component: Login },          
  { path: 'dashboard', component: Dashboard, canActivate : [AuthGuard] },
  { path: 'add-patient', component: Addpatient,  canActivate: [AuthGuard],},
  { path: 'checkout', component: Checkout,  canActivate: [AuthGuard],},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
