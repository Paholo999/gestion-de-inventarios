import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "Product";

  //list of saleProducts
  private myListSale: Product[]=[]
  //list of buyProducts
  private myListBuy: Product[]=[]

  constructor(private http: HttpClient) { }

  public getProducts() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.baseUrl}/${this.url}`);
  }

  public getProduct(productId : number) : Observable<Product>{
    return this.http.get<Product>(`${environment.baseUrl}/${this.url}/${productId}`).pipe(
      catchError(e => {
        return throwError(() => {
          Error(e);
        });
      })
    );
  }

  public postProduct(product: Product) : Observable<Product[]>{
    return this.http.post<Product[]>( `${environment.baseUrl}/${this.url}`,product);
  }

  public deleteProduct(product: Product) : Observable<Product[]>{
    return this.http.delete<Product[]>(`${environment.baseUrl}/${this.url}/${product.id}`);
  }

  public putProduct(product: Product) : Observable<any>{
    return this.http.put<any>(`${environment.baseUrl}/${this.url}/${product.id}`, product).pipe(
      catchError(e => {
        return throwError(() => {
          Error(e);
        });
      })
    );
  }

  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  private myCartBuy = new BehaviorSubject<Product[]>([]);
  myCartBuy$ = this.myCartBuy.asObservable();

  public addProduct(product: Product)
  {
    if(this.myListSale.length === 0){  
      product.unitsSale = 1
      this.myListSale.push(product)
      this.myCart.next(this.myListSale)
    } else {
      const productMod = this.myListSale.find((element) => {
        return element.id === product.id
      })
      if(productMod){
        
        if(productMod.unitsSale < product.stock){
          productMod.unitsSale = productMod.unitsSale + 1;
          this.myCart.next(this.myListSale)
        }else{
          alert("No hay mas existencias")
        }
        
      }else{
        product.unitsSale = 1
        this.myListSale.push(product)
        this.myCart.next(this.myListSale)
      }
    }
  }

  public addBuyProduct(product: Product)
  {
    if(this.myListBuy.length === 0){
      product.unitsBuy = 1

      this.myListBuy.push(product)

      this.myCartBuy.next(this.myListBuy)
    } else {
      const productMod = this.myListBuy.find((element) => {
        return element.id === product.id
      })
      if(productMod){
        productMod.unitsBuy = productMod.unitsBuy + 1;
        this.myCartBuy.next(this.myListBuy)
      } else {
        product.unitsBuy = 1
        this.myListBuy.push(product)
        this.myCartBuy.next(this.myListBuy)
      }
    }
  }

  public ListSale(){
    return this.myListSale
  }


  public findSaleProductId(id: number){
    return this.myListSale.find((element) => {
      return element.id === id
    })
  }

  public findBuyProductId(id: number){
    return this.myListBuy.find((element) => {
      return element.id === id
    })
  }

  public deleteSaleProduct(product: Product){
    this.myListSale = this.myListSale.filter(element => element !== product)
    this.myCart.next(this.myListSale);
  }

  public deleteBuyProduct(product: Product){
    this.myListBuy = this.myListBuy.filter(element => element !== product)
    this.myCartBuy.next(this.myListBuy);
  }

  public totalSaleProduct(){
    const total = this.myListSale.reduce(function (acc, producto) {return acc + (producto.unitsSale * producto.unitPrice); }, 0)
    return total
  }

  public totalBuyProduct(){
    const total = this.myListBuy.reduce(function (acc, producto) {return acc + (producto.unitsBuy * producto.unitPrice); }, 0)
    return total
  }
}
