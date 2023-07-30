import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/components/createproducts/product.service';
import { HomeService } from 'src/app/components/home/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  myCart$ = this.productService.myCart$
  myCartBuy$ = this.productService.myCartBuy$

  constructor(private homeService: HomeService,private productService: ProductService) { }

  ngOnInit(): void {
  }

}
