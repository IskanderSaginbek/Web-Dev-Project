import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService, JWT_NAME} from "../services/auth.service";
import {Router} from "@angular/router";
import {map} from "rxjs";

class CustomValidators {
  static passwordsMatch (c: AbstractControl): { invalid: boolean }|null {
    if (c.get('password') && c.get('confirm')) {
      if (c.get('password')!.value !== c.get('confirm')!.value) {
        return {invalid: true};
      }
    }
    return null;
  }
}
@Component({
  selector: 'app-signup-mfr',
  templateUrl: './signup-mfr.component.html',
  styleUrls: ['./signup-mfr.component.css']
})
export class SignupMfrComponent implements OnInit {

  signupForm = this.formBuilder.group({
    email : ["", [Validators.required, Validators.minLength(6), Validators.email]],
    username : ["", [Validators.required]],
    password : ["", [Validators.required]],
    confirm : ["", [Validators.required]],
  }, {
    validator : CustomValidators.passwordsMatch
  });
  constructor(private formBuilder : FormBuilder, private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.signupForm!.invalid) {
      console.log("invalid");
      return;
    }
    let usr = {
      username : this.signupForm!.value.username,
      email : this.signupForm!.value.email,
      is_customer : false,
      password : this.signupForm!.value.password,
    }
    let new_id : number;
    //console.log(usr);
    this.authService.register(usr).pipe(
      map(usr => {localStorage.setItem("cur_usr",JSON.stringify({
        id : usr.id,
        type : 2,
        email : this.signupForm!.value.email,
        username : this.signupForm!.value.username,
        password : this.signupForm!.value.password,
        fname : "",
        lname : "",
        phone : "",
        card_num : "",
        exp_date : new Date("2024-01-01"),
        ver_num : "",
        address : "",
        img : "",
        descr : "",
        name : this.signupForm!.value.username,
        allow_news : false,
        only_available : false,
      })); this.authService.login(this.signupForm.value.email!, this.signupForm.value.password!).pipe(
        map(refresh => {localStorage.setItem(JWT_NAME,JSON.stringify(refresh));window.location.assign("http://localhost:4200/home");})
      ).subscribe();})
    ).subscribe(/*data => {
      console.log(data);
    }*/);
  }
}
