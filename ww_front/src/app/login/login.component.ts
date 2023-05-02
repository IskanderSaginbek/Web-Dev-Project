import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService, JWT_NAME} from "../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private url = 'http://127.0.0.1:8000';

  loginForm = this.formBuilder.group({
    email : ["", [Validators.required, Validators.email]],
    password : ["", [Validators.required]],
  });
  constructor(private formBuilder : FormBuilder, private authService : AuthService, private router : Router, private http : HttpClient,) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.loginForm!.invalid) {
      console.log("invalid");
      return;
    }
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).pipe(
      map(refresh => {console.log(refresh); localStorage.setItem(JWT_NAME,JSON.stringify(refresh));
    this.authService.getUser(this.loginForm.value.email!).pipe(
      map(usr => { Object.assign(usr,{type : 1});
        localStorage.setItem("cur_usr",JSON.stringify(usr));
        window.location.assign("http://localhost:4200/home");})
    ).subscribe();})
    ).subscribe();
  }
}
