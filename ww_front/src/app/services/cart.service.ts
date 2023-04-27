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
      quantity : q,
      available : p.amount,
      price : p.price,
      thumbnail : p.image,
      name : p.name
    };
    this.items.push(this.c)
  }

  removeFromCart(id : number) {
    this.items.splice(id,1);
    return this.items;
  }

  getCart() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
