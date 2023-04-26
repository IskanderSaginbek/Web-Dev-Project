import { Component, OnInit } from '@angular/core';
import {cart_item, shipment} from "../../interfaces";
import {Constants} from "../app.component";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  s: number | undefined;
  shipments : shipment[] = Constants.shipments;
  items : cart_item[] = [];
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.s = 2;
    this.items = this.cartService.getCart();
  }

}
