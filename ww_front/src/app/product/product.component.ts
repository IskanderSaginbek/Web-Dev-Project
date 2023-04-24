import { Component, OnInit } from '@angular/core';
import {faFilePdf, faShareAlt, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Constants} from "../app.component";
import {user,shipment,product,category,cart_item,mfr} from "../../interfaces"
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  u : user = Constants.u;
  p : product | undefined;
  c : category | undefined;
  m : mfr | undefined;
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
  faShare = faShareAlt;
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pId = Number(routeParams.get('prodId'));
    this.p = Constants.mock_products[pId];
    this.c = Constants.cats[this.p.cat_id];
    this.m = Constants.mfrs[this.p.mfr_id];
  }

}
