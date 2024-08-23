import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public _user: User;
  private _token: string;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any>{
    const httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(`${environment.baseUrl}/Auth/login`, user,{headers: httpHeaders});
  }

  public get token(): any{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = JSON.stringify(sessionStorage.getItem('token') as string);
      return this._token;
    }
    return null; 
  }

  public get user(): User{
    if(this._user != null){
      return this._user;
    } else if(this._user == null && sessionStorage.getItem('user') != null ){
      this._user = JSON.parse(sessionStorage.getItem('user') as string);
      return this._user;
    }
    return new User();
  }

  getToken(token : string) : any {
    if(token != null){
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  saveToken(token : string) : void {
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  saveUser(payload: any) : void {
    console.log(payload);
    this._user = new User();
    this._user.Username = payload.unique_name;
    //this._usuario.roles = payload[this.rolesendPoint];
    sessionStorage.setItem('user',JSON.stringify(this._user));
  }

  logout(): void {
    this._token = "";
    this._user == null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  isAuthenticated(): boolean {
    let payload = this.getToken(this._token);
    if(payload != null && payload.unique_name && payload.unique_name.length > 0){
      return true;
    }
    return false;
  }

  

  

}
