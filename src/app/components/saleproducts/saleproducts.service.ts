import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../createproducts/product.model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Saleproducts } from './saleproducts.model';

@Injectable({
  providedIn: 'root'
})
export class SaleproductsService {

  constructor(private http: HttpClient) { }

  public putProduct(saleproduct: Saleproducts[]) : Observable<Saleproducts>{
    return this.http.put<Saleproducts>(`${environment.baseUrl}/Product/SaleProduct`, saleproduct).pipe(
      catchError(e => {
        return throwError(() => {
          Error(e);
        });
      })
    );
  }

}
