import { Component, OnInit } from '@angular/core';
import {faFilePdf, faLink, faShareAlt, faTimes, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Constants} from "../app.component";
import {user,shipment,product,category,cart_item,mfr} from "../../interfaces"
import {ActivatedRoute, Router} from "@angular/router";
import {faFacebook, faTelegram, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {CartService} from "../services/cart.service";

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
  fapdf = faFilePdf;
  fauser = faUserCircle;
  faShare = faShareAlt;
  faFB = faFacebook;
  faTG = faTelegram;
  faWA = faWhatsapp;
  faChain = faLink;
  faX = faTimes;
  share_vis : string = "none";
  msg_vis : string = "paused";
  msg_clr : string = "green";
  msg_text : string = "Product added to cart";
  msg_anim : string = "msg_popup";
  q : number = 1;
  constructor(private route : ActivatedRoute, private cartService : CartService, private router : Router) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pId = Number(routeParams.get('prodId'));
    const cId = Number(routeParams.get('catId'));
    this.p = Constants.mock_products[pId];
    if (!this.p || cId != this.p.cat_id) {
      this.router.navigate(['/404'], {
        skipLocationChange: true,
        state: {
          reason : "Unable to locate the product"
        }
      });
    }
    else {
      this.c = Constants.cats[cId];
      this.m = Constants.mfrs[this.p.mfr_id];
    }
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
  addToCart(p : product,q : number) {
    if (q < 0 || q > p.amount || !q) {
      this.msg_anim = "msg_popup";
      this.msg_vis="running";
      this.msg_text="Invalid amount";
      this.msg_clr="#ED1313"
      if (q < 0) this.msg_text="Yeah, real funny";
      else if (q > p.amount) this.msg_text="Requested: "+q+", Available: "+p.amount;
      else if (!q) this.msg_text="Enter the quantity";
    }
    else if(this.cartService.getCart().some(o => o.prod_id === p.id)) {
      this.msg_anim = "msg_popup";
      this.msg_vis="running";
      this.msg_text="Product already added";
      this.msg_clr="#FFC000"
    }
    else {
      this.cartService.addToCart(p,q);
      this.msg_anim = "msg_popup";
      this.msg_vis="running";
      this.msg_text="Product added to cart";
      this.msg_clr="#00D415"
    }
  }
}
