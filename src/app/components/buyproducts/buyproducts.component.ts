import { Component, OnInit } from '@angular/core';
import { ProductService } from '../createproducts/product.service';
import { Product } from '../createproducts/product.model';

@Component({
  selector: 'app-buyproducts',
  templateUrl: './buyproducts.component.html',
  styleUrls: ['./buyproducts.component.css']
})
export class BuyproductsComponent implements OnInit {

  myCartBuy$ = this.productService.myCartBuy$ 
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  totalProduct(unitPrice: number, unitsBuy: number){
    return unitPrice * unitsBuy
  }  

  totalBuyProduct(){
    const result = this.productService.totalBuyProduct()
    return result
  }

  updateUnits(operation: string, id: number){
    const product = this.productService.findBuyProductId(id)

    if(product){
      if(operation === 'minus' && product.unitsBuy > 0){
        product.unitsBuy = product.unitsBuy - 1
      }
      if(operation === 'add'){
        product.unitsBuy = product.unitsBuy + 1
      }
      if(product.unitsSale === 0){
          this.deleteProduct(product)
      }
    }
  }

  deleteProduct(product: Product){
    this.productService.deleteBuyProduct(product)
  }


}
