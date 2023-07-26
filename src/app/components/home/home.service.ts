import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from './home.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = "Product";

  //list of saleProducts
  private myListSale: Producto[]=[]

  constructor(private http: HttpClient) { }

  public getProductos() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.baseUrl}/${this.url}`);
  }

  public postProducto(producto: Producto) : Observable<Producto[]>{
    return this.http.post<Producto[]>( `${environment.baseUrl}/${this.url}`,producto);
  }

  public deleteProducto(producto: Producto) : Observable<Producto[]>{
    return this.http.delete<Producto[]>(`${environment.baseUrl}/${this.url}/${producto.id}`);
  }

  private myCart = new BehaviorSubject<Producto[]>([]);
  myCart$ = this.myCart.asObservable();

  public addProducto(producto: Producto)
  {
    if(this.myListSale.length === 0){
      producto.unitsSale = 1

      this.myListSale.push(producto)

      this.myCart.next(this.myListSale)
    } else {
      const productMod = this.myListSale.find((element) => {
        return element.id === producto.id
      })
      if(productMod){
        productMod.unitsSale = productMod.unitsSale + 1;
        this.myCart.next(this.myListSale)
      } else {
        producto.unitsSale = 1
        this.myListSale.push(producto)
        this.myCart.next(this.myListSale)
      }
    }
  }

}
