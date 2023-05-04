import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  reason : string = "";
  constructor(private router : Router) {
    if (this.router.getCurrentNavigation()) {
      if (this.router.getCurrentNavigation()!.extras.state) {
        if (this.router.getCurrentNavigation()!.extras.state!["reason"]) {
          this.reason = this.router.getCurrentNavigation()!.extras.state!["reason"];
        }
      }
    }
  }

  ngOnInit(): void {

  }

}
