import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from './home.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private url = "Product";

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

}
