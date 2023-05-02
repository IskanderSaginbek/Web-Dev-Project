import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {category, mfr, product, shipment} from "../../interfaces";
import {CategoriesComponent} from "../categories/categories.component";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http : HttpClient) { }

  getCats() {
    return this.http.get<category[]>("http://localhost:8000/api/categories/");
  }
  getCatById(id : number) {
    return this.http.get<category>("http://localhost:8000/api/categories/"+id+"/");
  }
  getProductsByCat(id : number){
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
}
