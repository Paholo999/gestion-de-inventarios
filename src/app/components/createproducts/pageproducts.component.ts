import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-pageproducts',
  templateUrl: './pageproducts.component.html',
  styleUrls: ['./pageproducts.component.css']
})
export class PageproductsComponent implements OnInit {

  product: Product = new Product();

  constructor(private ProductService: ProductService,private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const productId = params['id'];
      this.ProductService.getProduct(productId).subscribe((response) => {
        this.product = response;
        console.log(this.product);
      })
    });
  }

  addToSale(product: Product){
    this.ProductService.addProduct(product)
  }

}
