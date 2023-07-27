import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap , BehaviorSubject} from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_PATH = "http://localhost:8083";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  public login(loginData: any)
  {
    return this.httpClient.post(this.API_PATH + "/authenticate", loginData, { headers: this.requestHeader});
  }

  public register(registerData: any)
  {
    return this.httpClient.post(this.API_PATH + "/registerNewUser", registerData, { headers: this.requestHeader});
  }

  public getAllUsers()
  {
    return this.httpClient.get(this.API_PATH + "/users", { headers: this.requestHeader});
  }
  
  public roleMatch(allowedRoles: string | any[]) :boolean
  {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    
    if(userRoles != null && userRoles)
    {
      for(let i=0; i<userRoles.length; i++)
      {
        for(let j=0; j<allowedRoles.length; j++)
        {
          if(userRoles[i].roleName === allowedRoles[j])
          {
            isMatch=true;
            return isMatch;
          }
         
        }
      }
    }
    return isMatch;
  }
}
