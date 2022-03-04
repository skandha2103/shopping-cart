import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService) { }
  products:ProductList[]=[];
  grandTotal:number=0;

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe((prod:any)=>{
      this.products = prod;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeItem(item:ProductList){
    this.cartService.removeCartItem(item);
  }

  emptyCart(){
    this.cartService.removeAllCart();
  }

}
