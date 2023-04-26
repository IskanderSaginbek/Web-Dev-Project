import { Component, OnInit } from '@angular/core';
import {faFilePdf, faLink, faShareAlt, faTimes, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Constants} from "../app.component";
import {user,shipment,product,category,cart_item,mfr} from "../../interfaces"
import {ActivatedRoute} from "@angular/router";
import {faFacebook, faTelegram, faWhatsapp} from "@fortawesome/free-brands-svg-icons";

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
  s: number | undefined;
  shipments : shipment[] = Constants.shipments;
  fapdf = faFilePdf;
  fauser = faUserCircle;
  faShare = faShareAlt;
  faFB = faFacebook;
  faTG = faTelegram;
  faWA = faWhatsapp;
  faChain = faLink;
  faX = faTimes;
  share_vis : string = "none";
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pId = Number(routeParams.get('prodId'));
    this.p = Constants.mock_products[pId];
    this.c = Constants.cats[this.p.cat_id];
    this.m = Constants.mfrs[this.p.mfr_id];
    this.s = 2;
  }

  share(site : number): void {
    switch(site) {
      case 0 : {
        window.open("https://t.me/share/url?url="+window.location.href+"&text=Look what I've found on wiredworld.com","_blank")
        break;
      }
      case 1 : {
        window.open("https://api.whatsapp.com/send?text=\""+window.location.href+"\"","_blank")
        break;
      }
      case 2 : {
        window.open("http://www.facebook.com/dialog/send?app_id=123456789&"+window.location.href,"_blank")
        break;
      }
      case 3 : {
        navigator.clipboard.writeText(window.location.href);
        alert("Copied to clipboard: " + window.location.href);
        break;
      }
    }
  }
  toggle_share() : void {
    if (this.share_vis=="none") this.share_vis = "flex";
    else this.share_vis = "none";
  }
}
