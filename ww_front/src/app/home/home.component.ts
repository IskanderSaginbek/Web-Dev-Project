import { Component, OnInit } from '@angular/core';
import {category} from "../../interfaces";
import {Constants} from "../app.component";
import {CategoriesService} from "../services/categories.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories : category[] = [];
  constructor(private catService : CategoriesService) { }

  ngOnInit(): void {
    this.catService.getCats().subscribe((cats) => (this.categories = cats.slice(0,4)));
  }

}
