import { Component, OnInit } from '@angular/core';
import {category} from "../../interfaces";
import {CategoriesService} from "../services/categories.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Constants} from "../app.component";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  cc : number = 3;
  categories : category[] = [];
  u = Constants.u;
  addProductForm = this.formBuilder.group({
    name : ["", [Validators.required]],
    descr : [""],
    descr_short : ["", [Validators.required]],
    sub_cat : ["", [Validators.required]],
    image : [""],
    ds : [""],
    price : [1, [Validators.required]],
    amount : [1, [Validators.required]],
    cat_id : [3, [Validators.required]],
  });

  constructor(private catService: CategoriesService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.catService.getCats().subscribe((cats) => (this.categories = cats));
  }
  onSubmit() {
    if (this.addProductForm!.invalid) {
      console.log("invalid");
      return;
    }
    let date = new Date();

    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });

    let formattedDate = year + "-" + month + "-" + day;
    let obj = {
      "name":this.addProductForm!.value.name,
      "descr":this.addProductForm!.value.descr,
      "descr_short":this.addProductForm!.value.descr_short,
      "sub_cat" : this.addProductForm!.value.sub_cat,
      "image" : "../assets/products/41-u7k8bJeL.jpg",//this.addProductForm!.value.image,
      "datasheet" : this.addProductForm!.value.ds,
      "price" : this.addProductForm!.value.price,
      "amount" : this.addProductForm!.value.amount,
      "rating" : 0,
      "ratings_num" : 0,
      "date" : formattedDate,
      "cat_id" : this.addProductForm!.value.cat_id,
      "mfr_id" : this.u.id
    }
    console.log(JSON.stringify(obj));
    this.catService.addProd(obj,obj.cat_id!).subscribe((n)=>{window.location.assign("http://localhost:4200/home");});
  }
}
