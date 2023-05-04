import { Component, OnInit } from '@angular/core';
import {faCogs, faInfoCircle, faUserCircle, faHistory} from "@fortawesome/free-solid-svg-icons";
import {category, history_item, user} from "../../interfaces";
import {Constants} from "../app.component";
import {AuthService} from "../services/auth.service";
import {CategoriesService} from "../services/categories.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  faUser = faUserCircle;
  faInfo = faInfoCircle;
  faGear = faCogs;
  faHistory = faHistory;
  u : user = Constants.u;
  cc : number = 9999;
  categories : category[] = [];
  history : history_item[] = [];
  constructor(private auth : AuthService, private catService: CategoriesService) { }

  ngOnInit(): void {
    this.catService.getCats().subscribe((cats) => (this.categories = cats));
    this.catService.getHistory(this.u.id).subscribe((h) => {this.history = h;console.log(h)});
  }
  logout() {
    this.auth.logout();
    window.location.assign("http://localhost:4200/home");
  }

}
