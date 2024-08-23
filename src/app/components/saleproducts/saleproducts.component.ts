import { Component, OnInit } from '@angular/core';
import { Product } from '../createproducts/product.model';
import { ProductService } from '../createproducts/product.service';
import { SaleproductsService } from './saleproducts.service';
import { Saleproducts } from './saleproducts.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saleproducts',
  templateUrl: './saleproducts.component.html',
  styleUrls: ['./saleproducts.component.scss']
})
export class SaleproductsComponent implements OnInit {

  myCart$ = this.productService.myCart$;
  saleproduct: Saleproducts = new Saleproducts;

  constructor(private productService: ProductService, private saleproductService: SaleproductsService) { }

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

  sale(){
    const data:Saleproducts[] = this.productService.ListSale().map(item => ({
      id: item.id,
      quantity: item.unitsSale
    }))
    
    this.saleproductService.putProduct(data)
      .subscribe({
        next: (response) => {
          console.log('Sale operation completed:', response);
          console.log('Updated sale data:', data);
          Swal.fire({
            title: 'Productos',
            text: `Los productos han sido vendidos correctamente`,
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
