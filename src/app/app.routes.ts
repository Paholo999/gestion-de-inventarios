import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SaleproductsComponent } from './components/saleproducts/saleproducts.component';
import { CreateproductsComponent } from './components/createproducts/createproducts.component';
import { BuyproductsComponent } from './components/buyproducts/buyproducts.component';

const APP_ROUTES: Routes = [
    { path: 'createProducts', component: CreateproductsComponent },
    { path: 'saleProduct', component: SaleproductsComponent},
    { path: 'buyProduct', component: BuyproductsComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'createProducts' }
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
