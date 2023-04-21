import { Component, OnInit } from '@angular/core';
import {faArrowDown, faArrowUp, faSearch} from "@fortawesome/free-solid-svg-icons";
import {category} from "../../interfaces";
import {Constants} from "../app.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  faUp = faArrowUp;
  faDown = faArrowDown;
  categories : category[] = Constants.cats;
  constructor() { }

  ngOnInit(): void {
  }

}
