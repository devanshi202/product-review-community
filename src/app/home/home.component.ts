import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { UserService } from '../_services/user.service';
import { ReviewService } from '../_services/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  userCount!: number;
  productCount!: number;
  reviewCount!: number;

  constructor(private productService: ProductService, private userService: UserService, private reviewService: ReviewService){}

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe(
      (response: any)=>{
        if(response!=undefined)
        {
          this.productCount = response.length;
        }
      },
      (error)=>{
        console.log(error);
      }
    );

    this.reviewService.getAllReviews().subscribe(
      (response: any)=>{
        if(response!=undefined)
        {
          this.reviewCount = response.length;
        }
      },
      (error)=>{
        console.log(error);
      }
    );

    this.userService.getAllUsers().subscribe(
      (response: any)=>{
        if(response!=undefined)
        {
          this.userCount = response.length;
        }
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
