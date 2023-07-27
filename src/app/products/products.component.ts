import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  productList!: any;
  base64string!: any;
  imagePath: string = "";
  searchString!: any;
  imageArray!: any;
  checkboxInputBrand!: any;
  nameState!: [];

  form!: FormGroup;
  productNameArray!: any;
  productBrandArray!: any;
  selectedBrand!:any;
  selectedProductName!: any;
  formArrayObj: any;
  formArrayObjBrand: any;
  updatedProductList: any;
  

  constructor(private productService: ProductService, private router: Router,
     private route: ActivatedRoute, private fb: FormBuilder){
  }

  
  ngOnInit(): void {
    
    this.searchString = this.route.snapshot.paramMap.get("searchString");

    this.productService.searchForProduct(this.searchString).subscribe(
      (response: any)=>{
        if(response.length!=0)
        {
          this.productList = response;
          this.productBrandArray=[];
          this.productNameArray=[];
        
         this.productList.map((product: any, i: number)=>{
            
          
             this.base64img(product.productCode, product);
             
             if(!this.productNameArray.includes(product.productName)){
               this.productNameArray.push(
                product.productName  
                );
             }

            if(!this.productBrandArray.includes(product.brand)){
              this.productBrandArray.push(
                product.brand
                );
            }
          });
          
          
          this.updatedProductList = this.productList;
          this.createFormInputs();
        }
      
      },
      (error)=>{
        console.log(error);
        
      }
    );
    
  }

  private createFormInputs()
  {
    this.form = new FormGroup({
      productNames: this.createFormControl(this.productNameArray),
      productBrands: this.createFormControl(this.productBrandArray)
    });
    this.formArrayObj= this.form.controls['productNames'];
    this.formArrayObjBrand = this.form.controls['productBrands'];
  }

  private createFormControl(filterInputs: any)
  {
    const arr = filterInputs.map((input: { selected: any; }) => {
      return new FormControl(input.selected || false);
    });
    return new FormArray(arr);
  }

  public onChangeName()
  {
    this.selectedProductName = this.formArrayObj.controls.map((input: any, i: number)=>{
      return input.value && this.productNameArray[i];
    })
    
    this.getSelectedProductName();
  }

  private getSelectedProductName() {
    this.selectedProductName = this.selectedProductName.filter((name: any)=>{
      if(name!==false)
      {
        return name
      }
    })
 
  
  this.filterProductList()
  }


  public onChangeBrand()
  {
    this.selectedBrand = this.formArrayObjBrand.controls.map((input: any, i:number)=>{
      return input.value && this.productBrandArray[i];
    })
    this.getSelectedProductBrand();
  }

  private getSelectedProductBrand()
  {
    this.selectedBrand = this.selectedBrand.filter((name: any)=>{
      if(name!==false)
      {
        return name;
      }
    })
   
    
   this.filterProductList()
  }

  private filterProductList()
  { 
    if((this.selectedBrand != undefined && this.selectedBrand?.length!=0)
        ||
       (this.selectedProductName != undefined && this.selectedProductName?.length!=0))
    {
      if(this.selectedBrand != undefined && this.selectedBrand?.length!=0)
      {
        const updatedProductListAfterBrandFilter = [];
        for(let i=0;  i<this.selectedBrand?.length; i++)
        {
          for(let j=0; j<this.productList.length; j++)
          {
            if( this.productList[j].brand === this.selectedBrand[i])
            {
              updatedProductListAfterBrandFilter.push(this.productList[j]);
            }
          }
        }
        this.updatedProductList = updatedProductListAfterBrandFilter;
      }

      if(this.updatedProductList.length == 0)
      {
        this.updatedProductList = this.productList;
      }
      
      if(this.selectedProductName != undefined && this.selectedProductName?.length!=0)
      {
        
        const updatedProductListAfterNameFilter = [];
        for(let i=0; i<this.selectedProductName?.length; i++)
        {
          for(let j=0; j<this.updatedProductList.length; j++)
          {
            if(this.updatedProductList[j].productName === this.selectedProductName[i])
            {
                updatedProductListAfterNameFilter.push(this.updatedProductList[j]);
            }
          }
        }
        this.updatedProductList = updatedProductListAfterNameFilter;
      }
    }
    else
    {
      this.updatedProductList = this.productList;
    }
    
  }

  public base64img(pid: string, product: any)
  {
    this.productService.getImgPath(pid).subscribe(
      (response)=>{
       product.image = `data:image/jpg;base64,${response}`;
      },
      (error)=>{
        console.log(error);
        
      }
    );
    
  }

  public onRowClick(pid: string)
  {
    this.router.navigate(["/product-detail", pid]);
  }

}
