import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  API_PATH = "http://localhost:8083";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );
  constructor(private httpClient: HttpClient) { }

  public getAllPendingReviews()
  {
    return this.httpClient.get(this.API_PATH + "/getPendingReviews");
  }


  public updateReview(status: string, rid: number)
  {
    return this.httpClient.put(this.API_PATH + "/updateReview/"+rid, status);
  }

  public getAllReviews()
  {
    return this.httpClient.get(this.API_PATH + "/reviews", { headers: this.requestHeader});
  }
}
