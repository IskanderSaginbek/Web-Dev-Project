import { Component, OnInit } from '@angular/core';
import {cart_item, product, shipment} from "../../interfaces";
import {Constants} from "../app.component";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  s: number = 2;
  shipments : shipment[] = Constants.shipments;
  items : cart_item[] = [];
  total : number = 0;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.s = 2;
    this.items = this.cartService.getCart();
    for (let v of this.items) {
      this.total += v.price*v.quantity;
    }
    this.total += this.shipments[this.s].price;
  }

  recalc(c : cart_item) {
    let q = c.quantity;
    if (q < 0 || !q) q = 1;
    if (q > c.available) q=c.available;
    this.total = this.shipments[this.s].price;
    for (let v of this.items) {
      if (c.id === v.id) v.quantity = q;
      this.total += v.price*v.quantity;
    }
  }
  recalc_ship() {
    this.total = this.shipments[this.s].price;
    for (let v of this.items) {
      this.total += v.price*v.quantity;
    }
  }
}
