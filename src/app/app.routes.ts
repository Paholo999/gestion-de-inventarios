import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SaleproductsComponent } from './components/saleproducts/saleproducts.component';
import { CreateproductsComponent } from './components/createproducts/createproducts.component';
import { BuyproductsComponent } from './components/buyproducts/buyproducts.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { ManageproductsComponent } from './components/manageproducts/manageproducts.component';
import { PageproductsComponent } from './components/createproducts/pageproducts.component';

const APP_ROUTES: Routes = [
    { path: 'manageproducts', component: ManageproductsComponent },
    { path: 'createProducts', component: CreateproductsComponent },
    { path: 'createProducts/page:page', component: CreateproductsComponent }, 
    { path: 'createProducts/form/:id', component: PageproductsComponent },
    { path: 'createProducts/form', component: PageproductsComponent },
    { path: 'saleProduct', component: SaleproductsComponent},
    { path: 'buyProduct', component: BuyproductsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signin', component: SigninComponent},
    { path: 'home', component:HomeComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
