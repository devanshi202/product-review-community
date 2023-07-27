import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_PATH = "http://localhost:8083";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) { }

  public searchForProduct(searchString: String)
  { 

    return this.httpClient.get(this.API_PATH + '/getProductByString/'+searchString);
  }

  public getProductById(code: string)
  {
    return this.httpClient.get(this.API_PATH + '/getProductById/'+code);
    
  }

  public updateProduct(review: any, pid: string)
  {
    return this.httpClient.put(this.API_PATH + '/updateProduct/'+pid, review );
  }

  public getImgPath(pid: string)
  {
    return this.httpClient.get(this.API_PATH + '/getImgPath/'+pid, {responseType: 'text'})
  }

  public addProduct(product: any)
  {
    return this.httpClient.post(this.API_PATH + '/addProduct', product);
  } 

  public getAllProducts()
  {
    return this.httpClient.get(this.API_PATH + "/products", { headers: this.requestHeader});
  }
}
