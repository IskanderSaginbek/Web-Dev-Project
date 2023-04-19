import { Component, OnInit } from '@angular/core';
import {category} from "../../interfaces";
import {Constants} from "../app.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : category[] = Constants.cats;
  constructor() { }

  ngOnInit(): void {
  }

}
