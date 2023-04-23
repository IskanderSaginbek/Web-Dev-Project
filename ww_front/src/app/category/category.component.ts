import { Component, OnInit } from '@angular/core';
import {Constants} from "../app.component";
import {category, product, mfr} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public cat : category | undefined;
  public prods : product[] | undefined;
  public mfrs : mfr[] = Constants.mfrs;
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const catId = Number(routeParams.get('catId'));
    this.cat = Constants.cats[catId];
    console.log(Constants.mock_products);
    console.log(catId);
    this.prods = Constants.mock_products.filter(p => p.cat_id === catId);
  }

}
