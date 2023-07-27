import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { ReviewService } from '../_services/review.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})



export class AdminComponent implements OnInit{

  reviewList!: any;
  mySubscription: any;
   
  constructor(private reviewService: ReviewService, private router: Router){
    
  }

  ngOnInit(): void {
    this.reviewService.getAllPendingReviews().subscribe(
      (response: any)=>{
         this.reviewList = response;
      },
      (error)=>{
          console.log(error);
      }
      );
  }

  public updateReview(rid: number, status: string)
  {
    this.reviewService.updateReview(status, rid).subscribe(
      (response: any)=>{
        console.log(response);
        
        if(response!=undefined)
        {
          alert("Review status updated succesfully");
          this.router.navigate([this.router.url])
        }
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
