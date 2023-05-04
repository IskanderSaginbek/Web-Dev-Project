import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {category, comment, history_item, mfr, product, shipment} from "../../interfaces";
import {CategoriesComponent} from "../categories/categories.component";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
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
  constructor(private http : HttpClient, private cookieService : CookieService) { }

  getCats() {
    return this.http.get<category[]>("http://localhost:8000/api/categories/");
  }
  getCatById(id : number) {
    return this.http.get<category>("http://localhost:8000/api/categories/"+id+"/");
  }
  getProductsByCat(id : number, page? : number){
    if (page)
      return this.http.get<any>("http://localhost:8000/api/products/categories/"+id+"/?page="+page);
    else
      return this.http.get<any>("http://localhost:8000/api/products/categories/"+id+"/");
  }
  getProductById(id : number) {
    return this.http.get<product>("http://localhost:8000/api/products/"+id+"/");
  }
  getMfrs() {
    return this.http.get<mfr[]>("http://localhost:8000/api/mfrs/");
  }
  getMfrById(id : number) {
    return this.http.get<mfr>("http://localhost:8000/api/mfrs/"+id+"/");
  }
  getShippings() {
    return this.http.get<shipment[]>("http://localhost:8000/api/shippings/");
  }
  getCommentsByProdId(id : number) {
    return this.http.get<comment[]>("http://localhost:8000/api/comments/"+id+"/");
  }
  postComment(text : string, uid : number, pid : number) {
    let cmnt = {
      user_id : uid,
      prod_id : pid,
      text : text,
    }
    console.log(JSON.stringify(cmnt));
    return this.http.post("http://localhost:8000/api/comment/",JSON.stringify(cmnt),this.httpOptions)
  }
  rate(rating : number, id : number) {
    return this.http.patch("http://localhost:8000/api/rate/"+id+"/",{"rating":rating},this.httpOptions);
  }
  search(searchWord:string, cat:number, orderby:string, order:number) {
    return this.http.get<product[]>("http://127.0.0.1:8000/api/products/search/"+searchWord+"/"+cat+"/"+orderby+"/"+order);
  }
  buy(obj : Object) {
    return this.http.patch("http://localhost:8000/api/purchase/",JSON.stringify(obj),this.httpOptions);
  }
  getHistory(u_id : number) {
    return this.http.get<any>("http://localhost:8000/api/history/"+u_id);
  }
  addProd(obj : Object,c_id : number) {
    return this.http.post("http://127.0.0.1:8000/api/products/categories/"+c_id+"/",JSON.stringify(obj),this.httpOptions)
  }
  alterProd(obj : Object,p_id : number) {
    return this.http.patch("http://127.0.0.1:8000/api/products/"+p_id+"/",JSON.stringify(obj),this.httpOptions)
  }
  deleteProd(p_id : number) {
    return this.http.delete("http://127.0.0.1:8000/api/products/"+p_id+"/");
  }
}
