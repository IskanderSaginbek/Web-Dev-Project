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
    )
  };

  constructor(private http : HttpClient, private jwtHelper : JwtHelperService, private cookieService : CookieService) { }

  login(key : string, password : string) {
    const validateEmail = (email : string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    if (validateEmail(key)) { //email

    }
    else { //username

    }
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }

  register(user : any) {
    //console.log(JSON.stringify(user));
    return this.http.post<any>(this.url+'/api/auth/users/', JSON.stringify(user), this.httpOptions);
  }
}
