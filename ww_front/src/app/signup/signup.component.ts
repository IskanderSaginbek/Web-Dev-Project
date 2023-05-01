import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
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
      is_customer : true,
      password : this.signupForm!.value.password,
    }
    let new_id : number;
    //console.log(usr);
    this.authService.register(usr).pipe(
      map(usr => {this.router.navigate(['home']); localStorage.setItem("cur_usr",JSON.stringify({
        id : new_id,
        type : 1,
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
      }));})
    ).subscribe(data => {
      console.log(data);
    });

  }

}
