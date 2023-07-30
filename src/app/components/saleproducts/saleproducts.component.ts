import { Component, OnInit } from '@angular/core';
import { Product } from '../createproducts/product.model';
import { ProductService } from '../createproducts/product.service';

@Component({
  selector: 'app-saleproducts',
  templateUrl: './saleproducts.component.html',
  styleUrls: ['./saleproducts.component.scss']
})
export class SaleproductsComponent implements OnInit {

  myCart$ = this.productService.myCart$

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  totalProduct(unitPrice: number, unitsSale: number){
    return unitPrice * unitsSale
  }  

  totalSaleProduct(){
    const result = this.productService.totalSaleProduct()
    return result
  }

  updateUnits(operation: string, id: number){
    const product = this.productService.findSaleProductId(id)

    if(product){
      if(operation === 'minus' && product.unitsSale > 0){
        product.unitsSale = product.unitsSale - 1
      }
      if(operation === 'add'){
        product.unitsSale = product.unitsSale + 1
      }
      if(product.unitsSale === 0){
          this.deleteProduct(product)
      }
    }
  }

  deleteProduct(producto: Product){
    this.productService.deleteSaleProduct(producto)
  }

}
