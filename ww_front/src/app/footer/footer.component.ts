import { Component, OnInit } from '@angular/core';
import {faEnvelope, faMapMarker, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faTwitter, faWhatsapp, faYoutube} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faPhone = faPhone;
  faEnv = faEnvelope;
  faMarker = faMapMarker;
  faFB = faFacebook;
  faYT = faYoutube;
  faTR = faTwitter;
  faWA = faWhatsapp;
  faIG = faInstagram;
  constructor() { }

  ngOnInit(): void {
  }

}
