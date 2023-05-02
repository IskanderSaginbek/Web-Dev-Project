import { Component, OnInit } from '@angular/core';
import {cart_item, product, shipment} from "../../interfaces";
import {Constants} from "../app.component";
import {CartService} from "../services/cart.service";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {CategoriesService} from "../services/categories.service";
import {map} from "rxjs";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  s: number = 2;
  shipments : shipment[] = [];
  items : cart_item[] = [];
  total : number = 0;
  faX = faTimes;
  constructor(private cartService : CartService, private catService : CategoriesService) { }

  ngOnInit(): void {
    this.catService.getShippings().pipe(
      map(prj => {
        this.shipments = prj;
        this.s = 2;
        this.items = this.cartService.getCart();
        for (let v of this.items) {
          this.total += v.price*v.quantity;
        }
        this.total += this.shipments[this.s].price;
      })
    ).subscribe();
  }

  clearCart() : void {
    this.cartService.clearCart(); //redundant tho
    window.location.reload();
  }

  removeItem(i : cart_item) : void {
    this.cartService.removeFromCart(i.id);
    this.recalc(i);
  }

  recalc(c : cart_item) {
    let q = c.quantity;
    if (q < 0 || !q) q = 1;
    else if (q > c.available) q=c.available;
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
