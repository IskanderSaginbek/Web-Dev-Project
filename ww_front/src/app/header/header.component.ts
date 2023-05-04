import { Component, OnInit } from '@angular/core';
import {faArrowDown, faArrowUp, faSearch} from "@fortawesome/free-solid-svg-icons";
import {category} from "../../interfaces";
import {Constants} from "../app.component";
import {CategoriesService} from "../services/categories.service";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  faUp = faArrowUp;
  faDown = faArrowDown;
  categories : category[] = [];
  sw : string = "";
  cc : number = 9999;
  ob : string = "name";
  o: number = 1;
  constructor(private catService : CategoriesService, private authService : AuthService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.sw = String(routeParams.get('sw'));
    this.cc = Number(routeParams.get('cc')) || 9999;
    this.ob = String(routeParams.get('ob'));
    this.o = Number(routeParams.get('o'));
    if (this.sw == "null") this.sw = "";
    if (this.ob == "null") this.ob = "name";
    if (!this.authService.isAuth()) this.authService.logout();
    this.catService.getCats().subscribe((cats) => (this.categories = cats));
  }
  search(sw:string,cc:number,ob:string,o:number) {
    window.location.assign('http://localhost:4200/search/'+sw+"/"+cc+"/"+ob+"/"+o);
  }
}
