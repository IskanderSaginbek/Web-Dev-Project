import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../app.component";
import {mfr} from "../../interfaces";

@Component({
  selector: 'app-mfr',
  templateUrl: './mfr.component.html',
  styleUrls: ['./mfr.component.css']
})
export class MfrComponent implements OnInit {
  public m : mfr | undefined;
  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const mfrId = Number(routeParams.get('mfrId'));
    this.m = Constants.mfrs[mfrId];
    if (!this.m) {
      this.router.navigate(['/404'], {
        skipLocationChange: true,
        state: {
          reason : "Unable to locate the manufacturer"
        }
      });
    }
  }

}
