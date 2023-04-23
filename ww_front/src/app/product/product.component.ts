import { Component, OnInit } from '@angular/core';
import {faFilePdf, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Constants} from "../app.component";
import {user,shipment,product,category,cart_item,mfr} from "../../interfaces"

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  u : user = Constants.u;
  cat : category = {
    id : 0,
    name : "string",
    descr : "string",
    descr_short : "string",
    image : "string"}
  p : product = {
    id : 0,
    cat_id : 1,
    mfr_id : 1,
    image : "string",
    datasheet : "string",
    name : "string",
    descr : "string",
    descr_short : "string",
    sub_cat : "string",
    price : 3,
    amount : 3,
    rating: 3,
    date : this.u.exp_date};
  mfr : mfr = {
    id : 0,
    email : "string",
    name : "string",
    password : "string",
    descr : "string",
    phone : "string",
    card_num : "string",
    exp_date : this.u.exp_date,
    ver_num : "string",
    address : "string",
    img : "string",
    allow_news : true,};
  shipments : shipment[] = [{
    id : 0,
    name : "string",
    descr : "string",
    days : 1,
    price : 1,
  },{
    id : 0,
    name : "string2",
    descr : "string2",
    days : 2,
    price : 2,
  },]//Constants.shipments;
  fapdf = faFilePdf;
  fauser = faUserCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
