import { Component, OnInit } from '@angular/core';
import {faCogs, faInfoCircle, faUserCircle, faHistory} from "@fortawesome/free-solid-svg-icons";
import {user} from "../../interfaces";
import {Constants} from "../app.component";
import {AuthService} from "../services/auth.service";

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
  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }
  logout() {
    this.auth.logout();
    window.location.assign("http://localhost:4200/home");
  }

}
