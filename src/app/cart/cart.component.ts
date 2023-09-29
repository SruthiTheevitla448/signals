import { Component } from '@angular/core';
import { IProduct } from '../services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: IProduct[] = [];
  constructor(public cartService: CartService) { }

  ngOnInit() {
  
  }

  remove(i: number){
    this.cartService.removeProductSignal(i);
  }

}
