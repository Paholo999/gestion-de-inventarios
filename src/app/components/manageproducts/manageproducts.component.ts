import { Component, OnInit, OnDestroy} from '@angular/core';
import { Product } from './product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageproductsService } from './manageproducts.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
})
export class ManageproductsComponent implements OnInit {
  dtOptions: DataTables.Settings = {}; 
  products: any[] = [];

  dtTrigger : Subject<any> = new Subject<any>();

  constructor(private ManageProductsService: ManageproductsService, private router: Router, private activatedRoute: ActivatedRoute) { }

 

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    
    this.ManageProductsService.getProducts().
    subscribe((products) => {
      this.products = products;
      this.dtTrigger.next(products);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
