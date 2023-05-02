import { Component, OnInit } from '@angular/core';
import {faArrowDown, faArrowUp, faSearch} from "@fortawesome/free-solid-svg-icons";
import {category} from "../../interfaces";
import {Constants} from "../app.component";
import {CategoriesService} from "../services/categories.service";

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
  constructor(private catService : CategoriesService) { }

  ngOnInit(): void {
    this.catService.getCats().subscribe((cats) => (this.categories = cats));
  }

}
