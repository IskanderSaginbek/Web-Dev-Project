import { Component, OnInit } from '@angular/core';
import {Constants} from "../app.component";
import {category, product, mfr, user} from "../../interfaces";
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
  public options : number[] | undefined;
  public pageId : number = 1;
  public u = Constants.u;
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
    const pageId = Number(routeParams.get('pageId')) || 1;
    this.pageId = pageId;
    this.catService.getCatById(catId).subscribe((cat) => (cat!==undefined ? this.cat = cat : this.notFound()), (err)=>{
      this.notFound()
    })
    if (pageId > 1)
    this.catService.getProductsByCat(catId,pageId).pipe(
      map((prods) => {prods!== undefined ? this.prods = prods.results : this.notFound();
        if (prods.count > 10) this.options = Array.from({length: prods.count/10+1}, (_, i) => i + 1)
      })
    ).subscribe();
    else this.catService.getProductsByCat(catId).pipe(
      map((prods) => {prods!== undefined ? this.prods = prods.results : this.notFound();
        if (prods.count > 10) this.options = Array.from({length: prods.count/10+1}, (_, i) => i + 1)
      })
    ).subscribe();
  }
  changePage(page : number) {
    if (page > 1) this.router.navigate(["page/"+page],{relativeTo : this.route});
    else this.router.navigate(["../../"],{relativeTo : this.route});
  }

}
