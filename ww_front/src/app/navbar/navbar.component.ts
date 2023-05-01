import { Component, OnInit } from '@angular/core';
import {faShoppingCart, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Constants} from "../app.component";
import {user} from "../../interfaces";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faCart = faShoppingCart;
  faUser = faUserCircle;
  u = Constants.u;
  constructor() { }

  ngOnInit(): void {
  }

}
