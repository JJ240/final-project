import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${environment.serviceUrl}/product` 
  constructor(private http: HttpClient) { }

  getProduct(): any{
    return this.http.get<any>(this.url);
  }

  //Get By Id
  getProductById(id : any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  getProductByName(name : any){
    let getUrl = `${this.url}/name/${name}`;
    return this.http.get<any>(getUrl);
  }

  //Add Product
  addProduct(product : any){
    let getUrl = `${this.url}/add`;
    return this.http.post<any>(getUrl, product)
      .pipe(map((res)=>{
        return res;
      }));
  }

  //Update Product
  updateProduct(product : any,id : any){
    let getUrl =`${this.url}/${id}`;
    return this.http.put<any>(getUrl, product)
      .pipe(map((res)=>{
        return res;
      }));
  }

  //Delete Product
  deleteProduct(id: any){
    let getUrl = `${this.url}/${id}`
    return this.http.delete<any>(getUrl);
  }
}
