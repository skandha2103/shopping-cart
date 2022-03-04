import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  totalItems:number = 0;
  searchTerm:string="";
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItems=res.length;
      this.totalItems = this.cartService.getProductCount();
    })
  }

  onSearch(){
    this.cartService.search.next(this.searchTerm);
  }

}
