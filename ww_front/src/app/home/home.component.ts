import { Component, OnInit } from '@angular/core';
import {category} from "../../interfaces";
import {Constants} from "../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories : category[] = Constants.cats.slice(0,4);
  constructor() { }

  ngOnInit(): void {
  }

}
