import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { APP_ROUTING } from './app.routes';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SaleproductsComponent } from './components/saleproducts/saleproducts.component';
import { BuyproductsComponent } from './components/buyproducts/buyproducts.component';
import { CreateproductsComponent } from './components/createproducts/createproducts.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { ManageproductsComponent } from './components/manageproducts/manageproducts.component';
import { PageproductsComponent } from './components/createproducts/pageproducts.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SaleproductsComponent,
    BuyproductsComponent,
    CreateproductsComponent,
    LoginComponent,
    SigninComponent,
    ManageproductsComponent,
    PageproductsComponent,
  ],
  imports: [
    DataTablesModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
