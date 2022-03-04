import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductList } from '../models/product-list';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemList: ProductList[] = [];
  productList = new BehaviorSubject<any>([]);
  search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }

  getProductCount(){
    let totalItem = 0;
    this.cartItemList.forEach((a)=>{
      totalItem+=a.quantity
    })
    return totalItem;
  }

  setProducts(product:ProductList[]){
    this.cartItemList.push(...product)
    this.productList.next(product)
  }

  addToCart(product:ProductList){
    if(this.cartItemList.indexOf(product)!==-1){
      let index = this.cartItemList.findIndex(x => x===product);
      this.cartItemList[index].quantity+=1;
      this.cartItemList[index].total+=this.cartItemList[index].price;
    }
    else{
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
    this.getTotalPrice()
  }

  getTotalPrice():number{
    let grandTotal = 0;
    this.cartItemList.map((prod:any)=>{
      grandTotal+=prod.total;
    })

    return Math.round(grandTotal * 100) / 100;
  }

  removeCartItem(product:ProductList){
    this.cartItemList.map((prod:any,index:any)=>{
      if(prod.id==product.id){
        this.cartItemList.splice(index,1)
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList)
  }
}
