import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buyproducts } from './buyproducts.model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyproductsService {

  constructor(private http: HttpClient) { }

  public putProduct(buyproduct: Buyproducts[]) : Observable<Buyproducts>{
    return this.http.put<Buyproducts>(`${environment.baseUrl}/Product/BuyProduct`, buyproduct).pipe(
      catchError(e => {
        return throwError(() => {
          Error(e);
        });
      })
    );
  }
}
