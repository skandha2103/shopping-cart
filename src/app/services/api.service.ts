import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductList } from '../models/product-list';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getProduct(){
    return this.http.get<ProductList[]>("https://fakestoreapi.com/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
