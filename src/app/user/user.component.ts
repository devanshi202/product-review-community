import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';

import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit{

  message: any;
  searchString!: String;
  apiResponse!: any;
  productResponse!: any;

  constructor(private productService: ProductService, private router: Router){
   this.productResponse = [];
  }

  ngOnInit(): void
  {
    
  }


  public search(searchString: String)
  {
    this.productService.searchForProduct(searchString).subscribe(
      (response: any)=>{
        if(response.length!=0)
        {
          this.router.navigate(["/products", searchString]);
        }
        else
        {
          alert("Oops! Product Not Found");
          this.router.navigate(["/raise-product"]);
        }
      },
      (error)=>{
        console.log(error);
      }
    )
    
  }

}
