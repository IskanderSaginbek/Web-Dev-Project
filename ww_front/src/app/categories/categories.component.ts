import { Component, OnInit } from '@angular/core';
import {category} from "../../interfaces";
import {Constants} from "../app.component";
import {CategoriesService} from "../services/categories.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : category[] = [];
  constructor(private catService : CategoriesService) { }

  ngOnInit(): void {
    this.catService.getCats().subscribe((cats) => (this.categories = cats));
  }

}
