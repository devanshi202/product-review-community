import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import {InputValidator} from "../_services/input.validator"

@Component({
  selector: 'app-raise-product',
  templateUrl: './raise-product.component.html',
  styleUrls: ['./raise-product.component.scss']
})
export class RaiseProductComponent implements OnInit{

  path: string = "../assets/images/logo.png" ;
  alttext: string="logo image";
  productForm!: FormGroup;
  isLoading: boolean = false;
  existingProduct: any;
  timer: string="";

  constructor(private productService: ProductService, private router: Router)
  {

  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      productCode: new FormControl('', [
        Validators.required,
        InputValidator.cannotContainSpace
        ]),
      productName: new FormControl('',[
        Validators.required,
        InputValidator.cannotContainSpace
        ]),
      brand: new FormControl('',[
        Validators.required,
        InputValidator.cannotContainSpace
        ])
    });
  }

  public onSubmit()
  {
    
    this.productService.getProductById(this.productForm.value.productCode.toUpperCase()).subscribe(
      (response: any)=>{
        
          if(response!=undefined)
          {
            alert("Product already exists!");
            var sec = 10;
            var timer = setInterval(() =>{
                this.isLoading = true;
                this.timer='00:'+sec;
                sec--;
                if (sec < 0) {
                    clearInterval(timer);
                    this.isLoading = false;
                    this.router.navigate(['/product-detail', response.productCode]);
                }
            }, 1000);
          }
         
      }, 
      (error)=>{
        if(error === "something is wrong")
        {
          this.addProduct();
        }
      }
    );
  }

  public addProduct()
  {
    this.productService.addProduct(this.productForm.value).subscribe(
      (response)=>{
        console.log(response);
        
        if(response!=undefined)
        {
          alert("Product added successfully");
          this.router.navigate(["/user"]);
        }
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  public get productCode()
  {
    return this.productForm.get('productCode');
  }

  public get brand()
  {
    return this.productForm.get('brand');
  }

  public get productName()
  {
    return this.productForm.get('productName');
  }
}
