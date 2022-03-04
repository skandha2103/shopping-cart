import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private api:ApiService, private cartService: CartService) { }
  public productList: ProductList[] = [];
  filterCategory: ProductList[]=[];
  searchKey:string="";


  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any)=>{
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price})
      })
    })

  this.cartService.search.subscribe(val=>{
    this.searchKey = val;
  })
  }

  addToCart(item:ProductList){
    this.cartService.addToCart(item);
  }

  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

}
