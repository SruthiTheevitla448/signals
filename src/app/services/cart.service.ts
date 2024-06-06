import { Injectable, computed, signal } from '@angular/core';
import { ApiService, IProduct } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems = signal<IProduct[]>([]);
  public subTotal = computed(() => this.cartItems().reduce((prev: any, curr: IProduct) => {
    return prev + (curr.price * curr.quantity);
  }, 0));
  public totalItems = computed(() => this.cartItems().length);

  constructor(private api: ApiService) {
  }

  addProductSignal(product: IProduct) {
    this.cartItems.mutate((val) => {
      if (val.length > 0) {
        let filteredindex = val.findIndex(e => e.id == product.id)
        if (filteredindex != -1) {
          val[filteredindex].quantity = val[filteredindex].quantity + 1
          val[filteredindex].totalPrice = val[filteredindex].price * val[filteredindex].quantity
        }
        else {
          if (!product.quantity) {
            product.quantity = 1
            product.totalPrice = product.price * product.quantity
          }
          val.push(product);
        }
      }
      else {
        if (!product.quantity) {
          product.quantity = 1
          product.totalPrice = product.price * product.quantity
        }
        val.push(product);
      }
    });
    this.api.products()?.forEach(a => {
      if (a.id === product.id) {
        a.rating.count = a.rating.count - 1;
      }
    })
  }

  removeProductSignal(id: number) {
    this.cartItems.mutate(val => {
      const product = val.splice(id, 1);
      this.api.products()?.forEach(a => {
        if (a.id === product[0].id) {
          a.rating.count = a.rating.count + product[0].quantity;
          a.quantity = 0
        }
      })
    })
  }
  reduceProductSignal(product: IProduct) {
    this.cartItems.mutate((val) => {
      let ind = val.findIndex(e => e.id == product.id)
      if (val[ind].quantity == 1) {
        val.splice(ind, 1)
      }
      else {
        val[ind].quantity = val[ind].quantity - 1
      }
    });
    this.api.products()?.forEach(a => {
      if (a.id === product.id) {
        a.rating.count = a.rating.count + 1;
      }
    })
  }
}
