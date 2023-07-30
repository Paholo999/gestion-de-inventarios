import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createproducts',
  templateUrl: './createproducts.component.html',
  styleUrls: ['./createproducts.component.css']
})
export class CreateproductsComponent implements OnInit {

  product: Product = new Product;
  productQuantity:number=1;

  

  products: any[] = [];
  constructor(private ProductService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ProductService.getProducts().subscribe((result: Product[]) => (this.products = result));
  }

  addToSale(product: Product){
    this.ProductService.addProduct(product)
  }
  
  addToBuy(product: Product){
    this.ProductService.addBuyProduct(product)
  }
  
  save(): void {
    this.ProductService.postProduct(this.product).subscribe( reponse => {
      
      Swal.fire({
        title: 'Productos',
        text: `El producto ha sido creado`,
        icon: 'success'
      }).then(result =>{
         window.location.reload();
      });
    });
  }

  eliminate(product: Product) : void {
    Swal.fire({
      title: 'Product List',
      text: `Esta seguro de eliminar el producto:  ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(resultado =>{
      if(resultado.isConfirmed){
        this.ProductService.deleteProduct(product).subscribe(() => {
          this.products = this.products.filter(elemento => elemento !== product);
          Swal.fire('Productos','Eliminado','success');
        });
      }
    })
    
  }


}
