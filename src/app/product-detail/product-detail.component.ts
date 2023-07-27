import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{

  product!: any;
  rating: any;
  pid!: any;
  imagePath!: string;
  reviewCount: number =0;
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.pid = this.route.snapshot.paramMap.get("pid");
    
    this.productService.getProductById(this.pid).subscribe(
      (response)=>{
        if(response!=undefined)
        {
          this.product = response;
          this.rating = 0;
          this.calculateRating();
          this.base64img(this.product.productCode);
        }
      },
      (error)=>{
        console.log(error);
        
      }
    )
    
  }

  public calculateRating()
  {
    var ratingCount = 0;
    var reviewRatingSum = 0;
    this.product.review.map((review: any)=>{
      if(review.status === "APPROVED")
      {
        reviewRatingSum+=review.rating;
        ratingCount++;
      }
    })

    if(ratingCount>0)
    {
      this.rating = Math.round((reviewRatingSum/ratingCount)*10)/10;
    }
    this.reviewCount = ratingCount;
    
  }

  public base64img(pid: string)
  {
    this.productService.getImgPath(pid).subscribe(
      (response)=>{

       this.imagePath = `data:image/jpg;base64,${response}`;
       
      },
      (error)=>{
        console.log(error);
        
      }
    );
    
  }

  get filterByStatus() {
    return this.product?.review?.filter( (review: { status: string; }) => review.status === "APPROVED");
  }

  public addReview()
  {
    this.router.navigate(["/review", this.product.productCode]);
  }

}
