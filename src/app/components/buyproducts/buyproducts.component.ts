import { Component, OnInit } from '@angular/core';
import { ProductService } from '../createproducts/product.service';
import { Product } from '../createproducts/product.model';
import { BuyproductsService } from './buyproducts.service';
import { Buyproducts } from './buyproducts.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buyproducts',
  templateUrl: './buyproducts.component.html',
  styleUrls: ['./buyproducts.component.css']
})
export class BuyproductsComponent implements OnInit {

  myCartBuy$ = this.productService.myCartBuy$ 
  
  constructor(private productService: ProductService, private buyproductService: BuyproductsService) { }

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
  
  buy(){
    const data:Buyproducts[] = this.productService.ListSale().map(item => ({
      id: item.id,
      quantity: item.unitsSale
    }))
    
    this.buyproductService.putProduct(data)
      .subscribe({
        next: (response) => {
          console.log('Buy operation completed:', response);
          console.log('Updated buy data:', data);
          Swal.fire({
            title: 'Productos',
            text: `Los productos han sido comprados correctamente`,
            icon: 'success'
          }).then(result =>{
            window.location.reload();
          });
        },
        error: (error) => {
          console.error('Error occurred during sale operation:', error);
        }
      });

    console.log(data)
  }

}
