import { Component, OnInit } from '@angular/core';
import {mfr} from "../../interfaces";
import {Constants} from "../app.component";
import {CategoriesService} from "../services/categories.service";

@Component({
  selector: 'app-mfrs',
  templateUrl: './mfrs.component.html',
  styleUrls: ['./mfrs.component.css']
})
export class MfrsComponent implements OnInit {
  public mfrs : mfr[] | undefined;
  constructor(private catService : CategoriesService) { }

  ngOnInit(): void {
    this.catService.getMfrs().subscribe((mfrs)=>(this.mfrs=mfrs));
  }

}
