import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import {InputValidator} from "../_services/input.validator"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  path: string = "../assets/images/logo.png" ;
  alttext: string="logo image";
  loginForm!:FormGroup;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
    )
  {

  }

  ngOnInit(): void
   {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        InputValidator.cannotContainSpace
      ]),
      userPassword: new FormControl('',[
        Validators.required,
        InputValidator.cannotContainSpace
      ])
    });

    
  }

  public onSubmit()
  {
    this.userService.login(this.loginForm.value)
    .subscribe(
      (response: any)=>{
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);
          const role = response.user.role[0];
          
          
          if(role.roleName=="Admin")
          { 
            this.router.navigate(['/admin']);
          }
          else
          {
            this.router.navigate(['/user']);
          }

      },
      (error)=>{
          console.log(error);
          if(error.status === 401)
          {
            alert("User Not Registered");
            this.router.navigate(["/register"]);
          }
      }

      );
    
  }

  public get userName()
  {
    return this.loginForm.get('userName');
  }
  public get userPassword()
  {
    return this.loginForm.get('userPassword');
  }
}
