import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private role = 'User'

  constructor(private http: HttpClient) { }

  signin(user: User){
    const params = new HttpParams().set('role', this.role);
    return this.http.post(`${environment.baseUrl}/Auth/register`, user,{ params });
  }
}
