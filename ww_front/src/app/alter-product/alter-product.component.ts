import { Component, OnInit } from '@angular/core';
import {category} from "../../interfaces";
import {Constants} from "../app.component";
import {FormBuilder, Validators} from "@angular/forms";
import {CategoriesService} from "../services/categories.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-alter-product',
  templateUrl: './alter-product.component.html',
  styleUrls: ['./alter-product.component.css']
})
export class AlterProductComponent implements OnInit {
  cc : number = 3;
  u = Constants.u;
  pId : number = 0;
  alterProductForm = this.formBuilder.group({
    name : [null],
    descr : [null],
    descr_short : [null],
    sub_cat : [null],
    image : [null],
    ds : [null],
    price : [null],
    amount : [null],
  });
  constructor(private formBuilder : FormBuilder, private catService : CategoriesService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.pId = Number(routeParams.get('prodId'));
  }
  onSubmit() {
    let obj = {};
    if (this.alterProductForm!.value.name != null) Object.assign(obj,{"name":this.alterProductForm!.value.name});
    if (this.alterProductForm!.value.descr != null) Object.assign(obj,{"descr":this.alterProductForm!.value.descr});
    if (this.alterProductForm!.value.descr_short != null) Object.assign(obj,{"descr_short":this.alterProductForm!.value.descr_short});
    if (this.alterProductForm!.value.image != null) Object.assign(obj,{"image":this.alterProductForm!.value.image});
    if (this.alterProductForm!.value.ds != null) Object.assign(obj,{"ds":this.alterProductForm!.value.ds});
    if (this.alterProductForm!.value.price != null) Object.assign(obj,{"price":this.alterProductForm!.value.price});
    if (this.alterProductForm!.value.sub_cat != null) Object.assign(obj,{"sub_cat":this.alterProductForm!.value.sub_cat});
    if (this.alterProductForm!.value.amount != null) Object.assign(obj,{"amount":this.alterProductForm!.value.amount});
    if (obj) this.catService.alterProd(obj,this.pId).subscribe((n)=>{window.location.assign("http://localhost:4200/home");});
  }
  deleteProd() {
    this.catService.deleteProd(this.pId).subscribe((n)=>{window.location.assign("http://localhost:4200/home");});
  }
}
