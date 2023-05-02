import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map, tap, switchMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import {user} from "../../interfaces";

export const JWT_NAME = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://127.0.0.1:8000';

  private csrfToken = this.cookieService.get('csrftoken');

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'X-CSRFToken': this.csrfToken||""
      }
    ),
    //withCredentials : true
  };

  constructor(private http : HttpClient, private jwtHelper : JwtHelperService, private cookieService : CookieService) { }

  login(email : string, password : string) {
    let usr = {
      email : email,
      password : password
    }
    return this.http.post<any>(this.url+'/api/auth/jwt/create/', JSON.stringify(usr), this.httpOptions);
  }
  getUser(obj : any) {
    console.log(JSON.stringify(obj));
    return this.http.get(this.url+"/api/user/"+obj);
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
    localStorage.removeItem("cur_usr");
    localStorage.removeItem("items_ls");
  }

  register(user : any) {
    //console.log(JSON.stringify(user));
    return this.http.post<any>(this.url+'/api/auth/users/', JSON.stringify(user), this.httpOptions);
  }

  isAuth() : boolean {
    //const token = this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem(JWT_NAME)!).refresh);
    //console.log(JSON.parse(localStorage.getItem(JWT_NAME)!).refresh);
    //console.log(token);
    //return false;
    if (localStorage.getItem(JWT_NAME) === null) return false;
    return !this.jwtHelper.isTokenExpired(JSON.parse(localStorage.getItem(JWT_NAME)!).refresh);
  }
}
