import { Component, OnInit } from '@angular/core';
import {Constants} from "../app.component";
import {category, product, mfr} from "../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../services/categories.service";
import {map, NotFoundError} from "rxjs";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public cat : category | undefined;
  public prods : product[] | undefined;
  public mfrs : mfr[] | undefined;
  constructor(private route : ActivatedRoute, private router : Router, private catService : CategoriesService) { }

  notFound() : any
    {
        this.router.navigate(['/404'], {
          skipLocationChange: true,
          state: {
            reason : "Unable to locate the category"
          }
        });
    }
  ngOnInit(): void {
    this.catService.getMfrs().subscribe((mfrs)=>(this.mfrs=mfrs));
    const routeParams = this.route.snapshot.paramMap;
    const catId = Number(routeParams.get('catId'));
    this.catService.getCatById(catId).subscribe((cat) => (cat!==undefined ? this.cat = cat : this.notFound()), (err)=>{
      this.notFound()
    })
    this.catService.getProductsByCat(catId).pipe(
      map((prods) => (prods!== undefined ? this.prods = prods.results : this.notFound()))
    ).subscribe();
  }

}
