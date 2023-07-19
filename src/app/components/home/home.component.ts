import { Component, OnInit } from '@angular/core';
import { Producto } from './home.model';
import { HomeService } from './home.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  producto: Producto = new Producto;
  productos: any[] = [];
  constructor(private HomeService: HomeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.HomeService.getProductos().subscribe((result: Producto[]) => (this.productos = result));
  }

  guardar(): void {
    this.HomeService.postProducto(this.producto).subscribe( reponse => {
      
      Swal.fire({
        title: 'Productos',
        text: `El producto ha sido creado`,
        icon: 'success'
      }).then(result =>{
         window.location.reload();
      });
    });
  }

  eliminar(producto: Producto) : void {
    Swal.fire({
      title: 'Carreras tecnicas',
      text: `Esta seguro de eliminar el producto:  ${producto.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(resultado =>{
      if(resultado.isConfirmed){
        this.HomeService.deleteProducto(producto).subscribe(() => {
          this.productos = this.productos.filter(elemento => elemento !== producto);
          Swal.fire('Productos','Eliminado','success');
        });
      }
    })
    
  }

}
