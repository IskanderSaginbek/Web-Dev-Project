import { Component, OnInit } from '@angular/core';
import {category, mfr, product} from "../../interfaces";
import {CategoriesService} from "../services/categories.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public cats : category[] | undefined;
  public prods : product[] | undefined;
  public mfrs : mfr[] | undefined;
  constructor(private route : ActivatedRoute, private catService : CategoriesService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    let sw = String(routeParams.get('sw'));
    let c = Number(routeParams.get('cc'));
    let ob = String(routeParams.get('ob'));
    let o = Number(routeParams.get('o'));
    if (sw == "null") sw = "";
    if (ob == "null") ob = "name";
    this.catService.getCats().subscribe((cats)=>(this.cats=cats));
    this.catService.getMfrs().subscribe((mfrs)=>(this.mfrs=mfrs));
    this.catService.search(sw,c,ob,o).subscribe((prods)=>(this.prods=prods));
  }

}
