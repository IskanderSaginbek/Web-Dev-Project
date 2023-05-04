import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpClient, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JWT_NAME} from "./services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
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
  constructor(private jwtHelper : JwtHelperService, private http : HttpClient, private cookieService : CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(JWT_NAME);
    if(token) {
      if (this.jwtHelper.isTokenExpired(JSON.parse(token!).access)) {
        localStorage.removeItem(JWT_NAME);
        console.log('{"refresh": "'+JSON.parse
                 (token!).refresh+'"}');
        this.http.post("http://127.0.0.1:8000/api/auth/jwt/refresh/", '{"refresh": "'+JSON.parse
        (token!).refresh+'"}', this.httpOptions).subscribe((p) => {console.log(token); localStorage.setItem(JWT_NAME, JSON.stringify(p))});
        return next.handle(request);
      }
      else {
        const clonedReq = request.clone({
          headers: request.headers.set('Authorization',
            'Bearer ' + JSON.parse(token).access)
        });
        return next.handle(clonedReq);
      }
    } else {
      return next.handle(request);
    }
  }
}
