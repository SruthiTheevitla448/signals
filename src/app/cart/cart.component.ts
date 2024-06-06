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
  quantity: any = 0
  constructor(public cartService: CartService) { }

  ngOnInit() {

  }

  remove(i: number) {
    this.cartService.removeProductSignal(i);
  }
  increaseValue(product: IProduct) {
    this.cartService.addProductSignal(product)
  }
  decreaseValue(product: IProduct) {
    this.cartService.reduceProductSignal(product)
  }
}
