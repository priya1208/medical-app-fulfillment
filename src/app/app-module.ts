import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Landingpage } from './pages/landingpage/landingpage';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { Login } from './pages/login/login';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Addpatient } from './pages/addpatient/addpatient';
import { MatOption } from '@angular/material/autocomplete';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTabLabel } from '@angular/material/tabs';
import { Checkout } from './pages/checkout/checkout';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Dashboard } from './pages/dashboard/dashboard';


@NgModule({
  declarations: [
    App,
    Landingpage,
    Header,
    Footer,
    Login,
    
    Addpatient,
    Checkout,
    Dashboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardHeader, MatCardFooter, MatToolbar, MatCard, MatCardTitle, MatCardContent,
    MatSidenavContainer, MatSidenavContent, MatFormField, MatCard, MatError, MatIcon, MatLabel, ReactiveFormsModule,
    HttpClientModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
    MatToolbarModule, MatOption, MatCardContent, MatDivider, MatSelectModule, MatCardModule, MatDividerModule, MatLabel,
    MatFormFieldModule, MatProgressSpinner, FormsModule, MatCard, MatFormField, MatIcon, MatToolbar
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }1
