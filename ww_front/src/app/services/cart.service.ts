import { Injectable } from '@angular/core';
import {cart_item, product} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items : cart_item[] = [];
  c : cart_item | undefined;
  constructor() { }

  addToCart(p : product, q : number) {
    this.c = {
      id : this.items.length+1,
      prod_id : p.id,
      cat_id : p.cat_id,
      quantity : q,
      available : p.amount,
      price : p.price,
      thumbnail : p.image,
      name : p.name
    };
    this.items.push(this.c)
    localStorage.setItem("items_ls",JSON.stringify(this.items));
  }

  removeFromCart(id : number) {
    let arrayId : number = this.items.findIndex((ci,i)=>{return ci.id === id});
    this.items.splice(arrayId,1);
    localStorage.setItem("items_ls",JSON.stringify(this.items));
    return this.items;
  }

  getCart() {
    this.items = JSON.parse(localStorage.getItem("items_ls")!);
    if (this.items == null) this.items = [];
    return this.items;
  }

  clearCart() {
    localStorage.clear();
    this.items = [];
    return this.items;
  }
}
