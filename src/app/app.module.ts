import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavBrandComponent } from './components/nav-brand/nav-brand.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { DataTablesModule } from 'angular-datatables';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
 
@NgModule({
  declarations: [AppComponent, LoginPageComponent, NavBrandComponent, DashboardPageComponent, ProductListComponent, ProductDetailComponent, ProductFormComponent, ToasterComponent, UserListComponent, UserFormComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule, FormsModule, DataTablesModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
