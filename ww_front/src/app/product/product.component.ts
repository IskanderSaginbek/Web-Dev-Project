import { Component, OnInit } from '@angular/core';
import {faFilePdf, faLink, faShareAlt, faTimes, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Constants} from "../app.component";
import {user, shipment, product, category, cart_item, mfr, comment} from "../../interfaces"
import {ActivatedRoute, Router} from "@angular/router";
import {faFacebook, faTelegram, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {CartService} from "../services/cart.service";
import {CategoriesService} from "../services/categories.service";
import {map} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  u = Constants.u;
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
  share_state = "paused";
  share_vis : string = "none";
  share_anim : string = "share_popup_anim";
  share_m_anim : string = "share_menu_anim";
  msg_vis : string = "paused";
  msg_clr : string = "green";
  msg_text : string = "Product added to cart";
  msg_anim : string = "msg_popup";
  q : number = 1;
  val : number = 0;
  comments : comment[] = [];
  cmnt : string = "";
  constructor(private route : ActivatedRoute, private cartService : CartService, private router : Router, private catService : CategoriesService) { }

  notFound() : any
  {
    this.router.navigate(['/404'], {
      skipLocationChange: true,
      state: {
        reason : "Unable to locate the product"
      }
    });
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pId = Number(routeParams.get('prodId'));
    const cId = Number(routeParams.get('catId'));
    this.catService.getProductById(pId).pipe(
      map(p => {this.p = p;
        this.catService.getMfrById(p.mfr_id).subscribe((mfr)=>(this.m=mfr),(err)=>{
          this.notFound()
        });
        this.catService.getCatById(cId).subscribe((cat) => (this.c = cat));
      })
    ).subscribe((a)=>{},(err)=>{
      this.notFound()
    });
    this.catService.getCommentsByProdId(pId).pipe(
      map(p => {this.comments = p; console.log(this.comments)})
    ).subscribe();
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
    if (this.share_vis=="none") {
      this.share_vis = "flex";
      this.share_anim = "share_popup_anim";
      this.share_m_anim = "share_menu_anim";
      this.share_state = "running";
    }
    else {
      this.share_vis = "none";
      this.share_anim = "none";
      this.share_m_anim = "none";
      this.share_state = "paused";
    }
  }
  addToCart(p : product,q : number) {
    if (q < 0 || q > p.amount || !q) {
      this.msg_anim = "msg_popup";
      this.msg_vis="running";
      this.msg_text="Invalid amount";
      this.msg_clr="#ED1313"
      if (q < 0) this.msg_text="Negative quantity";
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
  rate() {
    if (this.p && this.val > 0 && this.val < 6) this.catService.rate(this.val,this.p.id).subscribe((n)=>(window.location.reload()));
    else alert("error rating product");
  }
  sendComment(cmnt : string) {
    if (cmnt.length > 0) {
      this.catService.postComment(cmnt,this.u.id,this.p!.id).subscribe((n)=>(window.location.reload()));
    }
  }
}
