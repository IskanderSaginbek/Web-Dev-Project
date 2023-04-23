import { Component, OnInit } from '@angular/core';
import {mfr} from "../../interfaces";
import {Constants} from "../app.component";

@Component({
  selector: 'app-mfrs',
  templateUrl: './mfrs.component.html',
  styleUrls: ['./mfrs.component.css']
})
export class MfrsComponent implements OnInit {
  public mfrs : mfr[] = Constants.mfrs;
  constructor() { }

  ngOnInit(): void {
  }

}
