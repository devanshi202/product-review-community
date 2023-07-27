import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import {InputValidator} from "../_services/input.validator"
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit{
  path: string = "../assets/images/logo.png" ;
  alttext: string="logo image";
  reviewForm!: FormGroup;
  product!: any;
  pid!: any;
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.pid = this.route.snapshot.paramMap.get("pid");
    console.log(this.pid);
    
    this.reviewForm = new FormGroup({
      reviewDescription: new FormControl('', [
        Validators.required,
        InputValidator.cannotContainSpace
      ]),
     
     
      rating: new FormControl('' , [
        Validators.required,
        InputValidator.cannotContainSpace
      ])
    });
  }



  public onSubmit()
  {
    this.productService.updateProduct(this.reviewForm.value, this.pid).subscribe(
      (response)=>{
        if(response!=undefined)
        {
          alert("Review added successfully");
          this.router.navigate(["/product-detail", this.pid]);
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  public get reviewDescription() {
    return this.reviewForm.get("reviewDescription");
  }

  public get rating(){
    return this.reviewForm.get('rating')
  }

}
