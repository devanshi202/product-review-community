import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {InputValidator} from "../_services/input.validator"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  path: string = "../assets/images/logo.png";
  alttext: string="logo image";
  registerForm!:FormGroup;

  constructor(private userService : UserService, private router: Router){}

  ngOnInit(): void
  {
    this.registerForm = new FormGroup({
      username: new FormControl('',[
       Validators.required,
       InputValidator.cannotContainSpace
      ]),
      firstName: new FormControl('',[
      Validators.required,
      InputValidator.cannotContainSpace
      ]),
      
      lastName: new FormControl(''),

      email: new FormControl('',[
      Validators.required,
      Validators.email,
      InputValidator.cannotContainSpace
    ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        InputValidator.cannotContainSpace
      ]),
    });
   
  }

  public onSubmit()
  {
    this.userService.register(this.registerForm.value)
    .subscribe(
      (response: any)=>{
        console.log(response);
        
        alert("User Registered Successfully");
        this.router.navigate(['/login']);

      },
      (error)=>{
          console.log(error);
      }

      );
  }

  public get username(){
    return this.registerForm.get('username')
  }
  public get firstName(){
    return this.registerForm.get('firstName')
  }
  public get lastName(){
    return this.registerForm.get('lastName')
  }
  public get email(){
    return this.registerForm.get('email')
  }
  public get password(){
    return this.registerForm.get('password')
  }

}
